import { readFileSync } from "node:fs";

function providerName(row) {
  const provider = row.provider;
  return typeof provider === "string" ? provider : provider?.label ?? provider?.id ?? "unknown-provider";
}

function reportedCost(row) {
  const accountCharge = row.metadata?.openrouter?.accountCharge ?? row.response?.metadata?.openrouter?.accountCharge;
  if (Number.isFinite(accountCharge)) return accountCharge;
  if (Number.isFinite(row.cost) && row.cost > 0) return row.cost;
  if (row.cost === 0 && (row.cached === true || row.response?.cached === true)) return 0;
  return null;
}

export function summarizeRows(rows, providers = new Map()) {
  for (const row of rows) {
    const name = providerName(row);
    const summary = providers.get(name) ?? { calls: 0, reportedCalls: 0, cost: 0 };
    const cost = reportedCost(row);
    summary.calls += 1;
    if (cost !== null) {
      summary.reportedCalls += 1;
      summary.cost += cost;
    }
    providers.set(name, summary);
  }
  return providers;
}

export function summarizeCosts(files) {
  const providers = new Map();
  for (const file of files) {
    const data = JSON.parse(readFileSync(file, "utf8"));
    summarizeRows(data.results?.results ?? [], providers);
  }
  return providers;
}

function calls(count) {
  return `${count} ${count === 1 ? "call" : "calls"}`;
}

export function formatCosts(providers) {
  const lines = ["Reported generation cost (rubric-judge calls excluded):"];
  let total = 0;
  let unavailable = 0;
  for (const [provider, summary] of providers) {
    const missing = summary.calls - summary.reportedCalls;
    total += summary.cost;
    unavailable += missing;
    if (summary.reportedCalls === 0) {
      lines.push(`  ${provider}: unavailable (${calls(summary.calls)})`);
    } else if (missing > 0) {
      lines.push(`  ${provider}: $${summary.cost.toFixed(6)} (${calls(summary.reportedCalls)} reported; ${calls(missing)} unavailable)`);
    } else {
      lines.push(`  ${provider}: $${summary.cost.toFixed(6)} (${calls(summary.calls)})`);
    }
  }
  if (providers.size === 0) lines.push("  No result rows found.");
  else if (unavailable > 0) lines.push(`  Known total: $${total.toFixed(6)}; ${calls(unavailable)} did not report dollar cost.`);
  else lines.push(`  Total: $${total.toFixed(6)}`);
  return lines.join("\n");
}
