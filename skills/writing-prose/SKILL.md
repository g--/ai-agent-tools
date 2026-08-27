---
name: writing-prose
description: Write, revise, or critique prose when clarity, reader comprehension, structure, tone, or concise communication matters—from commit messages and pull request descriptions to decision documents, documentation, announcements, emails, and explanations.
---

# Writing Prose

Apply this skill to any reader-facing written artifact, from a one-line commit message to a multi-section decision document. Scale the process to the artifact: a commit message may need only a precise subject and essential context, while a pull request description or decision document needs a fuller reader path.

Write for the reader's **path**: the sequence of ideas they need to understand, decide, or do what the document asks. A clear path gives the point before its support, defines an unfamiliar term before relying on it, and makes every transition earned.

Practice **earned brevity**: prefer the shortest form that preserves the reader's ability to understand and act. Remove words, sentences, sections, and links that do not earn their place; retain context that prevents a reader from needing to reconstruct the point with material from outside the document.

## Process

1. **Establish the brief.** Identify the purpose, audience, medium (for example: commit message, pull request description, decision document, email, or documentation), desired reader action, required facts, constraints, and tone. Set an **information budget**: decide the minimum level of detail this reader needs for this medium, then distinguish essential context from useful-but-optional detail and material that does not serve the purpose. Infer only what the request makes reliable; ask a focused question when an unknown would materially change the result.

Establish:
- who the reader is, what kind of topic they are likely to be knowledgeable about.

   **Done when:** you can state what this reader should know, feel, decide, or do after reading, the necessary level of detail, and what the document will deliberately leave out.

2. **Build the reader path.** Separate the message into:
   - the main point or request;
   - the context needed to understand it;
   - evidence, reasoning, or practical detail;
   - the action, decision, or next step.

   Include information not yet available.
   Identify what information the reader likely already knows; what they likely are able to understand without it being explicitly said.
   Order information by the reader's need, not by the order in which it was discovered. Introduce unfamiliar terms before using them. State constraints and exceptions near the claim they qualify.

   **Done when:** each section prepares the reader for the next one without relying on unstated knowledge.

3. **Draft for clarity.** Make the title a strong first signal of the subject, audience, or task. In the opening sentence or paragraph—the content visible **above the fold**—confirm what the document covers and who it is for, so readers can quickly tell whether it is the document they need.

   Put the important subject and action near the start of each sentence. Prefer concrete, familiar words and specific verbs. Use active voice when it identifies the actor or makes the action easier to follow. Give each paragraph one job, opened by its controlling point.

   Let words and sentence structure carry the meaning. Use formatting for semantic structure, not decoration or emphasis: headings mark genuine sections; emphasis is rare and reserved for a distinction prose cannot make clear on its own. Use a list only when readers need to consume a set of discrete, parallel items. Write connected reasoning and explanatory comparisons as prose rather than converting them into lists or text-heavy tables for visual organization. Reserve tables for compact, structured lookup data or mathematical relationships with short cells; do not use a table to hold paragraphs, option descriptions, or rationale. Use examples where an abstract instruction could be interpreted in more than one way. Match formality and vocabulary to the audience.

   Heading titles are short and optimized for the reader "jumping to" a particular section.

   **Done when:** the title gives readers a strong expectation of the document's relevance, the above-the-fold content confirms or corrects that expectation, and a reader can scan the headings, first sentences, and calls to action and recover the document's argument.

4. **Make uncertainty visible.** Verify factual claims when the task and available sources permit. For unavailable but necessary facts, use a concise placeholder such as `<launch date>`; label an estimate or assumption plainly. Link the first useful mention of durable external material when it helps readers verify a claim or continue learning.

   A link supplements the document; it does not carry understanding the intended reader needs before continuing.

   **Done when:** readers can distinguish facts, sources, assumptions, and missing information.

5. **Revisit the Brief** See if any of the assumptions made in the brief need to be revisited. (Eg. adjust the level of detail, tighten the desired actions, etc.) Repeat all steps if needed.

6. **Edit in passes.** First check completeness and accuracy, then the reader path, then sentences and mechanics. Make an explicit brevity pass against the information budget: remove repetition, filler, throat-clearing, vague intensifiers, implementation detail the reader does not need to understand the document, and detail that does not change understanding, a decision, or an action. Preserve necessary context rather than shortening mechanically.

   **Done when:** every remaining sentence advances the reader's path, the document includes the necessary level of detail and no more, and the prose is accurate, readable, and ready for its medium.

## General guidelines

- Lead with the conclusion, request, or decision when readers need it quickly; follow with the reason and detail.
- Prefer one main idea per sentence and one controlling idea per paragraph.
- Name the actor, action, owner, deadline, and condition when they matter. Replace ambiguous references such as “this,” “it,” or “they” with a noun when the referent is not immediate.
- Treat identifiers as references, not explanations. In a pull request description, state the user or system outcome, the material change, and notable constraints before or alongside a ticket link. State the larger initiative or problem that makes the work necessary; “part of #123” does not explain why the work exists. “Completes #123” is useful metadata after readers know what #123 required; it is not a summary.
- Use parallel grammar for parallel ideas. Keep modifiers beside the words they modify.
- Choose precise quantities, dates, and examples over broad claims when precision helps the reader act or assess a claim.
- Use qualifiers only when they change the meaning. State an exception directly instead of hiding it in a long sentence.
- Keep terminology consistent. Define specialized terms for readers who need them, then use the defined term consistently.
- Prefer short paragraphs, but vary sentence length naturally. Concision is removing wasted work for the reader, not merely reducing word count.
- Set detail by consequence: include a fact when it changes the reader's understanding, decision, action, or ability to trust the document. Omit background, implementation detail, alternatives, and edge cases that do none of those things; link durable optional detail when readers may need it later.
- Use the smallest structure that fits the message: a precise commit subject instead of a paragraph; a few headings instead of a long unbroken narrative; no heading where a single sentence is sufficient.
- Read the draft as its intended reader: look for questions they would ask, assumptions they may not share, and actions they could misread.

## Deliverable

Unless the request asks for critique only, provide the finished prose. When useful, briefly note material assumptions, placeholders, or a small number of consequential editorial choices.

## Maintenance

When this skill gains or changes a quality goal, read [`../review-prose/rubric.md`](../review-prose/rubric.md). Update that rubric when the goal is observable in a finished document; otherwise record why no rubric change is needed. Keep the rubric focused on reader outcomes rather than duplicating this skill's drafting process.
