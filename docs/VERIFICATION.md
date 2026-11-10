# Verification

Verified on 10 November 2026 with Node 22.16.0, pnpm 11.19.0, Python 3.12.16, and Chromium.

## Executable checks

| Check | Result |
| --- | --- |
| Locked dependency installation | Passed; dependency locks unchanged |
| Core Ruff format, lint, and strict mypy | Passed; 49 source files |
| Core pytest | 195 passed |
| Console Prettier, ESLint, and TypeScript | Passed |
| Console Vitest | 23 passed |
| Console browser journeys | 15 passed |
| Production console build and static site assembly | Passed |
| Overview interaction smoke | Conceptual lab, response, pattern recording, reset, and inspector passed; no JavaScript errors |
| Documentation links | All local links resolve |
| Recorded-output comparison | All 183 JSON files equal after identity normalization against the original engine recording |
| Responsive review | Desktop and 390px layouts inspected; both documents fit the viewport while wide tables and navigation scroll within their own containers |

**233 tests pass.** The existing 231 tests remain, with two added browser journeys checking that chapter navigation preserves investigation state and that the narrow workspace remains usable. The heading assertion follows the revised page copy; security assertions remain intact.

## Preserved behavior

This presentation revision has no changes to core Python source, API routes, manifests, observation streams, generated contracts, recorded demo JSON, console transport, state-store actions, or dependency locks. The overview retains all eight existing direct interaction bindings and all ten graph identities; generated controls and their existing logic remain available.

Changes affect visual composition, copy, navigation, bundled fonts, vector artwork, share cards, screenshots, and documentation. The chapter links scroll without unmounting feature panels. New counts render existing engine state rather than computing a security assessment.

The Python suite reports two pre-existing dependency deprecation warnings from Starlette/httpx and AnyIO. They do not fail the checks.

## Reproduce

```bash
# Repository root
pnpm install --frozen-lockfile
pnpm console:check
pnpm build
pnpm console:e2e

# services/core
uv sync --group dev --locked
uv run ruff format --check src tests
uv run ruff check src tests
uv run mypy
uv run pytest -q
uv run python -m aegis_relay_core.contract
uv run python -m aegis_relay_core.snapshot
```

On this macOS host, Vite's bundled config loader stalled, so local compilation and component checks used `pnpm exec vite build --configLoader runner` and `pnpm exec vitest run --configLoader runner` from `apps/console`. The standard commands remain in CI. Browser tests use the built workspace and a local HTTP server. Fonts are bundled, including their SIL Open Font Licenses, so font-CDN availability does not affect page loading.

## Screenshot and documentation revision

The investigation detail panels now participate directly in their responsive grid, making the finding, composed path, and signals visible side by side on wide screens. This changes presentation only. Console formatting, lint, TypeScript, all 23 component tests, and all 15 browser journeys passed again. The production console and assembled site built successfully using the local runner loader described above.

Two new screenshots show the completed support investigation and an actual 12-agent Swarm Lab result. All README local links resolve, and all six native Mermaid diagrams were parsed and rendered with Mermaid. The root Vercel configuration builds the same static artifact; see [Deployment](DEPLOYMENT.md).
