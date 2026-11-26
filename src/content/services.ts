import type { Service } from "@/lib/types";

/**
 * Service content.
 * This is the starting content: it seeds the database (supabase/seed.sql) and is
 * served only as a fallback if the database cannot be reached. Once Supabase is
 * connected, edit content there, not here.
 * Figures in `outcomes` are sample values. REPLACE with audited numbers before launch.
 */
export const services: Service[] = [
  {
    slug: "full-stack-development",
    icon: "stack",
    name: "Full Stack Development",
    tagline: "Web platforms built end to end by one accountable team.",
    summary:
      "We design, build and run complete web platforms: interface, API, database and cloud infrastructure. One team owns the whole system, so nothing falls between vendors.",
    heroTitle: "One team for the interface, the API, the database and the uptime.",
    heroLead:
      "Most failed software projects fail at the joins between teams. We put front end, back end, QA and DevOps in one squad with one delivery manager, and we ship working software every two weeks.",
    outcomes: [
      { value: "2 weeks", label: "between every working release you can click through" },
      { value: "99.9%", label: "uptime target written into our production support agreements" },
      { value: "100%", label: "of source code, infrastructure and documentation owned by you" },
    ],
    signals: [
      "Your product roadmap is blocked because front end and back end work sits with two different vendors.",
      "A previous agency delivered code that nobody on your side can maintain or deploy.",
      "Your platform slows down or fails at peak load and nobody can say exactly why.",
      "You need a first release in the market within one quarter and cannot hire a full team that fast.",
      "Reports are assembled by hand because your systems do not share a database or an API.",
    ],
    deliverables: [
      { title: "Technical discovery and architecture", body: "A written architecture document, data model and delivery plan before any feature work starts. You approve it, then we build to it." },
      { title: "Production web application", body: "A responsive interface in React and Next.js, tested on current Chrome, Safari, Edge and Firefox, on desktop and mobile." },
      { title: "APIs and integrations", body: "Documented REST or GraphQL APIs, plus integrations with your payment provider, CRM, accounting system and identity provider." },
      { title: "Cloud infrastructure as code", body: "AWS, Azure or Google Cloud environments defined in Terraform, with separate staging and production and automated deployments." },
      { title: "Automated test suite", body: "Unit, integration and end to end tests that run on every pull request. A release does not ship if the suite fails." },
      { title: "Handover and runbooks", body: "Architecture diagrams, deployment runbooks and a recorded walkthrough so your own engineers can take over at any time." },
    ],
    process: [
      { title: "Discover", body: "One to two weeks of workshops with your stakeholders. We map users, data and integrations, then return a fixed scope, timeline and price." },
      { title: "Design", body: "Clickable prototypes for the core flows and a reviewed architecture. You see how the product works before we write production code." },
      { title: "Build", body: "Two week sprints. Every sprint ends with a demo on a staging environment that you can use yourself." },
      { title: "Launch and support", body: "A rehearsed production release, 30 days of warranty support, and an optional monthly retainer with agreed response times." },
    ],
    stack: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Python", "Django", ".NET", "PostgreSQL", "Redis", "AWS", "Docker"],
    engagement: {
      timeline: "First production release in 10 to 16 weeks",
      team: "4 to 7 people: tech lead, 2 to 4 engineers, QA, delivery manager",
      model: "Fixed scope for a defined release, or a dedicated monthly team",
    },
    faqs: [
      { q: "What drives the cost of a full stack project?", a: "Three things: the number of distinct user roles and screens, the number of third party integrations, and compliance requirements such as SOC 2 or PCI DSS. After discovery we give you a fixed price for a defined scope, with each cost driver itemised so you can remove or defer items." },
      { q: "Who owns the code?", a: "You do. The contract assigns all intellectual property to you on payment of each invoice. The code lives in your GitHub or GitLab organisation from the first commit, and the cloud accounts are in your name." },
      { q: "Can you take over a codebase another team started?", a: "Yes. We start with a paid two week audit covering code quality, security, test coverage and infrastructure. You get a written report that says what to keep, what to repair and what to replace, with estimates for each." },
      { q: "How will we communicate during the project?", a: "Your delivery manager is in Canada and works Eastern hours. Stand ups, demos and reviews are scheduled in your working day, and you have a shared channel with the engineers for questions in between." },
      { q: "What happens after launch?", a: "Every project includes 30 days of warranty support at no charge. After that, most clients move to a monthly retainer that covers monitoring, security patches and a fixed number of development hours." },
    ],
    industries: ["fintech", "logistics", "real-estate", "education"],
    caseStudies: ["logistics-driver-app", "hospital-management-system", "retail-storefront-rebuild"],
    seo: {
      title: "Full Stack Development Services",
      description:
        "Full stack web development by the senior engineers of a Canadian software company. React, Next.js, Node.js, .NET and cloud infrastructure, delivered in two week releases with full code ownership.",
    },
  },
  {
    slug: "frontend-development",
    icon: "browser",
    name: "Front End Development",
    tagline: "Fast, accessible interfaces in React and Next.js.",
    summary:
      "We build the part of your product that customers see and judge. Interfaces that load in under two seconds, pass accessibility audits and stay consistent as your team adds features.",
    heroTitle: "Your customers judge the whole company by the first two seconds.",
    heroLead:
      "A slow or confusing interface costs you sign ups and sales every day it stays live. We rebuild front ends in React and Next.js with measured performance budgets, WCAG 2.2 AA accessibility and a component library your team can keep extending.",
    outcomes: [
      { value: "< 2.0s", label: "Largest Contentful Paint target on a mid range phone over 4G" },
      { value: "WCAG 2.2 AA", label: "accessibility standard we test every release against" },
      { value: "90+", label: "Lighthouse performance score before we call a page done" },
    ],
    signals: [
      "Your pages fail Core Web Vitals and organic traffic has dropped as a result.",
      "The same button looks five different ways because there is no shared component library.",
      "A legacy Angular.js, jQuery or server rendered front end makes every new feature slow to ship.",
      "An accessibility complaint or a procurement questionnaire has asked for WCAG conformance.",
      "Your back end team is strong but nobody owns the interface.",
    ],
    deliverables: [
      { title: "Performance and UX audit", body: "A measured baseline of Core Web Vitals, bundle size and conversion drop off, with a ranked list of fixes." },
      { title: "Design system and component library", body: "Typed React components documented in Storybook, with design tokens that match your Figma files." },
      { title: "Production front end", body: "Next.js or React application with server rendering, image optimisation and code splitting configured correctly." },
      { title: "Accessibility conformance", body: "Keyboard, screen reader and contrast testing against WCAG 2.2 AA, with a conformance report you can give to procurement teams." },
      { title: "Analytics and SEO foundations", body: "Structured data, metadata, sitemaps and event tracking wired in from the first release." },
      { title: "Visual regression tests", body: "Automated screenshot comparison on every pull request, so a change in one screen cannot quietly break another." },
    ],
    process: [
      { title: "Audit", body: "We measure what users experience today: load times, error rates and where they abandon. You get the numbers in the first week." },
      { title: "System", body: "We agree on tokens, typography and core components with your designers, then build the library before the pages." },
      { title: "Migrate", body: "Screens move to the new front end one route at a time. The old and new versions run side by side, so there is no big bang release." },
      { title: "Measure", body: "We compare Core Web Vitals and conversion against the baseline and keep tuning until the targets are met." },
    ],
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Storybook", "Playwright", "Vitest", "GraphQL", "TanStack Query", "Figma", "Vercel"],
    engagement: {
      timeline: "Audit in 1 week, first migrated routes live in 4 to 6 weeks",
      team: "3 to 5 people: front end lead, 1 to 3 engineers, QA",
      model: "Fixed scope rebuild, or engineers embedded in your product team",
    },
    faqs: [
      { q: "Can you work with our existing back end and designers?", a: "Yes. Most front end engagements run against an API your team already owns. We work from your Figma files, join your stand ups and open pull requests in your repository." },
      { q: "Do we have to rewrite everything at once?", a: "No. We migrate route by route behind a reverse proxy, so the legacy and new front ends serve traffic together. You see value from the first migrated page and can pause at any point." },
      { q: "How do you prove the new front end is faster?", a: "We record Core Web Vitals from real users before work starts and after each release. The comparison is in a dashboard you can open yourself. If a page misses its target, it goes back into the sprint." },
      { q: "What does a front end rebuild cost?", a: "Cost depends on the number of unique screens, how much of a design system already exists and how clean the API is. After a one week audit you get a fixed price per phase." },
    ],
    industries: ["retail-ecommerce", "fintech", "real-estate", "education"],
    caseStudies: ["retail-storefront-rebuild"],
    seo: {
      title: "Front End Development Services in React and Next.js",
      description:
        "Front end development in React and Next.js. Design systems, Core Web Vitals performance and WCAG 2.2 AA accessibility, built by senior engineers and migrated route by route.",
    },
  },
  {
    slug: "erp-development",
    icon: "erp",
    name: "ERP System Development",
    tagline: "One system for finance, inventory, HR and operations.",
    summary:
      "We build and customise ERP systems that match how your company operates, then migrate your data without stopping the business. Finance, inventory, purchasing, HR and reporting in one place.",
    heroTitle: "Stop running a multi million dollar company on spreadsheets and re-keyed data.",
    heroLead:
      "When finance, inventory and operations live in separate tools, every month end is a reconciliation exercise. We build an ERP around your actual processes, migrate your history and train your staff, with a go live plan your auditors can sign off.",
    outcomes: [
      { value: "5 days", label: "typical month end close after go live, down from 12 to 15" },
      { value: "Zero", label: "unplanned downtime during cutover with a parallel run" },
      { value: "1 ledger", label: "shared by finance, inventory, purchasing and sales" },
    ],
    signals: [
      "Month end close takes more than ten working days because data is reconciled by hand.",
      "Stock counts in the warehouse do not match what the accounting system says.",
      "You pay per user licence fees for an off the shelf ERP and still export to Excel to get answers.",
      "Staff enter the same order into three systems.",
      "Your current ERP vendor has ended support or cannot build the workflow you need.",
    ],
    deliverables: [
      { title: "Process map and gap analysis", body: "Every current workflow documented, with a clear decision on what the ERP will handle as standard and what needs custom work." },
      { title: "Core modules", body: "General ledger, accounts payable and receivable, inventory, purchasing, sales orders, HR and payroll, configured to your chart of accounts." },
      { title: "Custom workflows", body: "Approval chains, pricing rules, production planning or anything else specific to how you operate, built as maintainable modules." },
      { title: "Data migration", body: "Customers, suppliers, open orders, stock and historical ledgers cleaned, mapped and reconciled to the cent before cutover." },
      { title: "Reporting and dashboards", body: "Live financial statements, stock ageing, margin by product and any report your board asks for, without an export." },
      { title: "Training and go live support", body: "Role based training sessions, written guides and engineers on call through your first two month end closes." },
    ],
    process: [
      { title: "Map", body: "Three to four weeks with your department heads. We document every process and agree what changes and what stays." },
      { title: "Configure and build", body: "Standard modules first, then custom workflows. You test each module with real data as it is completed." },
      { title: "Migrate and parallel run", body: "Old and new systems run together for one full accounting period. Balances must match before we cut over." },
      { title: "Go live and stabilise", body: "Cutover on a weekend, engineers on site or on call the following week, then 60 days of stabilisation support." },
    ],
    stack: ["Odoo", "ERPNext", "Microsoft Dynamics 365", "Python", ".NET", "PostgreSQL", "SQL Server", "Power BI", "REST APIs", "EDI", "Azure"],
    engagement: {
      timeline: "First modules live in 4 to 6 months, full rollout in 6 to 12",
      team: "5 to 9 people: ERP architect, functional consultants, engineers, QA, trainer",
      model: "Phased fixed price per module, followed by a support retainer",
    },
    faqs: [
      { q: "Should we build a custom ERP or customise an existing platform?", a: "In most cases we recommend an open platform such as Odoo or ERPNext with custom modules for the 20 percent of processes that make your business different. A fully custom ERP makes sense only when your operations do not fit any standard model. We give you a costed comparison during discovery." },
      { q: "How do you migrate data without stopping the business?", a: "We run three trial migrations before the real one. Each is reconciled against your existing system, and discrepancies are fixed at the source. The final cutover happens over a weekend after a full parallel run." },
      { q: "What does an ERP project cost?", a: "The main drivers are the number of modules, the number of legal entities and locations, the volume and quality of legacy data, and the number of integrations. We price each module separately so you can phase the investment." },
      { q: "Will our staff actually use it?", a: "Adoption is planned from the first week. Department leads test each module during the build, training is role based, and we stay on call for the first two month end closes. Screens are designed around the tasks people do every day." },
      { q: "Can it connect to our bank, payroll provider and e-commerce store?", a: "Yes. We integrate bank feeds, payroll services, Shopify and other storefronts, shipping carriers and EDI trading partners through documented APIs." },
    ],
    industries: ["manufacturing", "logistics", "retail-ecommerce", "healthcare"],
    caseStudies: ["distributor-erp-migration"],
    seo: {
      title: "Custom ERP System Development and Migration",
      description:
        "ERP development and migration for finance, inventory, purchasing and HR. Odoo, ERPNext and Dynamics 365 customisation with reconciled data migration and parallel run go live.",
    },
  },
  {
    slug: "ai-chatbots",
    icon: "chat",
    name: "AI Chatbots",
    tagline: "Assistants that answer from your data and know when to hand over.",
    summary:
      "We build AI assistants for customer support, sales and internal teams. They answer from your own documents and systems, cite their sources and pass the conversation to a person when they should.",
    heroTitle: "An assistant that answers from your data, cites it, and knows when to stop.",
    heroLead:
      "A chatbot that guesses is a liability. Ours retrieve answers from your approved knowledge base, show the source, complete tasks through your APIs and escalate to your staff with the full conversation attached.",
    outcomes: [
      { value: "40-60%", label: "of routine enquiries resolved without a human agent" },
      { value: "< 5 sec", label: "median response time, at any hour" },
      { value: "100%", label: "of answers traceable to a source document" },
    ],
    signals: [
      "Your support team answers the same 30 questions hundreds of times a month.",
      "Customers wait hours for a reply outside business hours.",
      "New staff take weeks to find answers buried in policy documents and wikis.",
      "You tried an off the shelf bot and it gave wrong or invented answers.",
      "Leads arrive on your website and WhatsApp at night and nobody qualifies them until morning.",
    ],
    deliverables: [
      { title: "Knowledge pipeline", body: "Your documents, help centre and product data indexed for retrieval, with an update process so the assistant never answers from stale content." },
      { title: "Assistant with guardrails", body: "Retrieval augmented generation with source citations, topic limits and refusal rules agreed with your compliance team." },
      { title: "Task integrations", body: "Order status, appointment booking, account lookups and ticket creation through your existing APIs." },
      { title: "Channels", body: "Website widget, WhatsApp Business, Slack or Microsoft Teams, and voice where it fits." },
      { title: "Human handover", body: "Escalation to your agents in Zendesk, Intercom or HubSpot with the transcript and a summary attached." },
      { title: "Evaluation and monitoring", body: "A test set of real questions scored on every change, plus a dashboard for resolution rate, escalations and flagged answers." },
    ],
    process: [
      { title: "Scope", body: "We analyse 3 to 6 months of your support tickets to find which questions the assistant should own and which stay with people." },
      { title: "Pilot", body: "A working assistant on your real content in 3 to 4 weeks, tested by your own staff before any customer sees it." },
      { title: "Harden", body: "We score accuracy against a test set, add guardrails, connect integrations and run a security review." },
      { title: "Roll out", body: "Launch to a percentage of traffic, compare against the human baseline, then expand as the numbers hold." },
    ],
    stack: ["Claude", "OpenAI GPT", "LangChain", "LlamaIndex", "pgvector", "Pinecone", "Python", "FastAPI", "WhatsApp Business API", "Twilio", "Zendesk", "AWS Bedrock"],
    engagement: {
      timeline: "Pilot in 3 to 4 weeks, production in 8 to 10",
      team: "3 to 5 people: AI lead, 1 to 2 engineers, QA, delivery manager",
      model: "Fixed price pilot, then fixed scope production build",
    },
    faqs: [
      { q: "How do you stop the assistant from making things up?", a: "It answers only from retrieved content and shows the source. When retrieval finds nothing relevant, it says so and offers a handover. Every release is scored against a test set of real questions, and answers below the accuracy threshold block the release." },
      { q: "Is our data used to train public models?", a: "No. We use enterprise API terms from Anthropic, OpenAI or AWS Bedrock, under which your data is not used for training. For stricter requirements we deploy models inside your own cloud account with Canadian data residency." },
      { q: "What does it cost to run?", a: "There are two parts: the build, which is fixed price, and usage, which depends on conversation volume and model choice. We estimate monthly usage from your ticket history before you commit and set spending caps in production." },
      { q: "Will it replace our support team?", a: "It takes the repetitive questions. Your team keeps the complex cases, complaints and anything that needs judgment, and receives them with context already gathered." },
      { q: "Which model do you use?", a: "We test two or three models against your own questions during the pilot and choose on accuracy, latency and cost. The architecture keeps the model swappable, so you are not locked to one provider." },
    ],
    industries: ["fintech", "healthcare", "retail-ecommerce", "education"],
    caseStudies: ["lender-ai-support-assistant"],
    seo: {
      title: "AI Chatbot Development for Support and Sales",
      description:
        "Custom AI chatbots that answer from your own data with citations, complete tasks through your APIs and hand over to staff. Built on Claude and GPT with guardrails and evaluation.",
    },
  },
  {
    slug: "ai-automation",
    icon: "automation",
    name: "AI Automation",
    tagline: "Remove the manual work between your systems.",
    summary:
      "We automate the repetitive work that sits between your systems: reading documents, entering data, routing requests and producing reports. Staff review exceptions instead of processing every item.",
    heroTitle: "Your best people should not spend their day copying data between screens.",
    heroLead:
      "Invoices, claims, applications and orders still pass through someone's hands because the systems do not talk. We build automations that read the document, apply your rules, update the system of record and send only the exceptions to a person.",
    outcomes: [
      { value: "70-85%", label: "of documents processed without manual touch" },
      { value: "Minutes", label: "to process items that used to wait days in a queue" },
      { value: "Full audit trail", label: "of every automated decision and who approved exceptions" },
    ],
    signals: [
      "Staff re-key data from PDFs, emails or scanned forms into another system.",
      "A backlog builds every month end and you hire temporary staff to clear it.",
      "Errors from manual entry cause refunds, rework or compliance findings.",
      "Requests arrive by email and wait for someone to read and forward them.",
      "You have automation scripts that break whenever a screen or a format changes.",
    ],
    deliverables: [
      { title: "Process assessment", body: "Volumes, handling time and error rates measured for each candidate process, ranked by payback period." },
      { title: "Document intelligence", body: "Extraction from invoices, IDs, claims and contracts using OCR and language models, with confidence scores on every field." },
      { title: "Workflow orchestration", body: "Rules, approvals and retries defined in a workflow engine, so a failed step resumes instead of being lost." },
      { title: "System integrations", body: "Direct API connections to your ERP, CRM, accounting and email. Screen automation only where no API exists." },
      { title: "Exception queue", body: "A review screen where staff confirm or correct low confidence items. Corrections feed back to improve accuracy." },
      { title: "Monitoring and audit log", body: "Dashboards for throughput and accuracy, and a record of each decision for auditors." },
    ],
    process: [
      { title: "Measure", body: "We shadow the process and pull the numbers: items per month, minutes per item, error rate. You see the business case before you spend on a build." },
      { title: "Prove", body: "A proof of concept on 200 to 500 of your real documents in 2 to 3 weeks, with measured accuracy." },
      { title: "Build", body: "Production workflow, integrations and exception handling, tested against edge cases your staff identify." },
      { title: "Run and tune", body: "We monitor accuracy weekly for the first quarter and adjust rules and prompts as real volumes come through." },
    ],
    stack: ["Python", "Claude", "OpenAI GPT", "Azure AI Document Intelligence", "AWS Textract", "Temporal", "n8n", "Apache Airflow", "PostgreSQL", "Power Automate", "REST APIs"],
    engagement: {
      timeline: "Proof of concept in 2 to 3 weeks, first process live in 6 to 10",
      team: "3 to 5 people: automation architect, 1 to 2 engineers, QA, delivery manager",
      model: "Fixed price per process, with a retainer for monitoring and new workflows",
    },
    faqs: [
      { q: "Which processes are worth automating?", a: "High volume, rule based work with digital inputs. If a process handles more than 500 items a month and each takes more than three minutes, it usually pays back within a year. The assessment gives you a payback figure for each candidate." },
      { q: "What happens when the automation is not sure?", a: "Every extracted field carries a confidence score. Items below the threshold go to a review queue with the uncertain fields highlighted. Nothing is posted to your system of record on a guess." },
      { q: "Do we need to replace our existing systems?", a: "No. Automation sits between the systems you already have. We connect through APIs where they exist and use controlled screen automation where they do not." },
      { q: "How do you handle sensitive documents?", a: "Processing runs in your cloud account or in a Canadian region, data is encrypted in transit and at rest, and access is logged. We sign a data processing agreement and can work to PIPEDA, PHIPA and SOC 2 requirements." },
    ],
    industries: ["fintech", "logistics", "healthcare", "manufacturing"],
    caseStudies: ["lender-ai-support-assistant"],
    seo: {
      title: "AI Automation and Intelligent Document Processing",
      description:
        "AI automation for invoices, claims, applications and back office workflows. Document extraction, workflow orchestration and exception queues with a full audit trail.",
    },
  },
  {
    slug: "mobile-app-development",
    icon: "mobile",
    name: "Mobile App Development",
    tagline: "Native and cross-platform apps for iOS and Android.",
    summary:
      "We build iOS and Android apps for customers and field teams, from first prototype to App Store release and beyond. Native where performance demands it, cross-platform where one codebase saves you money.",
    heroTitle: "An app people keep on their home screen, on iOS and Android.",
    heroLead:
      "Users delete apps that crash, drain the battery or ask them to log in twice. We build mobile apps in Swift, Kotlin, React Native and Flutter that work offline, pass store review the first time and hold a crash free rate above 99.5 percent.",
    outcomes: [
      { value: "99.5%+", label: "crash free sessions target for every production release" },
      { value: "2 stores", label: "App Store and Google Play submission handled by us" },
      { value: "12 weeks", label: "typical time from kickoff to a first public release" },
    ],
    signals: [
      "Your customers use the mobile website and abandon tasks they would finish in an app.",
      "Field staff fill in paper forms and type them up at the end of the day.",
      "Your current app has a store rating below four stars and reviews mention crashes.",
      "You maintain separate iOS and Android codebases and features ship months apart.",
      "The app stops working when there is no signal.",
    ],
    deliverables: [
      { title: "Product definition and prototype", body: "User flows and a clickable prototype tested with real users before development starts." },
      { title: "iOS and Android apps", body: "Native Swift and Kotlin, or a shared React Native or Flutter codebase. We recommend the approach and explain the trade offs in writing." },
      { title: "Back end and admin console", body: "APIs, authentication, push notifications and a web console for your staff to manage content and users." },
      { title: "Offline mode and sync", body: "Local storage with conflict handling, so the app keeps working in basements, warehouses and rural routes." },
      { title: "Store submission", body: "Listings, screenshots, privacy declarations and review responses for the App Store and Google Play." },
      { title: "Release pipeline and analytics", body: "Automated builds, staged rollouts, crash reporting and product analytics from day one." },
    ],
    process: [
      { title: "Define", body: "Two weeks to agree on the core user tasks and cut everything that does not belong in version one." },
      { title: "Prototype", body: "A clickable prototype on real devices. We test it with five to eight users and fix what confuses them." },
      { title: "Build", body: "Two week sprints with a TestFlight and Play internal build at the end of each one." },
      { title: "Release and iterate", body: "Staged rollout, monitoring of crashes and reviews, then a regular release cadence." },
    ],
    stack: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "React Native", "Flutter", "Firebase", "Node.js", "GraphQL", "SQLite", "Fastlane"],
    engagement: {
      timeline: "First store release in 12 to 16 weeks",
      team: "4 to 6 people: mobile lead, 2 mobile engineers, back end engineer, QA, designer",
      model: "Fixed scope for version one, then a monthly release retainer",
    },
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform with React Native or Flutter suits most business apps and saves 30 to 40 percent of build cost. We recommend native Swift and Kotlin when the app relies on heavy graphics, Bluetooth devices, or deep platform features. You get our recommendation and reasoning in the proposal." },
      { q: "What does a mobile app cost?", a: "The drivers are the number of screens, whether a back end already exists, offline requirements, payment and third party integrations, and whether you need one platform or two. We fix the price for version one after a two week definition phase." },
      { q: "Do you handle App Store and Google Play approval?", a: "Yes. We prepare listings, privacy declarations and review notes, submit under your developer accounts and respond to any review feedback. The accounts and the apps stay in your name." },
      { q: "Can you rescue an app another team built?", a: "Yes. We begin with a code and crash audit, stabilise the current release, then agree a plan to repair or rebuild module by module." },
      { q: "How are updates handled after launch?", a: "Each year Apple and Google release new OS versions that require updates. A release retainer covers OS compatibility, security patches, monitoring and a set number of feature hours each month." },
    ],
    industries: ["logistics", "healthcare", "restaurants-hospitality", "retail-ecommerce"],
    caseStudies: ["logistics-driver-app"],
    seo: {
      title: "Mobile App Development for iOS and Android",
      description:
        "iOS and Android app development in Swift, Kotlin, React Native and Flutter. Offline first apps, store submission and release management by senior mobile engineers.",
    },
  },
  {
    slug: "custom-pos-systems",
    icon: "pos",
    name: "Custom POS Systems",
    tagline: "Point of sale that keeps selling when the internet drops.",
    summary:
      "We build point of sale systems for retailers and restaurants with needs that packaged POS cannot meet. Offline selling, multi-branch inventory, your pricing rules and your choice of payment processor.",
    heroTitle: "A point of sale that fits your counter, your rules and your payment processor.",
    heroLead:
      "Packaged POS charges per terminal, locks you to its payment rates and goes dark when the connection drops. We build a POS you own: it sells offline, syncs every branch to one inventory and reports to head office in real time.",
    outcomes: [
      { value: "100%", label: "of sales captured during internet outages, synced on reconnect" },
      { value: "< 1 sec", label: "to add an item and move to the next, on standard hardware" },
      { value: "$0", label: "per terminal licence fees. You own the software" },
    ],
    signals: [
      "Per terminal and per transaction fees rise every time you open a location.",
      "Tills freeze or lose sales when the internet is unstable.",
      "Stock levels across branches are reconciled by hand at the end of the week.",
      "Your pricing, promotions or loyalty rules do not fit the options in your current POS.",
      "Head office waits until the next morning for yesterday's sales figures.",
    ],
    deliverables: [
      { title: "POS terminal application", body: "A touch interface for Windows, Android or iPad with barcode scanning, split payments, returns and shift management." },
      { title: "Offline first architecture", body: "Each terminal holds a local database and continues selling without a connection. Transactions sync and reconcile when it returns." },
      { title: "Payments integration", body: "Integration with Moneris, Stripe Terminal, Square, Global Payments or your regional processor, using certified devices so card data never touches the POS." },
      { title: "Inventory and purchasing", body: "Stock by location, transfers, purchase orders and low stock alerts in one back office." },
      { title: "Head office console", body: "Live sales by branch, product and cashier, with price and promotion changes pushed to every terminal." },
      { title: "Hardware and rollout", body: "Tested receipt printers, cash drawers, scanners and customer displays, plus an installation and training plan for each site." },
    ],
    process: [
      { title: "Observe", body: "We spend time at your busiest counter to see how staff actually ring up sales, handle returns and close a shift." },
      { title: "Pilot", body: "One location runs the new POS alongside the old one for two to four weeks." },
      { title: "Refine", body: "Cashier feedback from the pilot is built in before any wider rollout." },
      { title: "Roll out", body: "Branches go live in waves, with on site or remote support during each first week." },
    ],
    stack: [".NET", "React", "Electron", "Kotlin", "Flutter", "SQLite", "PostgreSQL", "Stripe Terminal", "Moneris", "ESC/POS", "Azure"],
    engagement: {
      timeline: "Pilot store live in 12 to 16 weeks",
      team: "4 to 7 people: solution architect, 2 to 3 engineers, QA, rollout lead",
      model: "Fixed price build and pilot, then per wave rollout and support retainer",
    },
    faqs: [
      { q: "Why build a POS instead of buying one?", a: "Buying is right for a single shop with standard needs. Building pays off when you run many terminals, have pricing or workflow rules a package cannot support, or want to choose your own payment processor. We will tell you plainly if a packaged product is the better choice." },
      { q: "Is a custom POS PCI compliant?", a: "Yes. We use certified payment terminals with point to point encryption, so card numbers never pass through the POS software. That keeps your PCI DSS scope small. We document the architecture for your assessor." },
      { q: "Can it work with our existing hardware?", a: "Usually. We test your printers, scanners, drawers and scales during discovery and list any device that needs replacing." },
      { q: "How does offline mode handle stock and card payments?", a: "Sales and stock movements are stored locally and synced in order when the connection returns. Card payments depend on your processor: many terminals support store and forward for a limited amount, which we configure with your acquirer." },
      { q: "Does it connect to our accounting system and online store?", a: "Yes. We integrate with QuickBooks, Xero, Sage, Shopify and WooCommerce so sales, tax and stock stay consistent." },
    ],
    industries: ["restaurants-hospitality", "retail-ecommerce"],
    caseStudies: ["restaurant-group-pos-rollout"],
    seo: {
      title: "Custom POS System Development for Retail and Restaurants",
      description:
        "Custom point of sale systems with offline selling, multi-branch inventory and integrated payments. PCI aware architecture, no per terminal licence fees, full ownership.",
    },
  },
  {
    slug: "management-software",
    icon: "management",
    name: "Hospital and Restaurant Software",
    tagline: "Management systems shaped around how your floor runs.",
    summary:
      "We build hospital management systems and restaurant management systems for operators who have outgrown generic software. Scheduling, records, billing, kitchen and inventory in one system built around your daily routine.",
    heroTitle: "Management software built around the way your wards and kitchens run.",
    heroLead:
      "Hospitals and restaurants share one problem: many people, many handoffs, no room for error at peak hours. We build management systems that put the right information in front of the right person at the right moment, from patient admission to kitchen ticket.",
    outcomes: [
      { value: "30-40%", label: "less time spent on registration, billing and end of day paperwork" },
      { value: "1 record", label: "per patient or per order, visible to every department that needs it" },
      { value: "24/7", label: "monitored uptime with a named on call engineer" },
    ],
    signals: [
      "Front desk, clinical staff and billing each keep their own version of the same record.",
      "Patients or guests wait because staff are searching for information.",
      "Kitchen tickets are lost or delayed between the floor and the line during a rush.",
      "You cannot see occupancy, wait times, food cost or revenue by location without building a spreadsheet.",
      "Your current software vendor charges for every change and takes months to deliver it.",
    ],
    deliverables: [
      { title: "Hospital: patient administration", body: "Registration, appointments, admissions, bed management and discharge, with one patient record across departments." },
      { title: "Hospital: clinical and billing modules", body: "Electronic medical records, lab and pharmacy orders, insurance claims and invoicing, with HL7 and FHIR interfaces to existing lab and imaging systems." },
      { title: "Restaurant: front of house", body: "Table management, reservations, ordering by server tablet or QR code, and integrated POS and payments." },
      { title: "Restaurant: kitchen and stock", body: "Kitchen display screens, recipe costing, inventory, supplier orders and wastage tracking." },
      { title: "Multi-site reporting", body: "Dashboards for occupancy, wait times, sales, food cost and labour by location, updated live." },
      { title: "Roles, audit and security", body: "Role based access, a full audit log of who viewed or changed a record, encryption at rest and in transit." },
    ],
    process: [
      { title: "Shadow", body: "We spend days on your floor during real shifts and document each handoff between people and departments." },
      { title: "Design with staff", body: "Nurses, front desk, servers and kitchen leads review prototypes. Screens are designed for people who are busy and standing up." },
      { title: "Build and pilot", body: "One ward or one location goes first. We measure the time each task takes before and after." },
      { title: "Roll out and support", body: "Site by site rollout with training on each shift, followed by 24/7 monitored support." },
    ],
    stack: [".NET", "Node.js", "React", "React Native", "PostgreSQL", "SQL Server", "HL7", "FHIR", "Redis", "Azure", "AWS", "Power BI"],
    engagement: {
      timeline: "Pilot ward or location live in 4 to 6 months",
      team: "5 to 9 people: solution architect, domain analyst, engineers, QA, trainer",
      model: "Phased fixed price per module, with a 24/7 support agreement",
    },
    faqs: [
      { q: "How do you protect patient data?", a: "Systems are built to PHIPA, PIPEDA and HIPAA requirements as they apply to you: role based access, audit logs of every record view, encryption at rest and in transit, and hosting in a Canadian region when required. We complete a privacy impact assessment with your privacy officer." },
      { q: "Can it connect to our existing lab, imaging or accounting systems?", a: "Yes. We integrate through HL7 v2 and FHIR for clinical systems, and through APIs for accounting, payroll and delivery platforms. Integration points are listed and tested during discovery." },
      { q: "How do you migrate from our current system?", a: "Patient, menu, inventory and financial data are extracted, cleaned and loaded in trial runs first. Staff verify samples from each run. The final migration happens during your quietest hours with a rollback plan." },
      { q: "What does it cost?", a: "Cost depends on the number of modules, sites, integrations and the volume of legacy data. We price by module so you can begin with the area causing the most pain and add the rest later." },
      { q: "What support do you provide after go live?", a: "A support agreement with response times in writing: 15 minutes for a system down incident, at any hour. You have a named on call engineer and a monthly review of uptime and open requests." },
    ],
    industries: ["healthcare", "restaurants-hospitality"],
    caseStudies: ["hospital-management-system", "restaurant-group-pos-rollout"],
    seo: {
      title: "Hospital and Restaurant Management Software Development",
      description:
        "Custom hospital management systems and restaurant management software. Patient administration, EMR, billing, kitchen display, inventory and multi-site reporting with 24/7 support.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
