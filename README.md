# Free Agent Tools: free remote MCP server

<!-- mcp-name: io.github.sean0007/free-agent-tools -->

A free, no-auth **remote MCP server** (streamable HTTP) with 16 small, deterministic tools your AI agent can call:
business idea scoring, price headroom, hotel OTA commission, open-source swaps for SaaS bills,
Google Ads / Meta Ads notice risk, App Store 4.2 / 4.3 precheck, faceless YouTube reality check,
AI infrastructure bottlenecks, viral attention patterns, and Japan trip planning.

**Endpoint:** `https://free-agent-tools.vercel.app/mcp`  
**Landing page with setup for every client:** https://free-agent-tools.vercel.app

No API key, no account, nothing to install. Results are rules of thumb and educational estimates, not financial,
legal, or investment advice, and every result carries a disclaimer for the user.

## Add it

**Claude Code**

```bash
claude mcp add --transport http free-agent-tools https://free-agent-tools.vercel.app/mcp
```

**Claude (desktop / web):** Settings → Connectors → Add custom connector → paste the URL.

**ChatGPT:** Settings → Apps & Connectors → Advanced → Developer mode → Create → paste the URL, no authentication.

**Cursor** (`~/.cursor/mcp.json`)

```json
{ "mcpServers": { "free-agent-tools": { "url": "https://free-agent-tools.vercel.app/mcp" } } }
```

**VS Code** (`.vscode/mcp.json`)

```json
{ "servers": { "free-agent-tools": { "type": "http", "url": "https://free-agent-tools.vercel.app/mcp" } } }
```

**Windsurf** (`~/.codeium/windsurf/mcp_config.json`)

```json
{ "mcpServers": { "free-agent-tools": { "serverUrl": "https://free-agent-tools.vercel.app/mcp" } } }
```

**Stdio-only clients**

```json
{ "mcpServers": { "free-agent-tools": { "command": "npx", "args": ["-y", "mcp-remote", "https://free-agent-tools.vercel.app/mcp"] } } }
```

## Tools

| Tool | What it does |
|---|---|
| `score_business_idea_moat` | Score a business idea (MOAT: fund, fix, or flee) |
| `price_headroom_check` | Price headroom from close rate |
| `thirty_day_cash_check` | Do customers fund growth? (30-day cash) |
| `email_list_reactivation_value` | What is an old email list worth? |
| `hotel_ota_commission_calculator` | Hotel OTA commission and direct-booking savings |
| `saas_self_host_savings` | Replace paid SaaS with open source: savings and payback |
| `list_open_source_saas_alternatives` | List open-source alternatives to paid SaaS |
| `ads_policy_notice_risk_check` | Google Ads / Meta Ads notice risk card |
| `app_store_wrapper_precheck` | App Store 4.2 / 4.3 / metadata rejection precheck |
| `faceless_youtube_reality_check` | Faceless / AI YouTube channel reality check |
| `ai_infrastructure_bottlenecks` | AI infrastructure bottlenecks explained |
| `ai_bottleneck_quiz` | Which AI bottleneck constrains your stack? (quiz) |
| `viral_attention_patterns` | How attention spreads online |
| `viral_attention_quiz` | Do you chase, invent, or read attention? (quiz) |
| `japan_trip_plan` | Japan trip plan by city and month |
| `japan_trip_options` | Japan Trip Brain: supported cities, months, travelers |

All tools are read-only and idempotent.

## Plain HTTP APIs

Every tool is also a free JSON API (GET or POST, CORS open, OpenAPI 3.1, `/.well-known/ai-plugin.json`, `llms.txt`):

| Site | OpenAPI |
|---|---|
| [Founder Scorecard](https://fund-fix-flee.vercel.app) | https://fund-fix-flee.vercel.app/openapi.json |
| [Hotel OTA Commission Calculator](https://hotel-ota-calculator.vercel.app) | https://hotel-ota-calculator.vercel.app/openapi.json |
| [SaaS Bill Cutter](https://saas-bill-cutter.vercel.app) | https://saas-bill-cutter.vercel.app/openapi.json |
| [Ads Risk Check](https://ads-risk-check.vercel.app) | https://ads-risk-check.vercel.app/openapi.json |
| [AppGate Pack](https://appgate-pack.vercel.app) | https://appgate-pack.vercel.app/openapi.json |
| [Faceless YT Reality Check](https://faceless-yt-risk-check.vercel.app) | https://faceless-yt-risk-check.vercel.app/openapi.json |
| [AI Bottleneck Map](https://ai-bottleneck-map.vercel.app) | https://ai-bottleneck-map.vercel.app/openapi.json |
| [Viral Attention Map](https://viral-attention-map.vercel.app) | https://viral-attention-map.vercel.app/openapi.json |
| [Japan Trip Brain](https://japan-trip-brain.vercel.app) | https://japan-trip-brain.vercel.app/openapi.json |

## Test it

```bash
npx @modelcontextprotocol/inspector --cli https://free-agent-tools.vercel.app/mcp --transport http --method tools/list
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000/mcp
npm test           # schema and wiring tests
npm run e2e        # real MCP client: list tools and call every tool (defaults to production)
```

Built with Next.js and [`mcp-handler`](https://www.npmjs.com/package/mcp-handler) (MCP SDK v2; serves the
2026-07-28 spec natively with stateless fallback for 2025-era Streamable HTTP clients). Deployed on Vercel.

## License

MIT
