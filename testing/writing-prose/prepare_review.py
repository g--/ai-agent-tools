#!/usr/bin/env python3
"""Create randomly labeled paired drafts for a human review from Promptfoo JSON."""

from __future__ import annotations

import argparse
import json
import random
from pathlib import Path


def text(value: object) -> str:
    if isinstance(value, str):
        return value
    if isinstance(value, dict):
        for key in ("output", "text", "content"):
            if isinstance(value.get(key), str):
                return value[key]
    return str(value)


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare blind prose-review packets")
    parser.add_argument("run_directory", type=Path)
    parser.add_argument("--seed", type=int, help="Optional reproducible shuffle seed")
    args = parser.parse_args()

    result_path = args.run_directory / "promptfoo-results.json"
    data = json.loads(result_path.read_text())
    rows = data.get("results", {}).get("results", data.get("results", []))
    grouped: dict[str, list[dict]] = {}
    for row in rows:
        case = row.get("testCase", {}).get("description") or row.get("description")
        if not case:
            continue
        grouped.setdefault(case, []).append(row)

    rng = random.Random(args.seed)
    for case, entries in grouped.items():
        drafts = []
        for entry in entries:
            label = entry.get("prompt", {}).get("label") or entry.get("promptLabel")
            response = entry.get("response", entry.get("output", ""))
            drafts.append((str(label), text(response)))
        if len(drafts) != 2:
            print(f"Skipping {case}: expected two drafts, found {len(drafts)}")
            continue
        rng.shuffle(drafts)
        packet = args.run_directory / "review" / case
        packet.mkdir(parents=True, exist_ok=True)
        for destination, (_, draft) in zip(("a.md", "b.md"), drafts):
            (packet / destination).write_text(draft.rstrip() + "\n")
        mapping = "\n".join(f"{letter.upper()}: {label}" for letter, (label, _) in zip(("a", "b"), drafts)) + "\n"
        (packet / "mapping.private.md").write_text(mapping)
        print(f"Prepared {packet}; keep mapping.private.md hidden until review is complete.")


if __name__ == "__main__":
    main()
