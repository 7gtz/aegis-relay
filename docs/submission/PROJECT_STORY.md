# Aegis Relay

## Project tagline

Trace agent handoffs, find unintended capabilities, and verify a response that preserves the work.

## Inspiration

Agent permissions describe what each actor may do. A system can still gain a capability through the way those actors interact. A support agent reading customer records, an undeclared scratchpad, and a reporting agent sending outward can form a route that no individual permission check explains.

Aegis Relay explores that gap between individual grants and system behavior. The goal is to make the route inspectable, identify a constrained response, and show what survives after the response is applied.

## What it does

The investigation workspace replays reported observations against a declared architecture. It reconstructs the interaction graph and applies two implemented structural rules:

- **PS-001:** restricted data can reach external egress through unregistered shared state.
- **PS-002:** one actor executes content authored by another through an undeclared shared-state channel.

A finding includes its path, policy basis, evidence references, weighted factors, and uncertainty. The response planner compares all registered controls, retaining rejected candidates and their reasons. A recommendation must clear the relevant detector while preserving observed declared relationships.

An operator can apply the recommended simulated control. The engine checks the resulting graph again and reports whether the composed path was removed and declared work was preserved. Successful containment produces a draft pattern with an explicit review lifecycle.

Swarm Lab generates fictional populations and runs the same detectors and planner over them. Changing shared memory, external access, or the perturbation can reveal when a composition forms and when its prerequisites disappear.

## How it works

The Python core validates and redacts observation context, records events in an append-only ledger, and projects a NetworkX multigraph. Relationships are action-scoped, so blocking a write does not silently remove a different action between the same nodes.

FastAPI exposes the application services. React and TypeScript render those conclusions in a workspace organized around investigation, response comparison, evidence review, and experiments. The console does not invent findings or calculate a competing risk assessment.

A snapshot generator runs the same engine to produce committed recordings. The public Vercel demo uses these recordings, including two cases and 180 supported lab configurations. CI regenerates recordings and the OpenAPI contract and fails on drift. A local Python service enables live analysis and the full lab parameter range.

## Engineering challenges

**Direction matters.** A read action points from actor to resource, but potential data flow points from resource to actor. Treating those as the same graph traversal can hide the route the detector is meant to explain.

**A broken path is only half an answer.** Stopping all activity can remove a finding while destroying the intended workflow. The planner evaluates path removal and preservation as separate constraints, and the interface shows why some controls are rejected.

**A static demo must remain faithful.** Recorded output has to behave like a replay, including restarts and reviewed-pattern state. Regression tests cover clearing containment on a seek, creating fresh draft patterns after restart, rejecting unknown plan IDs, and preserving legal review transitions.

## What makes the project useful

Aegis Relay connects a reported structural risk to the evidence and candidate responses an operator can review. The demonstration includes negative results, rejected controls, and bounded verification rather than presenting every experiment as a successful detection.

Its recorded mode makes that review loop accessible to judges without cloud credentials or a local Python setup. Its live mode exposes the engine and API for deeper inspection.

## Engineering takeaways

Security conclusions need traceable evidence and explicit limits. A path demonstrates structural capability, not payload movement or malicious intent. Reproducible analysis also needs reproducible session behavior: a restart must rebuild the state rather than retain a previous control or promotion.

## Next steps

Future work could add evaluated detector coverage, authenticated observation ingestion, durable case storage, additional framework connectors, and real enforcement adapters. Those would require separate design and validation. This prototype currently uses fictional inputs, two implemented rules, in-memory sessions, and simulated controls; reviewed patterns do not enforce themselves.

## Built with

Python · TypeScript · React · FastAPI · NetworkX · Pydantic · Vite · Tailwind CSS · Zustand · pnpm · uv · Vitest · Playwright · GitHub Actions · Vercel

No model-provider API or model inference is used in the analysis runtime. Development-tool assistance is disclosed in [Development](../DEVELOPMENT.md#development-tooling).

## Try it

- [Open the field guide](https://aegis-relay-six.vercel.app/)
- [Launch the investigation workspace](https://aegis-relay-six.vercel.app/console/)
- [Read the technical README](../../README.md)
- [Inspect verification and limitations](../VERIFICATION.md)
