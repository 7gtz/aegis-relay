# Development

Use Node 22.16.x, pnpm 11.19.x, Python 3.12, and uv. Start with [Getting started](GETTING_STARTED.md) to launch the project.

## Keep the decision boundary explicit

Presentation changes belong in `apps/console` or `apps/site`. Detection, planning, invariant, and verification semantics belong in `services/core`. The console must render a failed result as failed and may not invent a safe state, rescore a finding, or reorder the planner's recommendation.

The field guide's conceptual interactions are separate from engine results. Preserve that distinction in copy and screenshots. New fixtures must remain fictional and deterministic.

## Useful commands

From the root:

```bash
pnpm console:dev
pnpm repo:check
pnpm console:check
pnpm console:test
pnpm console:e2e
pnpm build
```

From `services/core`:

```bash
uv run ruff format --check src tests
uv run ruff check src tests
uv run mypy
uv run pytest -q
uv run python -m aegis_relay_core.contract
uv run python -m aegis_relay_core.snapshot
```

From `apps/console`, `pnpm test:watch` runs the component/layout tests during development. Browser journeys target the built console. Avoid simultaneous browser workers against one live scenario because that replay state is shared.

## Frontend organization

`src/app/App.tsx` composes the case desk, replay dock, and four anchored workflow sections. Feature components stay mounted as you navigate; anchor links do not clear a case, lab result, or review action.

`src/shared/state/store.ts` owns the existing console state and actions. `src/shared/api/client.ts` selects live or recorded transport. `src/shared/ui/primitives.tsx` supplies shared presentation surfaces and controls.

The overview's layout and typography live in `apps/site/design.css`. Its existing simulation bindings remain in `index.html`. New vector assets are in `apps/site/assets` and `docs/brand`.

## Before a change is ready

Run the checks relevant to the edited layer. A security-semantic change needs a meaningful test of its guarantee. A presentation change needs the existing browser journeys and a visual check at desktop and narrow widths. Regenerate contract and recorded output when their inputs change, then inspect any diff rather than accepting it blindly.

## Development tooling

AI tools assisted the original research, architecture, design, coding, and debugging: Gemini, Claude, ChatGPT, Antigravity, and coding assistants. Codex assisted this identity and interface revision. Review and executable checks remain part of the development process.

There is no model call in the analysis runtime. The implemented rules and planner run as deterministic Python without model-provider credentials.


## Submission assets

The [Devpost kit](submission/README.md) contains PNG exports, editable artwork, gallery captions, and draft submission copy. Regenerate the four brand images with `pnpm submission:assets` after installing Chromium through Playwright. Use genuine workspace captures for the gallery; the artwork itself is explicitly conceptual.

`pnpm repo:check` validates tracked Markdown targets and JSON syntax, then exercises static-site assembly in temporary fixtures. CI runs it and builds the full root site, so a passing console build alone cannot hide a broken field-guide assembly.
