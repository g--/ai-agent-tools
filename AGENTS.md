# Repository guidance

## Skills and their tests

Installable skills live in `skills/<skill-name>/`. Test and evaluation infrastructure lives in `testing/<skill-name>/`; do not put harnesses, generated outputs, or test fixtures in an installable skill directory.

`skills/review-prose/rubric.md` is the canonical reader-outcome rubric for prose. When changing a quality goal in `skills/writing-prose` or `skills/copy-editing`, read the rubric and update it if the new goal is observable in finished prose. Add or revise a test case in `testing/writing-prose/cases/` that exposes the change. Keep the rubric outcome-focused; do not duplicate an authoring skill's procedure.

Node.js is pinned by `.nvmrc`; run `nvm install` and `nvm use` before testing. Run the writing-prose tests with `node testing/writing-prose/run.mjs`, optionally followed by `node testing/writing-prose/prepare-review.mjs <run-directory>` for blinded human review.
