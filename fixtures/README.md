# Declared environments and replay evidence

These inputs are synthetic and deterministic. They contain no production logs, working credentials, or live test endpoints.

| File | Role |
| --- | --- |
| `manifests/default.yaml` | Support/reporting architecture, permitted relationships, invariants, and registered controls |
| `manifests/delivery.yaml` | Independent software-delivery architecture with different actors and resources |
| `scenarios/p0_scenario.jsonl` | Twelve observations that can form the PS-001 restricted-data route |
| `scenarios/p1_scenario.jsonl` | Twelve observations that can form the PS-002 cross-actor execution channel |

A manifest is an authored declaration of intended structure. It is not learned from traffic. Each JSON Lines observation crosses the same validation and redaction boundary used by the replay service. Duplicate event identifiers or sequence numbers are rejected.

Changing these files changes the evidence or the declared design. Regenerate the recorded responses after an intentional edit and inspect the resulting findings and planner choices. See [Development](../docs/DEVELOPMENT.md).
