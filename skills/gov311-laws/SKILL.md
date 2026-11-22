---
name: gov311-laws
description: Trace a proposed ordinance, resolution, bill, or agency rule to its agenda, amendments, votes, and enacted text. Use to explain a public meeting, a law's status, or which current code provision applies in a place.
---

# Laws, meetings, and public records of decisions

Identify the question first. Someone may want to speak before a vote, check what officials approved, or find the rule in force today. Each requires a different record.

## Find the governing body

With Gov311 MCP, use `find_jurisdiction`, then `search` with the returned jurisdiction ID and the subject. Read relevant results with `get_entry`. Meeting and bill trackers may be filed under `services`. Guides to enacted law appear under `codes`.

With a checkout, open the place’s `jurisdiction.yaml` in `../../data` relative to this skill. Follow each `parent` ID from the data root. With this skill installed alone or in a web chat, open the [public index](https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt), use the parent guide sections under the place's heading, and follow the guide links. If the chat cannot open links, ask the person to paste the relevant guide or passage.

A Ducktown ordinance belongs in Ducktown's municipal records. A Polk County Commission resolution belongs in county records, even when a city resident asks about it. Start at the county for an unincorporated area and check the measure's stated geographic reach. For a Tennessee bill, start with the General Assembly. Follow the parent chain to find related state or federal authority when the question calls for it.

## Follow the decision

- **Before a local vote.** Check the dated meeting notice, agenda, and proposed text for the named body. Open the charter, governing statute, or procedural rules to see which readings, hearings, notice, or votes apply there. If the text is missing online, give the clerk or recorder's documented route to request the packet. A posted agenda shows planned business.
- **After a local vote.** Check minutes and the signed ordinance or adopted resolution for the number, amendments, disposition, and effective date. A published code may predate a later ordinance. Identify which record you actually read. For county action, use the county's own authority and records.
- **State legislation and agency rules.** Check the legislative session, companion bills, and each chamber's actions. Compare the filed text with adopted amendments. In a Tennessee caption bill, an amendment can replace the operative text while leaving the caption intact. For enacted legislation, read the public chapter and effective-date clause. For an agency rule, trace the rulemaking notice to the effective rule.
- **A current legal requirement.** Read the guide's `covers` field, then its `official_text` and `how_to_find` directions. Start with a source marked `access: open` when available. Check effective amendments and any official data the law names. Resolve conflicts against that evidence and link to both the discrepancy and the record that settles it. Identify any unofficial copy used. When personal facts affect the answer, give the appropriate legal aid contact.

Use the site's normal interactive CAPTCHA verification with the user's permission when the site and tool allow it. If access is restricted, try another official publication such as the signed act or ordinance. If the normal check requires a person, let them complete it or invite them to paste the relevant passage. When text remains unavailable, give the exact citation, where to get it, and the question it would settle.

Link to the operative record and give the guide's `trust`, `verified_by`, and `last_verified`. Flag drafts or checks more than a year old and explain any outstanding `human_review` question. If you find official records beyond Gov311's coverage, say which ones you used.
