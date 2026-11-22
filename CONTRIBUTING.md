# Contributing to Gov311

Gov311 works because people who know a place write down how to get things done with its government. You do not need to be a programmer. If you have ever figured out how to get a permit, fight a parking ticket, or find the right office to call, you know something worth adding.

The most valuable entries hold what a web search cannot find. Often the only way to learn which office handles something, or where a form is buried, is to call and ask. When you make that call and write down the answer, the next person does not have to. See [Ask the government directly](#ask-the-government-directly).

## What goes in Gov311

Gov311 is a map. An entry tells a person which office handles a task, what steps to take, which form to use, and where the government publishes the details. An AI tool then reads those details from the official page.

| Write this in an entry | Point to this with a link |
| --- | --- |
| The steps of a process, in order | What a law or code requires |
| Which office handles it, with its phone number, address, and hours | Fee amounts |
| The name of the form and its link | Deadlines and notice periods |
| Where the official rule, fee schedule, or deadline is published | Dollar limits, size limits, and other thresholds |
| Common mistakes | Who qualifies under the law |
| What the office told you is not published online, and who to call for it | |

Laws, fees, and deadlines change. Link readers to the current record so they can check the detail when they act. You can write "Free" when a service costs nothing.

## Ask the government directly

A lot of what people need is hard to find online. The right form sits three menus deep. The page names the wrong office. The answer is in a PDF that no search engine returns. The people who work in the office know where everything is, and most of them are glad to tell you.

Reach out to them. This is the work that makes Gov311 worth more than a search.

### Who to ask

- **The city or county information line**, such as 311. Its staff route questions all day and know which department owns what.
- **The department's front desk or help desk.** Ask for the person who handles the specific task.
- **The clerk's office**, for courts, records, licenses, and elections.
- **The public information officer**, for anything the front desk cannot answer. Most agencies list one.
- **Your council member's or commissioner's office.** Their staff help residents with exactly this kind of question.

### What to ask

- "Which office handles this, and what is the best number for it?"
- "Where on your website is this published? Can you send me the link?"
- "Which form do I use, and where do I find it?"
- "Where do you publish the fee and the deadline?"
- "What do people most often get wrong?"
- "Is there anyone who helps people with this for free?"

Ask for the link every time. An entry that links to the official page lets the next reader confirm it.

### How to write down what you learn

- **If the office points you to a page**, open it, confirm it says what they told you, and link it in the entry.
- **If the office says something is not published online**, say so in the entry and tell the reader who to call. For example: "The county does not publish this list online. Call the clerk's office and ask for it." Add the date you called. That sentence saves the next person an hour of searching.
- **Name the office, not the person.** Write "the clerk's office said", and leave out the name of the employee you spoke with.
- **Fees, deadlines, and legal rules still get a pointer.** If the office tells you an amount or a date on the phone, write down where they said it is published, or that the reader must call to get it.

If an office tells you that something is missing from its website, ask whether it can be added. A government that publishes the answer helps everyone, including people who never use Gov311.

## The one rule

Everything you write must come from an official source that you checked yourself on the day you wrote the entry. An official source is the government's own website, the law itself, the website of the organization the entry describes, or the office itself when you called or wrote to it. If you cannot find an official page or reach an office that supports a statement, leave it out.

This rule exists because people act on these entries. A wrong phone number wastes someone's afternoon. A link to the wrong law can send a renter in the wrong direction when they have days to respond.

### When published sources disagree

1. Identify the exact point of disagreement. Check the date, jurisdiction, kind of applicant, and step each page describes. An office may accept an application by email and still require a signed document before it issues a permit.
2. For a legal question, read the controlling statute, ordinance, or adopted rule. Check later enacted amendments and their effective dates. If the law refers to a specific census or map, use that edition of the official data.
3. For a filing question, read the administering office’s current instructions and the form for that applicant. Explain which step the law requires and which steps the office uses to carry it out.
4. Once the record settles the question, correct the guide and cite the section, form, or table that settles it. In the pull request, link to the misleading page, identify the wording that needs to change, and give the supported correction. A page owner should be able to verify it from those links.

If a material fact is still open after those checks, document the competing sources, the exact evidence still needed, and the office that can supply it. Use the [trust levels](#trust-levels) below.

## Ways to contribute

- **Fix an entry.** If an office moved, a form changed, or a link broke, edit the file and update `last_verified`.
- **Re-verify an entry.** Open its sources, confirm that each link still leads to the right page and each statement still matches it, and update `last_verified` and `verified_by`. Entries older than one year get a warning, so this work matters as much as new writing.
- **Add an entry** to a place Gov311 already covers.
- **Fill a gap by asking.** If an entry says something is hard to find, call the office, ask where it is, and add the link.
- **Add a place.** Start with the handful of tasks people ask about most.
- **Report a problem.** If you cannot edit files, open an issue that says what is wrong and links to the official page.

## How the data is organized

Each government has one folder under `data`. The folder path is the government's ID.

```
data/
  us/
    _federal/                 United States government
    tn/
      _state/                 State of Tennessee
      nashville/              Metro Nashville and Davidson County
      polk-county/            Polk County
      benton/                 City of Benton in Polk County
        jurisdiction.yaml     Names the government and its parent
        services/             How to do one task
        contacts/             Offices and phone lines
        codes/                Pointers to laws and codes
        help/                 Free or low-cost help
```

Cities and counties sit side by side under their state. The `parent` field in `jurisdiction.yaml` says which government is one level up. For Benton, Copperhill and Ducktown, set the parent to `us/tn/polk-county`. A search from one of the cities then includes the city, Polk County, Tennessee and federal guides. Outside the city limits, start with the county. Check the authority responsible for each task before applying a rule to a parcel or address. Metro Nashville and Davidson County share one government, so that guide points directly to Tennessee.

When a municipality spans counties, set its `parent` to the shared state and list the county IDs under `county_options`. Farragut lists Knox and Loudon. Cite the official boundary evidence, including territory that has no residents. The address or parcel determines which county to use for a county service. A town ordinance applies to the land it covers across the county line.

## Add an entry

1. Copy the matching file from [`templates`](templates) into the right folder. Name it with lowercase words joined by hyphens, such as `food-truck-permit.md`.
2. Fill in the fields at the top. The table below explains each one.
3. Write the body in plain language. See the writing guide below.
4. Run the checks.

   ```bash
   npm install
   ```

   ```bash
   npm run build
   ```

   ```bash
   npm run check
   ```

   `npm run build` updates `llms.txt`, the index that web-only AI tools read. `npm run check` confirms that every entry follows the format.
5. Open a pull request. A maintainer for that place reviews it.

If you change a skill under `skills/`, run `python3 scripts/package-skill.py` and include the updated ZIP for that skill. Run `python3 scripts/package-skill.py --check` to verify all downloads.

### Guide fields

| Field | What to write |
| --- | --- |
| `title` | The task or office in plain words, such as "Get a residential building permit" |
| `summary` | One or two sentences. Search results show this text. |
| `audiences` | Who the entry helps: `residents-in-need`, `nonprofits`, `builders`, `homeowners`, `renters`, `small-business`, or `everyone` |
| `sources` | The official pages where a reader can confirm the facts |
| `last_verified` | The date of the source check or draft research, written as `YYYY-MM-DD` |
| `verified_by` | The GitHub username of the person or the name of the tool that did that work |
| `trust` | Use the level that describes the work actually done. See [Trust levels](#trust-levels). |
| `human_review` | Include only for a material question the controlling records and current filing instructions leave open. Name the evidence still needed. |

Each entry type has a few fields of its own, such as `cost` and `forms` for a service or `official_text` and `covers` for a code. The templates show them, and [`data/_schema/entry.schema.json`](data/_schema/entry.schema.json) lists them all.

## Add a place

1. Create a folder for it under its state, such as `data/us/tn/knoxville`.
2. Copy [`templates/jurisdiction.yaml`](templates/jurisdiction.yaml) into the folder and fill it in.
3. Look up the place's Open Civic Data ID for the `ocd_id` field. Open Civic Data is a shared list of IDs for governments, so that different projects can refer to the same place the same way. The lists are at [opencivicdata/ocd-division-ids](https://github.com/opencivicdata/ocd-division-ids/tree/master/identifiers).
4. Add entries. A good start is the main information line, the permit office, and the three or four tasks you hear people ask about most.
5. Add yourself to [`.github/CODEOWNERS`](.github/CODEOWNERS) if you want to review future changes to that place.

## Writing guide

Write for a neighbor who has never dealt with this office.

- Start with what the person does first.
- Use the words people use. Write "building permit" in the title even if the office calls it a "residential construction authorization". Put the official term in the body so the person recognizes it on the form.
- Number the steps when order matters.
- Copy phone numbers and addresses exactly.
- Point to fees and deadlines. Say what a fee is based on and link to the page or fee schedule that states it. Say that a deadline exists and link to the page that states it. Do not write the amount or the date. "Free" is the one exception.
- Say "must" only when the source says it is required.
- Add a "Common mistakes" section when you know one. These are often the most useful lines in an entry.

### Laws and codes

An entry in `codes/` tells the reader where the law is published and how to find the right part. Link to the law itself so readers can check the wording and the version that applies to them.

In a `codes/` entry:

- **Do** say what the law is about and who it affects.
- **Do** list the questions it answers in `covers`, such as "notice a landlord must give before eviction".
- **Do** link to the official text in `official_text`, and explain in `how_to_find` which title, chapter, or section to open.
- **Do** link to plain-language explanations from a government or a legal aid organization in `guides`.
- Link to the current law for notice periods, dollar limits, fees, deadlines, thresholds, and required dimensions. When correcting a misleading source, state the specific finding and cite the section and records that establish it.
- **Do not** paste the text of a law or code.

The same applies in other folders. A `services/` entry explains how to apply for a permit. It links to the pages where the government says which projects need one and what the permit costs.

When a law has serious consequences, such as eviction, link to a `help` entry where the person can reach a lawyer or advocate.

### Sites that block AI tools

Some official sites present a visitor check called a CAPTCHA. With the user’s permission, a tool can complete the site’s normal check in an interactive browser when the site and browser allow it. If the check requires a person to respond, the person can complete it in the browser. Keep logins, subscriptions, and restrictions on automated access in place.

You help by recording what you saw. Each link in `official_text` has an `access` field.

| Value | Meaning |
| --- | --- |
| `open` | Anyone and any tool can read it. |
| `captcha` | The site makes visitors prove they are a person. |
| `blocks-automated-tools` | The site turns away AI tools and scripts without showing a challenge. |
| `login` | The site needs a free account. |
| `terms-of-use` | The publisher requires visitors to agree to terms before it displays the text. |
| `paywall` | The site costs money. |

When access to the official text is limited, give the reader another way to check it.

- Look for another official page that is open, such as the legislature's own site or an agency's summary, and add it to `official_text` or `guides`.
- If none exists, add an open copy from an established legal publisher, a university, or a public-interest archive under `unofficial_copies`. Check that the tool you use can actually open it.
- Write clear `how_to_find` directions. If every route is blocked, the person opens the site themselves, and your directions are what they follow.

### Privacy

List offices, roles, and public phone lines. Do not list a private person's name, cell phone, or personal email. An elected official's public office contact is fine.

## Trust levels

| Level | Meaning |
| --- | --- |
| `draft` | The source check is incomplete. |
| `source-checked` | The named person or tool checked the guide’s material claims against the official sources it cites. |
| `community` | A human contributor checked the entry against its sources. |
| `verified` | A second person confirmed it independently. |
| `official` | An employee of that government submitted or confirmed it. |

To mark a guide `source-checked`, read the responsible agency’s or program operator’s published instructions and check the details a reader will rely on, including which office to call, who qualifies, and how to apply. A working link alone tells you only that the page opens. Record the actual checker in `verified_by` (for example, `codex` for a check performed by Codex) and the date in `last_verified`.

After [checking a discrepancy](#when-published-sources-disagree), leave the guide at `draft` only if its source check is incomplete. Add a `human_review` note for each unresolved material question.

```yaml
trust: draft
human_review:
  - reason: conflicting-evidence
    description: The permit application and its current filing instructions give different mailing addresses for the same form. The permits office needs to confirm which address receives applications.
```

Use `missing-evidence` when the responsible office’s sources do not establish a detail. When someone resolves the question, cite the evidence, update the guide, and remove that note. Once every question is resolved and the check is complete, update the trust level, checker, and date. Reserve `verified` for an independent second human check and `official` for confirmation or submission by the responsible government.

## Keeping entries current

The validator warns when an entry's `last_verified` date is more than one year old. AI tools that read Gov311 also tell the person when an entry is that old. To clear the warning, re-check the entry against its sources and update the date.

## License

By contributing, you agree that your contribution is licensed under the [Apache License 2.0](LICENSE).
