---
name: gov311
description: Find the government responsible for a civic question and the Gov311 guide that answers it. Use as the general starting point for permits, benefits, agency contacts, ordinances, bills, or questions that span governments.
---

# Gov311

Start with the person's task. A city resident may need the county clerk, a state agency, or a utility serving that address. Use the place to locate possible guides, then read who runs the service or adopted the law.

## Find the right government

1. A state and bill number are enough to track state legislation. For a local question, use the municipality and state if known. If city limits affect the answer, ask whether the property is inside them or give the two routes. A mailing address can use a city name outside its limits.
2. With Gov311’s MCP tools, call `find_jurisdiction` with the place. Check its state, level, and returned `chain`. For a municipality with `county_options`, confirm the county when the answer depends on it. Pass its ID as `county` to `search` along with the municipality’s `jurisdiction` ID. If the county is unknown, search the municipality and its shared state and federal guides. Call `search` with the jurisdiction ID and the person’s question, then `get_entry` to read the full guide. Search ranks guides from that chain by relevance and uses distance to break ties.
3. With a repository checkout, open the place’s `jurisdiction.yaml` under `../../data` relative to this skill. Follow each `parent` ID from the data root. For a county-specific question in a municipality with `county_options`, also read the confirmed county’s section. In a web chat or standalone installation, use the [public guide index](https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt). Read the parent guide sections under the place's heading and open the guide link for its full instructions. If links are unavailable, ask the person to paste the matching guide.
4. For Benton, Copperhill, or Ducktown in Tennessee, the chain runs through Polk County, Tennessee, and the federal government. For unincorporated Polk County, start with the county. If a place has no guide, look up its county and state for services they administer. For a missing city service, use the city's official records. Identify any information you found outside Gov311.

## Choose the workflow

- To apply, pay, request a record, find the responsible office, or get help, use **gov311-services**. Read the service, contact, or help entry and the agency's filing instructions. [Public service instructions](https://raw.githubusercontent.com/appalachios/gov311/main/skills/gov311-services/SKILL.md)
- To follow a proposal, attend a meeting, trace amendments, or read an enacted law, use **gov311-laws**. Identify the adopting body and find the dated text and action for the stage the person asks about. [Public law instructions](https://raw.githubusercontent.com/appalachios/gov311/main/skills/gov311-laws/SKILL.md)

If the specialist is installed, use it directly. In a checkout, its instructions are in the sibling skill folder. If you have only this skill, follow the public instructions when available. You can answer from a pasted guide and its sources. For a question that spans both workflows, connect the applicable rule to the steps the responsible office asks the person to take.

## Give the answer

Give the first action, the responsible office, and the official pages that support the answer. Explain official terms and preserve whether the source requires or recommends an action. Copy office contact details as published. For fees and deadlines, read the current official page before giving a figure. Include the guide's `trust`, `verified_by`, and `last_verified`. A source check names the person or tool that checked the guide. Identify a draft's research date and a guide more than a year old. Gov311 is an independent community project.

When sources disagree, read the controlling law and effective amendments for a legal requirement, or the current form for that applicant and filing step. Identify what settled the discrepancy, any inaccurate page, and the supported correction. Explain any remaining `human_review` question and where to confirm it. An authorized CAPTCHA can be completed through the site's ordinary interactive browser flow when the site and tool permit it. For a restricted page, look for another official publication that covers the same detail. If the normal check requires a person, let them complete it or point them to the exact passage to paste. Guide corrections can be reported in [Gov311 issues](https://github.com/appalachios/gov311/issues).

Ask only for the location needed to route the question. Keep personal records and identifiers out of chat. In an emergency, direct the person to 911. For an imminent court or benefit deadline, put the relevant office or legal aid contact first.

For a Tennessee city that crosses county lines, match the parcel to a county before selecting county services. The Census Geocoder can narrow an address search. Check the county parcel map for land near a boundary.

When someone starts with a county, call `find_jurisdiction` for its ID, then `list_jurisdictions` with that ID as `county` to find its municipalities. For an unincorporated address, start with the county itself. If a boundary guide flags conflicting evidence, ask which parcel or adopted boundary instrument establishes the responsible office.
