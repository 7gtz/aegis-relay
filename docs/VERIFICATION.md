# Verification

Verified on 10 November 2026 with Node 22.16.0, pnpm 11.19.0, and Python 3.12.16.

| Check | Result |
| --- | --- |
| Frozen pnpm dependency installation | Passed; lockfile unchanged |
| Locked uv dependency installation | Passed; only the project distribution name changed |
| Python Ruff format and lint | Passed |
| Python strict mypy | Passed, 49 source files |
| Python pytest | 195 passed |
| Console Prettier, ESLint and TypeScript | Passed |
| Console Vitest | 23 passed |
| Chromium operator journeys using the recorded session | 13 passed |
| Production console compilation and site assembly | Passed |
| Recorded-output parity | All 183 JSON files equal after identity normalization |
| Browser asset regeneration | 33 images captured; no page JavaScript errors |
| Old product identifiers, links and filenames | Absent from tracked product files; original MIT attribution retained in LICENSE |

Total: **231 existing tests passed**. Detection, graph projection, policy, containment, replay, lab behaviour, and API routes are preserved.

Commands used from the console directory include `pnpm exec vitest run --configLoader runner`, `pnpm exec vite build --configLoader runner`, and `pnpm exec playwright test`. The runner loader was used because the bundled Vite config loader stalled on this local macOS host. The project keeps its existing standard build commands for CI. Site assembly used `node scripts/build-site.mjs` from the repository root.

The core contract and recordings were regenerated with `python -m aegis_relay_core.contract` and `python -m aegis_relay_core.snapshot`. The Python suite produced two dependency deprecation warnings from Starlette/httpx and AnyIO; no failures.

Names used to start or configure the application have changed with the brand: Python module `aegis_relay_core`, npm scope `@aegis-relay`, settings prefix `AEGIS_RELAY_`, and console setting `VITE_AEGIS_RELAY_API_BASE`. Use the updated setup examples. Existing deployments need these names updated when adopting this source tree.

GitHub Pages deployment is opt-in through the manual workflow. The new private repository has no hosted deployment yet. No original Git history or remote is included in this repository.
