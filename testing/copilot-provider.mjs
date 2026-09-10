import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

export function copilotPrompt(prompt) {
  try {
    const messages = JSON.parse(prompt);
    if (!Array.isArray(messages) || !messages.every((message) => message?.role && "content" in message)) return prompt;
    return messages
      .map((message) => `${message.role.toUpperCase()}:\n${typeof message.content === "string" ? message.content : JSON.stringify(message.content)}`)
      .join("\n\n");
  } catch {
    return prompt;
  }
}

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

function hasJsonObject(output) {
  const start = output.indexOf("{");
  const end = output.lastIndexOf("}");
  if (start < 0 || end < start) return false;
  try {
    const value = JSON.parse(output.slice(start, end + 1));
    return value !== null && typeof value === "object" && !Array.isArray(value);
  } catch {
    return false;
  }
}

export default class CopilotProvider {
  constructor(options = {}) {
    this.model = options.config?.model;
    this.run = options.config?.run ?? run;
  }

  id() {
    return `copilot:${this.model}`;
  }

  async callApi(prompt) {
    if (!this.model) return { error: "The Copilot provider requires a model." };
    const renderedPrompt = copilotPrompt(prompt);
    try {
      let { stdout } = await this.run("gh", copilotArgs(renderedPrompt, this.model), {
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
      });
      // Copilot has no schema-enforcement flag, so retry only malformed grader output.
      if (renderedPrompt.includes("You are grading output according to a user-specified rubric") && !hasJsonObject(stdout)) {
        const correction = `${renderedPrompt}\n\nReturn only one valid JSON object with exactly these fields: {"reason":"...","pass":true,"score":1}. Do not use markdown or prose outside the JSON object.`;
        ({ stdout } = await this.run("gh", copilotArgs(correction, this.model), {
          encoding: "utf8",
          maxBuffer: 10 * 1024 * 1024,
        }));
      }
      return { output: stdout.trim() };
    } catch (error) {
      return { error: `Copilot CLI failed: ${error.stderr?.trim() || error.message}` };
    }
  }
}
