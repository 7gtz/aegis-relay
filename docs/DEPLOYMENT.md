# Building and serving

The release is a static overview plus the compiled React workspace. The workspace includes recorded engine output, so it can operate without a backend. Start the local core separately when live analysis is required.

## Build

```bash
pnpm install --frozen-lockfile
pnpm build
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
```

Visit <http://127.0.0.1:8080> for the field guide and <http://127.0.0.1:8080/console/> for the workspace. The build script copies `apps/site` to `dist` and the compiled console to `dist/console`.

Relative asset paths support a project subpath. Always serve over HTTP; browser module and fetch rules make opening files directly an unreliable way to run the workspace.

## Optional GitHub Pages

The `Deploy site` workflow is manually triggered. Configure Pages to use GitHub Actions before running it. A private repository may require an account plan that supports Pages; no site is implied by the repository URL.

The configured metadata URLs use `https://7gtz.github.io/aegis-relay/`. Update canonical, social-preview, and package homepage metadata if you choose another host.

## Live engine connection

Set `VITE_AEGIS_RELAY_API_BASE` before building if the workspace should use a different API address. Configure the service's allowed origins explicitly. A failed local-service connection causes the existing recorded fallback; the source badge makes this visible.

This repository demonstrates simulated adapters and fictional environments. It does not include a production control integration or an authentication system for a remotely exposed analysis service.
