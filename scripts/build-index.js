#!/usr/bin/env node
// Writes llms.txt, a plain index of every entry for AI tools that can only read web pages.
// Run with: npm run build. Use --check in CI to confirm the committed file is current.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ENTRY_TYPES, REPO_ROOT, loadData } from "./lib.js";

const RAW = "https://raw.githubusercontent.com/appalachios/gov311/main/data";
const { jurisdictions, entries } = loadData();

const lines = [
  "# Gov311",
  "",
  "> Plain-language guides to government services, contacts, codes, and help. Read the entry for its official sources, research or review date, and trust level. An entry marked draft still needs human review. Gov311 is a community project. It is not an official government channel and it is not legal advice.",
  "",
  "To answer a question, find the person's city or county below, then read the matching entry. If the local section has no answer, check the state section, then the federal section.",
  "",
];

for (const j of [...jurisdictions.values()].sort((a, b) => a.id.localeCompare(b.id))) {
  lines.push(`## ${j.meta.name} (${j.id})`, "");
  lines.push(`- [About this government](${RAW}/${j.file}): website, main contact, and parent government`);
  for (const type of ENTRY_TYPES) {
    for (const e of [...entries.values()].filter((x) => x.jurisdiction === j.id && x.type === type)) {
      lines.push(`- [${e.meta.title}](${RAW}/${e.file}): ${e.meta.summary}`);
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
