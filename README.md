# AI Agent Tools

Reusable Agent Skills for AI coding agents. This repository provides:

- `writing-prose` for clear, concise reader-facing material;
- `bullet-journal` for concise, linked Logseq and block-outliner journal entries;
- `commit-message` for Git history-facing commit subjects and bodies;
- `pull-request` for self-contained, review-focused pull request descriptions;
- `copy-editing` for improving an existing draft while preserving its intended meaning and material structure;
- `review-prose` for evaluating a draft or comparing alternatives against a reader-outcome rubric;
- `decision-writing` for durable, auditable decision records and memos.

The focused skills build on the prose-writing discipline while supplying artifact-specific guidance.

## Install

Install the repository with [Skills.sh](https://skills.sh/), which lets you select skills and a supported agent:

```sh
npx skills add g--/ai-agent-tools
```

The interactive installer can install any of the skills above. To inspect its current options and supported agents, run:

```sh
npx skills add --help
```

If Skills.sh does not support your agent, install a skill manually. Clone this repository, then copy the desired directory into the skills directory configured for your agent:

```sh
git clone https://github.com/g--/ai-agent-tools.git
cp -R ai-agent-tools/skills/commit-message <your-agent-skills-directory>/
```

During local development, symlink the desired directory instead:

```sh
ln -s "$(pwd)/ai-agent-tools/skills/commit-message" \
  <your-agent-skills-directory>/commit-message
```

Replace `commit-message` with the directory name of the skill you want to install.

Consult your agent's documentation for its skills directory and whether it needs a restart or reload after installation.

## Skill format

Each skill is a directory containing a `SKILL.md` file. Its YAML frontmatter includes at least a `name` and `description`; the rest of the file gives the agent the instructions it needs to follow. Skills may also include scripts, references, or assets when those resources make the instructions easier to apply.

## License

See [LICENSE](LICENSE).
