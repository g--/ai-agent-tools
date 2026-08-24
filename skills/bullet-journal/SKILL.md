---
name: bullet-journal
description: Write or revise concise, linked bullet-journal entries for Logseq and similar block outliners. Use for journal captures, daily notes, project logs, meeting notes, task entries, and nested bullets where topic links, tags, and retrievable structure matter.
---

# Bullet Journal Entries

Use [`writing-prose`](../writing-prose/SKILL.md) for the underlying clarity and brevity discipline. This skill adapts it to a bullet journal: a chronological, block-first record that must remain quick to capture, easy to scan, and easy to retrieve by topic.

Treat each bullet as an **atomic record**: one observation, event, decision, action, or question. Write the smallest useful entry, not a miniature document. The journal date supplies the default time context; the entry supplies the durable meaning and connections.

## Draft

1. **Identify the record.** Determine whether the item is a note, event, decision, question, or concrete next action. Capture the outcome or fact first. For a task, use an observable imperative action with a clear actor or object when helpful.

   **Done when:** the top-level bullet says what happened, matters, or must be done without its children.

2. **Attach retrieval context.** Add links/tags that will make the entry findable together with related material:
   - Link named, durable entities as pages: `[[Project Atlas]]`, `[[Hiring]]`, `[[Maya Chen]]`.
   - Give any multi-bullet project entry its own project/topic page link, even when it also has broader tags. That project link is the entry's home for grouping and later review.
   - Use `#tags` as a small, consistent set of cross-cutting facets—such as `#meeting`, `#decision`, `#waiting`, or `#idea`—rather than a second, uncontrolled taxonomy. In Logseq, `#tag` is page-link shorthand; choose `[[Page names]]` for entities people will open and read.
   - Add only connections that change later retrieval. Prefer one project/topic link and zero to two useful facets over a cloud of weak labels.

   **Done when:** a future reader can find the entry through its project/topic and, when useful, a stable cross-cutting facet.

3. **Choose the shape.** Use one short, independently meaningful bullet when the record fits in a sentence. When it needs explanation, decomposition, evidence, or multiple outcomes, make the concise summary a parent bullet with its links/tags, then put the supporting material in children. Nest another level only when it genuinely belongs to the child above it; keep the outline shallow enough to scan.

   Child bullets may carry their own links/tags when they concern a distinct entity or facet. They should clarify, implement, or support their parent—not repeat it.

   **Done when:** every indentation expresses a relationship, and collapsing the parent preserves a useful journal scan.

4. **Use journal semantics deliberately.**
   - Use `TODO` (and the workspace's enabled task states) only for a concrete next action; keep rationale, prerequisites, and updates beneath the task.
   - The daily journal already dates a capture. Add a time only when the event time differs from the journal date or timing is material.
   - Use properties such as `status::`, `owner::`, `source::`, or `type::` only from an established, query-worthy schema. Keep narrative meaning in the bullet text.
   - Put a source, quote, or evidence under the claim it supports, with a short takeaway. Reference a canonical existing block rather than copying it when the exact same decision, definition, or quote must recur.

   **Done when:** task markers, timestamps, properties, and references each express information the plain bullet and journal date cannot.

5. **Make it rapid.** Edit for concrete nouns and verbs, decisive wording, and scanability. Preserve uncertainty explicitly (`Question:`, `Tentative:`, `Need to verify:`) rather than presenting inference as fact. During a later review, complete, reschedule, cancel, or promote open tasks; a growing undifferentiated TODO list is not a plan.

   **Done when:** the entry is no longer than needed to understand and retrieve it, with no hidden ambiguity that matters later.

## Patterns

A compact note needs no hierarchy beyond its links:

```markdown
- [[Project Atlas]] #decision — Use CSV export for the pilot.
```

A larger record begins with a summary and project/topic link; children hold action, rationale, and evidence:

```markdown
- [[Project Atlas]] #meeting #decision — Pilot scope is export first; import moves after validation.
  - TODO Send [[Maya Chen]] the revised scope by Friday.
  - Rationale: import would delay the pilot without answering its main question.
  - [Pilot notes](https://example.com/pilot-notes): 3 of 5 participants requested export.
```

A nested task keeps its necessary substeps beneath the action:

```markdown
- [[Website redesign]] #waiting — Awaiting legal approval for the revised privacy copy.
  - TODO Follow up with [[Legal]] on 2025-03-14.
    - Include the outstanding consent-language question.
```

## Structural rules

- Keep sibling bullets parallel: separate facts, decisions, actions, and questions rather than joining unrelated items into one long bullet.
- Let a parent summarize; let children provide detail. Do not use indentation merely to make text look tidy.
- Prefer links to durable topics over duplicate copies of the same entry on multiple pages. The journal preserves chronology; linked pages collect context through backlinks.
- Use a small, stable vocabulary. Merge or rename near-synonymous tags/pages instead of creating variants such as `#meeting-notes`, `#meetings`, and `#meeting`.
- Keep sensitive, speculative, or personally consequential entries appropriately qualified and within the journal's privacy expectations.

## Deliverable

Return the requested entry or entries in the user's journal syntax. Preserve their established task states, page-link convention, property schema, and tag vocabulary when supplied. If no convention is supplied, use the patterns above and explain only a consequential assumption.

## Basis

These recommendations combine Bullet Journal rapid logging and review with Logseq's documented block, page-reference, property, task, and block-reference model. Validate version-specific task keywords, date tokens, and query/property behavior against the target Logseq release before depending on them for automation.
