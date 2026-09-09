# Skill Tests

Run every skill's test suite in one Promptfoo run:

```sh
node testing/run-all.mjs
```

Pass skill names to run only those suites:

```sh
node testing/run-all.mjs writing-prose pull-request
```

Select the backend and its native candidate and judge model IDs explicitly:

```sh
EVAL_PROVIDER=copilot \
EVAL_MODEL=gpt-5.6-luna \
JUDGE_MODEL=gpt-5.6-luna \
  node testing/run-all.mjs
```

See [`.envrc.example`](../.envrc.example) for OpenRouter, Bedrock, and OpenAI examples. `--provider` remains a shorthand that overrides the environment and uses one provider/model for both roles.

View the results of a run:

```sh
npx promptfoo@0.121.20 view testing/runs/<run-name>
```

For details on run output, providers, review packets, and the pinned Promptfoo version, see [`run-all.mjs`](run-all.mjs) and [`prepare-all-review.mjs`](prepare-all-review.mjs).
