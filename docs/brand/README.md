# The Aegis Relay visual system

The identity is built around a handoff: two endpoints, a route between them, and a gate that can interrupt it. The mark uses an open relay frame rather than a shield. The field guide uses diagram plates and warm paper; the workspace uses dark forest surfaces to separate operational evidence from introductory material.

## Voice

**Follow the handoff. Find the risk.** introduces the product. **Understand the system. Preserve the work.** describes the operating principle. Use direct verbs and describe observable results. Avoid claims of intent detection, autonomous enforcement, or complete threat coverage.

## Assets

| Asset | Use |
| --- | --- |
| `emblem.svg` | Relay-frame mark, favicon, and workspace identity |
| `wordmark.svg` | Brand lockup on a light surface |
| `handoff-atlas.svg` | Original conceptual network plate |
| `../assets/overview-banner.svg` | Repository introduction |
| `../assets/replay.svg` | Three-stage process illustration |
| `../../apps/console/public/social-card.html` | Source for the 1280 × 640 share image |
| `../../apps/console/public/showcase-card.html` | Source for the 1200 × 800 showcase image |
| `../assets/gallery/build-cards.html` | Screenshot gallery source |

The site owns a copy of the handoff atlas under `apps/site/assets`. The new vector artwork is editable source. Screenshots are captures of the running workspace and field guide, not painted mock data.

## Palette and type

Paper `#f7f6f2`, forest ink `#183d32`, leaf `#276749`, and warm detail `#ad681e` define the field guide. The workspace uses ground `#111e19`, surface `#17271f`, and pale-leaf accent `#b8d8a8`. Amber and red retain their warning and risk meanings. Labels, shapes, and line patterns support those colours.

The field guide pairs DM Serif Display with DM Sans. The workspace uses DM Sans and IBM Plex Mono. Latin font files and their SIL Open Font Licenses are bundled with the site and workspace. System fallbacks cover scripts beyond those subsets.

## Runtime names

Repository `aegis-relay`; JavaScript scope `@aegis-relay`; Python distribution `aegis-relay-core`; Python module `aegis_relay_core`; environment prefix `AEGIS_RELAY_`; console base-URL setting `VITE_AEGIS_RELAY_API_BASE`.

Required original copyright attribution stays in `LICENSE`; it is not part of the product identity.

Submission-ready PNG artwork, captions, a project story, and a video walkthrough live in the [Devpost submission kit](../submission/README.md). Export its editable HTML and SVG sources with `pnpm submission:assets`.
