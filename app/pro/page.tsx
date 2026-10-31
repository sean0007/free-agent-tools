import type { Metadata } from "next";
import Link from "next/link";
import { MCP_URL, SERVER_URL, TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Agent Tools Pro (planned): Japan rule-change feed and commercial use",
  description:
    "The free MCP server stays free. Pro is a planned add-on for teams: a Japan rule-change feed, commercial-use terms and uptime commitments. Not on sale yet; tell us which part you'd use.",
  alternates: { canonical: `${SERVER_URL}/pro` },
};

const PLANS = [
  {
    id: "feed",
    name: "Japan rule-change feed",
    price: "about $9/month (planned)",
    what: "JSON + RSS feed of dated changes behind the Japan tools (visa and residence fees, permanent-residence guideline, re-entry, customs allowance, tax-free, postage, driving permits, 民泊 rules), each with the official source link and effective date.",
  },
  {
    id: "commercial",
    name: "Commercial use + uptime",
    price: "about $15/month (planned)",
    what: "Written commercial-use terms for travel agencies, relocation firms and apps that call the tools for customers, a status page, higher rate ceilings and a named contact for tool fixes.",
  },
  {
    id: "custom",
    name: "Custom Japan check",
    price: "quote (planned)",
    what: "One new deterministic check built for your use case (for example a company-specific relocation checklist) and added to the free server for everyone, credited to you.",
  },
];

export default function Pro() {
  return (
    <main>
      <p className="kicker">Planned · not on sale yet</p>
      <h1>Free Agent Tools Pro</h1>
      <p className="lead">
        The {TOOLS.length} tools at <code>{MCP_URL}</code> stay free, with no key and no signup. Pro is a planned paid add-on for people
        who use the Japan tools at work. Nothing is for sale yet and there is no payment form.
      </p>
      <p>
        If one of these would be worth paying for, tap it. We count taps on each option (no email, no account, nothing
        about you is stored) and only build the ones people pick.
      </p>
      {PLANS.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.name}</h3>
          <p className="muted small" style={{ margin: "0 0 6px" }}>{p.price}</p>
          <p className="small" style={{ margin: 0 }}>{p.what}</p>
          <p className="small" style={{ margin: "10px 0 0" }}>
            <a href={`/pro/yes/${p.id}`} rel="nofollow">I&apos;d pay for this →</a>
          </p>
        </div>
      ))}
      <footer>
        <Link href="/" prefetch={false}>Back to Free Agent Tools</Link> · Results from every tool are rules of thumb and educational estimates, not legal,
        tax, or immigration advice.
      </footer>
    </main>
  );
}
