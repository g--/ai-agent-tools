import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

export function copilotArgs(prompt, model) {
  return [
    "copilot",
    "--",
    "--prompt",
    prompt,
    "--model",
    model,
    "--silent",
    "--stream=off",
    "--no-custom-instructions",
    "--no-ask-user",
    "--available-tools=",
  ];
}

export default class CopilotProvider {
  constructor(options = {}) {
    this.model = options.config?.model;
  }

  id() {
    return `copilot:${this.model}`;
  }

  async callApi(prompt) {
    if (!this.model) return { error: "The Copilot provider requires a model." };
    try {
      const { stdout } = await run("gh", copilotArgs(prompt, this.model), {
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
      });
      return { output: stdout.trim() };
    } catch (error) {
      return { error: `Copilot CLI failed: ${error.stderr?.trim() || error.message}` };
    }
  }
}
