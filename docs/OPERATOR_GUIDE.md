# Working a case

The workspace follows a single review loop: replay the observations, inspect the composition, compare registered responses, and verify the outcome. The four navigation links move to sections on the same page; they do not reset or replace your replay.

## Choose the case and source

The case desk offers a support/reporting environment and a software-delivery environment. Selecting one loads its declared architecture and returns its replay to the beginning. The source badge distinguishes **live engine** from **recorded session**.

The event, finding, and control counts are direct summaries of engine state. Zero findings at a replay position means neither implemented rule has reported a finding there; it is not a general safety assessment.

## Move through the observations

- **Play** advances through the events; **Pause** stops that progression.
- **Step** advances one observation.
- **Run to end** jumps to the final observation.
- The **Replay position** slider selects a specific position.
- **Restart** returns the selected case to its baseline.

In the support case, position 11 includes an undeclared scratchpad but no completed route. Position 12 includes the read that connects the route. Comparing those positions helps distinguish a deviation from a composed capability.

## 01 / Investigate

The map places trust zones from the interior at the top to external destinations at the bottom. Agent, resource, and destination shapes distinguish node types. Colour is reinforced by labels and line styles: declared relationships, undeclared relationships, and the reported incident path remain distinguishable without relying on colour alone.

The adjacent finding includes the rule, severity, explanation, policy basis, evidence references, composed path, weighted factors, and uncertainty. These fields come from the engine. Aegis Relay observes reported interactions rather than inspecting payloads or attributing intent.

## 02 / Compare responses

Every registered candidate stays visible, including rejected options. Compare its cost, whether it removes the unsafe paths, and whether it preserves declared work. A candidate that breaks declared relationships is rejected even if it also removes the path.

Choose **Apply recommended control** when the planner exposes a viable recommendation. The simulated adapter appends a control event and the engine runs verification. Read both outcomes: **Composed path removed** and **Declared work preserved**. A failed check must remain a failed check.

Containment is action-scoped. Blocking a write between two nodes does not erase a separate discovery observation between those same nodes.

## 03 / Review the record

The observation ledger provides the events cited by the finding. Declared architecture has three views: **Permitted**, **Invariants**, and **Controls**. Use them to understand what the designer allowed and which response mechanisms were registered.

An abstracted pattern recorded after containment begins as a **draft**. Promotion proceeds to **shadow**, then **active**, through explicit operator actions. The pattern is a hypothesis for review, not a universal learned rule.

## 04 / Run an experiment

Swarm Lab generates a manifest and observations from the chosen conditions, then runs the same detectors and planner used by the replay. Population, shared memory, external access, and perturbation affect the experiment; the recorded source supports the committed configuration grid. Held axes are visibly disabled and explained.

A negative result is useful: read the explanation of which structural condition did not form. Repeating a configuration produces the same result because the simulator is seeded from that configuration.

## Reading the field guide

The overview contains interactive network diagrams, illustrative incident streams, a conceptual lab, and response previews. Those are teaching aids. They remain separate from the workspace's generated engine output and are labelled as conceptual simulations.
