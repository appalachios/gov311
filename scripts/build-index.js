#!/usr/bin/env node
// Writes llms.txt, a plain index of every entry for AI tools that can only read web pages.
// Run with: npm run build. Use --check in CI to confirm the committed file is current.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ENTRY_TYPES, REPO_ROOT, jurisdictionChain, loadData } from "./lib.js";

const RAW = "https://raw.githubusercontent.com/appalachios/gov311/main/data";
const { jurisdictions, entries } = loadData();

const lines = [
  "# Gov311",
  "",
  "> Gov311 is an independent community guide to government services, contacts, laws, and help. A source-checked guide names the person or tool that checked it against official sources. A draft has an incomplete check. A human review note tells you which detail to confirm with the office. Use the official links in each guide when you answer.",
  "",
  "Find the person's city below, or start with the county if they live outside city limits. Each heading lists its parent guide sections. Read the entry for the office that runs the service or the body that adopted the law.",
  "",
];

for (const j of [...jurisdictions.values()].sort((a, b) => a.id.localeCompare(b.id))) {
  lines.push(`## ${j.meta.name} (${j.id})`, "");
  if (j.meta.county_options) {
    const choices = j.meta.county_options.map((id) => `${jurisdictions.get(id).meta.name} (${id})`);
    lines.push(`For county services, check which county contains the address. Choose one of these guide sections: ${choices.join(" or ")}.`, "");
  }
  const parents = jurisdictionChain(jurisdictions, j.id).slice(1);
  if (parents.length) {
    lines.push(`Parent guide sections, nearest first: ${parents.map((p) => `${p.meta.name} (${p.id})`).join(" → ")}.`, "");
  }
  lines.push(`- [About this government](${RAW}/${j.file}): website, main contact, and parent government`);
  for (const type of ENTRY_TYPES) {
    for (const e of [...entries.values()].filter((x) => x.jurisdiction === j.id && x.type === type)) {
      lines.push(`- [${e.meta.title}](${RAW}/${e.file}): ${e.meta.summary}`);
      const { trust, verified_by, last_verified, human_review = [] } = e.meta;
      const action = trust === "draft" ? "Research by" : "Checked by";
      lines.push(`  - ${trust} · ${action} ${verified_by} on ${last_verified}.`);
      for (const { reason, description } of human_review) {
        lines.push(`  - Human review (${reason.replace("-", " ")}). ${description}`);
      }
    }
  }
  lines.push("");
}

const output = lines.join("\n");
const target = join(REPO_ROOT, "llms.txt");

if (process.argv.includes("--check")) {
  const current = existsSync(target) ? readFileSync(target, "utf8") : "";
  if (current !== output) {
    console.error("llms.txt is out of date. Run `npm run build` and commit the result.");
    process.exit(1);
  }
  console.log("llms.txt is current.");
} else {
  writeFileSync(target, output);
  console.log(`Wrote llms.txt with ${entries.size} entries.`);
}
