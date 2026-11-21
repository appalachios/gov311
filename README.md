# Gov311

Gov311 makes government easier to understand. Ask an AI assistant how to get a permit, who to call about a problem, or where to read your rights as a renter. It uses plain-language guides that point you to the office or official source for your question.

Many cities run a 311 phone line for questions about city services. Gov311 brings that idea to AI tools, for every level of government.

Each guide covers a task, an office, a law, or a place to get help. It lists its official sources, research or review date, and who checked it. A guide marked `draft` still needs human review. The guides are plain text files in this repository, so any AI tool can read them and anyone can improve them.

Gov311 is a map to the law. It is not a source of law. A guide tells the assistant where a rule, a fee, or a deadline is officially published and how to find it. The assistant then reads the current version from that official page. Gov311 does not keep its own copy of any law, code, or fee schedule.

Gov311 is a community project. It is not an official government channel and it is not legal advice.

> [!NOTE]
> Gov311 covers Tennessee state government, Nashville, and selected federal services. The statewide guides are research drafts awaiting human review. [Find a Tennessee state office](data/us/tn/_state/contacts/state-government-directory.md) or [add your city or county](CONTRIBUTING.md).

## Who Gov311 is for

### People who need help now

If you need food, housing, health coverage, or help paying bills, the hard part is often finding which office handles it and what to bring. Gov311 tells you who to contact first and what to have ready.

Things you can ask:

- "I just lost my job. What help can I apply for, and where do I start?"
- "Who do I call in Nashville when I need help with rent?"
- "What is 211, and what happens when I call it?"

In an emergency, call 911. Gov311 covers non-emergency services.

### Renters

Your protections as a renter come mostly from state law, and they are hard to find and hard to read. Gov311 points the assistant to the law itself, to plain-language guides from legal aid organizations, and to free legal help near you.

Things you can ask:

- "My landlord gave me an eviction notice. How much time do I have, and who can help me for free?"
- "My landlord will not fix the heat. What does Tennessee law require?"
- "What are the rules for getting my security deposit back?"

The assistant can explain what the official sources say. A lawyer or tenant advocate can tell you how the law applies to your situation, and Gov311 tells you how to reach one.

### Homeowners

Most home projects raise the same questions. Do you need a permit? What does it cost? Can you do the work yourself? Who inspects it?

Things you can ask:

- "Do I need a permit to build a deck in Nashville?"
- "How do I apply for a building permit for my own house?"
- "Who do I report a problem to on my street?"

### Nonprofits

Grants, registrations, and permits each have their own system and their own deadlines. Gov311 lays out the steps in order, including the ones that take weeks, so that you can start them early.

Things you can ask:

- "What do we need to set up before we can apply for a federal grant?"
- "Does our nonprofit have to register with the state before we ask for donations in Tennessee?"
- "How long does it take to register in SAM.gov, and what does it cost?"

### Builders, architects, and contractors

Every jurisdiction adopts its own editions of the building codes and adds its own amendments. Gov311 tells you where a jurisdiction publishes the codes it enforces, where the local amendments and the zoning map are, and which office to call with a question.

Things you can ask:

- "Which edition of the residential code does Nashville enforce?"
- "Where is the official zoning map for Davidson County?"
- "What does the plan review process look like for a residential addition?"

Gov311 points to the code. It does not restate the code. Confirm the requirement in the official text before you design or build to it.

### Small business owners

Tennessee business owners can [form an LLC](data/us/tn/_state/services/form-tennessee-llc.md), [register for business tax](data/us/tn/_state/services/register-for-business-tax.md), or [find state contracts open for bids](data/us/tn/_state/services/bid-on-state-contracts.md).

### People following state legislation

To see what Tennessee lawmakers are considering, [find a pending bill](data/us/tn/_state/services/track-a-bill.md) or [look up a hearing](data/us/tn/_state/services/find-legislative-hearings.md). The [guide to how a bill becomes law](data/us/tn/_state/services/legislative-process.md) explains which decisions still lie ahead.

A bill can keep its title while an amendment replaces its contents. One Tennessee education bill started with a proposal about parent-teacher engagement and became a law about school discipline. [Follow the amendments and votes](data/us/tn/_state/services/read-a-caption-bill.md) or [learn how to read an enacted public chapter](data/us/tn/_state/services/read-a-public-chapter.md).

### Everyone else

Voting, taxes, records, parking tickets, and trash pickup all belong here too. If your government does it, a guide to it can live in Gov311.

## How to use Gov311

Pick the option that matches your AI tool. In every case you then ask your question in your own words. Tell the assistant your city and state, because the answer often depends on where you live.

### Claude Code

Add this repository as a plugin marketplace, then install the plugin.

```
/plugin marketplace add appalachios/gov311
```

```
/plugin install gov311@gov311
```

Claude uses the Gov311 skill whenever you ask a question about a government service.

### Any tool that supports MCP

The Model Context Protocol (MCP) is a standard way to connect an AI tool to an outside source of information. Claude, ChatGPT, Cursor, VS Code, and many other tools support it. Gov311 includes an MCP server that lets the tool look up a place, search the guides, and read one in full.

You need [Node.js](https://nodejs.org) version 20 or later. First, download Gov311 and install what it needs.

```bash
git clone https://github.com/appalachios/gov311.git
```

```bash
cd gov311 && npm install
```

Then add the server to your AI tool's MCP settings. Most tools use this format. Replace the path with the location of your copy.

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

### Any tool that supports Agent Skills

A skill is a set of written instructions that tells an AI tool how to do a kind of task. The Gov311 skill is at [`skills/gov311/SKILL.md`](skills/gov311/SKILL.md). It tells the assistant how to find the right government, how to answer, and when to send a person to a lawyer or a help line. Copy the `skills/gov311` folder into your tool's skills folder. The skill reads the guides through the MCP server, from a local copy of this repository, or from the web.

### Any tool that can read a web page

Give your assistant this link and ask your question.

```
https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt
```

The file lists every guide with a link to its full text.

### No AI tool at all

Every guide is a readable text file. Browse the [`data`](data) folder by country, state, and city.

## What a good answer looks like

An assistant that uses Gov311 gives you:

- The steps, in order, in plain language.
- The form to file, and the current cost and deadline as the official page states them.
- The office to contact, with its phone number and hours.
- Links to the official sources.
- The guide’s research or review date and whether it still needs human review.

If Gov311 has no guide for your question, the assistant says so. It may then search official government websites, and it tells you that a contributor has not verified that part of the answer.

### When an official site blocks the assistant

Some government sites ask visitors to prove they are a person with a CAPTCHA, or turn away AI tools entirely. An assistant that uses Gov311 does not try to get past these blocks. Each guide records which sites are blocked, so the assistant goes to an open source first: another official page, a legal aid guide, or an open copy of the law from an established publisher. If every source is blocked, it gives you the link, the citation, and directions to the right section so that you can open the site yourself. You can paste the text back and ask the assistant to explain it.

## How Gov311 stays accurate

- Gov311 does not restate laws, fees, or deadlines. It points to where each one is published, so the assistant reads the current version.
- Every fact must come from an official source that the contributor read.
- Every guide shows the date it was last verified and who verified it.
- A guide that no person has checked yet is marked as a draft, and assistants tell you so.
- An automated check rejects a guide that is missing its sources or its date.
- A guide that goes one year without a review gets a warning, and assistants pass that warning on to you.
- Each place can have local maintainers who review changes to its guides.

A guide can still be out of date. Offices move, forms change, and links break. Before you pay a fee, file a form, or rely on a deadline, confirm it with the official source that the guide links to.

## Add your community

You know how your local government works better than any AI does. If you have figured out how to get something done, write it down so the next person does not have to start from zero.

[CONTRIBUTING.md](CONTRIBUTING.md) explains how to add a guide, add a place, or fix a mistake. If you work for a government and want to keep your agency's guides current, we would be glad to have you.

## How the repository is organized

| Path | What it holds |
| --- | --- |
| [`data`](data) | The guides, one folder for each government. Folders named `codes` hold pointers to laws. |
| [`data/_schema`](data/_schema) | The format every guide must follow |
| [`templates`](templates) | Blank guides to copy when you write a new one |
| [`skills/gov311`](skills/gov311) | The instructions an AI tool follows |
| [`mcp-server`](mcp-server) | The MCP server |
| [`scripts`](scripts) | The checks that run on every change |
| [`llms.txt`](llms.txt) | An index of every guide for web-only tools |

## License

Gov311 is licensed under the [Apache License 2.0](LICENSE).
