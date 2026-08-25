/** Shared default-provider selection for the Promptfoo-based runners. */

// Pinned below latest: promptfoo 0.121.x carries the fix for the circular-JSON
// crash triggered by the AWS SDK's Bedrock client (promptfoo#7266, #8687/#8688).
export const PROMPTFOO_VERSION = "0.121.20";

export function defaultProvider(env = process.env) {
  if (env.OPENROUTER_API_KEY) return "openrouter:openai/gpt-5.6-luna";
  if (env.AWS_BEARER_TOKEN_BEDROCK || env.AWS_PROFILE || env.AWS_ACCESS_KEY_ID) {
    return "bedrock:us.anthropic.claude-haiku-4-5-20251001-v1:0";
  }
  return "openai:gpt-4o-mini";
}
