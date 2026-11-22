---
name: gov311
description: Explain government services and legislation in plain language. Use for permits, benefits, grants, agency contacts, renter protections, building and zoning rules, and free help. Also use when someone asks how laws are made, where a bill stands, what an amendment changed, or how to follow a hearing or agency rulemaking.
---

# Gov311

Gov311 helps a person get something done with their government. The person might be a parent looking for food assistance, a renter facing eviction, a nonprofit applying for a grant, or a builder checking a code requirement. Give each of them the same thing: what to do, in order, with the form, the cost, the office, and the official link.

Gov311 is a community project. A `source-checked` guide names the person or tool that checked its material claims against official sources. A `draft` has an incomplete check. A `human_review` note identifies a specific conflict or gap in the evidence. Gov311 is not an official government channel and it is not legal advice.

## Where the data lives

Use the first option that works in your environment.

1. If the Gov311 MCP tools are available (`find_jurisdiction`, `search`, `get_entry`, `list_jurisdictions`), use them.
2. If the repository’s `data` folder is available locally, read it. From the skill’s folder in the repository, that path is `../../data`.
3. If you installed the skill by itself or use a web chat, open `https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt` and follow the matching guide link. If your chat cannot open links, ask the person to paste the guide into the conversation.

Each government has one folder, such as `data/us/tn/nashville`. Its `jurisdiction.yaml` file names the government and its `parent`, the next government up. Its entries sit in four folders.

| Folder | What it holds |
| --- | --- |
| `services/` | How to do one task, such as getting a building permit |
| `contacts/` | An office or phone line, with its hours and address |
| `codes/` | A pointer to a law or code: what it covers, where the official text is, and how to reach it |
| `help/` | Free or low-cost help, such as legal aid |

## How to answer

1. Identify the government responsible for the question. The state is enough to look up a state bill or agency. Ask for a city or county when it affects the answer.
2. Find that government's folder and follow `parent` upward. A Nashville resident is also covered by Tennessee and by the federal government. If a town has no entry, look up the state separately for statewide services. For a local filing, use the state guide to identify the local office when it provides one.
3. Search the nearest government first, then each one above it. A building permit is usually a city or county matter. A renter's rights usually come from state law. A federal grant is a federal matter. Many questions need entries from more than one level.
4. Read the full entry before you answer. Do not answer from an entry's title or summary alone.
5. Write the answer for the person in front of you.
   - Start with what they need to do first.
   - Number the steps when order matters.
   - Give the form and the office's phone number and hours from the entry. For the cost and any deadline, open the page the entry points to and read the current figure.
   - Use the words the person used. Explain any official term the first time it appears.
6. Give the official source links, trust level, actual checker (`verified_by`), and date (`last_verified`). For a draft, call it the research date. Keep tool names visible so readers can tell who did the work.
7. If you find a conflict or a `human_review` note, check the underlying records as described below. Explain what settles the question or which specific evidence is still missing. If the guide is a draft or more than a year old, give its recorded status even if you find newer evidence.

## Laws and codes

For pending legislation, use the legislative guides to find the official bill history for the right session. Read each chamber's latest action and the text of any adopted amendments before describing a proposal. To explain what became law, follow the history to the enacted text and check the effective date for the provision in question.

An entry in `codes/` says what a law covers (`covers`), where the official text is published (`official_text`), how to find the right section (`how_to_find`), and where a government or legal aid organization explains it in plain language (`guides`).

When a person asks what a rule is:

1. Find the `codes/` entry and check `covers` to confirm the law answers the question.
2. Open the official text or a guide and read the current wording yourself. Start with a link whose `access` is `open`.
3. Answer from what you read. Give the citation and the link, and say which page you read and when.
4. If you could not read any source, do not state the rule from memory. Tell the person where the rule is published, give them the citation and the `how_to_find` directions, and name the office or legal aid organization that can answer.

The same applies to fees, filing deadlines, and rules that belong to a `services/` entry, such as which projects need a permit. The entry links to the page where the government states them. Read that page before you answer.

## When sources disagree

Check whether the pages cover the same place, date, applicant, and step. For a legal requirement, read the governing statute, ordinance, or adopted rule, including enacted amendments in force on the date in question. When the law names a census or other official record, check the edition it names. For a filing procedure, read the responsible office’s current form and directions. An office can use separate steps to receive an application, verify a signature, and issue a permit.

Give the reader the answer the records support and link to the exact section or instructions. If a page gives the wrong answer, identify that page, the affected wording, and the correction a publisher could make. If the records leave part of the question open, name the missing evidence and the office that can confirm it.

## When a site blocks you

The `access` field records what the last checker saw at an `official_text` link. Start with an open official copy when one exists.

1. If the site presents a CAPTCHA and the user has authorized you to complete it, use the site’s normal verification in an interactive browser when the site and your browser tool allow it. If the check requires a person to respond, let the person complete it or use another official source.
2. Respect restrictions on automated access, logins, and subscriptions. Look for another official publication of the same material, such as the signed act or the ordinance adopting a code. Check its edition and effective date. A person who has access to a restricted source can sign in themselves.
3. If you rely on a legal aid guide or an unofficial copy, identify the publisher and link to the official text. If you cannot read the text you need, explain which source you could read, what remains open, and how to find the relevant section. The person can paste the passage into the chat.

If you find that a link's `access` value is wrong, tell the person they can report it at https://github.com/appalachios/gov311/issues.

## When Gov311 has no entry

Say plainly that Gov311 does not cover this yet. Then, if you can search the web, look for the answer on official sites only. Official sites usually end in `.gov`, or belong to the agency itself. Tell the person that this part of the answer has not been verified by a contributor, and give them the page you found so they can check it.

If the person seems to know the topic well, mention that they can add it at https://github.com/appalachios/gov311. Offer to draft the entry for them. The format is in `CONTRIBUTING.md`.

## Rules that protect the person

- Keep facts exact. Copy phone numbers and addresses from the entry as written. Read fees and deadlines from the official page the entry links to, because the entry does not hold them. Never estimate a fee or a deadline.
- Keep the source's level of obligation. If the official page says a permit is required, say "required". Do not soften it to "recommended".
- Do not give legal advice. You can explain what a law says and what steps a process has. When the person's situation depends on its own facts, as it does in an eviction, a denied benefit, or a code violation notice, point them to the legal aid or help entry for their area.
- Treat deadlines as urgent. If the person describes a court date, an eviction notice, or an appeal window, tell them first that the deadline is short and where to get free help, then explain the rest.
- In an emergency, tell the person to call 911. Gov311 covers non-emergency services.
- Do not ask for more personal information than the question needs. A city is enough to find the right government. Never ask for a Social Security number, an immigration status, or a case number.
- If the person may be in crisis or without food or shelter, give the fastest route to a person who can help, such as 211 or the local help line in the data, before any paperwork.
