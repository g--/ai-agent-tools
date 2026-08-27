#!/usr/bin/env node
/** Run every selected skill suite under a unique UTC name, then open Promptfoo. */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { PROMPTFOO_VERSION } from "./provider.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const runName = new Date()
  .toISOString()
  .replaceAll("-", "")
  .replaceAll(":", "")
  .replace(/\.\d{3}Z$/, "Z");
const runDir = path.join(here, "runs", runName);
const args = process.argv.slice(2);

console.log(`Run name: ${runName}`);
execFileSync("node", [path.join(here, "run-all.mjs"), "--name", runName, ...args], {
  cwd: root,
  stdio: "inherit",
});

console.log(`Opening Promptfoo viewer for ${runDir}`);
execFileSync("npx", [`promptfoo@${PROMPTFOO_VERSION}`, "view", runDir], {
  cwd: root,
  stdio: "inherit",
});
