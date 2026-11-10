# Contributing

Start with a small, reviewable change and the guide for its layer. [Getting started](docs/GETTING_STARTED.md) covers setup; [Development](docs/DEVELOPMENT.md) lists the working commands.

## Choose the boundary

- Interface and copy changes belong in the console or field guide. Keep engine results, source labels, uncertainty, and rejected controls legible.
- Security-semantic changes belong in the core. Back each new guarantee with a test that would fail if the guarantee stopped holding.
- Contract or fixture changes require regenerating the OpenAPI document and recorded responses and reviewing the resulting diff.

The console does not duplicate policy or risk logic. The domain does not import web, graph, connector, or UI frameworks. See [Architecture](docs/ARCHITECTURE.md) for ownership.

## Prepare a contribution

Use deterministic fictional data. Keep local credentials and runtime state out of Git. Explain why an added dependency is needed and how it affects local or offline operation.

Run the relevant quality gates in [Verification](docs/VERIFICATION.md). Check desktop and narrow layouts when changing the presentation, and keep keyboard focus visible. A changed label may require updating a browser assertion; preserve the behavioral assertion rather than weakening it.

In your change description, state the trigger, resulting behavior, relevant validation, and any limitations. Screenshots should show the running product and accurately identify simulated or recorded content.
