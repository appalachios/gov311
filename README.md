# ![Gov311](assets/brand/gov311-banner.png)

Gov311 is a plugin for AI assistants such as Claude and ChatGPT. It teaches the assistant how to answer questions about government. You ask in plain words, and the assistant tells you which office handles your question, what to do first, and where the official page is.

Many cities have a 311 phone line for questions about local services. Gov311 does that job in a chat. It covers Tennessee state government, all 95 counties, all 345 cities and towns, and some federal services. Volunteers run Gov311. No government agency does.

## What you can ask

- "There's a pothole on my road just outside Benton. Does the city, the county, or the state fix it?"
- "Who takes my property tax payment in Polk County?"
- "Do I need a permit to build a deck in Nashville?"
- "I just lost my job. What help can I apply for, and where do I start?"
- "My landlord will not fix the heat. What does Tennessee law require?"
- "Ducktown had a property tax rate ordinance on last month's agenda. How do I find out whether it passed?"
- "I'm reading a Tennessee bill about school discipline. How can I tell whether an amendment changed what it does?"

Say which city you live in. If you live outside city limits, name your county. A mailing address can carry a city's name and still sit outside that city.

In an emergency, call 911.

## What the plugin adds

The plugin gives your assistant three skills. A skill is a set of instructions the assistant follows for one kind of question.

| Skill | What it handles | Slash command |
| --- | --- | --- |
| Gov311 | Working out whether your question belongs to the city, the county, the state, or the federal government | `/gov311:gov311` |
| Gov311 Services | Applying, paying, requesting a record, reaching an office, or finding free help | `/gov311:gov311-services` |
| Gov311 Laws | Following a bill or local ordinance, preparing for a public meeting, or finding the rule in force today | `/gov311:gov311-laws` |

You don't have to choose a skill. Ask your question and the assistant picks the one that fits.

To choose one yourself in Claude Code, type its slash command and then your question.

```text
/gov311:gov311 There's a pothole on my road just outside Benton. Does the city, the county, or the state fix it?
```

```text
/gov311:gov311-services Who takes my property tax payment in Polk County?
```

```text
/gov311:gov311-laws Ducktown had a property tax rate ordinance on last month's agenda. How do I find out whether it passed?
```

Other apps have no slash commands for skills. Name the skill in your message, such as "Use Gov311 Laws to find out whether Ducktown passed its property tax rate ordinance."

The skills work from [reference notes on each government](data) kept in this repository. The notes point the assistant to the official source, and the assistant reads that source before it answers.

## Add Gov311 to your assistant

### Try it first

You can try Gov311 in any chat app before you add anything. Open a new chat in [Claude](https://claude.ai/), [ChatGPT](https://chatgpt.com/), or [Grok](https://grok.com/) and paste this message. Replace the last line with your own question.

```text
Read the Gov311 instructions here.
https://raw.githubusercontent.com/appalachios/gov311/main/skills/gov311/SKILL.md
Find the guide in this index.
https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt

Open the matching guide and check its official sources. Link me to
the pages that support the answer. Include the guide's trust level,
who checked it, and when.

Do I need a permit to build a deck in Nashville?
```

If the assistant says it can't open links, turn on web search in the app and send the message again.

### Claude

1. Download the skills: [Gov311](assets/gov311-skill.zip), [Gov311 Services](assets/gov311-services-skill.zip), and [Gov311 Laws](assets/gov311-laws-skill.zip). If GitHub shows a file page, select **View raw**.
2. In Claude, open **Customize → Skills → + → Create skill → Upload a skill**.
3. Choose a downloaded file and turn the skill on. Repeat for the other two.

Your account needs code execution and file creation turned on. [Claude skills help](https://support.claude.com/en/articles/12512180-use-skills-in-claude)

### Claude Code

Enter these two commands, one at a time. They install the plugin with all three skills.

```text
/plugin marketplace add appalachios/gov311
```

```text
/plugin install gov311@gov311
```

### ChatGPT and Grok Bot

Send this message to save the Gov311 skill.

```text
Save a personal skill named Gov311. Use the instructions in
https://raw.githubusercontent.com/appalachios/gov311/main/skills/gov311/SKILL.md
Keep the link to the public guide index so you can look up the guide
each time I ask a question.
```

In ChatGPT, open **Plugins → Skills → Create → Create with chat** first. Skills there require a Business, Enterprise, Healthcare, or Edu workspace. [ChatGPT skills help](https://help.openai.com/en/articles/20001066-skills-in-chatgpt) · [Grok Bot skills help](https://docs.x.ai/grok-bot/skills-routines-and-automations)

## Check the answer

An assistant can be wrong. Open the official page before you rely on a fee, a deadline, or a bill's status. For advice about how a law applies to you, ask a lawyer or a legal aid office.

Each answer should include a trust level that says how carefully the information was checked.

| Trust level | What it means |
| --- | --- |
| `draft` | Researched, but not yet fully checked against official sources |
| `source-checked` | A named person or tool checked it against the official sources on the date shown |
| `community` | A community contributor checked it |
| `verified` | A second person independently confirmed it |
| `official` | An employee of that government submitted or confirmed it |

## Help improve it

If you know how something works in your town, add it or fix what we got wrong. [CONTRIBUTING.md](CONTRIBUTING.md) explains how. Government employees are welcome to keep their own agency's information current.

## For developers

| Path | What it holds |
| --- | --- |
| [`skills`](skills) | The three skills. Copy the folders into any tool that supports Agent Skills. |
| [`.claude-plugin`](.claude-plugin) | The Claude Code plugin and its catalog entry |
| [`mcp-server`](mcp-server) | A local MCP server with four tools: `find_jurisdiction`, `list_jurisdictions`, `search`, and `get_entry` |
| [`data`](data) | The reference notes, one folder for each government, in the format set by [`data/_schema`](data/_schema) |
| [`llms.txt`](llms.txt) | An index of the notes for tools that can only read the web |
| [`scripts`](scripts) | The checks that run on every change |

The skills use the MCP server when it is present and the public index when it is not. To run the server, install [Node.js](https://nodejs.org) 20 or later, clone this repository, and run `npm ci`. Then add this entry to your client's MCP settings with the full path to your copy.

```json
{
  "mcpServers": {
    "gov311": {
      "command": "node",
      "args": ["/path/to/gov311/mcp-server/server.js"]
    }
  }
}
```

## License

Gov311 is licensed under the [Apache License 2.0](LICENSE).
