import { z } from "zod";

export const SERVER_URL = "https://free-agent-tools.vercel.app";
export const MCP_URL = `${SERVER_URL}/mcp`;

export type SiteInfo = { id: string; name: string; url: string; blurb: string };

export const SITES: Record<string, SiteInfo> = {
  founder: { id: "founder", name: "Founder Scorecard", url: "https://fund-fix-flee.vercel.app", blurb: "MOAT idea score, price headroom, 30-day cash, old email list value." },
  hotel: { id: "hotel", name: "Hotel OTA Commission Calculator", url: "https://hotel-ota-calculator.vercel.app", blurb: "What Booking.com and Expedia cost a hotel, and what direct bookings save." },
  saas: { id: "saas", name: "SaaS Bill Cutter", url: "https://saas-bill-cutter.vercel.app", blurb: "Open-source swaps for paid SaaS with real payback math." },
  ads: { id: "ads", name: "Ads Risk Check", url: "https://ads-risk-check.vercel.app", blurb: "Plain-language risk card for Google Ads and Meta Ads policy notices." },
  appgate: { id: "appgate", name: "AppGate Pack", url: "https://appgate-pack.vercel.app", blurb: "App Store Guideline 4.2 / 4.3 / metadata precheck for wrapper apps." },
  faceless: { id: "faceless", name: "Faceless YT Reality Check", url: "https://faceless-yt-risk-check.vercel.app", blurb: "Pushback on viral AI YouTube income claims." },
  bottleneck: { id: "bottleneck", name: "AI Bottleneck Map", url: "https://ai-bottleneck-map.vercel.app", blurb: "The physical constraints behind the AI buildout." },
  attention: { id: "attention", name: "Viral Attention Map", url: "https://viral-attention-map.vercel.app", blurb: "How attention spreads online, and whether you chase, invent, or read it." },
  pitch: { id: "pitch", name: "Pitch Roast", url: "https://pitch-roast.vercel.app", blurb: "Five judges roast a startup pitch: scores, one verdict, one change." },
  japan: { id: "japan", name: "Japan Trip Brain", url: "https://japan-trip-brain.vercel.app", blurb: "Where to stay, what's on, and what to do in Japan by city and month." },
  taxfree: { id: "taxfree", name: "Japan Tax-Free Refund Checker", url: "https://japan-tax-free-refund.vercel.app", blurb: "Nov 2026 refund method: per store/day eligibility, max consumption-tax refund, 90-day deadline." },
};

const pct = (d: string) => z.number().min(0).max(100).describe(d);
const score10 = (d: string) => z.number().min(1).max(10).describe(d);

const STAGES = ["idea", "pre-seed", "seed", "series-a", "growth"] as const;
const CATEGORIES = ["b2b-saas", "consumer", "marketplace", "devtools", "ai", "fintech", "health", "hardware", "climate", "crypto", "other"] as const;
const SAAS_IDS = ["mixpanel", "semrush", "freshbooks", "calendly", "chargebee", "typeform", "pipedrive", "gohighlevel", "intercom"] as const;
const BOTTLENECKS = ["compute", "memory", "optics", "power", "space", "servers"] as const;
const JAPAN_CITIES = ["tokyo", "kyoto", "osaka", "sapporo", "hiroshima", "naha"] as const;
const TRAVELERS = ["solo", "couple", "family", "budget", "luxury", "nightlife"] as const;

export type ToolDef = {
  name: string;
  title: string;
  description: string;
  site: keyof typeof SITES;
  path: string;
  inputSchema: z.ZodObject;
  /** Small valid input used by tests and the landing page. */
  example: Record<string, unknown>;
};

export const TOOLS: ToolDef[] = [
  {
    name: "score_business_idea_moat",
    title: "Score a business idea (MOAT: fund, fix, or flee)",
    description:
      "Score a business idea on Margin, Operations, Advantage, and TAM (1-10 each). 30+ = FUND IT, 20-29 = FIX IT, under 20 = FLEE IT. Returns the weakest factor, how to fix it, and red flags from pain / money / willingness-to-suffer checks. Educational rule of thumb, not financial advice.",
    site: "founder",
    path: "/api/moat",
    inputSchema: z.object({
      margin: score10("Net margin potential, 1-10."),
      operations: score10("How easily it runs without the founder, 1-10."),
      advantage: score10("Hard-to-copy edge (distribution, data, expertise), 1-10."),
      tam: score10("Market size and proof that people buy, 1-10."),
      pain: z.boolean().optional().describe("Fixes a measurable pain? Default true."),
      money: z.boolean().optional().describe("Buyers have money to spend? Default true."),
      suffer: z.boolean().optional().describe("Founder willing to push through a long build? Default true."),
    }),
    example: { margin: 7, operations: 4, advantage: 6, tam: 8, pain: true, money: true, suffer: false },
  },
  {
    name: "roast_pitch",
    title: "Roast a startup pitch (five judges, one verdict, one change)",
    description:
      "Paste a startup pitch (one to five sentences). Five fictional judges (Seed VC, Skeptical Customer, CTO, Your Competitor, Growth Lead) score it 1-10 with a short roast line each, then it returns a verdict (FUND IT / SHARPEN IT / REWRITE IT / ROASTED / BURNT TO A CRISP), the one change worth the most points, detected issues and strengths, and a share URL with an OG image. Deterministic, transparent rubric (specific customer, pain, numbers, traction, wedge, distribution, buzzwords, 'X for Y', blockchain), not an AI opinion. For fun and practice, not investment advice.",
    site: "pitch",
    path: "/api/roast",
    inputSchema: z.object({
      pitch: z.string().min(3).max(1000).describe("The pitch, one to five sentences."),
      stage: z.enum(STAGES).optional().describe("Optional stage. Later stages are judged harder on traction."),
      category: z.enum(CATEGORIES).optional().describe("Optional category. 'crypto' softens the blockchain penalty."),
    }),
    example: { pitch: "Uber for dog walkers, but on the blockchain.", stage: "idea", category: "marketplace" },
  },
  {
    name: "price_headroom_check",
    title: "Price headroom from close rate",
    description:
      "Is the business underpriced? Uses sales close rate (80%+ = way underpriced, ~30% = about right, under 25% = sales problem) to suggest a price range, and computes the profit multiple of a price rise after losing some customers, plus the break-even customer loss.",
    site: "founder",
    path: "/api/price",
    inputSchema: z.object({
      closeRate: pct("Percent of proposals or sales calls that close."),
      price: z.number().min(0).describe("Current price, any currency."),
      netMargin: z.number().min(0.1).max(99).optional().describe("Net margin percent today. Default 15."),
      newPriceMultiple: z.number().min(0.1).max(10).optional().describe("New price as a multiple of the old (1.5 = +50%). Default 1.5."),
      customersLost: pct("Percent of customers expected to leave after the rise. Default 20.").optional(),
    }),
    example: { closeRate: 70, price: 500, netMargin: 15, newPriceMultiple: 1.5, customersLost: 20 },
  },
  {
    name: "thirty_day_cash_check",
    title: "Do customers fund growth? (30-day cash)",
    description:
      "Compares cash collected in a new customer's first 30 days with acquisition cost plus 30-day cost to serve. 2x+ = SELF-FUNDING, 1-2x = BREAK-EVEN, under 1x = CASH-HUNGRY. Returns the gap to 2x and tips.",
    site: "founder",
    path: "/api/cash",
    inputSchema: z.object({
      cash30: z.number().min(0).describe("Cash collected from a new customer in their first 30 days."),
      cac: z.number().min(0).describe("Customer acquisition cost."),
      cogs30: z.number().min(0).optional().describe("Cost to serve that customer for 30 days. Default 0."),
    }),
    example: { cash30: 400, cac: 250, cogs30: 100 },
  },
  {
    name: "email_list_reactivation_value",
    title: "What is an old email list worth?",
    description: "Estimates buyers and revenue from one offer to past customers in low / mid / high scenarios, with an optional partner revenue share.",
    site: "founder",
    path: "/api/email-list",
    inputSchema: z.object({
      contacts: z.number().min(0).describe("Number of past contacts."),
      orderValue: z.number().min(0).describe("Average order value of the offer."),
      reachable: pct("Percent of contacts still reachable. Default 70.").optional(),
      buyRate: pct("Expected percent of reached contacts who buy. Default 1.").optional(),
      partnerShare: pct("Optional partner revenue share percent. Default 0.").optional(),
    }),
    example: { contacts: 3000, orderValue: 80, reachable: 70, buyRate: 1, partnerShare: 20 },
  },
  {
    name: "hotel_ota_commission_calculator",
    title: "Hotel OTA commission and direct-booking savings",
    description:
      "For hotels, ryokan, guesthouses, and B&Bs: yearly room revenue, commission paid to OTAs (Booking.com, Expedia, Agoda...), commission as a share of revenue (HIGH / MED / LOW), and net savings from moving a share of OTA bookings to direct. Any currency.",
    site: "hotel",
    path: "/api/calculate",
    inputSchema: z.object({
      rooms: z.number().min(0).describe("Number of rooms."),
      adr: z.number().min(0).describe("Average daily rate per occupied room."),
      occupancy: pct("Average yearly occupancy percent. Default 70.").optional(),
      otaShare: pct("Percent of room revenue booked via OTAs. Default 60.").optional(),
      commission: pct("Average OTA commission percent. Default 18.").optional(),
      directCost: pct("Cost of a direct booking as percent of revenue. Default 3.").optional(),
      shift: pct("Percent of OTA bookings moved to direct. Default 20.").optional(),
    }),
    example: { rooms: 20, adr: 120, occupancy: 70, otaShare: 60, commission: 18, directCost: 3, shift: 20 },
  },
  {
    name: "saas_self_host_savings",
    title: "Replace paid SaaS with open source: savings and payback",
    description: `Give monthly spend per paid tool (ids: ${SAAS_IDS.join(", ")}). Returns the open-source swap for each (repo, license, caveat), yearly savings after hosting, setup hours and cost, break-even months, and a SWITCH / MAYBE / KEEP verdict.`,
    site: "saas",
    path: "/api/calculate",
    inputSchema: z.object({
      spend: z.partialRecord(z.enum(SAAS_IDS), z.number().min(0)).describe("Map of tool id to monthly spend in dollars, e.g. {\"mixpanel\": 300, \"intercom\": 150}."),
      hostingPerMonth: z.number().min(0).optional().describe("Estimated monthly server cost to self-host. Default 20."),
      hourlyRate: z.number().min(0).optional().describe("Value of an hour of setup time. Default 50."),
    }),
    example: { spend: { mixpanel: 300, calendly: 48, intercom: 150 }, hostingPerMonth: 20, hourlyRate: 50 },
  },
  {
    name: "list_open_source_saas_alternatives",
    title: "List open-source alternatives to paid SaaS",
    description: "Lists every covered paid tool (Mixpanel, Semrush, FreshBooks, Calendly, Chargebee, Typeform, Pipedrive/HubSpot, GoHighLevel, Intercom/Zendesk) with its open-source swap, GitHub repo, license, setup effort, and main catch.",
    site: "saas",
    path: "/api/tools",
    inputSchema: z.object({}),
    example: {},
  },
  {
    name: "ads_policy_notice_risk_check",
    title: "Google Ads / Meta Ads notice risk card",
    description:
      "Paste the text of a Google Ads, AdSense, Merchant Center, or Meta (Facebook/Instagram) ads suspension, disapproval, or policy notice. Returns HIGH / MED / LOW risk, the platform, the policy phrases found with plain-language explanations, and a next-step checklist. Heuristic only; never suggests replacement accounts or files appeals.",
    site: "ads",
    path: "/api/score",
    inputSchema: z.object({ notice: z.string().min(20).max(20000).describe("Full notice text. Remove account IDs and personal data.") }),
    example: { notice: "Your Meta Ads account is limited because of a billing issue. The payment method was declined and there is an unpaid balance." },
  },
  {
    name: "app_store_wrapper_precheck",
    title: "App Store 4.2 / 4.3 / metadata rejection precheck",
    description:
      "For Capacitor, WebView, PWA-shell, React Native, or AI-generated iOS apps: scores rejection risk under Guideline 4.2 (minimum functionality / web wrapper), 4.3 (spam / clone), and metadata, with reasons and how native each feature reads. Not legal advice; Apple decides.",
    site: "appgate",
    path: "/api/precheck",
    inputSchema: z.object({
      name: z.string().min(1).describe("App name."),
      description: z.string().min(1).describe("One-line description of what the app does."),
      stack: z.enum(["capacitor", "webview", "react-native", "pwa", "other"]).describe("How the app is built."),
      features: z.array(z.string()).min(1).max(3).describe("Up to three key features, e.g. [\"Home screen widget\", \"iOS share sheet\", \"Face ID lock\"]."),
    }),
    example: { name: "Harbor Log", description: "Shift log for marina dockhands, with widgets on the home screen.", stack: "react-native", features: ["Home screen widget", "iOS share sheet", "Face ID lock"] },
  },
  {
    name: "faceless_youtube_reality_check",
    title: "Faceless / AI YouTube channel reality check",
    description:
      "Seven multiple-choice answers about a faceless or AI YouTube channel plan. Returns HIGH / MED / LOW expectation and monetization-policy risk with signals and myths to drop. Pushes back on viral '$10k/month with AI YouTube' claims. Not a ban prediction.",
    site: "faceless",
    path: "/api/score",
    inputSchema: z.object({
      visual: z.enum(["ai_slideshow", "stock_mass", "original_filmed", "mixed"]).describe("Main visual style."),
      voiceover: z.enum(["ai_voice", "human_vo", "text_only"]).describe("Main voiceover."),
      scripts: z.enum(["identical_template", "researched_original", "trend_recycled"]).describe("How scripts are made."),
      revenueTiming: z.enum(["before_ypp", "after_ypp", "not_counting"]).describe("When money is expected relative to the YouTube Partner Program."),
      estimates: z.enum(["as_income", "as_guesses", "unused"]).describe("How VidIQ / SocialBlade earnings estimates are treated."),
      timeline: z.enum(["ten_k_fast", "multi_month", "unsure"]).describe("Expected timeline."),
      niche: z.enum(["broad_storytime", "researched_angle", "mixed"]).describe("Niche."),
    }),
    example: { visual: "mixed", voiceover: "human_vo", scripts: "researched_original", revenueTiming: "after_ypp", estimates: "as_guesses", timeline: "multi_month", niche: "researched_angle" },
  },
  {
    name: "ai_infrastructure_bottlenecks",
    title: "AI infrastructure bottlenecks explained",
    description:
      "Explains the physical constraints on the AI buildout beyond chips: compute, memory (HBM), optics, power, space (sites, backhaul), and servers (racks, cooling). Omit slug for all six. Includes example public companies often cited in discussion; these are not investment picks.",
    site: "bottleneck",
    path: "/api/bottlenecks",
    inputSchema: z.object({ slug: z.enum(BOTTLENECKS).optional().describe("Optional: one bottleneck.") }),
    example: { slug: "power" },
  },
  {
    name: "ai_bottleneck_quiz",
    title: "Which AI bottleneck constrains your stack? (quiz)",
    description: `Without answers, returns the five quiz questions with options. With answers (one slug per question from: ${BOTTLENECKS.join(", ")}), returns the most constrained bottleneck.`,
    site: "bottleneck",
    path: "/api/quiz",
    inputSchema: z.object({ answers: z.array(z.enum(BOTTLENECKS)).max(10).optional().describe("One slug per question.") }),
    example: { answers: ["power", "power", "memory", "optics", "power"] },
  },
  {
    name: "viral_attention_patterns",
    title: "How attention spreads online",
    description: "Patterns of how attention spreads (TikTok sound reuse, X quote-post piles, stitch chains, group-chat forwards, and more), each with the signal to watch and the lesson. Optional platform filter. Educational; attention is not an investment signal.",
    site: "attention",
    path: "/api/patterns",
    inputSchema: z.object({ platform: z.string().optional().describe("Optional platform filter, e.g. TikTok or X.") }),
    example: {},
  },
  {
    name: "viral_attention_quiz",
    title: "Do you chase, invent, or read attention? (quiz)",
    description: "Without answers, returns six questions. With answers (one of chaser, inventor, reader per question), returns the user's tilt with a short explanation.",
    site: "attention",
    path: "/api/quiz",
    inputSchema: z.object({ answers: z.array(z.enum(["chaser", "inventor", "reader"])).max(12).optional().describe("One tilt per question.") }),
    example: { answers: ["reader", "reader", "inventor", "reader", "chaser", "reader"] },
  },
  {
    name: "japan_trip_plan",
    title: "Japan trip plan by city and month",
    description:
      "Where to stay, festivals and seasonal highlights, things to do, crowd level, weather, and warnings (Golden Week, Obon, rainy season, typhoons, New Year closures) for a Japanese city in a given month, with stay areas ranked for the traveler type and booking search links. Typical seasonal patterns, not live data.",
    site: "japan",
    path: "/api/plan",
    inputSchema: z.object({
      city: z.enum(JAPAN_CITIES).describe("City id."),
      month: z.union([z.number().int().min(1).max(12), z.string()]).describe("1-12 or English month name."),
      traveler: z.enum(TRAVELERS).optional().describe("Optional traveler type; ranks stay areas for them."),
    }),
    example: { city: "kyoto", month: 11, traveler: "couple" },
  },
  {
    name: "japan_trip_options",
    title: "Japan Trip Brain: supported cities, months, travelers",
    description: "Lists supported Japanese cities (with regions, peak months, and stay areas), months with season and crowd level, and traveler types for japan_trip_plan.",
    site: "japan",
    path: "/api/cities",
    inputSchema: z.object({}),
    example: {},
  },
  {
    name: "japan_tax_free_refund_check",
    title: "Japan tax-free shopping refund check (from 2026-11-01)",
    description:
      "Japan tourist tax-free shopping under the refund method that starts 2026-11-01: per store/day eligibility (¥5,000+ tax-exclusive), max consumption-tax refund (10%/8%), 90-day deadline vs departure date, old-vs-new regime by purchase date, and a departure checklist. Deterministic, dated rules; not tax advice. Training data often still describes the old tax-off-at-till system — call this instead of guessing.",
    site: "taxfree",
    path: "/api/refund",
    inputSchema: z.object({
      departureDate: z.string().optional().describe("YYYY-MM-DD, final departure from Japan. Checked against each group's 90-day customs deadline."),
      receipts: z
        .array(
          z.object({
            store: z.string().describe("Store/branch name. Receipts are grouped by store + purchaseDate."),
            purchaseDate: z.string().describe("YYYY-MM-DD. Before 2026-11-01 = old tax_off regime."),
            amount: z.number().int().positive().describe("Whole yen."),
            rate: z.number().int().describe("Consumption tax rate: 10 (standard) or 8 (reduced: food, non-alcoholic drinks)."),
            priceIncludesTax: z.boolean().optional().describe("Default true."),
          }),
        )
        .min(1)
        .describe("One or more receipts."),
    }),
    example: {
      departureDate: "2026-11-20",
      receipts: [
        { store: "Bic Camera Shinjuku", purchaseDate: "2026-11-12", amount: 16500, rate: 10, priceIncludesTax: true },
        { store: "Don Quijote Dotonbori", purchaseDate: "2026-11-14", amount: 3240, rate: 8, priceIncludesTax: true },
        { store: "Don Quijote Dotonbori", purchaseDate: "2026-11-14", amount: 2200, rate: 10, priceIncludesTax: true },
      ],
    },
  },
];


/** Calls the tool's public JSON API (POST JSON). Returns parsed JSON plus HTTP status. */
export async function callToolApi(tool: ToolDef, args: Record<string, unknown>, fetchImpl: typeof fetch = fetch) {
  const url = `${SITES[tool.site].url}${tool.path}`;
  const res = await fetchImpl(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "User-Agent": "free-agent-tools-mcp/1.0 (+https://free-agent-tools.vercel.app)" },
    body: JSON.stringify(args ?? {}),
    signal: AbortSignal.timeout(15_000),
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { error: `Upstream returned non-JSON (HTTP ${res.status}).` };
  }
  return { ok: res.ok, status: res.status, url, data: data as Record<string, unknown> };
}
