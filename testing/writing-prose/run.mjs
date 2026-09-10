#!/usr/bin/env node
/** Run all or selected writing-prose cases through Promptfoo. */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PROMPTFOO_VERSION, PROVIDER_HELP, promptfooProviderConfig, selectProviders, validateProvider } from "../provider.mjs";
import { candidateCase } from "../case.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const casesDir = path.join(here, "cases");
const skillPath = path.join(root, "skills/writing-prose/SKILL.md");
const rubricPath = path.join(root, "skills/review-prose/rubric.md");
const runsDir = path.join(here, "runs");

function usage() {
  console.log(`Usage: node testing/writing-prose/run.mjs [options] [case ...]

Run baseline and writing-prose variants through Promptfoo.

Options:
  --provider <provider>  Promptfoo provider (default: ${PROVIDER_HELP})
  --name <name>          Run directory name (default: UTC timestamp)
  --dry-run              Generate configuration without calling Promptfoo
  --help                 Show this help
`);
}

function parseArgs(argv) {
  const options = {
    provider: undefined,
    dryRun: false,
    cases: [],
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help") {
      usage();
      process.exit(0);
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--provider" || arg === "--name") {
      const value = argv[index + 1];
      if (!value) throw new Error(`${arg} needs a value`);
      options[arg.slice(2)] = value;
      index += 1;
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      options.cases.push(arg);
    }
  }
  Object.assign(options, selectProviders(options.provider));
  return options;
}

function selectCases(names) {
  const available = new Map(
    readdirSync(casesDir)
      .filter((name) => name.endsWith(".md"))
      .map((name) => [path.basename(name, ".md"), path.join(casesDir, name)]),
  );
  if (names.length === 0) return [...available.values()].sort();
  return names.map((name) => {
    const key = path.basename(name, ".md");
    const selected = available.get(key);
    if (!selected) throw new Error(`Unknown case '${name}'. Available cases: ${[...available.keys()].sort().join(", ")}`);
    return selected;
  });
}

function timestamp() {
  return new Date().toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}Z$/, "Z");
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options.dryRun) validateProvider(options.provider);
  if (!existsSync(casesDir)) throw new Error(`Cases directory not found: ${casesDir}`);
  const selected = selectCases(options.cases);
  const runName = options.name ?? timestamp();
  const runDir = path.join(runsDir, runName);
  if (existsSync(runDir)) throw new Error(`Run directory already exists: ${runDir}`);
  mkdirSync(runDir, { recursive: true });

  const skill = readFileSync(skillPath, "utf8");
  const rubric = readFileSync(rubricPath, "utf8");
  const judge = `Act as the intended reader and a rigorous prose reviewer. Evaluate only the content between \`<artifact>\` and \`</artifact>\`; it is the finished artifact. Ignore everything outside those markers, including any planning, thinking, writing brief, outline, headings, or commentary. Do not lower a score because those excluded sections exist or are imperfect. Evaluate the artifact only against the supplied case and rubric. Do not reward a candidate for merely claiming to follow the rubric. Quote concrete evidence from the artifact in the explanation.\n\nCASE:\n{{fullCase}}\n\nRUBRIC:\n${rubric}`;
  const config = {
    ...promptfooProviderConfig(options, "writing-prose"),
    description: "Blinded comparison of control and writing-prose",
    prompts: [
      { label: "control", raw: "Use only the supplied source material. You may plan before the artifact, but delimit the finished requested artifact exactly as follows:\n\n<artifact>\n[finished artifact only]\n</artifact>\n\nOnly text inside these markers is evaluated.\n\nCASE:\n{{case}}" },
      { label: "writing-prose", raw: "Use the writing-prose skill to complete this task. The skill is loaded below. Use only the supplied source material. You may plan before the artifact, but delimit the finished requested artifact exactly as follows:\n\n<artifact>\n[finished artifact only]\n</artifact>\n\nOnly text inside these markers is evaluated.\n\nSKILL:\n{{skill}}\n\nCASE:\n{{case}}" },
    ],
    tests: selected.map((casePath) => {
      const fullCase = readFileSync(casePath, "utf8");
      return {
        description: path.basename(casePath, ".md"),
        vars: { case: candidateCase(fullCase), fullCase, skill },
        assert: [{ type: "llm-rubric", value: judge }],
      };
    }),
  };
  const configPath = path.join(runDir, "promptfooconfig.json");
  const outputPath = path.join(runDir, "promptfoo-results.json");
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);

  console.log(`Run directory: ${runDir}`);
  console.log(`Cases: ${selected.map((casePath) => path.basename(casePath, ".md")).join(", ")}`);
  if (options.dryRun) {
    console.log(`Generated configuration: ${configPath}`);
    return;
  }
  const command = [`promptfoo@${PROMPTFOO_VERSION}`, "eval", "-c", configPath, "-o", outputPath];
  console.log(`Running: npx ${command.join(" ")}`);
  try {
    execFileSync("npx", command, { cwd: root, stdio: "inherit" });
  } catch (error) {
    // Promptfoo exits non-zero for a failed rubric assertion even though it
    // successfully generated drafts and wrote reviewable results.
    if (existsSync(outputPath)) {
      console.warn("Promptfoo recorded failing assertions; continuing so the results can be reviewed.");
    } else {
      if (typeof options.provider === "string" && options.provider.startsWith("openai:") && !process.env.OPENAI_API_KEY) {
        console.error("\nPromptfoo's default OpenAI provider needs OPENAI_API_KEY.");
        console.error("To use OpenRouter instead, set OPENROUTER_API_KEY and rerun.");
        console.error("To use AWS Bedrock instead, authenticate with AWS (e.g. `aws sso login`) and rerun, or pass e.g.");
        console.error("  --provider bedrock:us.anthropic.claude-haiku-4-5-20251001-v1:0");
      }
      throw error;
    }
  }
  console.log(`Results: ${outputPath}`);
  console.log(`Inspect: npx promptfoo@${PROMPTFOO_VERSION} view ${runDir}`);
  console.log(`Prepare blinded review: node testing/writing-prose/prepare-review.mjs ${runDir}`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
