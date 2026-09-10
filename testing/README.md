# Skill Tests

Run every skill's test suite in one Promptfoo run:

```sh
node testing/run-all.mjs
```

Pass skill names to run only those suites:

```sh
node testing/run-all.mjs writing-prose pull-request
```

Select the backend and the models that run the skill-assisted prompt. The baseline control and rubric judge each use one model, defaulting to the first evaluation model:

```sh
EVAL_PROVIDER=copilot \
EVAL_MODELS=gpt-5.6-luna,gpt-6-astra \
CONTROL_MODEL=gpt-5.6-luna \
JUDGE_MODEL=gpt-5.6-luna \
  node testing/run-all.mjs
```

`EVAL_MODEL` remains a single-model alias for `EVAL_MODELS`. See [`.envrc.example`](../.envrc.example) for other backends. `--provider` remains a shorthand that uses one provider/model for evaluation, control, and judging.

View the results of a run:

```sh
npx promptfoo@0.121.20 view testing/runs/<run-name>
```

For details on run output, providers, review packets, and the pinned Promptfoo version, see [`run-all.mjs`](run-all.mjs) and [`prepare-all-review.mjs`](prepare-all-review.mjs).
