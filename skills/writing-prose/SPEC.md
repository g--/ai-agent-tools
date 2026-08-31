# Writing Prose Specification

This specification defines the observable behavior expected from `SKILL.md`. It is the source for cases, review criteria, and future skill changes. A change to the skill is acceptable only when it preserves these requirements or deliberately changes this specification and its tests.

## Scope

`writing-prose` writes, revises, or critiques prose for human readers. It is the parent discipline for specialized writing skills, but it does not replace their artifact-specific requirements. A focused skill supplies its document's fixed constraints; this specification governs how purpose, audience, medium, context, evidence, detail, and form are made useful to readers.

## Required behavior

### Construct the document for its use

Before drafting, determine or safely infer the document's purpose, audience, medium, context of consumption, reader task, required facts, missing facts, and information budget. Ask a focused question only when an unknown materially changes the purpose, audience fit, claim, recommendation, action, safety, or correctness. Otherwise, produce a useful draft with assumptions or placeholders visibly marked.

A document must give its intended reader the information and framing needed to understand, decide, feel, or do what the document is for in the context where they will encounter it. The appropriate order, detail, vocabulary, tone, syntax, and form follow from that use. They are not selected from a fixed universal style.

### Preserve a reader path

Order material by what the reader needs at each point, rather than by discovery order. A document may lead with its conclusion when readers need rapid orientation or may stop early. It may begin with context, evidence, experience, uncertainty, or narrative when that is necessary for readers to understand what follows responsibly.

The document must be understandable without requiring readers to retrieve material from a ticket, identifier, link, or other external source. Links and citations provide verification, navigation, or optional depth; they do not carry essential explanation.

### Use an earned information budget

Use no more information than the reader needs to rely on the document, but retain context, uncertainty, qualification, constraints, and evidence when their absence would force an unreliable, unsafe, or costly inference. Exclude implementation trivia, organizational background, repeated material, and related facts that do not change the reader's understanding, decision, action, or ability to trust the document.

### Make claims responsibly

Distinguish observed facts, sources, assumptions, estimates, hypotheses, preferences, plans, and decisions whenever the distinction changes how a reader should assess or act on the document. Do not state an unprovided fact, completed check, root cause, owner, date, link, command, or outcome as though it were established. Preserve uncertainty when it is warranted.

Use qualification when it expresses useful scope, uncertainty, evidence, responsibility, or stance. Remove qualification only when it blurs rather than helps the reader judge or act.

### Make prose perform the work

State the needed context, action, explanation, reassurance, or argument directly. Do not narrate the document's compliance with its brief—for example, “this document is for …” or “this section explains …”—when the document can simply perform that function. Meta-language is appropriate only when readers genuinely need navigation instructions.

Choose syntax, pacing, specificity, paragraphing, voice, technical vocabulary, and directness for the reader's next need. Make actors, actions, conditions, and distinctions explicit where ambiguity would interfere with understanding or action. Retain indirectness, technical language, complexity, or delayed revelation where those better serve the document's purpose.

### Format only where form adds meaning

Prose carries explanation, reasoning, narrative, qualification, trade-offs, and connected argument. Use headings for real sections. Use bold, italics, callouts, block quotes, lists, and tables only when their form communicates a distinction or supports a reading task that ordinary prose cannot.

A list is for short, discrete, reader-facing items that benefit from scanning, such as steps, requirements, choices, or compact facts. If an item needs explanatory prose, write it as prose rather than placing a paragraph in a list item.

A table is for compact structured data, lookup, or mathematical relationships. Its cells normally contain values, labels, or very short phrases. Do not put explanations, rationale, option descriptions, trade-offs, or multi-sentence text in a table.

## Decision model for derived skills

A focused writing skill should pass or establish these inputs before applying this specification:

```text
purpose + audience + medium + context of consumption
+ reader task + reading conditions + consequence of misunderstanding
+ artifact-specific constraints
→ reader path, information budget, wording, structure, and form
```

This model supplies the meaning of “clear” for that document. It does not require a separate abstract clarity section in a finished artifact.

## Negative-behavior scenarios

Each scenario is an observable test oracle: a draft demonstrating the left column fails unless the correction is satisfied.

| Failure | Correction |
| --- | --- |
| Treats clarity as short, direct, simple, conclusion-first writing for every genre. | Derives order, detail, tone, language, and form from the document's purpose, audience, medium, and context. |
| Always leads with the conclusion. | Leads with a conclusion only when rapid orientation serves the reader; otherwise begins where responsible understanding requires. |
| Announces “this document is for …” or “this section explains …” instead of supplying the needed content. | Orients, explains, or directs directly; uses meta-language only for genuine navigation. |
| Makes a ticket, identifier, or external link stand in for the document's purpose or required context. | States the needed context in the document and uses the reference for traceability or durable depth. |
| Treats every unknown as a drafting blocker. | Asks only focused, material questions; otherwise labels assumptions, estimates, or placeholders. |
| Hides uncertainty, presents a hypothesis as fact, or turns a plan into a completed action. | Labels source, confidence, status, scope, and follow-up when they change assessment or action. |
| Removes qualifications merely because they make prose less direct. | Retains qualifications that communicate warranted uncertainty, scope, evidence, responsibility, or stance. |
| Uses fixed sentence-level maxims regardless of genre, audience, or stakes. | Shapes syntax, pacing, specificity, voice, and paragraphing around the reader's next need. |
| Gives readers implementation trivia, unrelated history, or organizational detail that does not support the document's purpose. | Retains only information that changes understanding, decision, action, or trust. |
| Omits a material boundary, non-goal, exception, or deferred work item. | States it beside the scope or claim it qualifies. |
| Uses a text-heavy list to make connected reasoning look scannable. | Uses prose for reasoning and lists only for short, discrete items. |
| Uses tables containing paragraphs, option explanations, or rationale. | Uses compact tables only for structured values/labels; moves explanation and trade-offs into prose. |
| Uses bold, italics, callouts, headings, or block quotes as generic emphasis. | Lets prose carry emphasis and uses formatting only for real semantic or navigation distinctions. |
| Repeats a point in summaries, headings, bullets, and paragraphs without a distinct reader need. | Gives each passage a distinct function; repeats only when non-linear reading makes repetition necessary. |
| Uses an inaccessible source, a bare URL, or copied source language as a substitute for adapted explanation. | Supplies the relevant meaning in audience-appropriate language and links durable sources for verification/depth. |
| Assumes one audience when the artifact has primary and secondary readers. | Writes the main path for the primary reader and supplies only the context, definitions, examples, or links secondary readers need. |
| Redacts or abstracts so much that the reader cannot act. | Uses safe identifiers or approved access paths while retaining action-critical information. |
| Gives instructions without an observable result, condition, or next branch. | States expected outcomes, thresholds, or decisions whenever the reader needs them to proceed safely. |

## Artifact examples

The following examples clarify how the common requirements are specialized. They are not universal templates.

- A commit message preserves a behavior change and decision context the code/diff cannot preserve; it does not narrate files or line edits.
- A pull-request description lets a reviewer understand outcome, scope, review route, validation, risk, and dependencies without reconstructing the diff or opening a ticket.
- A decision record separates decision-independent world state from criteria, options, evaluation, and rationale; it does not let the selected option bias the world-state snapshot.
- A bullet-journal entry captures one retrievable observation, decision, action, event, or question; it does not turn rapid logging into miniature documentation.
- An incident update lets affected customers understand impact, safe action, known facts, uncertainty, and next communication; it does not publish internal diagnostics or an unconfirmed root cause.
- A response playbook gives an on-call engineer the immediate safe action and verification inline, then direct links to deeper diagnosis and escalation material; it does not make them interpret vague instructions under pressure.

## Test design

Test cases must contain enough relevant source material to support a good draft and enough related-but-nonessential material to test the information budget. Do not label distractor material as irrelevant; mix it naturally into realistic source notes, incident excerpts, project context, implementation history, or stakeholder input.

Each case should state the artifact, intended audience, task, source material, and observable completion criteria. Test both omission and inclusion failures: a draft can fail by omitting necessary context or by carrying information that does not serve the reader's use.
