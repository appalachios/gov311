---
name: gov311-services
description: Find where to apply for a government service, pay a bill, submit a form, reach an office, or get free assistance. Use for tasks such as permits, records, utilities, benefits, and referrals.
---

# Government services and contacts

Identify the office that can act on this request. A city name on a water bill or an envelope may be a mailing address. Check the issuer, service area, or location of the work before directing the person to a city or county office.

## Find the guide

- With Gov311 MCP, use `find_jurisdiction` to identify the place and its parent governments. Call `search` with that jurisdiction ID and the task, then `get_entry` for the relevant results. A `services` guide gives the process, `contacts` identifies the office, and `help` lists assistance. Check a linked `department_contact` when present.
- In a checkout, find the place in `../../data` relative to this skill. Read its `jurisdiction.yaml` and follow each `parent` ID from the data root. When installed on its own, the skill can use the [public index](https://raw.githubusercontent.com/appalachios/gov311/main/llms.txt). Check the parent guide sections under the place's heading and open the matching guide. A reader can paste the guide if the chat cannot open links.
- For a question in one of Polk County's incorporated cities in Tennessee, check that city's guides, then Polk County, Tennessee, and federal guides as relevant. Start at the county for unincorporated property. When a town has no guide, check the responsible county or state office for its own services. Check the issuing office before applying any service found in the chain.

If a municipality has `county_options`, use the county that holds the parcel or residence for this service. For example, a Farragut deed can belong to Knox or Loudon County. With MCP, pass both the town ID as `jurisdiction` and the confirmed county ID as `county` to `search`. In the index or checkout, follow that county’s guide section. If the county is unknown, give the conditional routes or ask for the county.

## Explain the next step

Read the full guide and its official sources. Identify who can apply, what to bring, how to file, and which office handles the next step. A recorder may receive a city records request while the county register holds recorded deeds. A regional utility may serve an address inside or outside a city. For a filing, distinguish submitting documents from receiving approval or paying the fee.

Use the agency's current fee schedule or deadline before quoting an amount or date. If instructions disagree, compare which applicant, place, and step each source covers. Consult the governing law when the disagreement concerns a legal requirement. Give the answer the records support, link to the exact evidence, and identify the page that needs a correction when appropriate.

Lead with the action the person can take now. Copy official contact details accurately. Preserve whether an office requires or recommends each step. Include official links, the phone number or form, and the guide's trust level, checker (`verified_by`), and date (`last_verified`). Identify a draft or a guide more than a year old. Explain unresolved `human_review` notes and the office that can confirm the detail. If Gov311 lacks a guide, use the responsible office's site and say where you obtained the information.

For an emergency, direct the person to 911. For urgent needs such as shelter or eviction help, put the fastest documented route to assistance first. Let the person share account numbers or case documents directly with the office. When an official site presents a CAPTCHA, use the normal browser verification with the user's authorization when the site and tool allow it. Look for an open official copy when access is restricted.

For a residential building permit, check the State Fire Marshal’s row for the municipality or unincorporated county. An incorporated town can have a different permit office from the county around it.

When someone starts with a county, call `find_jurisdiction` for its ID, then `list_jurisdictions` with that ID as `county` to find its municipalities. For an unincorporated address, start with the county itself. For a disputed boundary, use the guide to identify the custodian, ordinance or resolution number, and adopted map. Match the parcel to that exhibit and check the county-line record before naming the county office.
