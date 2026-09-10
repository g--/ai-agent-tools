import assert from "node:assert/strict";
import test from "node:test";
import CopilotProvider, { copilotArgs, copilotPrompt } from "./copilot-provider.mjs";
import { promptfooProviderConfig, selectProvider, selectProviders, validateProvider } from "./provider.mjs";

test("requires an explicit backend and at least one evaluation model", () => {
  assert.throws(() => selectProviders(undefined, {}), /EVAL_PROVIDER/);
  assert.throws(() => selectProviders(undefined, { EVAL_PROVIDER: "copilot" }), /EVAL_MODELS or EVAL_MODEL/);
  assert.throws(
    () => selectProviders(undefined, { EVAL_PROVIDER: "unknown", EVAL_MODEL: "model" }),
    /Unknown EVAL_PROVIDER/,
  );
});

test("maps backend-native model names to Promptfoo providers", () => {
  assert.equal(
    selectProvider(undefined, { EVAL_PROVIDER: "openrouter", EVAL_MODEL: "openai/gpt-5.6-luna" }),
    "openrouter:openai/gpt-5.6-luna",
  );
  assert.equal(
    selectProvider(undefined, { EVAL_PROVIDER: "bedrock", EVAL_MODEL: "us.anthropic.claude-haiku-4-5-20251001-v1:0" }),
    "bedrock:us.anthropic.claude-haiku-4-5-20251001-v1:0",
  );
  assert.equal(
    selectProvider(undefined, { EVAL_PROVIDER: "openai", EVAL_MODEL: "gpt-4o-mini" }),
    "openai:gpt-4o-mini",
  );
});

test("resolves the Copilot backend and model in one place", () => {
  const provider = selectProvider(undefined, { EVAL_PROVIDER: "copilot", EVAL_MODEL: "gpt-5.6-luna" });
  assert.match(provider.id, /^file:\/\/.+\/testing\/copilot-provider\.mjs$/);
  assert.equal(provider.label, "copilot:gpt-5.6-luna");
  assert.deepEqual(provider.config, { model: "gpt-5.6-luna" });

  const override = selectProvider("copilot:gpt-5-mini", {});
  assert.equal(override.label, "copilot:gpt-5-mini");
});

test("selects multiple evaluation models and one control and judge", () => {
  const selection = selectProviders(undefined, {
    EVAL_PROVIDER: "copilot",
    EVAL_MODELS: "gpt-5.6-luna, gpt-6-astra, gpt-5.6-luna",
    CONTROL_MODEL: "gpt-5-mini",
    JUDGE_MODEL: "gpt-6-astra",
  });
  assert.deepEqual(selection.evalProviders.map((provider) => provider.label), [
    "copilot:gpt-5.6-luna",
    "copilot:gpt-6-astra",
  ]);
  assert.equal(selection.controlProvider.label, "copilot:gpt-5-mini");
  assert.equal(selection.judgeProvider.label, "copilot:gpt-6-astra");
});

test("defaults the control and judge to the first evaluation model", () => {
  const selection = selectProviders(undefined, {
    EVAL_PROVIDER: "copilot",
    EVAL_MODELS: "gpt-5.6-luna,gpt-6-astra",
  });
  assert.deepEqual(selection.controlProvider, selection.evalProviders[0]);
  assert.deepEqual(selection.judgeProvider, selection.evalProviders[0]);
});

test("maps the control and evaluation models to their prompts", () => {
  const selection = selectProviders(undefined, {
    EVAL_PROVIDER: "copilot",
    EVAL_MODELS: "gpt-5.6-luna,gpt-6-astra",
  });
  const config = promptfooProviderConfig(selection, "writing-prose");
  assert.deepEqual(config.providers.map(({ label, prompts }) => ({ label, prompts })), [
    { label: "copilot:gpt-5.6-luna", prompts: ["control", "writing-prose"] },
    { label: "copilot:gpt-6-astra", prompts: ["writing-prose"] },
  ]);
  assert.equal(config.defaultTest.options.provider.label, "copilot:gpt-5.6-luna");
});

test("runs a separate control model only against the control prompt", () => {
  const selection = selectProviders(undefined, {
    EVAL_PROVIDER: "copilot",
    EVAL_MODELS: "gpt-5.6-luna,gpt-6-astra",
    CONTROL_MODEL: "gpt-5-mini",
  });
  const config = promptfooProviderConfig(selection, "writing-prose");
  assert.deepEqual(config.providers.map(({ label, prompts }) => ({ label, prompts })), [
    { label: "copilot:gpt-5-mini", prompts: ["control"] },
    { label: "copilot:gpt-5.6-luna", prompts: ["writing-prose"] },
    { label: "copilot:gpt-6-astra", prompts: ["writing-prose"] },
  ]);
});

test("uses an explicit --provider override for candidates, control, and judging", () => {
  const selection = selectProviders("copilot:gpt-5-mini", {});
  assert.deepEqual(selection.controlProvider, selection.evalProviders[0]);
  assert.deepEqual(selection.judgeProvider, selection.evalProviders[0]);
});

test("rejects an unavailable Copilot CLI before an evaluation starts", () => {
  const provider = selectProvider("copilot:gpt-5-mini", {});
  assert.throws(
    () => validateProvider(provider, () => ({ status: 1 })),
    /GitHub Copilot CLI is not installed.*gh copilot/s,
  );
  assert.doesNotThrow(() => validateProvider(provider, () => ({ status: 0 })));
});

test("renders Promptfoo chat prompts as instructions rather than raw JSON", () => {
  const prompt = JSON.stringify([
    { role: "system", content: "Return only JSON." },
    { role: "user", content: "Grade this output." },
  ]);
  assert.equal(copilotPrompt(prompt), "SYSTEM:\nReturn only JSON.\n\nUSER:\nGrade this output.");
  assert.equal(copilotPrompt("ordinary prompt"), "ordinary prompt");
});

test("retries grading responses that contain no JSON", async () => {
  const calls = [];
  const responses = ["The output mostly meets the rubric.", '{"reason":"Mostly meets","pass":true,"score":0.8}'];
  const provider = new CopilotProvider({
    config: {
      model: "gpt-5.6-luna",
      run: async (_command, args) => {
        calls.push(args);
        return { stdout: responses.shift() };
      },
    },
  });
  const gradingPrompt = JSON.stringify([
    { role: "system", content: "You are grading output according to a user-specified rubric. Respond with JSON." },
    { role: "user", content: "Grade this output." },
  ]);

  assert.deepEqual(await provider.callApi(gradingPrompt), {
    output: '{"reason":"Mostly meets","pass":true,"score":0.8}',
  });
  assert.equal(calls.length, 2);
  assert.match(calls[1][3], /Return only one valid JSON object/);
});

test("does not retry ordinary prose responses", async () => {
  let calls = 0;
  const provider = new CopilotProvider({
    config: {
      model: "gpt-5.6-luna",
      run: async () => {
        calls += 1;
        return { stdout: "Finished artifact" };
      },
    },
  });

  assert.deepEqual(await provider.callApi("Write the artifact."), { output: "Finished artifact" });
  assert.equal(calls, 1);
});

test("passes Copilot prompts as arguments rather than shell text", () => {
  assert.deepEqual(copilotArgs("prompt; echo unsafe", "gpt-5-mini"), [
    "copilot",
    "--",
    "--prompt",
    "prompt; echo unsafe",
    "--model",
    "gpt-5-mini",
    "--silent",
    "--stream=off",
    "--no-custom-instructions",
    "--no-ask-user",
    "--available-tools=",
  ]);
});
