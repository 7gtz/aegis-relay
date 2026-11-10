# Changelog

## v0.1.0-demo.1 — 10 November 2026

A reviewable demo snapshot with a public recorded workspace and a pull-ready Devpost kit. This is a prerelease, not a production enforcement release.

### Fixed

- Restarting or scrubbing a recorded replay clears its applied control and review state, matching the live reset-and-replay workflow.
- Pattern promotions render immediately, and a restarted run creates a fresh draft instead of reusing a promoted cached record.
- Unknown recorded plan IDs fail without returning a fabricated verified result.
- Setup examples use the actual API and CORS variable names, the correct `/api/v1` route prefix, and explicit service `.env` loading.
- Pattern-review copy describes review state without implying automatic matching or enforcement.

### Added

- Read-only evidence endpoint for auditing the replayed ledger events cited by
  current findings, with optional finding scoping and OpenAPI coverage.
- Seven transport regression tests, two browser journeys, and two isolated static-site assembly tests: 244 tests in total.
- Repository checks for local Markdown links and JSON syntax; CI builds the complete static site.
- Devpost thumbnail, widescreen cover, social card, transparent mark, editable artwork, and a repeatable export command.
- Draft project story, built-with tags, gallery captions, alt text, and a two-minute demo walkthrough.
- A dependency review with reproduced audit results and an explicit remaining development-tool advisory.

### Updated

- Vite to 7.3.7 and Vitest to 4.1.12, with `source-map-js` 1.2.2 selected throughout the CSS build chain.
- Documentation navigation, submission links, environment examples, and verification evidence.

Core detector and planner code, API contracts, fictional fixtures, and generated engine recordings remain unchanged. See [Verification](docs/VERIFICATION.md), [Dependency review](docs/DEPENDENCIES.md), and [Submission kit](docs/submission/README.md).
