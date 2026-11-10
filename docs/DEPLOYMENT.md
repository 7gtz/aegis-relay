# Build and publish the demonstration

The release contains a static field guide and a compiled investigation workspace. Recorded engine output is bundled, so the demonstration works without a Python service. The source repository can remain private while the static demo is public.

## Current demonstration

- [Field guide](https://aegis-relay-six.vercel.app/)
- [Investigation workspace](https://aegis-relay-six.vercel.app/console/)
- [Vercel project](https://vercel.com/7gtzs-projects/aegis-relay)

The demo was deployed from checked source files through the Vercel API. GitHub is not linked for automatic deployments because the Vercel Git integration does not yet have access to this private repository. A push alone will not update the demo. Redeploy the checked source through Vercel, or connect the repository in the project's Git settings to enable automatic deployments.

## Build locally

```bash
pnpm install --frozen-lockfile
pnpm build
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Open <http://127.0.0.1:8080/> for the field guide and <http://127.0.0.1:8080/console/> for the workspace. `scripts/build-site.mjs` copies `apps/site` into `dist` and the compiled console into `dist/console`.

Relative assets support a project subpath. Serve over HTTP: opening the HTML as a file interferes with module and fetch rules.

## Vercel

Import `7gtz/aegis-relay` as a project from the repository root. Use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Repository root |
| Node.js | 22.x |
| Install command | `corepack enable && corepack pnpm install --frozen-lockfile` |
| Build command | `corepack pnpm run build` |
| Output directory | `dist` |

The committed [`vercel.json`](../vercel.json) supplies the install, build, and output settings. Corepack reads `packageManager` from `package.json`, selecting the pinned pnpm release. Set `ENABLE_EXPERIMENTAL_COREPACK=1` in the Vercel project environment when enabling Vercel's Corepack support. Do not add backend credentials for the recorded demonstration.

A production deployment serves the field guide at `/` and console at `/console/`. No catch-all rewrite is needed: this console uses anchored sections rather than client-side path routes. Preview deployment access follows the project's Vercel protection settings; verify the production link in a signed-out browser before sharing it as a demo.

After deployment, check both pages, local fonts and artwork, and the workspace source badge. Run a case to the end, apply its recommended simulated control, and confirm both verification outcomes. Run one supported lab experiment. A successful HTML response alone does not establish that the recorded assets loaded.

## Optional GitHub Pages

The `Deploy site` workflow is manually triggered. Configure Pages to use GitHub Actions before running it. Private-repository Pages availability depends on the account plan. The same `dist` artifact is suitable for static hosting elsewhere.

When changing hosts, update canonical and social-preview URLs in `apps/site/index.html` and `apps/console/index.html`, plus package homepage metadata. These URLs describe the deployment; they do not select the API transport.

## Connecting a live service

`VITE_AEGIS_RELAY_API_BASE` is read at build time. Set it before building if the workspace should reach a separately hosted API. Configure `AEGIS_RELAY_CORS_ORIGINS` on that service to permit the exact frontend origin. A failed connection selects the existing recorded fallback, identified by the source badge.

This Vercel configuration publishes static assets only. It does not host the Python engine, persist cases, or provide authentication for a remotely exposed analysis service. The demonstrated adapters and environments remain simulated and fictional.
