/** Shared provider and model selection for the Promptfoo-based runners. */

import { spawnSync } from "node:child_process";

// Pinned below latest: promptfoo 0.121.x carries the fix for the circular-JSON
// crash triggered by the AWS SDK's Bedrock client (promptfoo#7266, #8687/#8688).
export const PROMPTFOO_VERSION = "0.121.20";
export const PROVIDER_HELP = "EVAL_PROVIDER, EVAL_MODEL, and JUDGE_MODEL (or --provider)";

const COPILOT_PROVIDER = new URL("./copilot-provider.mjs", import.meta.url).href;
const DEFAULT_COPILOT_MODEL = "gpt-5.6-luna";

function providerFor(backend, model) {
  if (backend === "copilot") {
    return { id: COPILOT_PROVIDER, label: `copilot:${model}`, config: { model } };
  }
  if (["openrouter", "bedrock", "openai"].includes(backend)) return `${backend}:${model}`;
  throw new Error(`Unknown EVAL_PROVIDER '${backend}'. Expected copilot, openrouter, bedrock, or openai.`);
}

export function selectProvider(requested, env = process.env) {
  if (requested === "copilot" || requested?.startsWith("copilot:")) {
    return providerFor("copilot", requested.slice("copilot:".length) || DEFAULT_COPILOT_MODEL);
  }
  if (requested) return requested;

  if (!env.EVAL_PROVIDER) throw new Error("Set EVAL_PROVIDER to copilot, openrouter, bedrock, or openai (or pass --provider).");
  if (!env.EVAL_MODEL) throw new Error("Set EVAL_MODEL to the backend's model ID.");
  return providerFor(env.EVAL_PROVIDER.toLowerCase(), env.EVAL_MODEL);
}

export function selectProviders(requested, env = process.env) {
  const provider = selectProvider(requested, env);
  if (requested) return { provider, judgeProvider: provider };
  if (!env.JUDGE_MODEL) throw new Error("Set JUDGE_MODEL to the backend's model ID.");
  return {
    provider,
    judgeProvider: providerFor(env.EVAL_PROVIDER.toLowerCase(), env.JUDGE_MODEL),
  };
}

export function promptfooProviderConfig(provider, judgeProvider = provider) {
  return {
    providers: [provider],
    // Set the grader here rather than on each assertion. Assertion-level
    // providers make Promptfoo serialize Bedrock's circular SDK client.
    defaultTest: { options: { provider: judgeProvider } },
  };
}

export function validateProvider(provider, run = spawnSync) {
  if (typeof provider === "string" || !provider.label?.startsWith("copilot:")) return;
  const result = run("gh", ["copilot", "--", "--help"], { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error("GitHub Copilot CLI is not installed. Run `gh copilot` once to install and authenticate it, then rerun the test or select another provider with `--provider`.");
  }
}
