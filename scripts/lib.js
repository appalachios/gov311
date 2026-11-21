// Shared loader for the Gov311 data folder.
// The validator, the index builder, and the MCP server all read data through this file.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

export const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DATA_DIR = join(REPO_ROOT, "data");
export const ENTRY_TYPES = ["services", "contacts", "codes", "help"];
export const STALE_AFTER_DAYS = 365;

/** Split a Markdown file into its YAML front matter and its body. */
export function parseEntryFile(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) throw new Error("File must start with YAML front matter between two --- lines.");
  return { meta: YAML.parse(match[1]) ?? {}, body: match[2].trim() };
}

function walk(dir, found = []) {
  for (const name of readdirSync(dir).sort()) {
    if (name.startsWith(".") || name === "_schema") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, found);
    else found.push(path);
  }
  return found;
}

const toId = (path) => relative(DATA_DIR, path).split(sep).join("/");

export function daysSince(dateString, today = new Date()) {
  return Math.floor((today - new Date(`${dateString}T00:00:00Z`)) / 86_400_000);
}

/**
 * Load every jurisdiction and entry.
 * Problems are collected in `errors` so that one bad file does not hide the others.
 */
export function loadData() {
  const jurisdictions = new Map();
  const entries = new Map();
  const errors = [];
  if (!existsSync(DATA_DIR)) return { jurisdictions, entries, errors: [{ file: "data", message: "data folder is missing" }] };

  const files = walk(DATA_DIR);

  for (const file of files.filter((f) => f.endsWith(`${sep}jurisdiction.yaml`))) {
    const id = toId(dirname(file));
    try {
      jurisdictions.set(id, { id, file: toId(file), meta: YAML.parse(readFileSync(file, "utf8")) ?? {} });
    } catch (error) {
      errors.push({ file: toId(file), message: `Could not read YAML: ${error.message}` });
    }
  }

  for (const file of files.filter((f) => f.endsWith(".md"))) {
    const rel = toId(file);
    const parts = rel.split("/");
    const type = parts.at(-2);
    const jurisdiction = parts.slice(0, -2).join("/");
    if (!ENTRY_TYPES.includes(type)) {
      errors.push({ file: rel, message: `Entries must sit in one of these folders: ${ENTRY_TYPES.join(", ")}.` });
      continue;
    }
    if (!jurisdictions.has(jurisdiction)) {
      errors.push({ file: rel, message: `No jurisdiction.yaml found in data/${jurisdiction}.` });
      continue;
    }
    try {
      const { meta, body } = parseEntryFile(readFileSync(file, "utf8"));
      const id = rel.replace(/\.md$/, "");
      entries.set(id, { id, file: rel, type, jurisdiction, meta, body });
    } catch (error) {
      errors.push({ file: rel, message: error.message });
    }
  }

  return { jurisdictions, entries, errors };
}

/** Return a jurisdiction and every government above it, nearest first. */
export function jurisdictionChain(jurisdictions, id) {
  const chain = [];
  const seen = new Set();
  let current = jurisdictions.get(id);
  while (current && !seen.has(current.id)) {
    chain.push(current);
    seen.add(current.id);
    current = current.meta.parent ? jurisdictions.get(current.meta.parent) : undefined;
  }
  return chain;
}
