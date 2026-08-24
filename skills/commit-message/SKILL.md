---
name: commit-message
description: Write or revise a Git commit message from a change, diff, or implementation summary. Use for a commit subject/body, including history-facing explanation of behavior, rationale, compatibility, migration, or operational consequences.
---

# Commit Message

A commit message is the durable historical log for a coherent change. The diff and code preserve implementation; the message preserves the decision context that will otherwise disappear. Write so a future engineer can scan history to find the change, then understand its material effect and reasoning without reconstructing the original decision.

## Gather the commit's facts

1. Identify the commit's coherent unit of change: its affected behavior or system property, not the mechanical edits that implement it.
2. Establish repository rules before drafting. Read contribution guidance, commit-message templates, automation configuration, then recent relevant commits to resolve their intended application. This skill requires Conventional Commits with the Gitmoji addon; if a local rule conflicts, follow the local rule and state the conflict when it materially affects the result. Follow any additional local requirements for scopes, allowed types, trailers, issue references, and signing.
3. Capture only facts supported by the supplied change or sources:
   - the prior and resulting behavior;
   - why the change is needed, when that is not obvious from the code;
   - alternatives considered and discarded when they explain a consequential trade-off;
   - compatibility, migration, security, performance, data, or operational consequences;
   - durable references and attribution required by the repository.

**Done when:** the change can be described accurately as an action and outcome, and decision context that the code cannot preserve is distinguished from implementation noise.

## Draft

Use the Conventional Commits shape with a Gitmoji after the separator:

```text
<type>(<optional scope>): <gitmoji> <imperative, specific subject>

<optional explanatory body>

<optional trailers>
```

Select the Conventional Commit type and Gitmoji that best represent the change's primary intent. For example: `fix(checkout): 🐛 reject multiple discount types`. Use a scope only when it makes the short-log entry easier to find; omit it rather than guessing. Follow locally defined emoji, type, scope, and breaking-change conventions when present. Otherwise use this mapping: `feat` → `✨`, `fix` → `🐛`, `docs` → `📝`, `refactor` → `♻️`, `test` → `✅`, `build` → `👷`, `ci` → `👷`, `perf` → `⚡️`, `style` → `🎨`, `chore` → `🔧`, and `revert` → `⏪`. Mark breaking changes using the repository's required Conventional Commits form (`!` and/or a `BREAKING CHANGE:` footer).

Keep the subject concise—roughly 50 characters after the prefix when practical—and wrap body prose at roughly 72 characters; clarity takes priority over a mechanical count. The subject is the only message text visible in `git shortlog` and many history views, so make the most important behavioral change findable there. Prefer externally observable behavior or system outcome over file names, functions, variables, and implementation mechanics.

Add a blank-line-separated body only when it earns its place. Preserve the **why**, material consequences, non-obvious constraints, and consequential alternatives rejected—not a narration of edits the reader can recover from the diff. State prior and new behavior when that distinction matters. Mention a specific function, variable, algorithm, or module only when it is itself material to the decision, trade-off, compatibility, or future investigation.

Put issue, incident, attribution, and other association trailers after the explanatory body, following the repository's required syntax. For example: `Refs: #4821` or `Co-authored-by: Name <email>`. An identifier aids traceability after the message explains the change; it is not the explanation.

**Done when:** the subject works alone in a short log, and every body line preserves decision context a reader could not reliably recover from the code or diff.

## Verify and deliver

Check that the message describes the change actually being committed, uses the project's convention where one exists, and makes no claims about tests, tickets, performance, alternatives, or effects that were not provided. Remove generic verbs, repeated subject text, file-by-file narration, line-by-line implementation detail, and speculative rationale. Retain a code-level detail only when it records a decision the diff cannot explain.

Return only the finished subject and, if justified, the body. Do not add headings, commentary, or a body merely to satisfy a template.
