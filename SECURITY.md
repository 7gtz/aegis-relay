# Scope and trust boundaries

Aegis Relay is a defensive demonstration over fictional environments. Its controls are simulated. No actor, endpoint, or store named in the fixtures is contacted.

## Supported conclusions

The two implemented rules report structural capabilities and deviations from an authored architecture. A finding cites reported observations. It does not establish intent, inspect payloads, prove data movement, or classify an agent as malicious. A zero-finding state is not a claim that an environment has no other risks.

Response planning is constrained to registered capabilities. Applying one must preserve the distinction between predicted and verified results. Reviewable patterns begin as drafts and require explicit promotion.

## Material that belongs in this repository

Use synthetic actors, events, destinations, and credentials. Keep ingest validation and redaction intact. Preserve source labels that distinguish conceptual illustrations, recorded sessions, and a running local engine.

Do not commit production traces, personal or customer data, working secrets, unauthorised test targets, or adapters that act on real systems outside an explicitly established testing boundary. `.env` files, evidence databases, and local runtime state remain untracked.

## Reporting a concern

For a concern that does not contain sensitive details, open an issue describing the affected component, reproducible steps using fictional data, and the expected boundary. Do not put credentials or private telemetry in an issue or a reproduction archive.

For implementation context, see [Architecture](docs/ARCHITECTURE.md). For contributor responsibilities, see [Contributing](CONTRIBUTING.md).
