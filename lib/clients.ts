import { MCP_URL } from "./tools";

export const CLIENTS: { name: string; how: string; code: string }[] = [
  { name: "Claude Code", how: "Run in your terminal:", code: `claude mcp add --transport http free-agent-tools ${MCP_URL}` },
  { name: "Claude (desktop and web)", how: "Settings → Connectors → Add custom connector. Name it Free Agent Tools and paste this URL. No sign-in needed.", code: MCP_URL },
  { name: "ChatGPT", how: "Settings → Apps & Connectors → Advanced → turn on Developer mode, then Create. Paste the URL and choose No authentication.", code: MCP_URL },
  { name: "Cursor", how: "Add to ~/.cursor/mcp.json (or .cursor/mcp.json in a project):", code: JSON.stringify({ mcpServers: { "free-agent-tools": { url: MCP_URL } } }, null, 2) },
  { name: "VS Code (Copilot agent mode)", how: "Add to .vscode/mcp.json:", code: JSON.stringify({ servers: { "free-agent-tools": { type: "http", url: MCP_URL } } }, null, 2) },
  { name: "Windsurf", how: "Add to ~/.codeium/windsurf/mcp_config.json:", code: JSON.stringify({ mcpServers: { "free-agent-tools": { serverUrl: MCP_URL } } }, null, 2) },
  { name: "Gemini CLI", how: "Add to ~/.gemini/settings.json:", code: JSON.stringify({ mcpServers: { "free-agent-tools": { httpUrl: MCP_URL } } }, null, 2) },
  { name: "OpenAI Codex CLI", how: "Add to ~/.codex/config.toml:", code: `[mcp_servers.free-agent-tools]\nurl = "${MCP_URL}"` },
  { name: "OpenAI Responses API", how: "Pass it as a remote MCP tool:", code: JSON.stringify({ type: "mcp", server_label: "free_agent_tools", server_url: MCP_URL, require_approval: "never" }, null, 2) },
  { name: "Stdio-only clients", how: "Bridge with mcp-remote:", code: JSON.stringify({ mcpServers: { "free-agent-tools": { command: "npx", args: ["-y", "mcp-remote", MCP_URL] } } }, null, 2) },
];
