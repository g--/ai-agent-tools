# Decision Writing Tests

This directory tests whether `decision-writing` produces an auditable contemporaneous decision record: an independent world state, explicit criteria and options, traceable rationale, and actionable follow-through. Cases intentionally mix decisive inputs with related details that should not automatically appear in the record.

Run paired baseline and skill treatments with the shared runner:

```sh
node testing/run-all.mjs decision-writing
```

Keep the resulting drafts anonymous during review. Use the shared `review-prose` rubric and the decision-specific supplement in [`rubric.md`](rubric.md), then check each case's completion criteria. Re-run all cases after a material change to `skills/decision-writing/SKILL.md`.
