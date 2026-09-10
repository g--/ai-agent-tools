#!/usr/bin/env node
/** Create randomly labeled paired drafts for human review from Promptfoo JSON. */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
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

function providerName(entry) {
  const provider = entry.provider ?? entry.prompt?.provider;
  return typeof provider === "string" ? provider : provider?.label ?? provider?.id ?? "unknown-provider";
}

export function reviewPairs(entries) {
  const drafts = entries.map((entry) => {
    const prompt = entry.prompt?.label ?? entry.promptLabel;
    const provider = providerName(entry);
    return {
      prompt,
      label: `${provider}: ${prompt}`,
      name: `${provider}-${prompt}`.replace(/[^a-z0-9.-]+/gi, "-").replace(/^-|-$/g, ""),
      text: responseText(entry.response ?? entry.output),
    };
  });
  const controls = drafts.filter((draft) => draft.prompt === "control");
  if (controls.length !== 1) return [];
  return drafts.filter((draft) => draft.prompt !== "control").map((draft) => ({ name: draft.name, drafts: [controls[0], draft] }));
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
    const pairs = reviewPairs(entries);
    if (pairs.length === 0) {
      console.log(`Skipping ${caseName}: expected one control and at least one evaluated draft`);
      continue;
    }
    for (const pair of pairs) {
      const drafts = [...pair.drafts];
      if (random() < 0.5) [drafts[0], drafts[1]] = [drafts[1], drafts[0]];
      const packet = path.join(runDirectory, "review", caseName, ...(pairs.length > 1 ? [pair.name] : []));
      mkdirSync(packet, { recursive: true });
      writeFileSync(path.join(packet, "a.md"), `${drafts[0].text.trim()}\n`);
      writeFileSync(path.join(packet, "b.md"), `${drafts[1].text.trim()}\n`);
      writeFileSync(path.join(packet, "mapping.private.md"), `A: ${drafts[0].label}\nB: ${drafts[1].label}\n`);
      console.log(`Prepared ${packet}; keep mapping.private.md hidden until review is complete.`);
    }
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
