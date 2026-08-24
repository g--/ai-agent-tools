---
name: pull-request
description: Write or revise a pull request description for reviewers. Use when explaining a proposed code change's outcome, scope, validation, risks, rollout, rollback, linked work, or reviewer decisions.
---

# Pull Request Description

A pull request is an augmented commit message for review and delivery. It preserves the change's outcome and decision context, then adds the information reviewers need to navigate, validate, merge, and safely ship it. A reviewer should understand the proposed change, why it exists, and how to assess it without reconstructing the diff or opening linked work.

## Build the review brief

1. Inspect the repository's pull request template, contribution guidance, and nearby accepted pull requests when available. Apply them in that order: the template is the required shape, contribution guidance resolves how to complete it, and accepted PRs illustrate local style without overriding either. Use the template as completely as the change permits: retain required headings, checkboxes, links, labels, and repository terminology, and fill each applicable section with specific facts. Do not discard a template for a preferred generic structure; leave an inapplicable required field visibly marked according to local convention. When no template or convention exists, let the change determine the structure.
2. Establish the review-critical facts:
   - the user, system, or maintainer outcome, its rationale, and consequential alternatives when supplied;
   - the material changes in this pull request and important exclusions;
   - validation actually performed, an end-to-end repeatable validation plan, and important validation still outstanding;
   - compatibility, data migration, security, performance, deployment, monitoring, rollback, or follow-up details when relevant;
   - dependencies on, relationships to, or reversions of other pull requests;
   - the best review starting point, reading order, and decisions or focused feedback reviewers need to provide.
3. Separate observed facts from assumptions and planned work. Ask for a missing fact when it would change a reviewer or release decision; otherwise surface it plainly as a concise placeholder or open question.

**Done when:** you can state what changed and why, where a reviewer should start, what they need to inspect, and every condition that affects a safe merge or rollout.

## Draft for review

Lead with the outcome and reason in the opening paragraph. Follow with a reviewable summary of the material behavioral or system changes, not a low-level account of files, functions, variables, or line edits that reviewers can read in the diff. Explain significant exclusions beside the scope they qualify, especially when an incomplete migration or staged rollout affects safety. Name a code-level detail only when it directs attention to a consequential implementation decision, trade-off, compatibility concern, or review risk.

Use headings only for genuine material sections or reviewer tasks, unless the repository template requires them. A compact structure often includes:

- **Summary** — outcome, rationale, and scope;
- **Review guide** — where to start, a useful reading order, and files or decisions needing focused scrutiny;
- **Validation** — completed checks, a repeatable plan for remaining checks, and known gaps;
- **Rollout / risk** — deployment order, migration behavior, compatibility, monitoring, rollback, and constraints;
- **Dependencies / related work** — required PRs, reversions, or sequencing;
- **Reviewer focus** — a decision, trade-off, or area needing particular scrutiny.

Give reviewers an actionable route through a non-trivial diff. Name the entry-point file, commit, or design decision first; call out generated files, mechanical refactors, and intentionally deferred work so they can concentrate on the material change. For large Markdown or other rendered artifacts, include a branch-rendered preview link when a valid URL is available or can be derived from repository context; otherwise name the file and plainly request the needed preview rather than inventing a link.

Make validation independently repeatable. State completed checks separately from the plan a reviewer or release owner can run. Give exact commands, required setup, inputs or fixtures, expected observations, and environment or permission assumptions when they matter. Inline short scripts when they make the procedure executable; use numbered human-driven steps when validation requires UI actions, observation, or a decision. Include cleanup or rollback steps when the procedure changes data or infrastructure. A bare claim such as “tested locally” is not a validation plan.

When the repository's CI/CD checks fully and automatically cover the change, a separate manual plan is unnecessary. State that conclusion plainly—for example, `CI/CD coverage is sufficient to validate this change.`—and, when useful for reviewer confidence, name the relevant workflow or test suite. Do not make that claim unless the automated checks actually exercise the changed behavior and its material risks.

Include only non-template headings that carry material content; short, low-risk changes may need a paragraph and a validation sentence, but every PR still needs enough validation detail to reproduce the relevant confidence or establish that CI/CD supplies it. Use lists for genuine discrete changes, checks, risks, or asks. Keep causal explanation in prose.

Place ticket, incident, initiative, dependency, and reversion references with the relevant explanation or in a concise traceability note. State their relationship precisely (`Depends on #123`, `Reverts #456`, `Fixes #789`, `Part of #101`) only after the description stands on its own. A link is evidence or navigation, not a substitute for purpose or scope.

**Done when:** a reviewer who has not read linked work can explain the outcome, rationale, scope, review route, validation, risks, dependencies, and any requested decision.

## Verify and deliver

Check that claims match supplied facts and that validation language distinguishes completed checks from the repeatable plan. Verify that the plan has enough setup, commands or human steps, expected results, and cleanup detail for its intended executor. Make absent tests, rollout details, or rollback plans visible when they matter; never imply that an unprovided check passed. Remove file-by-file narration, generic claims such as “minor cleanup,” decorative headings, and repeated ticket text.

Return the finished PR description. Briefly flag only material unknowns that prevent an accurate description or safe review.
