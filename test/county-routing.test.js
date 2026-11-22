import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

test("Farragut searches use only the confirmed county for county services", async (t) => {
  const client = new Client({ name: "county-routing-test", version: "1" });
  await client.connect(new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL("../mcp-server/server.js", import.meta.url))],
  }));
  t.after(() => client.close());
  async function call(name, args) {
    const response = await client.callTool({ name, arguments: args });
    return JSON.parse(response.content[0].text);
  }

  const town = "us/tn/farragut";
  const knox = "us/tn/knox-county";
  const loudon = "us/tn/loudon-county";
  const common = ["us/tn/_state", "us/_federal"];
  const unknown = (await call("find_jurisdiction", { place: "Farragut, TN" })).matches;
  assert.equal(unknown.length, 1);
  assert.deepEqual(unknown[0].chain, [town, ...common]);
  assert.deepEqual(unknown[0].county_options.toSorted(), [knox, loudon]);
  const withoutCounty = await call("search", { jurisdiction: town, query: "deed or property tax", limit: 25 });
  assert.deepEqual(withoutCounty.county_options.toSorted(), [knox, loudon]);
  assert.ok(withoutCounty.results.length);
  assert.ok(withoutCounty.results.every((r) => [town, ...common].includes(r.id.split("/").slice(0, -2).join("/"))));

  for (const [countyName, county, deed] of [
    ["Knox County", knox, "get-a-deed"],
    ["Loudon County", loudon, "find-property-records"],
  ]) {
    const matches = (await call("find_jurisdiction", { place: `Farragut, ${countyName}, TN` })).matches;
    assert.equal(matches.length, 1);
    assert.equal(matches[0].county, county);
    assert.deepEqual(matches[0].chain, [town, county, ...common]);
    const { results } = await call("search", { jurisdiction: town, county, query: "deed", limit: 25 });
    assert.ok(results.some((r) => r.id === `${county}/services/${deed}`));
    assert.ok(results.every((r) => matches[0].chain.includes(r.id.split("/").slice(0, -2).join("/"))));
  }
  assert.deepEqual((await call("find_jurisdiction", { place: "Farragut, Polk County, TN" })).matches, []);
  assert.ok((await call("search", { jurisdiction: town, county: "us/tn/polk-county", query: "deed" })).error);
  assert.ok((await call("search", { jurisdiction: town, county: "us/tn/unknown", query: "deed" })).error);
  assert.ok((await call("search", { county: knox, query: "deed" })).error);
  assert.deepEqual((await call("find_jurisdiction", { place: "Knoxville, TN" })).matches[0].chain,
    ["us/tn/knoxville", knox, ...common]);
  assert.deepEqual((await call("find_jurisdiction", { place: "unincorporated Knox County, TN" })).matches[0].chain,
    [knox, ...common]);
});
