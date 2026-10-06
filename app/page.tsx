import { CLIENTS } from "@/lib/clients";
import { MCP_URL, SITES, TOOLS } from "@/lib/tools";

export default function Home() {
  const sites = Object.values(SITES);
  return (
    <main>
      <p className="kicker">Remote MCP server · free · no auth</p>
      <h1>Free Agent Tools</h1>
      <p className="lead">
        Seventeen small, deterministic tools your AI agent can call: roast a startup pitch, score a business idea, check price headroom,
        work out hotel OTA commission, find open-source swaps for SaaS bills, read a Google or Meta ads notice,
        precheck an iOS app for App Store 4.2, reality-check an AI YouTube plan, explain AI infrastructure
        bottlenecks, and plan a Japan trip by city and month.
      </p>
      <p>Add this URL to any MCP client that supports streamable HTTP:</p>
      <pre className="url">{MCP_URL}</pre>
      <p className="muted small">
        No API key, no account, no tracking of tool inputs. Results are rules of thumb and educational estimates,
        not financial, legal, or investment advice; every result carries a disclaimer for the user.
      </p>

      <h2>Add it to your client</h2>
      {CLIENTS.map((c) => (
        <div className="card" key={c.name}>
          <h3>{c.name}</h3>
          <p className="muted small" style={{ margin: 0 }}>{c.how}</p>
          <pre>{c.code}</pre>
        </div>
      ))}

      <h2>Tools</h2>
      <div className="grid">
        {TOOLS.map((t) => (
          <div className="tool" key={t.name}>
            <code>{t.name}</code>
            <p className="small" style={{ margin: "6px 0 0" }}>{t.title}</p>
            <p className="muted small" style={{ margin: "4px 0 0" }}>
              From <a href={SITES[t.site].url}>{SITES[t.site].name}</a>
            </p>
          </div>
        ))}
      </div>

      <h2>Prefer plain HTTP?</h2>
      <p className="muted">Each tool also has a free JSON API (GET or POST, CORS open) with an OpenAPI spec, usable as a GPT Action or function tool.</p>
      {sites.map((s) => (
        <div className="card" key={s.id}>
          <h3><a href={s.url}>{s.name}</a></h3>
          <p className="muted small" style={{ margin: 0 }}>{s.blurb}</p>
          <p className="small" style={{ margin: "6px 0 0" }}>
            <a href={`${s.url}/openapi.json`}>openapi.json</a> · <a href={`${s.url}/llms.txt`}>llms.txt</a> ·{" "}
            <a href={`${s.url}/.well-known/ai-plugin.json`}>ai-plugin.json</a>
          </p>
        </div>
      ))}

      <h2>Test it</h2>
      <pre>{`npx @modelcontextprotocol/inspector --cli ${MCP_URL} --transport http --method tools/list`}</pre>

      <footer>
        Source: <a href="https://github.com/sean0007/free-agent-tools">github.com/sean0007/free-agent-tools</a> (MIT) ·{" "}
        <a href="/llms.txt">llms.txt</a> · <a href="/server.json">server.json</a>
        <br />
        Not affiliated with Anthropic, OpenAI, Google, Meta, Apple, or any company named in tool results.
      </footer>
    </main>
  );
}
