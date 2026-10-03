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
