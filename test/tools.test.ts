import assert from "node:assert/strict";
import test from "node:test";
import { SITES, TOOLS, callToolApi } from "../lib/tools";

test("tool names are unique and valid MCP names", () => {
  const names = TOOLS.map((t) => t.name);
  assert.equal(new Set(names).size, names.length);
  for (const n of names) assert.match(n, /^[a-z0-9_]{1,64}$/);
});

for (const tool of TOOLS) {
  test(`${tool.name}: example input satisfies its schema`, () => {
    const r = tool.inputSchema.safeParse(tool.example);
    assert.ok(r.success, JSON.stringify(r.error?.issues));
    assert.ok(SITES[tool.site], "site exists");
  });
}

test("callToolApi POSTs JSON to the tool's public API", async () => {
  let seen: { url: string; init?: RequestInit } | undefined;
  const fake = (async (url: string, init?: RequestInit) => {
    seen = { url, init };
    return new Response(JSON.stringify({ ok: 1, disclaimer: "d" }), { status: 200 });
  }) as unknown as typeof fetch;
  const tool = TOOLS.find((t) => t.name === "thirty_day_cash_check")!;
  const r = await callToolApi(tool, tool.example, fake);
  assert.equal(seen?.url, "https://fund-fix-flee.vercel.app/api/cash");
  assert.equal(seen?.init?.method, "POST");
  assert.deepEqual(JSON.parse(String(seen?.init?.body)), tool.example);
  assert.equal(r.ok, true);
  assert.equal(r.data.disclaimer, "d");
});

test("japan_customs_allowance_check on the customs site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_customs_allowance_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-customs-allowance.vercel.app");
  assert.equal(t.path, "/api/check");
});

test("japan_tb_screening_check on the JPETS site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_tb_screening_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-tb-screening.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
});

test("japan_dual_pricing_check on the dual pricing site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_dual_pricing_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-dual-pricing.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
});

test("japan_emergency_alert_decode on the alert decoder site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_emergency_alert_decode");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-alert-decoder.vercel.app");
  assert.equal(t.path, "/api/decode");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ alert: "l4-landslide", lang: "vi" }).success, true);
  assert.equal(t.inputSchema.safeParse({ text: "x", situation: "moon" }).success, false);
});

test("japan_permanent_residency_check on the PR check site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_permanent_residency_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-pr-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ route: "general", trips: [{ depart: "2020-01-10", return: "2020-07-10" }], japaneseB1: true }).success, true);
  assert.equal(t.inputSchema.safeParse({ applicationDate: "2027-01-01" }).success, false);
});

test("japan_international_postage_check on the postage site", async () => {
  const t = TOOLS.find((x) => x.name === "japan_international_postage_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-intl-postage.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ zone: 3, weightKg: 1.2, service: "ems", shipDate: "2027-02-10" }).success, true);
  assert.equal(t.inputSchema.safeParse({ destination: "US", weightGrams: 40000 }).success, false);
  assert.equal(t.inputSchema.safeParse({ destination: "US", service: "rocket" }).success, false);
});

test("28 tools, v1.12.0, japan_reentry_deadline_check on the re-entry site", async () => {
  assert.equal(TOOLS.length, 28);
  const { readFileSync } = await import("node:fs");
  for (const f of ["package.json", "server.json", "public/server.json"]) assert.equal(JSON.parse(readFileSync(f, "utf8")).version, "1.12.0", f);
  const t = TOOLS.find((x) => x.name === "japan_reentry_deadline_check");
  assert.ok(t);
  assert.equal(SITES[t.site].url, "https://japan-reentry-check.vercel.app");
  assert.equal(t.path, "/api/check");
  assert.equal(t.inputSchema.safeParse(t.example).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "permanent", departureDate: "2026-12-25" }).success, true);
  assert.equal(t.inputSchema.safeParse({ status: "alien", departureDate: "2026-12-25" }).success, false);
  assert.equal(t.inputSchema.safeParse({ status: "mid_long" }).success, false);
});
