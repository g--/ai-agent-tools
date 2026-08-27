# Skill Tests

Run every skill's test suite in one Promptfoo run:

```sh
node testing/run-all.mjs
```

Pass skill names to run only those suites:

```sh
node testing/run-all.mjs writing-prose pull-request
```

View the results of a run:

```sh
npx promptfoo@0.121.20 view testing/runs/<run-name>
```

For details on run output, providers, review packets, and the pinned Promptfoo version, see [`run-all.mjs`](run-all.mjs) and [`prepare-all-review.mjs`](prepare-all-review.mjs).
