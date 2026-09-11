import assert from "node:assert/strict";
import test from "node:test";
import { formatCosts, summarizeRows } from "./cost.mjs";

test("summarizes reported generation cost by model", () => {
  const costs = summarizeRows([
    { provider: { label: "openrouter:openai/gpt-5.6-luna" }, cost: 0.0012 },
    { provider: { label: "openrouter:openai/gpt-5.6-luna" }, cost: 0.0023 },
    { provider: { label: "bedrock:anthropic.claude-haiku" }, cost: 0.0004 },
  ]);

  assert.equal(formatCosts(costs), `Reported generation cost (rubric-judge calls excluded):
  openrouter:openai/gpt-5.6-luna: $0.003500 (2 calls)
  bedrock:anthropic.claude-haiku: $0.000400 (1 call)
  Total: $0.003900`);
});

test("reports missing cost as unavailable instead of zero", () => {
  const costs = summarizeRows([
    { provider: { label: "copilot:gpt-5.6-luna" }, cost: 0 },
    { provider: { label: "openrouter:openai/gpt-5.6-luna" }, cost: 0.001 },
  ]);

  assert.equal(formatCosts(costs), `Reported generation cost (rubric-judge calls excluded):
  copilot:gpt-5.6-luna: unavailable (1 call)
  openrouter:openai/gpt-5.6-luna: $0.001000 (1 call)
  Known total: $0.001000; 1 call did not report dollar cost.`);
});

test("accepts an explicit zero charge from OpenRouter", () => {
  const costs = summarizeRows([
    {
      provider: { label: "openrouter:free/model" },
      cost: 0,
      metadata: { openrouter: { accountCharge: 0 } },
    },
  ]);

  assert.match(formatCosts(costs), /openrouter:free\/model: \$0\.000000 \(1 call\)/);
});
