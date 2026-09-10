#!/usr/bin/env node
/** Run all selected focused-skill test suites in one timestamped evaluation. */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PROMPTFOO_VERSION, PROVIDER_HELP, promptfooProviderConfig, selectProviders, validateProvider } from "./provider.mjs";
import { candidateCase } from "./case.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const skillsRoot = path.join(root, "skills");
const rubric = readFileSync(path.join(skillsRoot, "review-prose/rubric.md"), "utf8");

function usage() {
  console.log(`Usage: node testing/run-all.mjs [options] [skill ...]

Run every tested skill, or only the named skill suites, in one reviewable run.
Options: --provider <provider>  --name <name>  --dry-run  --help
Provider default: ${PROVIDER_HELP}`);
}
function parse(argv) {
  const options = { provider: undefined, dryRun: false, skills: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help") { usage(); process.exit(0); }
    if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--provider" || arg === "--name") { if (!argv[i + 1]) throw new Error(`${arg} needs a value`); options[arg.slice(2)] = argv[++i]; }
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    else options.skills.push(arg);
  }
  Object.assign(options, selectProviders(options.provider));
  return options;
}
function availableSkills() {
  return readdirSync(here, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(here, entry.name, "cases")) && existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name).sort();
}
function stamp() { return new Date().toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}Z$/, "Z"); }
function main() {
  const options = parse(process.argv.slice(2));
  if (!options.dryRun) validateProvider(options.provider);
  const known = availableSkills();
  const skills = options.skills.length ? options.skills : known;
  for (const skill of skills) if (!known.includes(skill)) throw new Error(`Unknown tested skill '${skill}'. Available: ${known.join(", ")}`);
  const runDir = path.join(here, "runs", options.name ?? stamp());
  if (existsSync(runDir)) throw new Error(`Run directory already exists: ${runDir}`);
  mkdirSync(runDir, { recursive: true });
  const buildJudge = (golden) => `Act as the intended reader and a rigorous prose reviewer. Evaluate only the content between \`<artifact>\` and \`</artifact>\`; it is the finished artifact. Ignore everything outside those markers, including any planning, thinking, headings, or commentary. Do not lower a score because those excluded sections exist or are imperfect. Quote evidence from the artifact.\n\nCASE:\n{{fullCase}}\n${golden ? `\nREFERENCE (hand-approved for this case; the artifact should meet or exceed this quality bar, though it need not match it exactly):\n${golden}\n` : ""}\nRUBRIC:\n${rubric}`;

  for (const skill of skills) {
    const casesDir = path.join(here, skill, "cases");
    const cases = readdirSync(casesDir).filter((file) => file.endsWith(".md")).sort();
    const suiteDir = path.join(runDir, skill);
    mkdirSync(suiteDir);
    const skillText = readFileSync(path.join(skillsRoot, skill, "SKILL.md"), "utf8");
    const config = {
      ...promptfooProviderConfig(options, skill),
      description: `Blinded comparison of control and ${skill}`,
      prompts: [
        { label: "control", raw: "Use only the supplied source material. You may plan before the artifact, but delimit the finished requested artifact exactly as follows:\n\n<artifact>\n[finished artifact only]\n</artifact>\n\nOnly text inside these markers is evaluated.\n\nCASE:\n{{case}}" },
        { label: skill, raw: `Use the ${skill} skill to complete this task. The skill is loaded below. Use only the supplied source material. You may plan before the artifact, but delimit the finished requested artifact exactly as follows:\n\n<artifact>\n[finished artifact only]\n</artifact>\n\nOnly text inside these markers is evaluated.\n\nSKILL:\n${skillText}\n\nCASE:\n{{case}}` },
      ],
      tests: cases.map((file) => {
        const goldenPath = path.join(here, skill, "golden", file);
        const golden = existsSync(goldenPath) ? readFileSync(goldenPath, "utf8") : null;
        const fullCase = readFileSync(path.join(casesDir, file), "utf8");
        return { description: path.basename(file, ".md"), vars: { case: candidateCase(fullCase), fullCase }, assert: [{ type: "llm-rubric", value: buildJudge(golden) }] };
      }),
    };
    const configPath = path.join(suiteDir, "promptfooconfig.json");
    writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
    console.log(`${skill}: ${cases.join(", ")}`);
    if (!options.dryRun) {
      // A failed rubric assertion is a finding to review, not a harness failure.
      // Promptfoo exits non-zero when any assertion fails even after writing results.
      try {
        execFileSync("npx", [`promptfoo@${PROMPTFOO_VERSION}`, "eval", "-c", configPath, "-o", path.join(suiteDir, "promptfoo-results.json")], { cwd: root, stdio: "inherit" });
      } catch (error) {
        const resultsPath = path.join(suiteDir, "promptfoo-results.json");
        if (!existsSync(resultsPath)) throw error;
        console.warn(`${skill}: Promptfoo recorded failing assertions; continuing so every suite is available for review.`);
      }
    }
  }
  console.log(`Run directory: ${runDir}`);
  console.log(options.dryRun ? "Configuration generated." : `Inspect: npx promptfoo@${PROMPTFOO_VERSION} view ${runDir}`);
  if (!options.dryRun) console.log(`Prepare blind review: node testing/prepare-all-review.mjs ${runDir}`);
}
try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
