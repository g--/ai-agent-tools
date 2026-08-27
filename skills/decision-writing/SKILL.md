---
name: decision-writing
description: Write or revise a decision record, decision memo, or recommendation when documenting the contemporaneous world state, inputs, options, decision, and rationale for present participants and future readers.
---

# Decision Writing

A decision record is a durable **snapshot**: it lets the people making and supporting a decision act now, and lets future readers understand why that decision was reasonable with the information available at the time. Apply the reader-path and earned-brevity discipline to preserve the decision context that later outcomes, institutional memory, and implementation artifacts cannot recover.

The decisive boundary is **world state**: the facts, constraints, uncertainty, and triggering conditions that existed before a choice. Write it so it neither assumes the selected decision nor smuggles in an option's framing. Options and their evaluation come after that independent baseline.

## Establish the record

1. Identify the decision owner, participants, intended decision, audience, effective date or decision horizon, and the action the record must support. Choose the repository's decision-record template or local convention when available.
2. Gather and label the contemporaneous inputs:
   - observed facts and their sources;
   - constraints, requirements, commitments, and deadlines;
   - assumptions, estimates, unknowns, and disputed facts;
   - stakeholders and affected parties;
   - prior decisions and external references that materially constrain the choice.
3. Set the **decision boundary** before describing any option. Ask: “What could a reader know about the world without knowing which choices were proposed or preferred?” Place only that answer in the world-state section. Move proposals, arguments, evaluations, and forecasts conditional on a choice into later sections.

**Done when:** a reader can identify the decision to make and reconstruct the information available at that time without learning which option the authors favored.

## Build the decision path

Use the smallest structure that supports an accountable choice. A complete record normally proceeds in this order:

1. **Decision** — the decision, owner, status, and effective date; use `Proposed`, `Accepted`, `Superseded`, or the repository's status vocabulary.
2. **World state** — the decision-independent snapshot: facts, constraints, uncertainty, and stakes before options were evaluated.
3. **Decision criteria** — the outcomes, principles, thresholds, or trade-offs by which options will be assessed. State weights or non-negotiable constraints when they materially determine the result.
4. **Options considered** — each viable option, including maintaining the status quo where relevant. Describe what it would do before judging it.
5. **Evaluation** — how each option meets or misses the stated criteria, including material benefits, costs, risks, reversibility, and dependencies.
6. **Decision and rationale** — the selected option and the reasoning that connects the evaluation to it; explain the decisive trade-offs and rejected alternatives.
7. **Consequences and follow-through** — expected effects, owners, implementation or communication actions, validation signals, review date or trigger, and conditions that would reopen the decision.
8. **References** — links, evidence, meeting notes, tickets, and attributions that support the record without replacing its explanation.

Omit sections that carry no material content only when the local template permits it. Keep the world-state section separate even in a short record; it is the control that makes later reasoning auditable.

**Done when:** each conclusion can be traced to a stated criterion and evaluated input, while the world state remains intelligible on its own.

## Draft with epistemic boundaries

Lead with the decision and status so current participants can act. Then preserve the world state in neutral, time-bounded language: “As of <date>, …”; “The service handles …”; “The forecast is …”. Attribute sources and confidence where readers need to assess reliability.

Use distinct labels for facts, assumptions, estimates, preferences, forecasts, and decisions. Do not recast a forecast as an observed fact or a chosen goal as an external constraint. Include disagreement when it materially affects confidence, risk, or the available options.

Describe options symmetrically. Give each viable option its mechanism, scope, and material consequences; do not make the preferred option concrete while leaving alternatives as labels. State why an option was rejected only after applying the criteria. A table may compare truly parallel options against the same compact criteria; use prose for causal reasoning, caveats, and trade-offs.

Refer to code, architecture, vendors, functions, or other implementation details only when they are decision inputs or consequences a future reader cannot otherwise recover. The record explains the choice, not a line-by-line implementation history.

**Done when:** readers can distinguish what was known, believed, valued, considered, chosen, and still uncertain at every point in the record.

## Verify and deliver

Read the world-state section alone. Remove words that reveal or imply the eventual decision, preferred option, or evaluative conclusion. Then read the criteria, options, evaluation, and rationale in order: every decisive claim must have a source, an explicit assumption, or a visible judgment.

Check that the decision is actionable now: name owners, effective timing, required follow-through, and a review trigger when the decision is reversible, uncertain, or likely to age. Check that a future reader could distinguish the contemporaneous record from later knowledge; never rewrite the snapshot with hindsight.

Return the finished decision document. Briefly flag only missing facts, unresolved ownership, or uncertainty that prevents an accountable decision.
