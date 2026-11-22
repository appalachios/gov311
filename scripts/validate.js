#!/usr/bin/env node
// Checks every file in data/ against the schemas and the cross-file rules.
// Run with: npm run validate
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { DATA_DIR, STALE_AFTER_DAYS, daysSince, jurisdictionChain, loadData } from "./lib.js";

const readSchema = (name) => JSON.parse(readFileSync(join(DATA_DIR, "_schema", name), "utf8"));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
ajv.addSchema(readSchema("entry.schema.json"), "entry.schema.json");
const validateEntry = ajv.getSchema("entry.schema.json");
const validateJurisdiction = ajv.compile(readSchema("jurisdiction.schema.json"));

const { jurisdictions, entries, errors } = loadData();
const warnings = [];
const fail = (file, message) => errors.push({ file, message });
const schemaErrors = (file, validator) => {
  for (const e of validator.errors ?? []) fail(file, `${e.instancePath || "front matter"} ${e.message}`);
};
// YAML reads an unquoted date as a Date object. The schemas expect text.
const normalizeDates = (meta) => {
  if (meta.last_verified instanceof Date) meta.last_verified = meta.last_verified.toISOString().slice(0, 10);
};
const checkDate = (file, date) => {
  if (typeof date !== "string") return;
  const age = daysSince(date);
  if (age < 0) fail(file, `last_verified (${date}) is in the future.`);
  else if (age > STALE_AFTER_DAYS) warnings.push({ file, message: `Last verified ${age} days ago. Please re-check it against its sources.` });
};

for (const j of jurisdictions.values()) {
  normalizeDates(j.meta);
  if (!validateJurisdiction(j.meta)) schemaErrors(j.file, validateJurisdiction);
  if (!/^[a-z0-9_/-]+$/.test(j.id)) fail(j.file, "Folder names must be lowercase letters, numbers, and hyphens.");
  if (j.meta.parent && !jurisdictions.has(j.meta.parent)) fail(j.file, `parent "${j.meta.parent}" has no jurisdiction.yaml.`);
  if (!j.meta.parent && j.meta.level !== "federal") fail(j.file, "Every jurisdiction below the national level needs a parent.");
  if (j.meta.level === "federal" && j.meta.parent) fail(j.file, "A national government cannot have a parent.");
  if (jurisdictionChain(jurisdictions, j.id).at(-1).meta.parent === j.id) {
    fail(j.file, "The parent links form a cycle. Each chain must end at a national government.");
  }
  if (Array.isArray(j.meta.county_options)) {
    if (!["city", "town"].includes(j.meta.level) || jurisdictions.get(j.meta.parent)?.meta.level !== "state") {
      fail(j.file, "A municipality with county_options must name the shared state as its parent.");
    }
    for (const id of j.meta.county_options) {
      const county = jurisdictions.get(id);
      if (county?.meta.level !== "county" || county.meta.parent !== j.meta.parent) {
        fail(j.file, `county_options includes "${id}", which must be a county in the same state.`);
      }
    }
  }
  checkDate(j.file, j.meta.last_verified);
}

for (const entry of entries.values()) {
  const { file, meta, type, jurisdiction } = entry;
  normalizeDates(meta);
  if (!validateEntry(meta)) schemaErrors(file, validateEntry);
  if (!/^[a-z0-9-]+\.md$/.test(file.split("/").at(-1))) fail(file, "File names must be lowercase words joined by hyphens.");
  if (entry.body.length < 40) fail(file, "The body is empty or too short. Explain the topic in plain language below the front matter.");
  if (meta.department && !entries.has(`${jurisdiction}/${meta.department}`)) {
    fail(file, `department "${meta.department}" does not exist in data/${jurisdiction}.`);
  }
  if (type === "codes" && !meta.official_text) fail(file, "Entries in codes/ must link to the official text with official_text.");
  if (type === "codes" && !meta.covers) fail(file, "Entries in codes/ must list the topics the law answers with covers.");
  if (type === "contacts" && !(meta.phone || meta.email || meta.url)) fail(file, "A contact needs at least one of phone, email, or url.");
  checkDate(file, meta.last_verified);
}

for (const w of warnings) console.warn(`warning  ${w.file}\n         ${w.message}`);
for (const e of errors) console.error(`error    ${e.file}\n         ${e.message}`);
console.log(`\n${jurisdictions.size} jurisdictions, ${entries.size} entries, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
