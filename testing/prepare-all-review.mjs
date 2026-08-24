#!/usr/bin/env node
/** Prepare anonymous A/B review packets for every suite in one run. */

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const here = path.dirname(new URL(import.meta.url).pathname);
const helper = path.join(here, "writing-prose", "prepare-review.mjs");
const runDir = process.argv[2];
if (!runDir) {
  console.error("Usage: node testing/prepare-all-review.mjs <run-directory> [--seed <number>]");
  process.exit(1);
}
const extra = process.argv.slice(3);
for (const entry of readdirSync(runDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const suiteDir = path.join(runDir, entry.name);
  if (!existsSync(path.join(suiteDir, "promptfoo-results.json"))) continue;
  console.log(`Preparing ${entry.name}`);
  execFileSync("node", [helper, suiteDir, ...extra], { stdio: "inherit" });
}
