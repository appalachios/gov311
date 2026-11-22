#!/usr/bin/env node
// Gov311 MCP server.
// It gives any AI tool that supports the Model Context Protocol four ways to read the data folder:
// list the governments covered, find one by name, search entries, and read one entry in full.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ENTRY_TYPES, STALE_AFTER_DAYS, daysSince, findJurisdictions, jurisdictionChain, loadData } from "../scripts/lib.js";

const AUDIENCES = ["residents-in-need", "nonprofits", "builders", "homeowners", "renters", "small-business", "everyone"];
const NOTICE =
  "Gov311 is a community project. It is not an official government channel and it is not legal advice. " +
  "Give the person the official sources, trust level, checker name, and date. Resolve discrepancies using the controlling law, applicable official data, or the office’s instructions for that step. Explain any open human_review notes.";

const { jurisdictions, entries } = loadData();
const text = (value) => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }] });
const words = (s) => String(s ?? "").toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 1);
const isoDate = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d);

function describeJurisdiction(j) {
  return {
    id: j.id,
    name: j.meta.name,
    level: j.meta.level,
    ocd_id: j.meta.ocd_id,
    website: j.meta.website,
    general_contact: j.meta.general_contact,
    parent: j.meta.parent ?? null,
    ...(j.meta.county_review && { county_review: j.meta.county_review }),
    ...(j.meta.county_options && { county_options: j.meta.county_options }),
  };
}

function freshness(meta) {
  const last_verified = isoDate(meta.last_verified);
  const age = daysSince(last_verified);
  return {
    last_verified,
    verified_by: meta.verified_by,
    trust: meta.trust,
    ...(meta.human_review && { human_review: meta.human_review }),
    stale: age > STALE_AFTER_DAYS,
    ...(age > STALE_AFTER_DAYS && {
      stale_warning: `No one has verified this entry in ${age} days. Tell the person to confirm it with the official source.`,
    }),
    ...(meta.trust === "draft" && {
      draft_warning: "This guide has an incomplete source check. Confirm the details with the responsible office before acting on them.",
    }),
  };
}

/** Score an entry by how many query words appear in it. Titles and keywords count most. */
function score(entry, queryWords) {
  const strong = new Set(words(`${entry.meta.title} ${(entry.meta.keywords ?? []).join(" ")}`));
  const medium = new Set(words(entry.meta.summary));
  const weak = new Set(words(entry.body));
  let total = 0;
  for (const w of queryWords) total += strong.has(w) ? 5 : medium.has(w) ? 2 : weak.has(w) ? 1 : 0;
  return total;
}

const server = new McpServer({ name: "gov311", version: "0.1.0" });

server.tool(
  "list_jurisdictions",
  "List every government Gov311 has data for. Use this first when you do not know whether the person's city, county, or state is covered.",
  {},
  async () => text({ jurisdictions: [...jurisdictions.values()].map(describeJurisdiction) }),
);

server.tool(
  "find_jurisdiction",
  "Find a government by name or by a place qualified with its county and state, such as 'Benton, Polk County, TN'. Returns each match and its parent chain, nearest first. For a town spanning counties, pass a matched county to search, or resolve county_options using the address when needed. For unincorporated areas, look up the county.",
  { place: z.string().describe("City, county, state, or country name") },
  async ({ place }) => {
    const matches = findJurisdictions(jurisdictions, place);
    if (matches.length === 0) {
      return text({
        matches: [],
        note: `No jurisdiction matched "${place}". For a county service or a state program, look up the county or state by name. For a municipal service with no guide, consult the municipality's official sources. Anyone can add a place at https://github.com/appalachios/gov311.`,
      });
    }
    return text({
      matches: matches.map((j) => ({
        ...describeJurisdiction(j),
        ...(j.county && { county: j.county }),
        chain: jurisdictionChain(jurisdictions, j.id, j.county).map((c) => c.id),
      })),
    });
  },
);

server.tool(
  "search",
  "Search Gov311 entries. Give a jurisdiction id to search that government and every government above it. Results are ranked by relevance. Equally relevant guides from nearer governments appear first.",
  {
    query: z.string().describe("What the person needs, in plain words. Example: 'permit to build a deck'"),
    jurisdiction: z.string().optional().describe("Jurisdiction id from find_jurisdiction, for example us/tn/nashville"),
    county: z.string().optional().describe("County jurisdiction ID for a municipality that crosses a county line. Use the county covering the address."),
    type: z.enum(ENTRY_TYPES).optional().describe("services: how to do something. contacts: who to call. codes: rules and laws. help: free or low-cost assistance."),
    audience: z.enum(AUDIENCES).optional(),
    limit: z.number().int().min(1).max(25).optional(),
  },
  async ({ query, jurisdiction, county, type, audience, limit = 8 }) => {
    if (jurisdiction && !jurisdictions.has(jurisdiction)) {
      return text({ error: `Unknown jurisdiction "${jurisdiction}". Call find_jurisdiction or list_jurisdictions first.` });
    }
    const chain = jurisdiction ? jurisdictionChain(jurisdictions, jurisdiction, county).map((j) => j.id) : null;
    const review = jurisdictions.get(jurisdiction)?.meta.county_review;
    if (county && county !== review?.county && (!["county", "consolidated-city-county"].includes(jurisdictions.get(county)?.meta.level) || !chain?.includes(county))) {
      return text({ error: "The county must cover the requested jurisdiction. Check find_jurisdiction for the available counties." });
    }
    const options = jurisdictions.get(jurisdiction)?.meta.county_options;
    const queryWords = words(query);
    const results = [...entries.values()]
      .filter((e) => !chain || chain.includes(e.jurisdiction))
      .filter((e) => !type || e.type === type)
      .filter((e) => !audience || e.meta.audiences?.includes(audience) || e.meta.audiences?.includes("everyone"))
      .map((e) => ({ entry: e, score: score(e, queryWords), distance: chain ? chain.indexOf(e.jurisdiction) : 0 }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || a.distance - b.distance)
      .slice(0, limit)
      .map(({ entry }) => ({
        id: entry.id,
        type: entry.type,
        jurisdiction: jurisdictions.get(entry.jurisdiction).meta.name,
        title: entry.meta.title,
        summary: entry.meta.summary,
        ...freshness(entry.meta),
      }));
    return text({
      results,
      ...(review && (!county || county === review.county) && { county_review: review, boundary_note: "Read the linked evidence guide before giving a county-specific answer. If the parcel record confirms the county, search that county directly." }),
      ...(!county && options && { county_options: options, county_note: "This municipality spans counties. For a county service, confirm the parcel or residence county and search again with its county ID." }),
      note: results.length
        ? "Call get_entry with an id to read the full steps, contacts, and sources."
        : "No entry matched. Consult the responsible government's official sources and say which information came from outside Gov311.",
    });
  },
);

server.tool(
  "get_entry",
  "Read a Gov311 entry with its steps, sources, trust level, and research or review date.",
  { id: z.string().describe("Entry id from search, for example us/tn/nashville/services/residential-building-permit") },
  async ({ id }) => {
    const entry = entries.get(id.replace(/\.md$/, ""));
    if (!entry) return text({ error: `No entry with id "${id}". Use search to find valid ids.` });
    const j = jurisdictions.get(entry.jurisdiction);
    const department = entry.meta.department ? entries.get(`${entry.jurisdiction}/${entry.meta.department}`) : undefined;
    return text({
      id: entry.id,
      type: entry.type,
      jurisdiction: describeJurisdiction(j),
      ...entry.meta,
      ...freshness(entry.meta),
      ...(department && {
        department_contact: {
          id: department.id,
          name: department.meta.title,
          phone: department.meta.phone,
          email: department.meta.email,
          address: department.meta.address,
          hours: department.meta.hours,
          url: department.meta.url,
          ...freshness(department.meta),
        },
      }),
      body: entry.body,
      ...(entry.type === "codes" && {
        how_to_use:
          "Start with the applicable statute, ordinance, or adopted rule in official_text. Check enacted amendments and effective dates before answering. " +
          "If a site presents a CAPTCHA, use its normal interactive verification when the user has authorized it and the site and browser permit it. " +
          "For restricted sources, look for an open official copy or the enacted law. If evidence is still missing, give the citation and how_to_find directions.",
      }),
      notice: NOTICE,
    });
  },
);

await server.connect(new StdioServerTransport());
