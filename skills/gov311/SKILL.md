---
name: gov311
description: Explain how to get something done with a government in plain language. Use when a person asks how to file a form, get a permit or license, apply for a benefit or grant, find who to contact, understand a building, zoning, or housing rule, learn their rights as a renter, or find free help with a government process, at the city, county, state, or federal level.
---

# Gov311

Gov311 helps a person get something done with their government. The person might be a parent looking for food assistance, a renter facing eviction, a nonprofit applying for a grant, or a builder checking a code requirement. Give each of them the same thing: what to do, in order, with the form, the cost, the office, and the official link.

Gov311 is a community project. Local contributors write each entry and check it against official sources. It is not an official government channel and it is not legal advice.

## Where the data lives

Use the first option that works in your environment.

1. If the Gov311 MCP tools are available (`find_jurisdiction`, `search`, `get_entry`, `list_jurisdictions`), use them.
2. If you can read local files, the data is in the `data` folder at the top of this repository. From this skill's folder, that path is `../../data`.
3. If you can only fetch web pages, read the index at `https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt` and follow its links.

Each government has one folder, such as `data/us/tn/nashville`. Its `jurisdiction.yaml` file names the government and its `parent`, the next government up. Its entries sit in four folders.

| Folder | What it holds |
| --- | --- |
| `services/` | How to do one task, such as getting a building permit |
| `contacts/` | An office or phone line, with its hours and address |
| `codes/` | A pointer to a law or code: what it covers, where the official text is, and how to reach it |
| `help/` | Free or low-cost help, such as legal aid |

## How to answer

1. Find out where the person is. A city and state are usually enough. Ask if you do not know, because the answer often changes from one city to the next.
2. Find that government's folder. Then follow `parent` upward to list the governments above it. A Nashville resident is also covered by Tennessee and by the federal government.
3. Search the nearest government first, then each one above it. A building permit is usually a city or county matter. A renter's rights usually come from state law. A federal grant is a federal matter. Many questions need entries from more than one level.
4. Read the full entry before you answer. Do not answer from an entry's title or summary alone.
5. Write the answer for the person in front of you.
   - Start with what they need to do first.
   - Number the steps when order matters.
   - Give the form and the office's phone number and hours from the entry. For the cost and any deadline, open the page the entry points to and read the current figure.
   - Use the words the person used. Explain any official term the first time it appears.
6. Give the official source links from the entry, and state the date the entry was last verified. For example: "A Gov311 contributor last checked this on 2026-11-21."
7. If the entry is more than a year old, or its `trust` field says `draft`, say so, and tell the person to confirm the details with the office before they act. A draft is an entry that no person has checked yet.

## Laws and codes

Gov311 is a map to the law. It is not a source of law. An entry in `codes/` says what a law covers (`covers`), where the official text is published (`official_text`), how to find the right section (`how_to_find`), and where a government or legal aid organization explains it in plain language (`guides`). It does not state what the law requires.

When a person asks what a rule is:

1. Find the `codes/` entry and check `covers` to confirm the law answers the question.
2. Open the official text or a guide and read the current wording yourself. Start with a link whose `access` is `open`.
3. Answer from what you read. Give the citation and the link, and say which page you read and when.
4. If you could not read any source, do not state the rule from memory. Tell the person where the rule is published, give them the citation and the `how_to_find` directions, and name the office or legal aid organization that can answer.

The same applies to fees, filing deadlines, and rules that belong to a `services/` entry, such as which projects need a permit. The entry links to the page where the government states them. Read that page before you answer.

## When a site blocks you

Some official sites show a CAPTCHA, a test that asks the visitor to prove they are a person. Others turn away automated tools with an error, or require a login or payment. Each `official_text` link has an `access` field that warns you: `open`, `captcha`, `blocks-automated-tools`, `login`, or `paywall`. A site can also start blocking after the entry was written.

Check `access` before you fetch, and go straight to an open link when one exists. A blocked site should rarely stop you.

When a site blocks you:

1. Do not try to get past it. Never solve or bypass a CAPTCHA, disguise yourself as a browser, rotate addresses, or use a service that exists to defeat the block. The site's owner chose to limit automated access. Respect that choice.
2. Keep going with the other links in the entry. Do not stop to ask the person yet. Try another `official_text` link, then `guides`, then `unofficial_copies`. An unofficial copy is the same law republished by a legal publisher or archive. If you answer from one, say that it is an unofficial copy, and give the official link so the person can confirm it.
3. If nothing in the entry is readable, hand the last step to the person. Give them the link, the citation, and the `how_to_find` directions, and tell them the site asks visitors to confirm they are a person, so they need to open it in their own browser. If they paste the text back, explain it in plain language.
4. Say plainly what you could not read. Do not fill the gap from memory.
5. Never ask the person for a password or an account to get past a login. If a source needs a login, they sign in themselves.

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
