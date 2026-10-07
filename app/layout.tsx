import type { Metadata } from "next";
import "./globals.css";
import { SERVER_URL } from "@/lib/tools";

const description =
  "A free remote MCP server with 17 deterministic tools: startup pitch roast, business idea scoring, pricing, hotel OTA commission, SaaS self-host savings, Google/Meta ads notice risk, App Store 4.2 precheck, AI YouTube reality check, AI infrastructure bottlenecks, and Japan trip planning. No key, no signup.";

export const metadata: Metadata = {
  metadataBase: new URL(SERVER_URL),
  title: "Free Agent Tools: a free, no-auth remote MCP server",
  description,
  alternates: { canonical: `${SERVER_URL}/` },
  openGraph: { title: "Free Agent Tools MCP server", description, url: SERVER_URL, type: "website", siteName: "Free Agent Tools" },
  twitter: { card: "summary_large_image", title: "Free Agent Tools MCP server", description, images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
