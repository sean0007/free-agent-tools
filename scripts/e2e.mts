// End-to-end check with the official MCP TypeScript SDK client:
// connect over streamable HTTP, list tools, and call every tool with its example input.
// Usage: npm run e2e [-- https://free-agent-tools.vercel.app/mcp]
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { MCP_URL, TOOLS } from "../lib/tools.ts";

const url = new URL(process.argv[2] ?? MCP_URL);
const client = new Client({ name: "free-agent-tools-e2e", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(url));
const listed = await client.listTools();
const names = listed.tools.map((t) => t.name).sort();
console.log(`server: ${url} | tools listed: ${names.length}`);
const expected = TOOLS.map((t) => t.name).sort();
const missing = expected.filter((n) => !names.includes(n));
if (missing.length) throw new Error(`Missing tools: ${missing.join(", ")}`);

let failed = 0;
for (const tool of TOOLS) {
  const res = await client.callTool({ name: tool.name, arguments: tool.example });
  const text = (res.content as { type: string; text?: string }[]).map((c) => c.text ?? "").join("\n");
  const ok = !res.isError && text.startsWith("Disclaimer:") && text.includes("{");
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"} ${tool.name} (${text.length} chars)${ok ? "" : `: ${text.slice(0, 300)}`}`);
}
// A bad input should come back as a tool error, not a crash.
const bad = await client.callTool({ name: "ads_policy_notice_risk_check", arguments: { notice: "too short" } }).catch((e) => ({ isError: true, content: [{ type: "text", text: String(e) }] }));
console.log(`${bad.isError ? "PASS" : "FAIL"} invalid input is rejected`);
if (!bad.isError) failed++;
await client.close();
console.log(failed ? `${failed} failure(s)` : "all checks passed");
process.exit(failed ? 1 : 0);
