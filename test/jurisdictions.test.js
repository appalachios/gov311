import assert from "node:assert/strict";
import test from "node:test";
import { findJurisdictions, jurisdictionChain } from "../scripts/lib.js";

const governments = new Map();
function place(id, name, level, parent, aliases = []) {
  governments.set(id, { id, meta: { name, level, parent, aliases } });
}

const us = "us/_federal";
const tn = "us/tn/_state";
const polk = "us/tn/polk-county";
const benton = "us/tn/benton";
const ky = "us/ky/_state";
place(us, "United States federal government", "federal", null, ["US"]);
place(tn, "State of Tennessee", "state", us, ["Tennessee", "TN"]);
place(polk, "Polk County", "county", tn);
place(benton, "City of Benton", "city", polk);
place("us/tn/ducktown", "City of Ducktown", "city", polk);
place("us/tn/nashville", "Metropolitan Government of Nashville and Davidson County", "consolidated-city-county", tn, ["Davidson County", "Nashville"]);
place(ky, "Commonwealth of Kentucky", "state", us, ["Kentucky", "KY"]);
place("us/ky/benton", "City of Benton", "city", ky);

const matches = (name, jurisdictions = governments) => findJurisdictions(jurisdictions, name).map((j) => j.id);

test("city lookups accept qualifications from the actual parents of the city", () => {
  for (const name of ["Benton, Polk County, TN", "City of Benton, Tennessee", "Benton TN", benton]) {
    assert.deepEqual(matches(name), [benton], name);
  }
  assert.deepEqual(matches("Benton").sort(), ["us/ky/benton", benton]);
  assert.deepEqual(matches("Benton County, TN"), []);
  assert.deepEqual(matches("Benton, Davidson County, TN"), []);
  assert.deepEqual(matches("Benton, Polk County, KY"), []);
  const covered = new Map(governments);
  const county = "us/tn/benton-county";
  covered.set(county, { id: county, meta: { name: "Benton County", level: "county", parent: tn } });
  assert.deepEqual(matches("Benton County, TN", covered), [county]);
});

test("county, consolidated, state and rural lookups do not return their children", () => {
  assert.deepEqual(matches("unincorporated Polk County, Tennessee"), [polk]);
  assert.deepEqual(matches("unincorporated Ducktown, TN"), []);
  assert.deepEqual(matches("Polk County TN"), [polk]);
  assert.deepEqual(matches("Davidson County, Tennessee"), ["us/tn/nashville"]);
  assert.deepEqual(matches("Davidson"), ["us/tn/nashville"]);
  assert.deepEqual(matches("Nashville Davidson County, TN"), ["us/tn/nashville"]);
  assert.deepEqual(matches("TN"), [tn]);
  assert.deepEqual(matches("US"), [us]);
  assert.deepEqual(matches("???"), []);
});

test("a city follows its declared county to the state and nation, regardless of folder layout", () => {
  assert.deepEqual(jurisdictionChain(governments, benton).map((j) => j.id), [benton, polk, tn, us]);
  assert.deepEqual(jurisdictionChain(governments, polk).map((j) => j.id), [polk, tn, us]);
});
