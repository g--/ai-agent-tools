# Skill Tests

Run every focused-skill test suite in one Promptfoo run:

```sh
node testing/run-all.mjs
```

To create a unique UTC-named run and open its Promptfoo viewer when evaluation finishes:

```sh
node testing/run-and-view.mjs
```

Pass skill names to run only selected suites:

```sh
node testing/run-and-view.mjs writing-prose pull-request
```

Run only selected suites:

```sh
node testing/run-all.mjs writing-prose pull-request
```

The runner saves one timestamped directory under `testing/runs/`, with a subdirectory and Promptfoo result file for each skill. A failed automated rubric assertion is a review finding, not a runner failure: the batch continues so you can inspect every suite together. Provider or configuration errors still stop the run. Review the automated output with:

```sh
npx promptfoo@0.121.20 view testing/runs/<run-name>
```

Create anonymous A/B review packets for every suite in that run:

```sh
node testing/prepare-all-review.mjs testing/runs/<run-name>
```

Each suite's `review/` directory contains its cases as `a.md` and `b.md`; do not open `mapping.private.md` until completing the human review. Use the shared [`review-prose` rubric](../skills/review-prose/rubric.md) and audit whether the automated grade was justified.

Run `nvm install` and `nvm use` first. The runner uses the provider selected by `--provider`, or picks a default: `openrouter:openai/gpt-5.6-luna` when `OPENROUTER_API_KEY` is set, else `bedrock:us.anthropic.claude-haiku-4-5-20251001-v1:0` when AWS credentials are available (`AWS_BEARER_TOKEN_BEDROCK`, `AWS_PROFILE`, or `AWS_ACCESS_KEY_ID`), else `openai:gpt-4o-mini`.

The runner pins `promptfoo@0.121.20` rather than `@latest`: earlier versions intermittently crash with "Converting circular structure to JSON" when the AWS SDK's Bedrock client leaks a circular reference into a result ([promptfoo#7266](https://github.com/promptfoo/promptfoo/issues/7266), [#8687](https://github.com/promptfoo/promptfoo/issues/8687)); 0.121.6+ carries the fix.
