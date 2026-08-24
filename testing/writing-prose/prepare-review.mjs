#!/usr/bin/env node
/** Create randomly labeled paired drafts for human review from Promptfoo JSON. */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function usage() {
  console.log("Usage: node testing/writing-prose/prepare-review.mjs <run-directory> [--seed <number>]");
}

function parseArgs(argv) {
  let runDirectory;
  let seed;
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--seed") {
      seed = Number(argv[index + 1]);
      index += 1;
    } else if (!runDirectory) {
      runDirectory = argv[index];
    } else {
      throw new Error(`Unexpected argument: ${argv[index]}`);
    }
  }
  if (!runDirectory) {
    usage();
    process.exit(1);
  }
  return { runDirectory: path.resolve(runDirectory), seed };
}

function seededRandom(seed) {
  let state = Number.isFinite(seed) ? seed >>> 0 : Math.floor(Math.random() * 0xffffffff);
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function responseText(response) {
  if (typeof response === "string") return response;
  if (response && typeof response === "object") {
    for (const key of ["output", "text", "content"]) {
      if (typeof response[key] === "string") return response[key];
    }
  }
  return String(response ?? "");
}

function main() {
  const { runDirectory, seed } = parseArgs(process.argv.slice(2));
  const data = JSON.parse(readFileSync(path.join(runDirectory, "promptfoo-results.json"), "utf8"));
  const rows = data.results?.results ?? data.results ?? [];
  const grouped = new Map();
  for (const row of rows) {
    const caseName = row.testCase?.description ?? row.description;
    if (!caseName) continue;
    grouped.set(caseName, [...(grouped.get(caseName) ?? []), row]);
  }

  const random = seededRandom(seed);
  for (const [caseName, entries] of grouped) {
    const drafts = entries.map((entry) => ({
      label: entry.prompt?.label ?? entry.promptLabel,
      text: responseText(entry.response ?? entry.output),
    }));
    if (drafts.length !== 2) {
      console.log(`Skipping ${caseName}: expected two drafts, found ${drafts.length}`);
      continue;
    }
    if (random() < 0.5) [drafts[0], drafts[1]] = [drafts[1], drafts[0]];
    const packet = path.join(runDirectory, "review", caseName);
    mkdirSync(packet, { recursive: true });
    writeFileSync(path.join(packet, "a.md"), `${drafts[0].text.trim()}\n`);
    writeFileSync(path.join(packet, "b.md"), `${drafts[1].text.trim()}\n`);
    writeFileSync(path.join(packet, "mapping.private.md"), `A: ${drafts[0].label}\nB: ${drafts[1].label}\n`);
    console.log(`Prepared ${packet}; keep mapping.private.md hidden until review is complete.`);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
