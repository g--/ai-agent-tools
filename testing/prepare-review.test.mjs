import assert from "node:assert/strict";
import test from "node:test";
import { reviewPairs } from "./writing-prose/prepare-review.mjs";

test("pairs each evaluated model with the single control", () => {
  const pairs = reviewPairs([
    { provider: { label: "copilot:gpt-5.6-luna" }, prompt: { label: "control" }, response: { output: "control" } },
    { provider: { label: "copilot:gpt-5.6-luna" }, prompt: { label: "writing-prose" }, response: { output: "luna" } },
    { provider: { label: "copilot:gpt-6-astra" }, prompt: { label: "writing-prose" }, response: { output: "astra" } },
  ]);

  assert.deepEqual(pairs.map((pair) => pair.drafts.map((draft) => draft.text)), [
    ["control", "luna"],
    ["control", "astra"],
  ]);
  assert.deepEqual(pairs.map((pair) => pair.name), [
    "copilot-gpt-5.6-luna-writing-prose",
    "copilot-gpt-6-astra-writing-prose",
  ]);
});
