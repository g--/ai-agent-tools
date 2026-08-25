#!/usr/bin/env python3
"""Run all or selected writing-prose cases through Promptfoo.

The generated configuration deliberately keeps the baseline and skill prompts
separate, so Promptfoo displays them as two alternatives for each case.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from datetime import UTC, datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
CASES = HERE / "cases"
SKILL = ROOT / "skills" / "writing-prose" / "SKILL.md"
RUBRIC = ROOT / "skills" / "review-prose" / "rubric.md"
RUNS = HERE / "runs"

# Pinned below latest: promptfoo 0.121.x carries the fix for the circular-JSON
# crash triggered by the AWS SDK's Bedrock client (promptfoo#7266, #8687/#8688).
PROMPTFOO_VERSION = "0.121.20"


def default_provider() -> str:
    if os.environ.get("OPENROUTER_API_KEY"):
        return "openrouter:openai/gpt-5.6-luna"
    if os.environ.get("AWS_BEARER_TOKEN_BEDROCK") or os.environ.get("AWS_PROFILE") or os.environ.get("AWS_ACCESS_KEY_ID"):
        return "bedrock:us.anthropic.claude-haiku-4-5-20251001-v1:0"
    return "openai:gpt-4o-mini"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Evaluate writing-prose with Promptfoo")
    parser.add_argument("cases", nargs="*", help="Case names, with or without .md; omit for all cases")
    parser.add_argument(
        "--provider",
        default=default_provider(),
        help="Promptfoo provider (default: OPENROUTER_API_KEY > AWS credentials (Bedrock) > openai:gpt-4o-mini)",
    )
    parser.add_argument("--name", help="Run name; default is a UTC timestamp")
    parser.add_argument("--dry-run", action="store_true", help="Write the generated config but do not invoke Promptfoo")
    return parser.parse_args()


def select_cases(names: list[str]) -> list[Path]:
    available = {path.stem: path for path in CASES.glob("*.md")}
    if not names:
        return sorted(available.values())
    selected = []
    for name in names:
        key = Path(name).stem
        if key not in available:
            choices = ", ".join(sorted(available)) or "none"
            raise SystemExit(f"Unknown case '{name}'. Available cases: {choices}")
        selected.append(available[key])
    return selected


def main() -> int:
    args = parse_args()
    cases = select_cases(args.cases)
    if not cases:
        raise SystemExit("No cases found.")

    run_name = args.name or datetime.now(UTC).strftime("%Y%m%dT%H%M%SZ")
    run_dir = RUNS / run_name
    run_dir.mkdir(parents=True, exist_ok=False)

    skill = SKILL.read_text()
    rubric = RUBRIC.read_text()
    judge = (
        "Act as the intended reader and a rigorous prose reviewer. Evaluate the "
        "candidate only against the supplied case and rubric. Do not reward a "
        "candidate for merely claiming to follow the rubric. Quote concrete evidence "
        "in the explanation.\n\nCASE:\n{{case}}\n\nRUBRIC:\n" + rubric
    )
    config = {
        "description": "Blinded comparison of baseline and writing-prose",
        "providers": [args.provider],
        "prompts": [
            {
                "label": "baseline",
                "raw": "Produce the requested artifact. Use only the supplied source material.\n\n{{case}}",
            },
            {
                "label": "writing-prose",
                "raw": "Follow these skill instructions before producing the requested artifact. Use only the supplied source material.\n\nSKILL:\n{{skill}}\n\nCASE:\n{{case}}",
            },
        ],
        "tests": [
            {
                "description": case.stem,
                "vars": {"case": case.read_text(), "skill": skill},
                "assert": [
                    {"type": "llm-rubric", "value": judge},
                ],
            }
            for case in cases
        ],
    }
    config_path = run_dir / "promptfooconfig.json"
    output_path = run_dir / "promptfoo-results.json"
    config_path.write_text(json.dumps(config, indent=2) + "\n")

    print(f"Run directory: {run_dir}")
    print(f"Cases: {', '.join(case.stem for case in cases)}")
    if args.dry_run:
        print(f"Generated configuration: {config_path}")
        return 0

    command = ["npx", f"promptfoo@{PROMPTFOO_VERSION}", "eval", "-c", str(config_path), "-o", str(output_path)]
    print("Running:", " ".join(command))
    result = subprocess.run(command, cwd=ROOT)
    if result.returncode:
        return result.returncode
    print(f"Results: {output_path}")
    print("Inspect automated outputs and grades with:")
    print(f"  npx promptfoo@{PROMPTFOO_VERSION} view --output {output_path}")
    print("Then create blinded human-review files with:")
    print(f"  python3 testing/writing-prose/prepare_review.py {run_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
