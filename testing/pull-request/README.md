# Pull Request Description Tests

This directory tests whether `pull-request` produces a self-contained review and delivery document. The focused skill stacks on `writing-prose`; compare a baseline with the focused-skill version, then review the pair with the shared prose rubric and the case completion criteria.

Use the same harness pattern as `testing/writing-prose/`: run each case twice with the same model and source material, once without the focused skill and once with it. Keep drafts anonymous while reviewing. The writing-prose Promptfoo runner can be adapted for automated runs; this directory keeps focused fixtures separate until a shared multi-skill runner is added.

Read `skills/pull-request/SKILL.md` before changing these cases. When that skill gains an observable quality goal, add or revise a case here and check whether `skills/review-prose/rubric.md` needs a corresponding reader-outcome criterion.
