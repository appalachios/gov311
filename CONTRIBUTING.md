# Contributing to Gov311

Gov311 works because people who know a place write down how its government works. You do not need to be a programmer. If you have ever figured out how to get a permit, fight a parking ticket, or find the right office to call, you know something worth adding.

## The one rule

Every fact must come from an official source that you opened and read on the day you wrote the entry. An official source is the government's own website, the law itself, or the website of the organization the entry describes. If you cannot find an official page for a fact, leave the fact out.

This rule exists because people act on these entries. A wrong fee wastes someone's afternoon. A wrong deadline can cost a renter their home.

## Ways to contribute

- **Fix an entry.** If a fee changed or a link broke, edit the file and update `last_verified`.
- **Re-verify an entry.** Open its sources, confirm every fact, and update `last_verified` and `verified_by`. Entries older than one year get a warning, so this work matters as much as new writing.
- **Add an entry** to a place Gov311 already covers.
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
        jurisdiction.yaml     Names the government and its parent
        services/             How to do one task
        contacts/             Offices and phone lines
        codes/                Pointers to laws and codes
        help/                 Free or low-cost help
```

Cities and counties sit side by side under their state. The `parent` field in `jurisdiction.yaml` says which government is one level up. An AI tool follows `parent` to find every government that covers a person. For a Nashville resident it reads the Nashville folder, then Tennessee, then federal.

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

### Fields every entry needs

| Field | What to write |
| --- | --- |
| `title` | The task or office in plain words, such as "Get a residential building permit" |
| `summary` | One or two sentences. Search results show this text. |
| `audiences` | Who the entry helps: `residents-in-need`, `nonprofits`, `builders`, `homeowners`, `renters`, `small-business`, or `everyone` |
| `sources` | The official pages where a reader can confirm the facts |
| `last_verified` | The date you checked every fact, written as `YYYY-MM-DD` |
| `verified_by` | Your GitHub username |
| `trust` | `community` for a new entry that you checked yourself. See trust levels below. |

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

Gov311 is a map to the law. It is not a source of law. An entry in `codes/` tells a reader where a law is published and how to find the right part. It does not say what the law requires.

This rule exists for two reasons. A law changes, and a restated copy in Gov311 would stay wrong until someone noticed. A person could also rely on our wording instead of the law's, and our wording carries no legal weight.

In a `codes/` entry:

- **Do** say what the law is about and who it affects.
- **Do** list the questions it answers in `covers`, such as "notice a landlord must give before eviction".
- **Do** link to the official text in `official_text`, and explain in `how_to_find` which title, chapter, or section to open.
- **Do** link to plain-language explanations from a government or a legal aid organization in `guides`.
- **Do not** state the rule itself. Leave out notice periods, dollar limits, fees, deadlines, thresholds, required dimensions, and code edition years.
- **Do not** paste the text of a law or code.

The same applies in other folders. A `services/` entry explains how to apply for a permit. It links to the pages where the government says which projects need one and what the permit costs.

When a law has serious consequences, such as eviction, link to a `help` entry where the person can reach a lawyer or advocate.

### Sites that block AI tools

Some official sites ask visitors to prove they are a person with a CAPTCHA. Others turn away automated tools, or need a login or payment. An AI tool that reads Gov311 must not try to get past these blocks. It sends the person to the site instead.

You help by recording what you saw. Each link in `official_text` has an `access` field.

| Value | Meaning |
| --- | --- |
| `open` | Anyone and any tool can read it. |
| `captcha` | The site makes visitors prove they are a person. |
| `blocks-automated-tools` | The site turns away AI tools and scripts without showing a challenge. |
| `login` | The site needs a free account. |
| `paywall` | The site costs money. |

An AI tool that hits a blocked site should be able to keep working without stopping to ask the person. You make that possible. When the official text is not `open`:

- Look for another official page that is open, such as the legislature's own site or an agency's summary, and add it to `official_text` or `guides`.
- If none exists, add an open copy from an established legal publisher, a university, or a public-interest archive under `unofficial_copies`. Check that the tool you use can actually open it.
- Write clear `how_to_find` directions. If every route is blocked, the person opens the site themselves, and your directions are what they follow.

### Privacy

List offices, roles, and public phone lines. Do not list a private person's name, cell phone, or personal email. An elected official's public office contact is fine.

## Trust levels

| Level | Meaning |
| --- | --- |
| `draft` | An AI tool researched the entry, or no person has checked it yet. |
| `community` | One contributor checked the entry against its sources. |
| `verified` | A second person confirmed it independently. |
| `official` | An employee of that government submitted or confirmed it. |

A reviewer raises an entry from `community` to `verified` after checking it against the sources.

You can use an AI tool to research and draft an entry. Mark it `draft` until you have opened every source yourself and confirmed each fact. Then change it to `community` and put your username in `verified_by`. AI tools that read Gov311 tell the person when an entry is still a draft. If you work for a government and want to maintain your agency's entries, open an issue. We would be glad to have you.

## Keeping entries current

The validator warns when an entry's `last_verified` date is more than one year old. AI tools that read Gov311 also tell the person when an entry is that old. To clear the warning, re-check the entry against its sources and update the date.

## License

By contributing, you agree that your contribution is licensed under the [Apache License 2.0](LICENSE).
