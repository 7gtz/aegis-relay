# Dependency review

Reviewed on 10 November 2026 using pnpm 11.19.0 and the committed lockfile. These results describe the package advisories reported by the registry at that time, not a penetration test or a claim of complete security coverage.

## Applied updates

| Area | Change | Reason |
| --- | --- | --- |
| Vite | 7.3.6 → 7.3.7 | Patches the reported development-server and editor-integration advisories, including [GHSA-587h-7wmj-h5pm](https://github.com/advisories/GHSA-587h-7wmj-h5pm). |
| Source-map parser | Pin the CSS build chain to `source-map-js` 1.2.2 through a workspace override | Patches [GHSA-68fv-2mgg-jv7q](https://github.com/advisories/GHSA-68fv-2mgg-jv7q). |
| Vitest | 3.2.7 → 4.1.12 | Removes the affected Tinypool chain and updates mock handling for [GHSA-85c8-ppgw-ccpr](https://github.com/advisories/GHSA-85c8-ppgw-ccpr), [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9), and [GHSA-qxg6-89mg-rqv8](https://github.com/advisories/GHSA-qxg6-89mg-rqv8). |

The lockfile includes the transitive build/test packages resolved by these updates. React, application state semantics, core detector rules, fictional fixtures, generated OpenAPI, and recorded engine JSON were not upgraded or regenerated into different results.

## Audit results

- `pnpm audit --prod`: **0 reported vulnerabilities** across the production dependency graph, including the CSS build packages classified as dependencies.
- `pnpm audit`: **1 moderate development-only advisory**, with no high or critical advisories remaining.

The remaining advisory is [minimatch globparts amplification, GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). It reaches `minimatch` 10.2.6 through the TypeScript ESLint tooling. The advisory identifies 11.0.1 as patched, while the installed parent declares a 10.x range. A forced major transitive override was not added. Track the parent tooling's compatible update; this package is not part of the published browser bundle or a deployed analysis endpoint.

## Reproduce

```bash
pnpm install --frozen-lockfile
pnpm audit --prod
pnpm audit
pnpm console:check
pnpm repo:check
```

The full audit currently exits non-zero for the documented moderate advisory. Keep that result visible rather than silently ignoring it. Dependabot continues to propose grouped updates; review changes and run the executable checks before merging. The [verification record](VERIFICATION.md) describes the tests run for this revision.
