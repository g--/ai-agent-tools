# Prose Review Rubric

Review the draft as its intended reader. Mark every criterion **meets**, **partly meets**, or **does not meet**. Quote the relevant text and explain what the reader can understand, decide, or do because of it—and what they would have to reconstruct.

## Criteria

**Relevance above the fold.** The title signals the subject, audience, or task. The opening confirms the subject and scope soon enough for readers to decide whether the document is relevant.

**Purpose and context.** The draft states the outcome, decision, request, or problem in its own words. It does not require readers to recognize an identifier, ticket, or external link to understand why the work exists.

**Reader path.** Information arrives in an order that prepares readers for what follows. Terms, constraints, and exceptions appear before or alongside what relies on them.

**Actionability.** When the artifact calls for it, readers can identify the relevant action, decision, owner, condition, or next step.

**Earned detail.** The draft contains the context readers need without filler, repetition, or detail that does not change their understanding, decision, action, or ability to trust the document. It leaves out background, implementation detail, alternatives, and edge cases that do not serve its purpose.

**Prose-first form.** Prose carries connected reasoning. Lists contain discrete, parallel items; tables contain compact comparisons, structured lookup data, or mathematical relationships.

**Accuracy and uncertainty.** Claims follow from the available facts. Assumptions, estimates, and missing facts are visible rather than invented or obscured.

**Fit.** Tone, detail, and structure fit the stated audience and medium.

## Smell tests: prompts for closer review

These are AI-associated red flags, not automatic failures or substitute criteria. When one appears, ask whether it earns its place for this reader and artifact. Mark the affected criterion down only when the answer is no.

- **Template framing or meta-narration.** Does the draft spend its opening saying it will explain, explore, provide, or help, rather than supplying the subject, context, or action? Be especially suspicious of generic scene-setting such as “in today’s fast-paced world” and of headings that merely announce their function.
- **Vague benefit language.** Do words such as “seamless,” “robust,” “streamline,” “enhance,” “leverage,” “transform,” or “comprehensive” stand in for a concrete outcome, actor, constraint, or reason? Domain language is fine when the reader needs it.
- **Source-shaped rather than reader-shaped prose.** Has the draft restated the prompt, ticket, meeting notes, or discovery order instead of selecting and ordering information for the reader’s task? Are identifiers, links, citations, or “see ADR-123” carrying explanation that should appear inline, requiring the audience to recognize or stop and read another resource before this document makes sense?
- **Performative structure.** Are there headings, bold labels, bullets, numbered “key takeaways,” summaries, or conclusions whose only job is to make the draft look organized? Conversely, has a dense paragraph hidden discrete steps or values that a reader must scan or compare?
- **Repetition disguised as reinforcement.** Does the same claim appear in the title, opening, headings, bullets, body, and conclusion without serving a distinct non-linear reading need? Look for recap sections that add no decision, action, or qualification.
- **False completeness.** Does a neat inventory of generic benefits, risks, options, caveats, or next steps imply coverage while omitting the fact, condition, owner, exception, threshold, or rationale a reader needs? A symmetrical list is not evidence that the categories are the right ones.
- **Unneeded detail or context dumping.** Has the draft carried over implementation history, project mechanics, organizational background, or related facts simply because they were available? Check whether each detail changes the reader’s understanding, decision, action, or ability to trust the document.
- **Unearned length.** Does a sentence, paragraph, section, example, recap, or link make the reader do work without giving them needed context, a decision-relevant distinction, an action, or warranted confidence? Mentally remove it: if the reader could still understand and act as safely, it is a candidate to cut or combine. Do not treat length itself as a defect when the detail prevents a costly or unreliable inference.
- **Unsupported specificity or authority.** Has the draft invented a source, link, date, owner, check, command, result, quotation, policy, consensus, or causal explanation? Treat polished citations and confident process claims as claims to verify, not proof.
- **Mismanaged uncertainty.** Does the draft hedge established facts with stacked qualifiers (“may possibly,” “could potentially”), or present a guess, plan, estimate, or working theory as settled? Check that each qualification changes how the reader should assess or act.
- **Ambiguous agency or reference.** Can the reader tell who must act, what “this,” “it,” or “they” refers to, which system or option a condition applies to, and what happens if it fails? AI drafts often preserve grammatical fluency while obscuring these relationships.
- **Generic transitions and manufactured symmetry.** Do “moreover,” “additionally,” “finally,” or a forced three-part sequence conceal a jump in reasoning? Check that transitions state the actual relationship—cause, contrast, condition, evidence, or consequence—when the reader needs it.
- **Missing stakes.** Does the draft tell readers to take an action, accept a decision, or care about an outcome without the local context that explains why it matters? The reader should not need prior attendance, institutional memory, or another document to supply the purpose; retain only the amount of rationale needed for this artifact.
- **Audience flattening.** Does the draft explain obvious basics to an expert, use unexplained jargon with a general reader, or try to address incompatible audiences in one undifferentiated path? Check whether vocabulary, examples, and detail match the primary reader.
- **Chat-response residue.** Does a finished artifact include conversational offers, apologies, self-reference, generic encouragement, or a “let me know” closing that belongs to an assistant exchange rather than the requested medium?

## Pair decision

When comparing drafts, choose **A**, **B**, or **tie**. Explain the decision in two to five sentences. Prefer the draft that best serves the reader, not the draft with more words, formatting, or polish.
