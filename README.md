# AI Agent Tools

Reusable Agent Skills for AI coding agents. This repository currently provides `writing-prose`, which helps agents write clear, concise reader-facing material—from commit messages and pull request descriptions to decision documents and documentation.

## Install

Install the repository with [Skills.sh](https://skills.sh/), which lets you select skills and a supported agent:

```sh
npx skills add g--/ai-agent-tools
```

The interactive installer can install `writing-prose` alone or any other skill added to this repository. To inspect its current options and supported agents, run:

```sh
npx skills add --help
```

If Skills.sh does not support your agent, install the skill manually. Clone this repository, then copy `skills/writing-prose` into the skills directory configured for your agent:

```sh
git clone https://github.com/g--/ai-agent-tools.git
cp -R ai-agent-tools/skills/writing-prose <your-agent-skills-directory>/
```

During local development, symlink the same directory instead:

```sh
ln -s "$(pwd)/ai-agent-tools/skills/writing-prose" \
  <your-agent-skills-directory>/writing-prose
```

Consult your agent's documentation for its skills directory and whether it needs a restart or reload after installation.

## Skill format

Each skill is a directory containing a `SKILL.md` file. Its YAML frontmatter includes at least a `name` and `description`; the rest of the file gives the agent the instructions it needs to follow. Skills may also include scripts, references, or assets when those resources make the instructions easier to apply.

## License

See [LICENSE](LICENSE).
