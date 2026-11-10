# Verification record

Repository audit on **10 November 2026**, using Node 22.16.0, pnpm 11.19.0, Python 3.12.16, and Chromium. The current suite contains **244 tests**: 195 Python, 30 console, 17 browser journeys, and two static-site assembly tests.

## Scope and evidence

| Area | Check | Result |
| --- | --- | --- |
| Python core | Ruff format/lint, strict mypy, pytest | Passed; 195 tests and 49 checked source/test files |
| Console | Prettier, ESLint, TypeScript, Vitest 4.1.12 | Passed; 30 tests |
| Recorded operator workflow | Chromium journeys | Passed; 17 journeys |
| Live operator workflow | Same Chromium journeys against the local FastAPI service | Passed; 17 journeys, including reset and promotion through the HTTP API |
| Generated artifacts | Regenerate OpenAPI and all 183 recorded JSON files | No diff |
| Static publication | Vite 7.3.7 build and root site assembly | Passed |
| Assembly failure behavior | Temporary-fixture Node tests | Two passed: missing build preserves previous output; complete build replaces stale output and preserves relative assets |
| Documentation | Local Markdown targets and JSON syntax | Passed with `pnpm repo:check` |
| Mermaid | Six README diagrams | Parsed and rendered |
| Submission artwork | Four exact-size PNG exports and visual inspection | Thumbnail, cover, social card, transparent mark exported successfully |
| Production dependency graph | `pnpm audit --prod` | Zero reported advisories |
| Complete dependency graph | `pnpm audit` | One moderate development-only advisory; no high or critical advisories |

The suite count describes distinct tests. Running a browser journey against both recorded and live transports does not count it twice. Read [Dependency review](DEPENDENCIES.md) for package versions, advisory references, and the remaining TypeScript ESLint / minimatch dependency.

## Bugs reproduced and corrected

Seven new transport tests exercise restart, post-containment scrubbing, fresh pattern drafts, scenario isolation, unknown plan rejection, legal review transitions, and idempotent application. Five failed against the previous recorded transport before the fixes. Two new browser journeys cover restarting after a completed containment and scrubbing after a control. The promotion journey also exposed an array-identity issue that prevented the changed review stage from rendering; promotion now replaces the pattern collection.

A seek rebuilds the selected replay, clears derived controls and reviewed patterns, and refreshes the review panel. Application uses a fresh session copy of the recording, so a promoted pattern cannot mutate the cached source and leak into a later run. Unknown plan IDs fail without creating a verified result.

The sweep also corrected setup examples that used inactive environment names, API examples missing `/api/v1`, and review-stage copy that implied automatic matching or enforcement. CI now checks repository links and builds the assembled field guide as well as the workspace.

## Preserved boundaries

Core Python code, detector rules, candidate costs and ordering, manifest semantics, API routes, fixture observations, generated OpenAPI, and recorded engine JSON are unchanged. The corrections bring recorded-session lifecycle behavior into line with the live reset-and-replay contract.

This is a simulated prototype with fictional data. Passing checks establish the tested behavior; they do not prove complete threat coverage, payload inspection, or production enforcement. Pattern stages remain explicit review metadata.

## Reproduce

```bash
# Repository root
pnpm install --frozen-lockfile
pnpm repo:check
pnpm console:check
pnpm build
pnpm console:e2e
pnpm submission:assets
pnpm audit --prod
pnpm audit

# services/core
uv sync --group dev --locked
uv run ruff format --check src tests
uv run ruff check src tests
uv run mypy
uv run pytest -q
uv run python -m aegis_relay_core.contract
uv run python -m aegis_relay_core.snapshot
```

The full package audit exits non-zero for the documented moderate development-tool advisory. All executable test suites pass. The Python suite emits two existing dependency deprecation warnings from Starlette/httpx and AnyIO.

On this macOS host, Vite's bundled configuration loader stalled, so local compilation and component tests used `pnpm exec vite build --configLoader runner` and `pnpm exec vitest run --configLoader runner` from `apps/console`. CI uses the normal commands. Browser journeys use the built console. Local fonts and their SIL Open Font Licenses are bundled.

## Hosted demonstration

[Field guide](https://aegis-relay-six.vercel.app/) · [Investigation workspace](https://aegis-relay-six.vercel.app/console/)

The Vercel release serves the static field guide and recorded workspace, not the Python service. A fresh browser without Vercel authentication checked the overview interaction, recorded source badge, replay, recommended control, verification outcomes, lab, and narrow layout. The deployment remains manual until the private GitHub repository is connected to Vercel; see [Deployment](DEPLOYMENT.md).
