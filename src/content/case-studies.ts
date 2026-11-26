/**
 * Sample engagements. REPLACE with approved client stories before launch.
 * Clients are anonymised descriptors and every figure here is illustrative.
 */
import type { CaseStudy } from "@/lib/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "restaurant-group-pos-rollout",
    client: "Restaurant group, 14 locations, Ontario",
    title: "One point of sale across 14 restaurants, live in 11 weeks",
    summary:
      "A restaurant group replaced three ageing POS products with one offline-first system. Order times fell, month-end closed four days sooner and head office finally saw every branch on one screen.",
    industry: "restaurants-hospitality",
    services: ["custom-pos-systems", "management-software"],
    location: "Ontario, Canada",
    year: "2026",
    duration: "11 weeks to first branch, 19 weeks to all 14",
    team: "5 engineers, 1 designer, 1 delivery manager",
    featured: true,
    tone: "lime",
    heroMetric: { value: "38%", label: "faster order to kitchen time" },
    metrics: [
      { value: "38%", label: "faster order to kitchen time at peak" },
      { value: "4 days", label: "removed from month-end close" },
      { value: "0", label: "sales lost to internet outages since launch" },
      { value: "14", label: "branches on one menu and one report" },
    ],
    challenge: [
      "The group had grown by acquisition. Each cluster of branches ran a different point of sale, with its own menu codes, tax setup and reporting format.",
      "Finance staff spent the first week of every month merging spreadsheets by hand. Two branches lost card sales during a four hour internet outage because their terminals could not take orders offline.",
      "The licence renewal on the largest system was due in five months. Leadership wanted one system in place before signing anything.",
    ],
    approach: [
      {
        title: "Two weeks on the floor before any code",
        body: "An engineer and a designer shadowed a Friday dinner service at three branches. We timed every tap from order to kitchen ticket and found that modifiers caused 60% of the delay.",
      },
      {
        title: "Offline first by design",
        body: "Each terminal keeps a local SQLite database and syncs to the server when a connection exists. Orders, kitchen tickets and cash payments keep working with the router unplugged.",
      },
      {
        title: "One pilot branch, then waves of four",
        body: "The busiest branch went first so the hardest case was proven early. The remaining 13 followed in waves, each with an engineer on site for opening night.",
      },
      {
        title: "A single menu owned by head office",
        body: "Menu items, prices and taxes are edited once and published to selected branches. Branch managers can mark items sold out but cannot change prices.",
      },
    ],
    solution: [
      "Tablet POS for servers and counter staff, built in React Native with a local database on every device.",
      "Kitchen display screens that route items by station and show the age of each ticket.",
      "A head office console for menus, staff permissions, discounts and branch comparisons.",
      "Nightly export to the group's accounting package, mapped to their existing chart of accounts.",
    ],
    results: [
      "Median order to kitchen time at peak dropped from 94 seconds to 58 seconds.",
      "Month-end close moved from nine working days to five.",
      "Three internet outages have occurred since launch. No orders or payments were lost in any of them.",
      "Licence costs fell by 41% a year compared with renewing the three old systems.",
    ],
    stack: ["React Native", "TypeScript", "SQLite", "Node.js", "PostgreSQL", "AWS", "Stripe Terminal"],
    quote: {
      text: "For the first time I can open one report on Monday morning and trust it. The outage test on opening night is what convinced my managers.",
      role: "Director of Operations, restaurant group",
    },
    seo: {
      title: "Case Study: Custom POS Rollout Across 14 Restaurants",
      description:
        "How a 14 location restaurant group replaced three POS products with one offline-first system in 11 weeks and cut order to kitchen time by 38%.",
    },
  },
  {
    slug: "hospital-management-system",
    client: "Private hospital, 220 beds, Dubai",
    title: "A 220 bed hospital moves from paper files to one patient record",
    summary:
      "We built a hospital management system covering registration, wards, pharmacy, lab and billing. Patients wait less at the front desk and discharge bills are ready the same hour.",
    industry: "healthcare",
    services: ["management-software", "full-stack-development"],
    location: "Dubai, UAE",
    year: "2025",
    duration: "7 months, released in 4 phases",
    team: "7 engineers, 1 designer, 1 QA lead, 1 delivery manager",
    featured: true,
    tone: "ink",
    heroMetric: { value: "52%", label: "shorter front desk wait" },
    metrics: [
      { value: "52%", label: "shorter wait at registration" },
      { value: "45 min", label: "average discharge billing, down from 3 hours" },
      { value: "99.95%", label: "uptime over the first 12 months" },
      { value: "640", label: "staff trained and using the system daily" },
    ],
    challenge: [
      "Patient files were paper. Pharmacy, lab and billing each ran separate software that did not share a patient ID.",
      "A discharge needed a clerk to walk between four departments collecting charges. Families waited about three hours for a final bill.",
      "The hospital had tried an off the shelf product two years earlier. Staff abandoned it within three months because it did not match how wards actually worked.",
    ],
    approach: [
      {
        title: "Department by department, never all at once",
        body: "Registration and outpatient went live first. Wards, pharmacy and lab followed, then billing. Each phase ran alongside the old process for two weeks before cutover.",
      },
      {
        title: "Nurses and clerks tested every screen",
        body: "We ran weekly sessions with 12 staff from different shifts. Screens that needed more than three taps for a routine task were redesigned.",
      },
      {
        title: "Access control and audit from day one",
        body: "Every read and write of a patient record is logged with user, time and device. Roles limit what each job function can see.",
      },
      {
        title: "On-site support through each cutover",
        body: "Two engineers sat in the hospital for the first ten days of every phase, covering day and night shifts.",
      },
    ],
    solution: [
      "One patient record with a single ID across outpatient, inpatient, pharmacy, lab and billing.",
      "Ward boards showing bed occupancy, pending orders and expected discharges.",
      "Pharmacy stock with batch and expiry tracking, linked to prescriptions.",
      "Lab orders and results delivered to the doctor's worklist, with HL7 interfaces to four analysers.",
      "Billing that accrues charges as they happen, so the discharge bill is already complete.",
    ],
    results: [
      "Average registration wait fell from 23 minutes to 11 minutes.",
      "Discharge billing takes 45 minutes on average, down from about 3 hours.",
      "Pharmacy write-offs for expired stock dropped by 31% in the first year.",
      "The system has run at 99.95% uptime across its first 12 months.",
    ],
    stack: ["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Redis", "HL7", "Docker", "On-premise and AWS"],
    quote: {
      text: "The last system was built for a hospital that does not exist. This one was built by people who sat in our wards and watched.",
      role: "Medical Director, private hospital",
    },
    seo: {
      title: "Case Study: Hospital Management System for a 220 Bed Hospital",
      description:
        "A 220 bed private hospital replaced paper files and four disconnected tools with one hospital management system. Registration waits fell by 52%.",
    },
  },
  {
    slug: "distributor-erp-migration",
    client: "Industrial parts manufacturer and distributor, 3 warehouses",
    title: "Replacing a 17 year old ERP without stopping a single shipment",
    summary:
      "A manufacturer moved finance, inventory, purchasing and production planning to a custom ERP. The cutover happened over one weekend and Monday's orders shipped on time.",
    industry: "manufacturing",
    services: ["erp-development"],
    location: "Alberta, Canada",
    year: "2026",
    duration: "9 months",
    team: "6 engineers, 1 business analyst, 1 delivery manager",
    featured: true,
    tone: "sand",
    heroMetric: { value: "99.2%", label: "inventory accuracy, up from 86%" },
    metrics: [
      { value: "99.2%", label: "inventory accuracy, up from 86%" },
      { value: "0", label: "shipping days lost during cutover" },
      { value: "27%", label: "less stock held for the same fill rate" },
      { value: "1.2M", label: "historical records migrated and reconciled" },
    ],
    challenge: [
      "The existing ERP was 17 years old and ran on a server the vendor no longer supported. Only one employee knew how to maintain it.",
      "Stock counts in the system matched the shelves 86% of the time. Sales staff phoned the warehouse to confirm availability before quoting.",
      "The company ships every working day. A cutover that paused dispatch for even 48 hours would breach supply contracts.",
    ],
    approach: [
      {
        title: "Map the real process, not the manual",
        body: "Our analyst spent three weeks with finance, purchasing and warehouse leads. We documented 46 workflows and retired 11 that existed only because of the old system's limits.",
      },
      {
        title: "Migrate the data three times before it counted",
        body: "We ran three full rehearsal migrations. Each one was reconciled against the old system to the cent and to the unit, and each surfaced fewer exceptions.",
      },
      {
        title: "Run both systems in parallel for a month",
        body: "For four weeks every transaction was entered in both systems. Differences were reviewed daily until there were none for ten days in a row.",
      },
      {
        title: "Cut over on a long weekend with a rollback plan",
        body: "The switch ran from Friday evening to Sunday afternoon. A tested rollback was ready and was not needed.",
      },
    ],
    solution: [
      "Finance with general ledger, payables, receivables and multi-entity consolidation.",
      "Inventory across three warehouses with barcode scanning on handheld devices.",
      "Purchasing with reorder points calculated from 24 months of demand.",
      "Production planning tied to bills of materials and machine capacity.",
      "Dashboards for the leadership team, refreshed every 15 minutes.",
    ],
    results: [
      "Inventory accuracy rose from 86% to 99.2% within four months of go-live.",
      "Monday's orders after cutover shipped on schedule. No shipping days were lost.",
      "Stock on hand fell by 27% while the order fill rate held at 97%.",
      "The company no longer depends on one person or one unsupported server.",
    ],
    stack: ["React", "TypeScript", ".NET 8", "SQL Server", "Azure", "Power BI", "Zebra handheld scanners"],
    quote: {
      text: "I expected a bad month. We had a quiet weekend and a normal Monday. The three rehearsal migrations were worth every hour.",
      role: "Chief Financial Officer, industrial distributor",
    },
    seo: {
      title: "Case Study: ERP Migration for a Manufacturer and Distributor",
      description:
        "How an industrial manufacturer replaced a 17 year old ERP with a custom system in 9 months, with zero shipping days lost and 99.2% inventory accuracy.",
    },
  },
  {
    slug: "lender-ai-support-assistant",
    client: "Consumer lender, 180,000 active customers",
    title: "An AI assistant that resolves 61% of support chats and knows when to stop",
    summary:
      "A regulated lender added an AI assistant to its support channels. It answers from approved policy documents and live account data, and hands over to a person when a question touches hardship or complaints.",
    industry: "fintech",
    services: ["ai-chatbots", "ai-automation"],
    location: "British Columbia, Canada",
    year: "2026",
    duration: "14 weeks",
    team: "4 engineers, 1 designer, 1 delivery manager",
    featured: false,
    tone: "sage",
    heroMetric: { value: "61%", label: "of chats resolved without an agent" },
    metrics: [
      { value: "61%", label: "of chats resolved without an agent" },
      { value: "9 sec", label: "median first response, down from 6 minutes" },
      { value: "4.6 / 5", label: "customer rating for assistant conversations" },
      { value: "0", label: "compliance findings in the first audit" },
    ],
    challenge: [
      "Support volume had doubled in 18 months. Customers waited six minutes for a first reply and about a third of chats asked the same 20 questions.",
      "As a regulated lender, the company could not allow an assistant to guess. Every answer about fees, rates or repayment had to match approved wording.",
      "An earlier rules-based bot had a 12% resolution rate and customers had learned to type 'agent' immediately.",
    ],
    approach: [
      {
        title: "Answers come only from approved sources",
        body: "The assistant retrieves from 340 policy and product documents signed off by compliance. If no source supports an answer, it says so and offers a person.",
      },
      {
        title: "Test set before launch, not after",
        body: "We built 1,200 test conversations from real transcripts with compliance staff grading the answers. Nothing shipped until accuracy passed 97%.",
      },
      {
        title: "Hard handover rules",
        body: "Mentions of financial hardship, complaints, fraud or bereavement go straight to a trained agent with the full conversation attached.",
      },
      {
        title: "Staged exposure",
        body: "The assistant started on 5% of chats. Exposure rose weekly as quality metrics held, reaching 100% in week six.",
      },
    ],
    solution: [
      "Chat assistant on web and mobile, authenticated against the customer's account.",
      "Read access to balances, payment dates and statements through the lender's existing API.",
      "Automated handling of four requests end to end: payment date change, statement copy, payoff quote and address update.",
      "Agent workspace that shows the assistant's summary and sources when a chat is handed over.",
      "A review console where compliance samples conversations and flags answers for correction.",
    ],
    results: [
      "61% of chats are now resolved without an agent, against 12% for the previous bot.",
      "Median first response time fell from 6 minutes to 9 seconds.",
      "Agents handle 44% fewer chats and spend that time on hardship and complaint cases.",
      "The first compliance audit after launch recorded no findings against the assistant.",
    ],
    stack: ["Python", "FastAPI", "Claude API", "pgvector", "PostgreSQL", "Next.js", "AWS"],
    quote: {
      text: "What sold our compliance team was the refusal behaviour. It tells the customer it does not know and gets them a person.",
      role: "Head of Customer Operations, consumer lender",
    },
    seo: {
      title: "Case Study: AI Support Assistant for a Regulated Lender",
      description:
        "A consumer lender deployed an AI assistant that resolves 61% of support chats from approved sources, with strict handover rules and zero audit findings.",
    },
  },
  {
    slug: "logistics-driver-app",
    client: "Regional freight carrier, 320 drivers",
    title: "A driver app that ended paper proof of delivery for 320 trucks",
    summary:
      "A freight carrier replaced paper delivery slips with an iOS and Android app. Invoices go out the same day and dispatch sees every truck live.",
    industry: "logistics",
    services: ["mobile-app-development", "full-stack-development"],
    location: "Manitoba, Canada",
    year: "2025",
    duration: "16 weeks",
    team: "4 engineers, 1 designer, 1 QA engineer",
    featured: false,
    tone: "ink",
    heroMetric: { value: "6 days", label: "faster from delivery to invoice" },
    metrics: [
      { value: "6 days", label: "faster from delivery to invoice" },
      { value: "97%", label: "of drivers active in the first month" },
      { value: "72%", label: "fewer 'where is my load' calls" },
      { value: "4.7", label: "average app store rating from drivers" },
    ],
    challenge: [
      "Drivers collected signatures on paper and handed slips in at the depot, sometimes a week later. Invoicing could not start until the slip arrived.",
      "Dispatchers tracked trucks by phone. Customers called to ask where their load was and dispatch called the driver to find out.",
      "Many routes cross areas with no mobile coverage for hours. Any app had to work fully offline.",
    ],
    approach: [
      {
        title: "Ride-alongs with drivers",
        body: "Our designer spent four days in cabs. The app that came out of it has large buttons, works with gloves and needs four taps to complete a delivery.",
      },
      {
        title: "Offline queue with guaranteed delivery",
        body: "Signatures, photos and status changes are stored on the device and uploaded when coverage returns. Nothing is lost if the phone restarts.",
      },
      {
        title: "Pilot with 25 drivers",
        body: "A four week pilot on the hardest northern routes produced 38 fixes before the wider release.",
      },
    ],
    solution: [
      "Driver app for iOS and Android with the day's stops, navigation handoff, signature capture and photo proof.",
      "Dispatch web console with live truck positions, exceptions and estimated arrival times.",
      "Customer tracking links sent by SMS and email, no login required.",
      "Integration with the carrier's transport management system so a completed stop triggers the invoice.",
    ],
    results: [
      "Average time from delivery to invoice fell from 7 days to under 24 hours.",
      "311 of 320 drivers were using the app within the first month.",
      "Inbound tracking calls to dispatch dropped by 72%.",
      "Disputed deliveries fell by more than half because every stop has a timestamped photo and signature.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Mapbox", "Firebase Cloud Messaging", "AWS"],
    quote: {
      text: "Our drivers are not software people and they did not need to be. Most of them had it figured out before the training session ended.",
      role: "Vice President of Operations, freight carrier",
    },
    seo: {
      title: "Case Study: Driver Mobile App for a 320 Truck Freight Carrier",
      description:
        "A regional freight carrier replaced paper proof of delivery with an offline-first iOS and Android app, cutting delivery to invoice time by 6 days.",
    },
  },
  {
    slug: "retail-storefront-rebuild",
    client: "Home goods retailer, 9 stores and online",
    title: "A storefront rebuild that lifted mobile conversion by 34%",
    summary:
      "A home goods retailer had a slow storefront that lost mobile shoppers. We rebuilt the front end in Next.js on their existing commerce platform, with no change to back office operations.",
    industry: "retail-ecommerce",
    services: ["frontend-development", "full-stack-development"],
    location: "Quebec, Canada",
    year: "2026",
    duration: "10 weeks",
    team: "3 engineers, 1 designer",
    featured: false,
    tone: "lime",
    heroMetric: { value: "34%", label: "higher mobile conversion rate" },
    metrics: [
      { value: "34%", label: "higher mobile conversion rate" },
      { value: "1.4 sec", label: "Largest Contentful Paint, down from 5.8" },
      { value: "22%", label: "more organic search sessions in 90 days" },
      { value: "100%", label: "WCAG 2.1 AA pages in the checkout flow" },
    ],
    challenge: [
      "71% of traffic was mobile but mobile converted at less than half the desktop rate. Product pages took 5.8 seconds to show their main image on a 4G connection.",
      "The theme had been patched by four agencies over six years. Small changes took weeks and often broke checkout.",
      "The retailer did not want to replace its commerce platform, inventory system or fulfilment process.",
    ],
    approach: [
      {
        title: "Measure first",
        body: "We instrumented the existing site for two weeks to find where shoppers dropped off. Product pages and the shipping step accounted for 68% of exits.",
      },
      {
        title: "New front end, same back office",
        body: "The Next.js storefront reads from the existing commerce API. Orders, stock and fulfilment did not change for store staff.",
      },
      {
        title: "Release behind a traffic split",
        body: "The new storefront took 10% of traffic, then 50%, then 100% over three weeks. Conversion was compared at each step.",
      },
    ],
    solution: [
      "Statically generated category and product pages with incremental updates when price or stock changes.",
      "A component library of 42 parts that the retailer's own team now uses for landing pages.",
      "A three step checkout with address lookup and store pickup availability shown per item.",
      "Structured data on every product page for rich search results.",
    ],
    results: [
      "Mobile conversion rate rose by 34% against the old site during the split test.",
      "Largest Contentful Paint on product pages fell from 5.8 seconds to 1.4 seconds.",
      "Organic search sessions grew by 22% in the first 90 days.",
      "The retailer's marketing team now publishes campaign pages without a developer.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shopify Storefront API", "Vercel", "Algolia"],
    quote: {
      text: "We kept everything that worked behind the counter and replaced the part customers were struggling with. The split test made the decision easy.",
      role: "Director of E-commerce, home goods retailer",
    },
    seo: {
      title: "Case Study: Next.js Storefront Rebuild for a Home Goods Retailer",
      description:
        "A 9 store home goods retailer rebuilt its storefront in Next.js in 10 weeks. Mobile conversion rose 34% and page load fell from 5.8 to 1.4 seconds.",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
