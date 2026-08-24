# Writing Prose Tests

This directory tests whether `writing-prose` improves finished prose for its intended reader. It contains test cases, a runnable Promptfoo configuration, and a blinded human-review workflow. Test infrastructure stays outside `skills/`: skills are installable agent instructions, while tests are repository-maintenance tooling.

## Prerequisites

Install [nvm](https://github.com/nvm-sh/nvm), then run the following at the repository root:

```sh
nvm install
nvm use
```

[`.nvmrc`](../../.nvmrc) pins Node.js 22.22.0, the minimum version required by the current Promptfoo release and supported by the repository's Node-based runner. The runner uses [Promptfoo](https://www.promptfoo.dev/), an open-source LLM evaluation harness, through `npx`; Node.js is the only runtime dependency.

The default provider is `openai:gpt-4o-mini`, which requires `OPENAI_API_KEY`. To use OpenRouter, export its key before running the tests; the runner then defaults to OpenRouter:

```sh
export OPENROUTER_API_KEY=<your-openrouter-key>
```

With `OPENROUTER_API_KEY` set, the runner defaults to `openrouter:openai/gpt-5.6-luna`. Choose another provider and model with `--provider` when needed.

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
OPENROUTER_API_KEY=<your-openrouter-key> \
  node testing/writing-prose/run.mjs --provider openrouter:openai/gpt-5.6-luna
node testing/writing-prose/run.mjs pr-ticket-context --dry-run
```

After the runner finishes, inspect outputs and automated grades with the command it prints, or run:

```sh
npx promptfoo@latest view \
  testing/writing-prose/runs/<run-name>
```

The runner produces two drafts for each case: `baseline` is given the task alone, and `writing-prose` is additionally given the installed skill instructions. The automated assertions use the same selected provider and the outcome rubric in [`../../skills/review-prose/rubric.md`](../../skills/review-prose/rubric.md). They are diagnostic, not a substitute for a reader.

## Human spot check

After a run, create blinded review packets:

```sh
node testing/writing-prose/prepare-review.mjs \
  testing/writing-prose/runs/<run-name>
```

This creates anonymous `a.md` and `b.md` drafts and a private mapping. Give the reviewer the case and [`../../skills/review-prose/rubric.md`](../../skills/review-prose/rubric.md). Have them score both drafts and the automated grade in `review.md`, then reveal `mapping.private.md`. [`review-template.md`](review-template.md) is a starting point.

A human reviewer decides whether a result is useful, accurate, and appropriately brief. Treat recurring failures across cases as evidence for changing a skill; treat a single failure as a case to investigate, not a reason to add generic instructions.

## Maintaining the rubric and skills

`skills/review-prose/rubric.md` is the canonical outcome standard. Whenever `skills/writing-prose` or `skills/copy-editing` changes a quality goal, update the rubric if that goal can be observed in a finished draft. Then add or revise a case that can expose the behavior. Do not mirror the authoring process in the rubric: it should state reader-visible outcomes and remain independently useful for judging drafts.
