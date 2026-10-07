import { ImageResponse } from "next/og";
import { MCP_URL, TOOLS } from "@/lib/tools";

export const alt = "Free Agent Tools: a free, no-auth remote MCP server";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SHOW = ["roast_pitch", "score_business_idea_moat", "hotel_ota_commission_calculator", "saas_self_host_savings", "ads_policy_notice_risk_check", "app_store_wrapper_precheck", "japan_trip_plan"];

export default function OpenGraphImage() {
  const names = SHOW.filter((n) => TOOLS.some((t) => t.name === n));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0d0f12", color: "#e9ecef", padding: "60px 64px", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7cc4ff" }}>Remote MCP server · free · no auth</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>Free Agent Tools</div>
          <div style={{ display: "flex", fontSize: 34, color: "#9aa3ad", marginTop: 18 }}>{`${TOOLS.length} deterministic business and travel tools your AI agent can call`}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {names.map((n) => (
            <div key={n} style={{ display: "flex", fontSize: 22, fontFamily: "monospace", color: "#7cc4ff", background: "#15181d", border: "2px solid #262a31", borderRadius: 10, padding: "6px 14px" }}>{n}</div>
          ))}
          <div style={{ display: "flex", fontSize: 22, color: "#9aa3ad", padding: "6px 6px" }}>{`+${TOOLS.length - names.length} more`}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontFamily: "monospace", color: "#e9ecef", background: "#0a0c0f", border: "2px solid #262a31", borderRadius: 14, padding: "14px 20px" }}>{MCP_URL}</div>
      </div>
    ),
    { ...size },
  );
}
