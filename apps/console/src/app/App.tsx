/** The operator workspace: presentation and navigation over engine-owned state. */
import { useEffect } from 'react';

import { ArchitecturePanel } from '../features/architecture/ArchitecturePanel';
import { ContainmentPanel, FindingPanel } from '../features/findings/FindingPanel';
import { ImmunityPanel } from '../features/immunity/ImmunityPanel';
import { SwarmLab } from '../features/lab/SwarmLab';
import { EventStream } from '../features/replay/EventStream';
import { Transport } from '../features/replay/Transport';
import { TopologyLegend, TopologyMap } from '../features/topology/TopologyMap';
import { useConsole } from '../shared/state/store';
import { Panel, Pill, Problem } from '../shared/ui/primitives';

function SourceBadge() {
  const source = useConsole((s) => s.source);
  if (!source) return null;
  return (
    <Pill tone={source === 'live' ? 'ice' : 'neutral'}>
      {source === 'live' ? 'live engine' : 'recorded session'}
    </Pill>
  );
}

function ScenarioPicker() {
  const scenarios = useConsole((s) => s.scenarios);
  const scenarioId = useConsole((s) => s.scenarioId);
  const busy = useConsole((s) => s.busy);
  const select = useConsole((s) => s.selectScenario);
  if (scenarios.length < 2) return null;
  return (
    <div className="case-picker" role="radiogroup" aria-label="Scenario">
      {scenarios.map((scenario, index) => (
        <button
          key={scenario.id}
          type="button"
          role="radio"
          aria-checked={scenario.id === scenarioId}
          disabled={busy}
          onClick={() => void select(scenario.id)}
          title={scenario.summary}
        >
          <span className="case-index">
            CASE 0{index + 1} <span>{scenario.rule_id}</span>
          </span>
          <span className="case-name">{scenario.name}</span>
          <span className="case-action" aria-hidden="true">
            Open case ↗
          </span>
        </button>
      ))}
    </div>
  );
}

const WORKSPACE_LINKS = [
  ['01', '#investigation', 'Investigate'],
  ['02', '#response', 'Compare responses'],
  ['03', '#evidence', 'Review the record'],
  ['04', '#experiments', 'Run an experiment'],
] as const;

export function App() {
  const ready = useConsole((s) => s.ready);
  const problem = useConsole((s) => s.problem);
  const source = useConsole((s) => s.source);
  const scenario = useConsole((s) => s.scenarios.find((entry) => entry.id === s.scenarioId));
  const state = useConsole((s) => s.state);
  const findings = useConsole((s) => s.findings);
  const dismiss = useConsole((s) => s.dismissProblem);
  useEffect(() => {
    void useConsole.getState().boot();
  }, []);

  return (
    <div className="workspace-shell">
      <a href="#estate" className="workspace-skip">
        Skip to the interaction map
      </a>
      <aside className="workspace-rail" aria-label="Workspace navigation">
        <a href="../" className="workspace-brand">
          <img src="./favicon.svg" width="38" height="38" alt="" />
          <span>
            Aegis <em>Relay</em>
            <small>INVESTIGATION WORKSPACE</small>
          </span>
        </a>
        <p className="rail-label">Your investigation</p>
        <nav aria-label="Investigation sections">
          {WORKSPACE_LINKS.map(([number, href, title]) => (
            <a key={href} href={href}>
              <span>{number}</span>
              {title}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <div className="rail-note">
          <span className="rail-label">A useful distinction</span>
          <p>
            A reported route describes what the system can connect. Intent and actual data movement
            require separate evidence.
          </p>
        </div>
        <a className="overview-link" href="../">
          ← Return to the field guide
        </a>
      </aside>

      <div className="workspace-body">
        <div className="simulation-banner">
          <span aria-hidden="true">◇</span>
          <p>
            Simulated environment. Fictional data. All controls operate inside this demonstration.
          </p>
        </div>
        <header className="workspace-header">
          <div>
            <span className="workspace-kicker">Aegis Relay / Case desk</span>
            <h1>
              An investigation,
              <br className="mobile-break" /> one handoff at a time.
            </h1>
          </div>
          <div className="workspace-source">
            <SourceBadge />
            <span>{state?.manifest_version ?? 'Preparing the workspace'}</span>
          </div>
        </header>
        <main>
          {!ready && <p className="label">Preparing the analysis workspace</p>}
          {problem && (
            <div className="mb-6">
              <Problem message={problem.message} hint={problem.hint} onDismiss={dismiss} />
            </div>
          )}
          {ready && (
            <>
              <section className="case-desk" aria-labelledby="case-desk-heading">
                <div className="case-desk-intro">
                  <p className="workspace-kicker">Choose an environment</p>
                  <h2 id="case-desk-heading">
                    Same questions.
                    <br />
                    Different handoffs.
                  </h2>
                  <p>Select a case, move through its events, and follow what the engine reports.</p>
                </div>
                <ScenarioPicker />
              </section>
              <div className="workspace-counters" aria-label="Current replay counts">
                <div>
                  <span>Observed events</span>
                  <strong>
                    {state?.replayed_events ?? 0}
                    <small> of {state?.total_events ?? 0}</small>
                  </strong>
                </div>
                <div>
                  <span>Open findings</span>
                  <strong>
                    {findings.length}
                    <small> reported by the engine</small>
                  </strong>
                </div>
                <div>
                  <span>Applied controls</span>
                  <strong>
                    {state?.applied_controls.length ?? 0}
                    <small> in this replay</small>
                  </strong>
                </div>
              </div>
              <section className="replay-dock" aria-label="Replay controls">
                <div className="replay-dock-heading">
                  <span className="workspace-kicker">Start here / Replay the case</span>
                  <span>{scenario?.summary}</span>
                </div>
                <Transport />
              </section>
              <section id="investigation" className="workspace-chapter">
                <div className="chapter-heading">
                  <span>01 / Investigate</span>
                  <h2>Find the connection that matters.</h2>
                  <p>
                    The map and the finding describe the same engine output, from two perspectives.
                  </p>
                </div>
                <div className="investigation-grid">
                  <section id="estate" className="topology-surface" aria-label="Interaction map">
                    <header>
                      <div>
                        <span className="workspace-kicker">Observed relationships</span>
                        <h3>Interaction map</h3>
                      </div>
                      <span className="map-note">Trust zones run top to bottom</span>
                    </header>
                    <div className="map-canvas">
                      <TopologyMap />
                    </div>
                    <div className="map-legend">
                      <TopologyLegend />
                    </div>
                  </section>
                  <div className="finding-stack">
                    <FindingPanel />
                  </div>
                </div>
              </section>
              <section id="response" className="workspace-chapter">
                <div className="chapter-heading">
                  <span>02 / Compare responses</span>
                  <h2>Interrupt the route. Keep the work.</h2>
                  <p>
                    The planner evaluates registered controls. Review both the viable options and
                    the reasons others were rejected.
                  </p>
                </div>
                <ContainmentPanel />
              </section>
              <section id="evidence" className="workspace-chapter">
                <div className="chapter-heading">
                  <span>03 / Review the record</span>
                  <h2>Keep the evidence within reach.</h2>
                  <p>
                    Return to the observations, the declared design, and the patterns awaiting
                    review.
                  </p>
                </div>
                <div className="record-grid">
                  <Panel title="Observation ledger" flush>
                    <EventStream />
                  </Panel>
                  <div className="record-reference">
                    <ArchitecturePanel />
                    <ImmunityPanel />
                  </div>
                </div>
              </section>
              <section id="experiments" className="workspace-chapter">
                <div className="chapter-heading">
                  <span>04 / Run an experiment</span>
                  <h2>Try a different population.</h2>
                  <p>
                    Change the declared conditions, then ask the same detection and containment code
                    what can form.
                  </p>
                </div>
                <SwarmLab />
              </section>
            </>
          )}
        </main>
        <footer className="workspace-footer">
          <img src="./favicon.svg" width="25" height="25" alt="" />
          <p>
            Inspect the evidence. Compare the response. Verify what remains.
            <span>
              {source === 'recorded'
                ? 'You are reviewing recorded engine output. Start the local service to drive the workspace live.'
                : 'The local service supplies the current replay and analysis.'}
            </span>
          </p>
          <a href="#investigation">Back to investigation ↑</a>
        </footer>
      </div>
    </div>
  );
}
