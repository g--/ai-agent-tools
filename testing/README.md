# Skill Tests

Run every focused-skill test suite in one Promptfoo run:

```sh
node testing/run-all.mjs
```

Run only selected suites:

```sh
node testing/run-all.mjs writing-prose pull-request
```

The runner saves one timestamped directory under `testing/runs/`, with a subdirectory and Promptfoo result file for each skill. A failed automated rubric assertion is a review finding, not a runner failure: the batch continues so you can inspect every suite together. Provider or configuration errors still stop the run. Review the automated output with:

```sh
npx promptfoo@latest view testing/runs/<run-name>
```

Create anonymous A/B review packets for every suite in that run:

```sh
node testing/prepare-all-review.mjs testing/runs/<run-name>
```

Each suite's `review/` directory contains its cases as `a.md` and `b.md`; do not open `mapping.private.md` until completing the human review. Use the shared [`review-prose` rubric](../skills/review-prose/rubric.md) and audit whether the automated grade was justified.

Run `nvm install` and `nvm use` first. The runner uses the provider selected by `--provider`, or `openrouter:openai/gpt-5.6-luna` when `OPENROUTER_API_KEY` is set.
