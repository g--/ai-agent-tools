import assert from "node:assert/strict";
import test from "node:test";
import CopilotProvider, { copilotArgs, copilotPrompt } from "./copilot-provider.mjs";
import { promptfooProviderConfig, selectProvider, selectProviders, validateProvider } from "./provider.mjs";

test("requires explicit candidate and judge models", () => {
  assert.throws(() => selectProviders(undefined, {}), /EVAL_PROVIDER/);
  assert.throws(() => selectProviders(undefined, { EVAL_PROVIDER: "copilot" }), /EVAL_MODEL/);
  assert.throws(
    () => selectProviders(undefined, { EVAL_PROVIDER: "copilot", EVAL_MODEL: "gpt-5.6-luna" }),
    /JUDGE_MODEL/,
  );
  assert.throws(
    () => selectProviders(undefined, { EVAL_PROVIDER: "unknown", EVAL_MODEL: "model", JUDGE_MODEL: "judge" }),
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

test("configures candidate generation and grading with separate models", () => {
  const { provider, judgeProvider } = selectProviders(undefined, {
    EVAL_PROVIDER: "copilot",
    EVAL_MODEL: "gpt-5.6-luna",
    JUDGE_MODEL: "gpt-5-mini",
  });
  assert.equal(provider.label, "copilot:gpt-5.6-luna");
  assert.equal(judgeProvider.label, "copilot:gpt-5-mini");
  assert.deepEqual(promptfooProviderConfig(provider, judgeProvider), {
    providers: [provider],
    defaultTest: { options: { provider: judgeProvider } },
  });
});

test("uses an explicit --provider override for candidates and judging", () => {
  const providers = selectProviders("copilot:gpt-5-mini", {});
  assert.deepEqual(providers.judgeProvider, providers.provider);
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
