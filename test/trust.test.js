import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ strict: false });
addFormats(ajv);
const schema = JSON.parse(readFileSync(new URL("../data/_schema/entry.schema.json", import.meta.url)));
const validate = ajv.compile(schema);
const guide = {
  title: "Find the permits office",
  summary: "Where to check filing instructions for a permit.",
  audiences: ["everyone"],
  sources: ["https://example.gov/permits"],
  last_verified: "2026-01-01",
  verified_by: "codex",
  trust: "source-checked",
};

test("a source check records the sources, checker, and date", () => {
  assert.ok(validate(guide));
  for (const field of ["sources", "verified_by", "last_verified"]) {
    const incomplete = { ...guide };
    delete incomplete[field];
    assert.equal(validate(incomplete), false, field);
  }
  assert.equal(validate({ ...guide, verified_by: "  " }), false);
  assert.equal(validate({ ...guide, sources: [] }), false);
});

test("each unresolved evidence question needs a reason and a description on a draft", () => {
  const draft = { ...guide, trust: "draft" };
  assert.ok(validate(draft));
  for (const reason of ["missing-evidence", "conflicting-evidence"]) {
    const human_review = [{ reason, description: "Confirm where the office accepts permit applications." }];
    assert.ok(validate({ ...draft, human_review }));
    for (const trust of ["source-checked", "community", "verified", "official"]) {
      assert.ok(validate({ ...guide, trust }));
      assert.equal(validate({ ...guide, trust, human_review }), false);
    }
    assert.equal(validate({ ...draft, human_review: [{ reason }] }), false);
  }
  assert.equal(validate({ ...draft, human_review: [] }), false);
});
