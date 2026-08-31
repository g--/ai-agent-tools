---
name: writing-prose
description: Write, revise, or critique prose for human consumption.
---

# Writing Prose

Apply this skill to any written artifact intended for human consumption. Key information must be provided for this to be effective, especially: audience, purpose, medium, and context of consumption. Ask focused questions to fill in missing information, especially around the document’s purpose, audience fit, claim, recommendation, or required action. Otherwise, draft using clearly labelled assumptions or placeholders.

Write for the reader's path: give this reader what they need, in the order and form they need it, to do what the document is for. Derive the document's order, detail, language, tone, and form from its purpose, audience, medium, and context rather than applying a fixed style.

Practice brevity: prefer the shortest form that preserves the reader's ability to understand and act. Remove words, sentences, sections, and links that do not earn their place; retain context, uncertainty, and qualification when their absence would force the reader to make an unreliable inference.

## Process

### Establish the brief

Identify:

* purpose
* audience: who they are, what they need
* medium: e.g., commit message, pull request description, decision document, email, or documentation
* context: e.g., where and how the reader will encounter the prose
* style: should be appropriate to the medium
* tone: should be appropriate to the medium
* structure: is there a required/expected/conventional structure?
* document purpose: the one or two core ideas the reader must understand from reading this
* required information to achieve purpose
* information likely already known by the majority of the audience
* information not yet available to us
* reader task: what the reader must understand, decide, feel, or do
* reading conditions: whether they are scanning, investigating, learning, comparing alternatives, acting under time pressure, or returning later
* consequence of misunderstanding: what could go wrong if a reader misses a condition, lacks context, or draws an unsafe inference
* information budget: the minimum detail needed for this reader to understand, decide, act, or safely rely on the document in this context
* references supporting key information

Note the reader should not have to be familiar with or remember details from outside resources in order to understand this content: bring in just the necessary information into this document and cite it. For example instead of "the goal of TICKET-123" bring in the details about it that matter: the ticket itself can be citation, but not the content.

Some of the audience may not be familiar with terms or concepts that are key to understanding the document; to keep the content accessible, identify them ahead of time and prepare references or footnotes they can consult.

Verify factual claims. Fill in missing details through research or asking. If there are still gaps, use placeholders or best guesses marking them clearly for follow up with double square brackets [[like this]].

External references that make it to the final should be expected to last longer than the document itself.

   **Done when:** you can state who this reader is and what they will need to understand in order for the writing to achieve its purpose


### Build the reader path

Construct an outline. The organization should be based on the reader's needs, not the order in which information was discovered. Sections should help the reader to navigate the document with minimal effort.

Build the reader's knowledge incrementally and avoid jumping between topics. Plan out when to introduce concepts, terms and abbreviations.

Choose a structure that fits the medium, material and brief. Use the smallest structure that fits: a single sentence may be sufficient.

Possible elements, which can be included and ordered to suit the brief:

* a title or opening signal;
* orientation for readers deciding whether to continue;
* necessary background;
* the central content, evidence, or reasoning;
* a conclusion, action, or next step;
* references or further reading.

Other considerations:

* Lead with the conclusion when immediate orientation helps; begin with context, evidence, experience, or uncertainty when that is necessary for the conclusion to be understood responsibly.
* Put important information up top if some readers are unlikely to need more than that.
* Is there enough material to carry each section? If not, would they be better served with fewer?

Revisit the brief if necessary, for example when new information is missing, the purpose is unclear, or a discovery calls its assumptions into question.

**Done when:** each section prepares the reader for the next one without relying on unstated knowledge.

### Draft

Use the outline to create a first draft, keeping in mind the key parts of the brief.

#### Prose

Shape syntax, pacing, specificity, paragraphing, and voice around the reader’s next need and the document’s function. Make actors, actions, conditions, and distinctions explicit where ambiguity would interfere with understanding or action. Preserve complexity, qualification, indirectness, or technical language where they are accurate and useful. Use active voice when it identifies the actor or makes the action easier to follow.

Write the content that orients, informs, reassures, or directs the reader; do not narrate the document's structure or announce that it is fulfilling its brief. Let an opening demonstrate relevance through its subject, scope, and stakes rather than saying “this document is for …” or “this section explains …”. When the brief calls for a section to provide context, state the context; when it calls for an action, state the action. Use meta-language only when the document itself genuinely needs it, such as instructions about navigating a long reference.

Introduce a concept or acronym where it first becomes useful instead of requiring a separate glossary. When durable external material helps some readers understand a key concept, link it at its first useful mention without disrupting the main path for other readers.

Treat qualification as a rhetorical choice. Use it to express warranted uncertainty, scope, evidence, responsibility, or stance; remove it when it only blurs a claim without helping the reader judge or act on it.

The output should fit the medium: if an outline restricts the ability to write prose that flows and fits with the medium, re-evaluate. (Eg. if the outline is suggesting 6 paragraphs but each paragraph only needs a sentence, then combining them would likely help them flow better.)

#### Formatting

Let prose carry explanation and emphasis. Use headings to mark real sections, not to decorate or fragment a short document. Avoid bold, italics, callouts, and block quotes unless formatting communicates a distinction that ordinary prose cannot; do not use them merely to add emphasis or make text look scannable.

Prefer prose for explanation, reasoning, narrative, qualifications, trade-offs, and connected argument. Use a list only for a reader-facing set of short, discrete items that benefits from scanning, such as steps, requirements, choices, or compact facts. If an item needs explanation, write it as prose instead of expanding a list item into a paragraph.

Use a table only for compact structured data, lookup, or mathematical relationships. Table cells should normally be a value, label, or very short phrase. Move explanation, rationale, option descriptions, and multi-sentence content into prose. Keep titles as short as the medium and the reader’s need for orientation permit.

**Done when:** the draft meets the requirements set in the brief, follows the planned structure, and respects the applicable restrictions.

### Edit in passes

Edit in multiple passes with a focus on reader path. Read it through the eyes of the intended audience, then consider both a slightly more experienced and a slightly less experienced reader when that difference could change what the document needs. Add explanation, an example, or a durable external link only where it helps the intended reader use the document.

For each passage, ask whether the reader has the information and framing needed to fulfil the document's purpose in its actual reading context. Remove detail that does not serve that purpose; restore detail whose absence would force unsafe, costly, or unreliable inference. Check information assumed to be known by the reader, topic changes, and flow between sentences, paragraphs, and sections.

Check whether topics appear in more than one place. Retain the repetition only when the reader encounters the document in a way that needs it; otherwise combine the material.

**Done when:** at least two passes have been made, the last pass found no material problem, and the document is clear for its intended function rather than merely concise or smooth.


## Deliverable

Unless the request asks for critique only, provide the finished prose. When useful, briefly note material assumptions, placeholders, or a small number of consequential editorial choices.

## Maintenance

`SPEC.md` is the maintainer-facing behavioral contract for this skill; it is not ordinary runtime reading. When this skill gains or changes a quality goal, update `SPEC.md`, read [`../review-prose/rubric.md`](../review-prose/rubric.md), and update that rubric when the goal is observable in a finished document. Add or revise a case under `../../testing/writing-prose/cases/` that exposes the change. Keep the rubric focused on reader outcomes rather than duplicating this skill's drafting process.
