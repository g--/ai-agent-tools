# Repository guidance

## Skills and their tests

Installable skills live in `skills/<skill-name>/`. Each skill may include a maintainer-facing `SPEC.md` that defines its observable behavioral contract; it travels with the portable skill but is not ordinary runtime instruction. Keep runtime instructions in `SKILL.md`, selectively loaded runtime detail in `references/`, and deterministic helpers or templates in `scripts/` or `assets/` when they earn their place. Test and evaluation infrastructure lives in `testing/<skill-name>/`; do not put harnesses, generated outputs, or full test fixtures in an installable skill directory.

`skills/review-prose/rubric.md` is the canonical reader-outcome rubric for prose. When changing a quality goal in `skills/writing-prose` or `skills/copy-editing`, read `skills/<skill-name>/SPEC.md` and the rubric. Update the rubric if the new goal is observable in finished prose, and add or revise a test case in `testing/writing-prose/cases/` that exposes the change. Keep the rubric outcome-focused; do not duplicate an authoring skill's procedure.

Node.js is pinned by `.nvmrc`; run `nvm install` and `nvm use` before testing. Run the writing-prose tests with `node testing/writing-prose/run.mjs`, optionally followed by `node testing/writing-prose/prepare-review.mjs <run-directory>` for blinded human review.
