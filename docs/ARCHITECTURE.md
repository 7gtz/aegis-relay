# From an observation to a verified response

Aegis Relay keeps security decisions in the Python core. The console presents the core's conclusions; the overview illustrates the concepts. Keeping those responsibilities separate is what lets recorded and live sessions agree.

## Data path

```text
manifest + observations
        │
        ▼
validate and redact → append-only ledger → graph projection
                                               │
                                ┌──────────────┴──────────────┐
                                ▼                             ▼
                         detection rules               policy invariants
                                │                             │
                                └──────────────┬──────────────┘
                                               ▼
                                  constrained response planner
                                               │
                                               ▼
                                  simulated control + verification
                                               │
                                               ▼
                                     reviewable pattern draft
```

`application/` coordinates this sequence. `api/` exposes it through FastAPI. `snapshot.py` drives those same application services to produce the committed recorded responses.

## The declaration and the evidence

The architecture manifest declares nodes, zones, permitted relationships, invariants, and pre-authorised controls. It is authored input, not a baseline inferred from traffic.

The ingest boundary validates observations and strips context keys that could carry payloads or credentials. The ledger preserves reported events. The graph is a rebuildable projection of that evidence, not the evidence store itself.

The projection is a `MultiDiGraph`: action keys let a read, write, or discovery between the same nodes remain distinct. Containment can therefore remove one relationship without silently deleting the others.

## Action direction and data-flow direction

An observed read points from the actor to the resource it reads. The corresponding data flow points from the resource to the actor. Writes and sends retain the direction of the actor's action. Detection uses the data-flow orientation where the security question concerns reachability of data.

This distinction matters in the support case. The route is customer records → Support → shared scratchpad → Reporting → external webhook. Searching only the observed action orientation would miss it.

## Implemented rules

**PS-001** requires the structural conditions for restricted data to reach external egress through undeclared shared state, with a composition across actors. Removing a necessary condition makes the rule go silent.

**PS-002** examines one actor executing content authored by another through undeclared shared state. It is gated on architecture deviation: a declared planner-to-builder review channel does not become a finding simply because it crosses actors.

Rules cite observed evidence and state their uncertainty. They establish topology, not intent or proof that restricted data traversed the route.

## Planning and verification

The planner simulates registered controls against a projected graph. It evaluates path removal and preservation of declared relationships, rejects candidates that fail either requirement, and selects from viable controls according to the existing cost ordering.

Simulation and application use the same control definition. Applying a recommendation appends a simulated control observation. Verification then runs against the resulting graph rather than trusting the planner's earlier prediction.

The pattern registry stores the abstracted structure as a draft. Its lifecycle requires human promotion through shadow and active states.

## Module ownership

| Module | Owns |
| --- | --- |
| `domain` | Typed event, architecture, finding, plan, and pattern vocabulary |
| `ingest` | Validation, redaction, and provenance boundary |
| `ledger` | Append-only observation record and replay cursor |
| `graph` | Observed and data-flow graph projections |
| `detection` | PS-001, PS-002, and weighted factor reporting |
| `policy` | Manifest loading and invariant witnesses |
| `containment` | Candidate simulation, constraint checks, and control semantics |
| `connectors` | Simulated control application |
| `immunity` | Reviewed pattern lifecycle |
| `lab` | Seeded population and scenario generation |
| `application` | Replay orchestration and scenario registry |
| `api` | HTTP transport only |

The domain imports no web, graph, connector, or presentation framework. The console state store holds what the engine said and does not compute a competing security assessment.

## Recorded transport

The console first attempts the configured local service. Its recorded fallback reads generated JSON for each scenario position, control application, and supported lab configuration. Source selection is visible in the header. CI regenerates the OpenAPI document and recorded responses and fails on drift.

The interface redesign changes composition, copy, navigation, and diagram paint. It leaves core source, fixtures, contracts, recorded JSON, state transitions, detector rules, and dependency locks unchanged.
