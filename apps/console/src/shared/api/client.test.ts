import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { Transport } from './client';

const scenario = 'p0_scenario';
const planId = 'plan-finding-ps001';
let recorded: Transport;

beforeEach(async () => {
  vi.resetModules();
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: string) => {
      const file = input.split('/demo/')[1];
      if (!file || file.includes('..')) throw new Error(`Unexpected request: ${input}`);
      const body = await readFile(resolve('public/demo', file), 'utf8');
      return new Response(body, { headers: { 'Content-Type': 'application/json' } });
    }),
  );
  recorded = (await import('./client')).recordedTransport;
});

afterEach(() => vi.unstubAllGlobals());

describe('recorded replay lifecycle', () => {
  it('clears applied controls, findings, and pattern memory when restarting', async () => {
    await recorded.apply(scenario, planId);
    expect(await recorded.immunity(scenario)).toHaveLength(1);
    const reset = await recorded.state(scenario, 0);
    expect(reset.cursor).toBe(0);
    expect(reset.applied_controls).toEqual([]);
    expect((await recorded.findings(scenario, 0)).findings).toEqual([]);
    expect(await recorded.immunity(scenario)).toEqual([]);
    expect((await recorded.findings(scenario, 12)).findings[0].rule_id).toBe('PS-001');
  });

  it('rebuilds an uncontained state when scrubbing after a control', async () => {
    await recorded.apply(scenario, planId);
    const state = await recorded.state(scenario, 11);
    expect(state.cursor).toBe(11);
    expect(state.applied_controls).toEqual([]);
    expect((await recorded.findings(scenario, 11)).findings).toEqual([]);
  });

  it('starts a fresh pattern draft after a promoted run is restarted', async () => {
    await recorded.apply(scenario, planId);
    const [pattern] = await recorded.immunity(scenario);
    await recorded.promote(scenario, pattern.id, 'shadow');
    await recorded.promote(scenario, pattern.id, 'active');
    await recorded.state(scenario, 0);
    await recorded.state(scenario, 12);
    await recorded.apply(scenario, planId);
    const [fresh] = await recorded.immunity(scenario);
    expect(fresh.lifecycle).toBe('draft');
    expect(fresh.promoted_at).toBeNull();
  });

  it('resets only the selected scenario', async () => {
    await recorded.apply(scenario, planId);
    await recorded.apply('p1_scenario', 'plan-finding-ps002');
    await recorded.state(scenario, 0);
    expect(await recorded.immunity(scenario)).toEqual([]);
    expect(await recorded.immunity('p1_scenario')).toHaveLength(1);
    expect((await recorded.findings('p1_scenario', 12)).findings).toEqual([]);
  });

  it('rejects an unknown plan without inventing a verified result', async () => {
    await expect(recorded.apply(scenario, 'missing-plan')).rejects.toThrow('No recorded plan');
    expect(await recorded.immunity(scenario)).toEqual([]);
  });

  it('requires shadow review and leaves the pattern unchanged after an illegal promotion', async () => {
    await recorded.apply(scenario, planId);
    const [pattern] = await recorded.immunity(scenario);
    await expect(recorded.promote(scenario, pattern.id, 'active')).rejects.toThrow('Cannot move');
    expect((await recorded.immunity(scenario))[0].lifecycle).toBe('draft');
  });

  it('keeps repeated application idempotent within the same replay', async () => {
    const first = await recorded.apply(scenario, planId);
    const [pattern] = await recorded.immunity(scenario);
    await recorded.promote(scenario, pattern.id, 'shadow');
    const second = await recorded.apply(scenario, planId);
    expect(second).toEqual(first);
    expect(await recorded.immunity(scenario)).toHaveLength(1);
    expect((await recorded.immunity(scenario))[0].lifecycle).toBe('shadow');
  });
});
