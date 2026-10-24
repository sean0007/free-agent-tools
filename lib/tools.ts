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
  luggage: { id: "luggage", name: "Japan Luggage Check", url: "https://japan-luggage.vercel.app", blurb: "Shinkansen oversized-baggage rule by line + Yamato TA-Q-BIN forwarding cost at current rates." },
  visafee: { id: "visafee", name: "Japan Visa Fee Calculator", url: "https://japan-visa-fee.vercel.app", blurb: "Oct 2026 residence permit fees: renewal, change of status, permanent residence, online vs counter, stamps." },
  kyushu: { id: "kyushu", name: "Kyushu Travel Discount Calculator", url: "https://kyushu-travel-discount.vercel.app", blurb: "Kyushu Fukko Ouenwari 2026 (九州ふっこう応援割): 50-60% off Kyushu stays, per-person caps, date/channel eligibility, sales openings." },
  tbscreen: { id: "tbscreen", name: "Japan TB Screening Check (JPETS)", url: "https://japan-tb-screening.vercel.app", blurb: "Japan Pre-Entry TB Screening: who needs a TB Clearance Certificate for a COE/visa (PH, NP, VN; Indonesia from 2027-01-04), exemptions, 180-day validity, Panel Clinics." },
  dualprice: { id: "dualprice", name: "Japan Dual Pricing Check", url: "https://japan-dual-pricing.vercel.app", blurb: "Japan dual pricing (二重価格): resident vs non-resident prices at Himeji Castle, Odawara Castle, Nanzoin, JUNGLIA, Kagoshima, Kitakyushu, plus the planned Nijo Castle and Kyoto City Bus prices." },
  alerts: { id: "alerts", name: "Japan Alert Decoder", url: "https://japan-alert-decoder.vercel.app", blurb: "What a Japanese emergency alert means and what to do: Earthquake Early Warning (緊急地震速報), tsunami, the level-named weather warnings since 2026-05-29, 避難指示, Nankai Trough info, J-ALERT; official names in 14 languages." },
  prcheck: { id: "prcheck", name: "Japan PR Guideline Check", url: "https://japan-pr-check.vercel.app", blurb: "Japan permanent residence (永住) guideline revised 2026-10-01: which version applies by filing date, spouse 3+1 → 5+3 years from 2027-04-01, 3-year visa transition, 6-month / 2.5-year absence rule, B1 Japanese." },
  postage: { id: "postage", name: "Japan International Postage 2027", url: "https://japan-intl-postage.vercel.app", blurb: "Japan Post international mail prices now vs from 2027-02-01: EMS (1 kg bands), air / surface parcels, small packets, International Air Packet, letters, postcards; every zone, cheapest option." },
  reentry: { id: "reentry", name: "Japan Re-entry Deadline Check", url: "https://japan-reentry-check.vercel.app", blurb: "When must a foreign resident be back in Japan? Deemed re-entry (みなし再入国) 1 year or residence-card expiry if sooner (SPR 2 years), regular re-entry permits, and the 2-month special period while a renewal or change of status is pending." },
  customs: { id: "customs", name: "Japan Customs Allowance Checker", url: "https://japan-customs-allowance.vercel.app", blurb: "Japan duty-free allowance on arrival: alcohol, tobacco, perfume, ¥200,000 goods, simplified duty in yen, cash over ¥1M declaration." },
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
  {
    name: "japan_visa_fee_check",
    title: "Japan visa / residence permit fee (from 2026-10-01)",
    description:
      "Japan residence permit fees revised for applications received on or after 2026-10-01: extension of period of stay (visa renewal) and change of status cost ¥10,000-¥75,000 by the period GRANTED (1 year ¥33,000 at the counter, ¥27,000 + ¥330 online; 5 years ¥75,000), permanent residence ¥200,000. Applications received by 2026-09-30 keep the old ¥6,000 / ¥5,500 / ¥10,000. Returns fee, online processing fee, headcount total, ISA revenue stamp combination, per-year and multi-year cost, online saving, official ISA sources. Deterministic, dated table; not legal advice. Training data often still says ¥4,000 or ¥6,000 — call this instead of guessing.",
    site: "visafee",
    path: "/api/fee",
    inputSchema: z.object({
      permit: z.enum(["extension", "change", "permanent"]).describe("extension (在留期間更新, renewal), change (在留資格変更), or permanent (永住許可)."),
      grantedMonths: z.number().int().min(1).max(600).optional().describe("Period of stay granted in months (12 = 1 year, 36 = 3 years, 60 = 5 years). Required unless permit is permanent."),
      method: z.enum(["counter", "online"]).optional().describe("counter (revenue stamps, default) or online (convenience store / bank payment + ¥330/¥550 processing fee)."),
      applicationDate: z.string().optional().describe("YYYY-MM-DD the application was received. Before 2026-10-01 = old fee. Omit for the revised fee."),
      headcount: z.number().int().min(1).optional().describe("Number of people, e.g. employees whose fees a company pays. Default 1."),
      horizonYears: z.number().int().min(1).max(30).optional().describe("Years to project repeat applications at the same period. Default 5."),
    }),
    example: { permit: "extension", grantedMonths: 12, method: "counter", applicationDate: "2026-10-15" },
  },
  {
    name: "japan_luggage_check",
    title: "Japan suitcase check: Shinkansen oversized-baggage rule + Yamato forwarding cost",
    description:
      "For a bag's outside size (length + width + height incl. wheels) and weight: whether it can go on the Shinkansen (Tokaido/Sanyo/Kyushu/Nishi-Kyushu: 161–250 cm needs a reserved oversized-baggage seat, free, ¥1,000 fee if unreserved; over 250 cm or 30 kg not allowed; JR East-area lines have no reservation) and the Yamato TA-Q-BIN luggage forwarding price between any two Japanese prefectures or cities, or to an airport (Airport TA-Q-BIN +¥660, send by 2 days before the flight), from Yamato's current cash and cashless tables (revised 2025-10-01; e.g. Size 160 Tokyo→Kyoto ¥3,160 cash). Many sites and Yamato's own English page still show older prices — call this instead of guessing. Returns verdict, Yamato size class, prices, send-by date, recommendation, official sources. Estimate, not official.",
    site: "luggage",
    path: "/api/check",
    inputSchema: z.object({
      lengthCm: z.number().positive().optional().describe("Outside length in cm incl. wheels/handles (with widthCm + heightCm), or use totalCm."),
      widthCm: z.number().positive().optional().describe("Outside width in cm."),
      heightCm: z.number().positive().optional().describe("Outside depth in cm."),
      totalCm: z.number().positive().optional().describe("Length + width + height in cm if only the total is known."),
      weightKg: z.number().positive().optional().describe("Packed weight in kg (Yamato uses the larger of size and weight class)."),
      from: z.string().optional().describe("Origin prefecture or city (tokyo, kyoto, hakone, 東京都)."),
      to: z.string().optional().describe("Destination prefecture/city, or airport id: haneda, narita, kix, itami, centrair, new-chitose, fukuoka-airport, naha-airport."),
      line: z.enum(["tokaido", "sanyo", "kyushu", "nishi-kyushu", "tohoku", "hokkaido", "joetsu", "hokuriku", "yamagata", "akita", "none"]).optional().describe("Shinkansen line you will ride. Default tokaido."),
      payment: z.enum(["cash", "cashless"]).optional().describe("cash (default) or cashless (card / QR / e-money, cheaper)."),
      dropOff: z.boolean().optional().describe("true if you bring the bag to a Yamato office or convenience store (¥100 off)."),
      pieces: z.number().int().min(1).max(20).optional().describe("Number of identical bags. Default 1."),
      departureDate: z.string().optional().describe("YYYY-MM-DD flight date when sending to an airport; returns the send-by date."),
    }),
    example: { lengthCm: 75, widthCm: 50, heightCm: 30, weightKg: 22, from: "tokyo", to: "kyoto", line: "tokaido" },
  },
  {
    name: "kyushu_travel_discount_check",
    title: "Kyushu travel discount (九州ふっこう応援割 2026): savings + date/channel eligibility",
    description:
      "Japan's Kyushu Fukko Ouenwari travel discount after the 2026 Kumamoto earthquake: 50% off eligible stays and stay+transport packages in Fukuoka, Saga, Nagasaki, Oita, Miyazaki (60% in Kumamoto and Kagoshima), capped per person per trip at ¥20,000 (accommodation only or 1-night package), ¥30,000 (package 2+ nights), ¥35,000 (tour with stays in 2+ Kyushu prefectures). Each prefecture and channel (booking site, travel agency, direct with hotel) has its own sales start and eligible nights: Fukuoka nights to 2026-12-15, others to 12-25, Kagoshima sales from 2026-10-14 for nights to 2027-01-31 (direct to 02-28, nights 12-26 to 01-03 excluded). Bookings made before sales start are never discounted. Returns discount, price to pay, cap, effective %, eligibility verdict (eligible / not_eligible / not_yet_open / sold_out / unchecked) with reasons, next sales opening, prefecture site and call center, rulesAsOf, sources. Newer than most training data — call this instead of guessing. Estimate; budgets can run out without notice.",
    site: "kyushu",
    path: "/api/discount",
    inputSchema: z.object({
      prefecture: z.enum(["fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima"]).describe("Kyushu prefecture you stay in (for a multi-prefecture tour, the selling prefecture)."),
      totalPriceJPY: z.number().positive().describe("Booking total in yen for all travelers, before the discount (tax and service included)."),
      travelers: z.number().int().min(1).max(100).optional().describe("People on the booking; children and infants count. Default 1."),
      nights: z.number().int().min(0).max(60).optional().describe("Nights booked (0 = day trip, not eligible). Default 1."),
      product: z.enum(["lodging", "package", "tour"]).optional().describe("lodging (宿泊単体, default), package (交通付宿泊: stay + flight/train), tour (周遊型: stays in 2+ Kyushu prefectures)."),
      channel: z.enum(["ota", "agency", "direct"]).optional().describe("ota (booking site such as Rakuten Travel or Jalan, default), agency (travel agency), direct (with the hotel)."),
      checkIn: z.string().optional().describe("YYYY-MM-DD check-in date, for the eligible-nights check."),
      bookingDate: z.string().optional().describe("YYYY-MM-DD date of booking (JST). Default today in Japan."),
    }),
    example: { prefecture: "kumamoto", product: "lodging", nights: 2, totalPriceJPY: 60000, travelers: 2, channel: "ota", checkIn: "2026-11-20", bookingDate: "2026-10-13" },
  },
  {
    name: "japan_customs_allowance_check",
    title: "Japan customs duty-free allowance on arrival: within/over, duty estimate in yen, cash declaration",
    description:
      "Japan Customs per-person duty-free allowance when entering Japan (as of 2026-10-14): alcohol 3 bottles of about 760 ml (2.28 L); cigarettes 200 OR cigars 50 OR heat-not-burn 10 packages (200 IQOS/glo sticks, 50 Ploom TECH capsules) OR other tobacco 250 g, more than one kind 250 g total; perfume 2 oz (about 56 ml); other goods ¥200,000 total overseas value, an item kind worth ¥10,000 or less in total is free and not counted, an article over ¥200,000 is fully dutiable. Under 20: no alcohol/tobacco allowance; under 6: only items for the child. Excess duty at the simplified rates: whisky/brandy ¥800/L, rum/gin/vodka ¥500/L, liqueur ¥400/L, distilled ¥300/L, wine/beer ¥200/L, cigarettes and sticks ¥15 each, capsules ¥50, other goods 15% of Customs value (price × 0.6), watches/golf clubs/PCs 10% consumption tax; not applied to articles with Customs value over ¥100,000, cigars or other tobacco. Cash and other means of payment over ¥1,000,000 (¥100,000 bound for North Korea) must be declared. Returns per-category within/over, excess, estimatedSimplifiedDutyJPY (+ High for the strict mixed-tobacco reading), tax-type breakdown truncated to ¥100 (reproduces Customs' ¥19,400 worked example), red/green channel, cashDeclarationRequired, warnings, assumptions, sources, rulesAsOf. Many guides still show pre-2021 tobacco limits — call this instead of guessing. Educational estimate; the Customs officer decides.",
    site: "customs",
    path: "/api/check",
    inputSchema: z.object({
      ageYears: z.number().min(0).max(120).optional().describe("Traveler age. Under 20 = no alcohol/tobacco allowance; under 6 = only items for the child. Default adult."),
      travelers: z.number().int().min(1).max(20).optional().describe("People in the same age band pooling allowances. Default 1."),
      alcoholBottles: z.number().int().min(0).optional().describe("Bottles of alcohol (assumed 760 ml each unless alcoholMl is given)."),
      alcoholMl: z.number().min(0).optional().describe("Total alcohol volume in ml (allowance 2,280 ml per adult)."),
      alcoholType: z.enum(["whisky", "brandy", "rum", "gin", "vodka", "liqueur", "distilled", "wine", "beer", "other"]).optional().describe("Drink type for the simplified rate. Default other (¥200/L)."),
      alcohol: z.array(z.object({ type: z.enum(["whisky", "brandy", "rum", "gin", "vodka", "liqueur", "distilled", "wine", "beer", "other"]), ml: z.number().min(0).optional(), bottles: z.number().int().min(0).optional() })).optional().describe("Several drinks: [{type, ml or bottles}]. Allowance goes to the highest-rate drink first."),
      cigarettes: z.number().int().min(0).optional().describe("Cigarettes (allowance 200)."),
      cigars: z.number().int().min(0).optional().describe("Cigars (allowance 50)."),
      hnbPackages: z.number().int().min(0).optional().describe("Heat-not-burn packs (allowance 10; 20 sticks or 5 capsules each)."),
      hnbSticks: z.number().int().min(0).optional().describe("Loose IQOS / glo sticks (allowance 200)."),
      hnbCapsules: z.number().int().min(0).optional().describe("Ploom TECH / with capsules (allowance 50)."),
      hnbType: z.enum(["sticks", "capsules"]).optional().describe("What hnbPackages contain. Default sticks."),
      otherTobaccoGrams: z.number().min(0).optional().describe("Pipe / other tobacco in grams (allowance 250 g)."),
      perfumeMl: z.number().min(0).optional().describe("Perfume in ml (allowance about 56 ml; eau de toilette not counted)."),
      perfumeOz: z.number().min(0).optional().describe("Perfume in ounces (allowance 2 oz)."),
      goods: z.array(z.object({ description: z.string().optional(), valueJPY: z.number().positive(), quantity: z.number().int().min(1).optional(), dutyFreeTariff: z.boolean().optional(), forChild: z.boolean().optional() })).optional().describe("Other articles: overseas retail price of ONE article in yen, quantity, dutyFreeTariff true for watches / golf clubs / PCs, forChild for a child's items."),
      goodsTotalJPY: z.number().min(0).optional().describe("Instead of goods: total overseas value of other articles (approximate)."),
      cashJPY: z.number().min(0).optional().describe("Cash (yen + foreign in yen) one person carries."),
      paymentInstrumentsJPY: z.number().min(0).optional().describe("Checks, travelers checks, promissory notes, securities in yen."),
      boundForNorthKorea: z.boolean().optional().describe("Leaving Japan for North Korea (declaration threshold ¥100,000)."),
      goldBullionKg: z.number().min(0).optional().describe("Gold bullion carried in kg (over 1 kg must be declared)."),
    }),
    example: { ageYears: 35, alcoholBottles: 4, alcoholType: "whisky", cigarettes: 200, goods: [{ description: "Handbag", valueJPY: 120000 }, { description: "Jacket", valueJPY: 130000 }] },
  },
  {
    name: "japan_tb_screening_check",
    title: "Japan pre-entry TB screening (JPETS): do I need a TB Clearance Certificate for my COE or visa?",
    description:
      "Japan Pre-Entry Tuberculosis Screening (JPETS, 入国前結核スクリーニング), rules as of 2026-10-15: nationals of the Philippines, Nepal, Viet Nam, Indonesia, Myanmar and China entering Japan as mid- to long-term residents (stay over 3 months; not Temporary Visitor, Diplomat, Official; re-entry permit holders excluded), plus Designated Activities No. 53 (Digital Nomad) and No. 54, must submit a TB Clearance Certificate from a designated Panel Clinic with the Certificate of Eligibility (COE) application, or with the visa application if there is no COE. Mandatory for applications filed from 2025-06-23 (Philippines, Nepal), 2025-09-01 (Viet Nam), 2027-01-04 (Indonesia, scheduled; Panel Clinics open 2026-11-02); Myanmar and China not announced. Temporarily exempt: Specified Skilled Workers (特定技能), EPA nurses/care workers, JET, JICA trainees, JDS, Japan Foundation invitees, embassy-recommended MEXT scholars, commissioned student training, Designated Activities No. 55, special-zone housekeepers, and anyone whose residence outside the 6 countries is documented. Technical intern trainees and students are NOT exempt. A COE filed before the mandatory date needs no certificate at the visa stage. Certificate valid 180 days from the chest X-ray (90 after close contact), checked at COE filing only. Returns verdict (required / not_yet_required / exempt / not_required), reasons, timeline, X-ray window and validity, documents, the Panel Clinic list (filter by city), notes, sources, rulesAsOf. Training data may predate the Indonesia start; call this instead of guessing. Educational guide, not legal or medical advice.",
    site: "tbscreen",
    path: "/api/check",
    inputSchema: z.object({
      nationality: z.string().describe("Passport nationality: philippines, nepal, vietnam, indonesia, myanmar, china (aliases like ID, VN, PH, Filipino accepted); any other country = not covered."),
      status: z.string().optional().describe("Status of residence / purpose: student, technical_intern_training, employment_for_skill_development, engineer_humanities, skilled_labor, nursing_care, intra_company_transferee, business_manager, highly_skilled_professional, dependent, spouse_of_japanese, long_term_resident, designated_activities, digital_nomad, specified_skilled_worker, epa_nurse_care_worker, jet_programme, jica_trainee, mext_embassy_scholar, temporary_visitor, diplomat_official, other_mid_long (default). Aliases like tokutei_ginou, ssw, gijinkoku, tourist accepted."),
      applicationDate: z.string().optional().describe("YYYY-MM-DD the COE (or direct visa) application is filed. Default today in Japan."),
      residenceCountry: z.string().optional().describe("Country where the applicant lives now if not the nationality: a non-target country = exempt (with residence permit); 'japan' = change of status / extension inside Japan = not required."),
      route: z.enum(["coe", "visa_direct"]).optional().describe("coe (default) or visa_direct (visa at an embassy without a COE; default for digital_nomad)."),
      xrayDate: z.string().optional().describe("YYYY-MM-DD of the Panel Clinic chest X-ray, to check validity on the application date."),
      stayMonths: z.number().min(1).max(600).optional().describe("Expected period of stay in months; 3 or less is not covered (except Digital Nomad)."),
      hasReentryPermit: z.boolean().optional().describe("Returning on a re-entry permit (incl. special re-entry): excluded."),
      closeContact: z.boolean().optional().describe("Close contact with active infectious pulmonary TB within 2 months before the X-ray: validity 90 days."),
      city: z.string().optional().describe("Filter Panel Clinics by city, e.g. Jakarta, Surabaya, Hanoi, Ho Chi Minh City, Manila, Kathmandu."),
    }),
    example: { nationality: "indonesia", status: "student", applicationDate: "2027-01-15" },
  },
  {
    name: "japan_dual_pricing_check",
    title: "Japan dual pricing (二重価格): do tourists pay more at Himeji Castle, Nijo Castle, Kyoto buses and other sites?",
    description:
      "Japan dual pricing (二重価格, resident vs non-resident admission prices), data as of 2026-10-16, from the Japan Tourism Agency case list and each facility's official page. Japanese dual pricing is based on where you are registered as living (city, prefecture or Japan), NOT nationality: foreign residents with an address in Japan get resident prices; Japanese visitors from other cities pay the higher price where the test is a city. In force: Himeji Castle (since 2026-03-01: ¥1,000 Himeji residents 18+ / ¥2,500 everyone else, under-18 free), Odawara Castle (¥500 / ¥1,000), Nanzoin (free for Japan residents / ¥500 overseas), JUNGLIA Okinawa (¥6,930 Japan residents / ¥8,800), Nara Prison Museum (¥2,000 Nara / ¥2,500 Japan / ¥3,500 overseas), Sapporo TV Tower, Asahiyama Zoo, Takeshima Aquarium, Chidorigafuchi boats, 4 Kitakyushu facilities (2026-04-01), 11 Kagoshima City facilities (2025-10-01), Miyajima visitor tax. Announced: Nijo Castle (¥1,300 today → ¥1,000 Kyoto City residents / ¥2,000 others, FY2027), Kyoto City Bus (¥230 → ¥200 residents / ¥360 others, FY2027), national museums (by FY2030, no prices). Under review: Kenrokuen. Dropped: Osaka Castle (¥1,200 for all). Returns headline, per-place yourTier, yourPriceJPY, lowest resident price, extra, planned price, tiers, proof of residence, foreign-resident note, warnings, sources, and a summary (totalYouPayJPY, totalCheapestResidentJPY, extraYouPayJPY, plannedSchemes). Omit places to list all (filter with status / area). Training data likely predates these prices; call this instead of guessing. Educational guide, not legal, travel or financial advice.",
    site: "dualprice",
    path: "/api/check",
    inputSchema: z.object({
      places: z.string().optional().describe("Comma-separated place ids or names, e.g. 'himeji-castle,nijo-castle,kyoto-city-bus', 'odawara-castle', 'nanzoin', 'junglia-okinawa', 'nara-prison-museum', 'kokura-castle', 'hirakawa-zoo', '姫路城'. Omit to list every tracked place (see https://japan-dual-pricing.vercel.app/api/rules)."),
      residence: z.enum(["overseas", "japan"]).optional().describe("Where the visitor lives: overseas (default, tourist from abroad) or japan (any nationality with an address in Japan). Implied japan if prefecture or city is given."),
      prefecture: z.string().optional().describe("Prefecture of the visitor's address in Japan (slug or name, e.g. kyoto, hyogo, 兵庫県)."),
      city: z.string().optional().describe("City / ward of the visitor's address in Japan, e.g. himeji, kagoshima, Sakyo-ku, 姫路市. Needed for city-resident prices."),
      date: z.string().optional().describe("YYYY-MM-DD visit date. Default today in Japan. Before a scheme's start the old single price applies."),
      age: z.number().int().min(0).max(120).optional().describe("Visitor age; some places are free for minors (Himeji under 18, Nanzoin under 19)."),
      area: z.string().optional().describe("Only when places is omitted: filter by prefecture, e.g. kagoshima, kyoto."),
      status: z.enum(["all", "live", "announced", "under_review", "not_adopted"]).optional().describe("Only when places is omitted: filter by status (default all)."),
    }),
    example: { places: "himeji-castle,odawara-castle,nanzoin", residence: "overseas", date: "2026-11-20" },
  },  {
    name: "japan_emergency_alert_decode",
    title: "Decode a Japanese emergency alert (緊急地震速報, 津波警報, レベル4危険警報, 避難指示, Jアラート): meaning, level, what to do now",
    description:
      "Decode the text of a Japanese emergency alert (phone emergency mail, TV, app or siren announcement; Japanese or English) or an alert id, using official JMA / Cabinet Office / J-ALERT / Ministry of the Environment rules as of 2026-10-17. Covers the Earthquake Early Warning (緊急地震速報 warning / forecast / cancellation, incl. the false M9.9 EEW of 2026-10-16 12:40 JST that was cancelled), seismic intensity (shindo 0-7), tsunami (大津波警報 Major Tsunami Warning >3 m, 津波警報 1-3 m, 津波注意報 0.2-1 m), the new level-named weather warnings in force since 2026-05-29 (Level 5 特別警報 Emergency Warning black, Level 4 危険警報 Urgent Warning purple, Level 3 警報 Warning red, Level 2 注意報 Advisory yellow, for heavy rain 大雨, landslide 土砂災害, flood 氾濫, storm surge 高潮; Level 1 早期注意情報) and the old names they replaced (土砂災害警戒情報 → レベル4土砂災害危険警報, 洪水警報 no longer issued, old 高潮警報 = Level 4), other warnings without a level (暴風, 大雪, 波浪, 雷…), 気象防災速報 (線状降水帯), municipal evacuation levels (緊急安全確保 L5 / 避難指示 L4 / 高齢者等避難 L3), Nankai Trough Earthquake Extra Information (調査中 / 巨大地震警戒 / 巨大地震注意 / 調査終了), the Hokkaido-Sanriku Subsequent Earthquake Advisory, volcanic alert levels and 噴火速報, J-ALERT missile alerts and heat-stroke alerts. Returns verdict, headline, urgency (act_now / evacuate_now / evacuate_if_vulnerable / prepare / stay_alert / info), primary alert (Japanese + official English name, nameLocal in the requested language from the JMA multilingual dictionary, level, colour, issuer, meaning, doNow tailored to the situation, dont, howLong, sources), other alerts in the text, modifiers (cancelled, lifted 解除, drill 訓練), extracted level / shindo / tsunami height, renamed old names, notes and official live-data links. No live data: it explains the alert the user already has. Training data likely predates the 2026 renaming; call this instead of guessing. Always relay: follow official instructions; protect yourself first.",
    site: "alerts",
    path: "/api/decode",
    inputSchema: z.object({
      text: z.string().max(4000).optional().describe("The alert text as received, Japanese or English, e.g. '緊急地震速報 強い揺れに備えてください', 'レベル4土砂災害危険警報', '【警戒レベル4】避難指示', '大津波警報 10m超', '先ほど発表した緊急地震速報を取り消します', 'Missile launch'. Give text or alert."),
      alert: z.string().optional().describe("Instead of text: an alert id from https://japan-alert-decoder.vercel.app/api/rules, e.g. eew-warning, eew-cancel, major-tsunami-warning, tsunami-advisory, l4-landslide, l5-heavy-rain, l3-flood, evac-l4, bulletin-linear-rainband, nankai-megaquake-advisory, missile, heat-alert, volcano-l3."),
      situation: z.enum(["indoors", "outdoors", "driving", "train", "elevator", "crowd", "coast", "mountain"]).optional().describe("Where the person is, to put situation-specific actions first (earthquake, tsunami, missile, rain)."),
      lang: z.enum(["ja", "en", "zh-CN", "zh-TW", "ko", "pt", "es", "id", "vi", "tl", "th", "ne", "km", "my", "mn"]).optional().describe("Language for nameLocal (official JMA dictionary name). Default en; explanations are in English."),
    }),
    example: { text: "緊急地震速報 強い揺れに備えてください", situation: "train" },
  },
  {
    name: "japan_permanent_residency_check",
    title: "Japan permanent residence (永住): which guideline applies to my filing date, and when do I meet the time requirement?",
    description:
      "Japan permanent residence guideline (永住許可に関するガイドライン) revised by the Immigration Services Agency on 2026-10-01, rules as of 2026-10-18. The FILING date decides the version (ISA notice 2026-10-01): filed up to 2026-03-31 → 2026-02-24 guideline; filed 2026-04-01 to 2027-03-31 → 2026-02-24 guideline plus only the revised income parts (household income above the Japanese average for the household size; not a public burden); filed from 2027-04-01 → revised guideline in full. Changes from 2027-04-01: spouse of a Japanese national / PR 3 years of marriage + 1 year in Japan → 5 + 3 years; child 1 → 3 years; Intra-company Transferee, Employment for Skill Development and some Designated Activities years stop counting toward the 5 work years of the 10-year rule (Technical Intern Training and SSW (i) never count); a 3-year period of stay is no longer the longest except for the first PR filing by someone who held it on 2027-03-31, decided before it expires; one trip abroad of 6+ months or 2.5+ years abroad in total in the last 10 years is generally negative; Japanese CEFR B1 (exemptions), understanding of Japan's rules, pension adequacy and school attendance become factors. Fee ¥200,000 from 2026-10-01. Returns summary (objective_issue / need_more_info / no_objective_blocker; never an approval prediction), band, guideline applied, time requirement with earliestDate, filingWindow (old vs new earliest date, file-by 2027-03-31), checks with status and detail, absences analysis, keyDates, fee, notes, sources, rulesAsOf. ISA does not publish income thresholds; permission is discretionary. Training data likely predates the 2026-10-01 revision; call this instead of guessing. Educational guide, not legal advice.",
    site: "prcheck",
    path: "/api/check",
    inputSchema: z.object({
      route: z.string().describe("PR route: general (10 years), spouse (of Japanese / PR / SPR), child (of Japanese / PR / SPR), long_term_resident, refugee, hsp70, hsp80, special_hsp (J-Skip), contribution, special_zone_regional. Aliases like 10y, haigusha, 定住者, hsp accepted."),
      applicationDate: z.string().optional().describe("YYYY-MM-DD the PR application is (or will be) received by ISA. Default today in Japan."),
      residenceSince: z.string().optional().describe("YYYY-MM-DD start of continuous residence in Japan."),
      yearsInJapan: z.number().min(0).max(100).optional().describe("Instead of residenceSince: years of continuous residence in Japan at the filing date."),
      workYears: z.number().min(0).max(100).optional().describe("General route: continuous years on a work or residence status (not Student / Dependent)."),
      marriageDate: z.string().optional().describe("Spouse route: YYYY-MM-DD the substantive marriage began."),
      qualifyingSince: z.string().optional().describe("Special routes: YYYY-MM-DD the status / points / recognition was reached (LTR, refugee, HSP 70/80, J-Skip, special zone)."),
      currentStatus: z.string().optional().describe("Current status of residence: engineer_humanities, intra_company_transferee, highly_skilled_professional, business_manager, skilled_labor, specified_skilled_worker_2, specified_skilled_worker_1, technical_intern_training, employment_for_skill_development, spouse_of_japanese, spouse_of_permanent_resident, long_term_resident, dependent, student, designated_activities, other_work."),
      periodOfStay: z.string().optional().describe("Current period of stay: 5y, 3y, 1y, 6m, 3m, unlimited, other."),
      periodExpiry: z.string().optional().describe("YYYY-MM-DD the current period of stay expires (matters for the 3-year transition after 2027-04-01)."),
      firstPrApplication: z.boolean().optional().describe("Is this the first PR application filed from 2027-04-01? (3-year transition; default true)."),
      trips: z.array(z.object({ depart: z.string(), return: z.string() })).optional().describe("Trips abroad in the last 10 years, each {depart, return} as YYYY-MM-DD."),
      longestTripDays: z.number().min(0).max(4000).optional().describe("Instead of trips: longest single trip abroad in the last 10 years, in days."),
      totalAbsenceDays: z.number().min(0).max(4000).optional().describe("Instead of trips: total days abroad in the last 10 years."),
      japaneseB1: z.union([z.boolean(), z.enum(["yes", "no", "unknown"])]).optional().describe("Japanese at CEFR B1 or above?"),
      b1Exemption: z.enum(["none", "hsp_or_family", "schooling_6y", "pr_child_born_in_japan"]).optional().describe("B1 exemption, if any."),
      schoolAgeChildren: z.enum(["none", "all_in_school", "not_in_school"]).optional().describe("School-age children (6-15) and whether they attend elementary / junior high school."),
      taxesPaidOnTime: z.union([z.boolean(), z.enum(["yes", "no", "unknown"])]).optional().describe("All taxes paid on time?"),
      pensionInsurancePaidOnTime: z.union([z.boolean(), z.enum(["yes", "no", "unknown"])]).optional().describe("Pension and health insurance paid on time?"),
    }),
    example: { route: "spouse", applicationDate: "2027-02-15", residenceSince: "2025-09-01", marriageDate: "2023-06-10", periodOfStay: "3y" },
  },
  {
    name: "japan_international_postage_check",
    title: "How much does it cost to mail something from Japan abroad, now and after Japan Post's 2027-02-01 price rise?",
    description:
      "Japan Post international mail prices from its published tables, rates as of 2026-10-19. Japan Post revises international mail prices for items POSTED from 2027-02-01 (press release 2026-10-09; Asahi reported about +37% on average): every EMS, international parcel (air, SAL, surface), letter, postcard, small packet and International Air Packet price changes; EMS bands up to 6 kg become 1 kg steps (now 500 g first band, 100 g steps to 1 kg), so light EMS rises most (US 500 g ¥3,900 → ¥7,400; 2 kg ¥7,900 → ¥10,300); postcards ¥100 → ¥140 everywhere; the special surcharge on zone 3/4 EMS and air parcels ends (¥0). SAL stays suspended (restart undecided). Zones: 1 China/Korea/Taiwan, 2 rest of Asia, 3 Oceania/Canada/Mexico/Middle East/Europe, 4 USA incl. territories, 5 Central & South America/Africa. Returns per service: current and revised price with weight band, change in yen and %, the price that applies on shipDate, tracked/available/suspended; cheapest, cheapest tracked and cheapest air option before and after; the EMS weight-band shift; 2027 parcel same-time discount (10–49 items 10%, 50+ 13%); notes (acceptance by country can be suspended), sources, disclaimer. Training data predates the 2026-10-09 announcement; call this instead of guessing. Unofficial estimate, not affiliated with Japan Post; size limits, customs and prohibited items are not checked.",
    site: "postage",
    path: "/api/check",
    inputSchema: z.object({
      destination: z.string().optional().describe("Destination country: ISO code (US, GB, AU, CN…) or English / Japanese name (アメリカ, イギリス, 香港). Give this or zone."),
      zone: z.number().int().min(1).max(5).optional().describe("Japan Post zone 1–5 if the country is not known."),
      weightGrams: z.number().min(1).max(30000).optional().describe("Weight in grams incl. packaging (rounded up to the price band). Not needed for service postcard_air."),
      weightKg: z.number().min(0.001).max(30).optional().describe("Weight in kg, instead of weightGrams."),
      service: z.enum(["ems", "parcel_air", "parcel_sal", "parcel_surface", "small_packet_air", "airpacket", "letter_standard_air", "postcard_air"]).optional().describe("Quote only this service. Default: every service the weight fits."),
      shipDate: z.string().optional().describe("YYYY-MM-DD the item is posted. Up to 2027-01-31 current prices apply, from 2027-02-01 revised. Default today in Japan."),
      items: z.number().int().min(1).max(10000).optional().describe("Parcels posted together (for the 2027 same-time discount note)."),
    }),
    example: { destination: "US", weightGrams: 500 },
  },
  {
    name: "japan_reentry_deadline_check",
    title: "By what date must a foreign resident who leaves Japan be back so their status doesn't lapse?",
    description:
      "Applies Japan's Immigration Control Act art. 26-2 (deemed re-entry permit, みなし再入国許可), art. 26 (regular re-entry permit) and art. 20(6) (special period while an extension or change of status is pending), with Civil Code date counting (departure day not counted; leave 2026-10-24 → back by 2027-10-24; expiry 2026-12-30 + 2 months → 2027-02-28). Rules as of 2026-10-24. Deemed re-entry: 1 year from departure, or the period-of-stay expiry if earlier; special permanent residents 2 years; CANNOT be extended abroad; not available to temporary visitors (短期滞在), periods of 3 months or less, or refugee-applicant Designated Activities. Renewal/change pending past expiry: return by the earlier of 1 year from departure or old expiry + 2 months, and receive the decision at the immigration office by then (ISA Q&A). Regular permit: its expiry (max 5 years, SPR 6), extendable at an embassy by up to 1 year. Returns verdict (in_time | too_late | deadline_only | no_deemed_reentry | already_expired), returnBy with legal basis, days allowed, margin vs returnDate, specialPeriod {endsOn, mustReceiveDecisionBy}, canExtendAbroad, steps (ED card tick box), warnings, sources, disclaimer. Use for 'how long can I leave Japan', 'can I travel while my visa renewal is pending', permanent residents abroad. Educational, not legal advice; not affiliated with ISA.",
    site: "reentry",
    path: "/api/check",
    inputSchema: z.object({
      status: z.enum(["mid_long", "permanent", "spr", "short_term", "three_months_or_less", "refugee_applicant"]).describe("mid_long = residence card holder (work, student, spouse, dependent, long-term resident…); permanent; spr = special permanent resident; short_term = tourist / temporary visitor; three_months_or_less; refugee_applicant (Designated Activities)."),
      departureDate: z.string().describe("YYYY-MM-DD the person leaves Japan."),
      periodExpiry: z.string().optional().describe("YYYY-MM-DD period-of-stay expiry on the residence card (在留期限). Required for mid_long; not for permanent/spr."),
      pending: z.enum(["none", "renewal", "change"]).optional().describe("Extension or change-of-status application filed before expiry and not yet decided. Default none."),
      permit: z.enum(["deemed", "single", "multiple"]).optional().describe("deemed (みなし再入国, default) or a regular re-entry permit in the passport (single / multiple)."),
      permitExpiry: z.string().optional().describe("YYYY-MM-DD expiry of a regular re-entry permit (required if permit is single or multiple)."),
      returnDate: z.string().optional().describe("YYYY-MM-DD planned return, to check in_time vs too_late and the margin."),
    }),
    example: { status: "mid_long", departureDate: "2026-12-20", periodExpiry: "2027-01-15", pending: "renewal", returnDate: "2027-02-10" },
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
