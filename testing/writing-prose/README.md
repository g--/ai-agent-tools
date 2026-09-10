# Writing Prose Tests

This directory tests whether `writing-prose` improves finished prose for its intended reader. Its behavioral contract and examples live under [`../../skills/writing-prose/`](../../skills/writing-prose/); testing holds runnable cases and the evaluation harness. Test infrastructure stays outside `skills/`: skills are installable agent instructions, while tests are repository-maintenance tooling.

## Prerequisites

Install [nvm](https://github.com/nvm-sh/nvm), then run the following at the repository root:

```sh
nvm install
nvm use
```

[`.nvmrc`](../../.nvmrc) pins Node.js 22.22.0, the minimum version required by the current Promptfoo release and supported by the repository's Node-based runner. The runner uses [Promptfoo](https://www.promptfoo.dev/), an open-source LLM evaluation harness, through `npx`; Node.js is the only runtime dependency.

The runner pins `promptfoo@0.121.20` rather than `@latest`: earlier versions intermittently crash with "Converting circular structure to JSON" when the AWS SDK's Bedrock client leaks a circular reference into a result ([promptfoo#7266](https://github.com/promptfoo/promptfoo/issues/7266), [#8687](https://github.com/promptfoo/promptfoo/issues/8687)); 0.121.6+ carries the fix.

Provider and model selection is shared by all Node-based runners. Set `EVAL_PROVIDER` to `copilot`, `openrouter`, `bedrock`, or `openai`. Set `EVAL_MODELS` to a comma-separated list of backend-native models that run the skill-assisted prompt; `EVAL_MODEL` remains a single-model alias. `CONTROL_MODEL` generates the baseline and `JUDGE_MODEL` grades every candidate. Each defaults to the first evaluation model. Credential variables configure authentication but do not select a backend.

Model IDs differ by backend. For example, GPT-5.6 Luna is `gpt-5.6-luna` in Copilot and `openai/gpt-5.6-luna` in OpenRouter; Bedrock uses IDs such as `us.anthropic.claude-haiku-4-5-20251001-v1:0`. See [`.envrc.example`](../../.envrc.example) for complete examples.

Copilot uses the authenticated [GitHub Copilot CLI](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli); run `gh copilot` once to install or authenticate it. `--provider` overrides the environment and uses one provider/model for evaluation, control, and judging; the `copilot` shorthand defaults to GPT-5.6 Luna:

```sh
node testing/writing-prose/run.mjs --provider copilot
node testing/writing-prose/run.mjs --provider copilot:gpt-5-mini
node testing/writing-prose/run.mjs --provider bedrock:us.anthropic.claude-sonnet-5
```

## Run tests

`run.mjs` generates a self-contained Promptfoo configuration, runs it, and saves the results under `testing/writing-prose/runs/`.

Run every case:

```sh
node testing/writing-prose/run.mjs
```

Run one or more named cases:

```sh
node testing/writing-prose/run.mjs pr-ticket-context commit-message
```

Select a Promptfoo provider or inspect the generated configuration without calling a model:

```sh
node testing/writing-prose/run.mjs --provider copilot:gpt-5-mini
node testing/writing-prose/run.mjs pr-ticket-context --dry-run
```

After the runner finishes, inspect outputs and automated grades with the command it prints, or run:

```sh
npx promptfoo@0.121.20 view \
  testing/writing-prose/runs/<run-name>
```

The runner produces two drafts for each case: `baseline` is given the task alone, and `writing-prose` is additionally given the installed skill instructions. The automated assertions use the same selected provider and the outcome rubric in [`../../skills/review-prose/rubric.md`](../../skills/review-prose/rubric.md). They are diagnostic, not a substitute for a reader.

## Human spot check

After a run, create blinded review packets:

```sh
node testing/writing-prose/prepare-review.mjs \
  testing/writing-prose/runs/<run-name>
```

This creates an anonymous A/B packet comparing the control with each evaluated model. Single-model runs use `review/<case>/`; multi-model runs use `review/<case>/<model>/`. Give the reviewer the case and [`../../skills/review-prose/rubric.md`](../../skills/review-prose/rubric.md). Have them score both drafts and the automated grade in `review.md`, then reveal `mapping.private.md`. [`review-template.md`](review-template.md) is a starting point.

A human reviewer decides whether a result is useful, accurate, and appropriately brief. Treat recurring failures across cases as evidence for changing a skill; treat a single failure as a case to investigate, not a reason to add generic instructions.

## Maintaining the rubric and skills

`skills/review-prose/rubric.md` is the canonical outcome standard. Whenever `skills/writing-prose` or `skills/copy-editing` changes a quality goal, update the rubric if that goal can be observed in a finished draft. Then add or revise a case that can expose the behavior. Do not mirror the authoring process in the rubric: it should state reader-visible outcomes and remain independently useful for judging drafts.
