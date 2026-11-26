/**
 * Open roles. REPLACE with current openings before launch.
 * `posted` is an ISO date used in JobPosting structured data.
 */
import type { Job } from "@/lib/types";

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full time, hybrid",
    experience: "6+ years",
    posted: "2026-11-09",
    summary:
      "Lead the build of client platforms in TypeScript, from database schema to the last pixel. You will own architecture decisions and present them to clients yourself.",
    about: [
      "You will join a team of four to six engineers working on one client product at a time. Current projects include a multi-warehouse ERP and a hospital management system.",
      "Senior engineers here speak to clients directly. You will run the weekly demo, explain trade-offs in plain language and write the technical section of proposals.",
    ],
    responsibilities: [
      "Design and build features across Next.js front ends and Node.js or NestJS services.",
      "Model data in PostgreSQL and write migrations that are safe to run on live systems.",
      "Review pull requests daily and hold the team to an agreed standard.",
      "Break client requirements into estimates the delivery manager can commit to.",
      "Present working software to the client every week.",
      "Mentor two mid-level engineers through pairing and written feedback.",
    ],
    requirements: [
      "Six or more years building production web applications.",
      "Strong TypeScript, React and Node.js. You have shipped at least one Next.js application.",
      "Solid relational database skills: indexing, query plans, transactions.",
      "Experience with automated testing and CI pipelines.",
      "Clear written and spoken English. You can explain a technical decision to a non-technical client.",
      "Availability during core Eastern Time hours for stand ups, demos and reviews.",
    ],
    niceToHave: [
      "Experience with AWS or Azure infrastructure as code.",
      "Background in ERP, healthcare or point of sale systems.",
      "Open source contributions or technical writing.",
    ],
  },
  {
    slug: "react-native-engineer",
    title: "React Native Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full time",
    experience: "4+ years",
    posted: "2026-11-02",
    summary:
      "Build iOS and Android apps that work offline, on old devices and in bad coverage. Our mobile work includes driver apps, tablet POS and patient apps.",
    about: [
      "Most of our mobile apps are used by people at work: drivers, servers, nurses. They need speed and reliability more than visual effects.",
      "You will work with a designer who does field research and a backend team that builds the sync layer with you.",
    ],
    responsibilities: [
      "Build and ship React Native apps to the App Store and Google Play.",
      "Implement offline storage and background sync with conflict handling.",
      "Write native modules in Swift or Kotlin when the platform requires it.",
      "Profile and fix performance problems on low-end Android devices.",
      "Set up release pipelines, crash reporting and staged rollouts.",
    ],
    requirements: [
      "Four or more years of mobile development, at least three in React Native.",
      "Two or more apps published under your direct involvement.",
      "Working knowledge of Swift or Kotlin.",
      "Experience with local databases such as SQLite, WatermelonDB or Realm.",
      "Comfort with TypeScript and automated testing on mobile.",
    ],
    niceToHave: [
      "Experience integrating payment terminals, barcode scanners or Bluetooth printers.",
      "Familiarity with Expo and EAS.",
      "Knowledge of accessibility on iOS and Android.",
    ],
  },
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full time",
    experience: "4+ years",
    posted: "2026-11-16",
    summary:
      "Build AI assistants and automations that regulated clients can put in front of customers. The job is 20% prompts and 80% retrieval, evaluation and engineering.",
    about: [
      "Our AI practice builds support assistants, document processing pipelines and internal automations. Clients include lenders and healthcare providers, so accuracy and audit trails matter more than novelty.",
      "You will own the evaluation suite for each project. Nothing ships until it passes a test set the client has signed off.",
    ],
    responsibilities: [
      "Design retrieval pipelines over client documents and structured data.",
      "Build tool-using agents that call client APIs safely, with permission checks and logging.",
      "Create evaluation sets from real transcripts and track accuracy across releases.",
      "Define handover rules so an assistant stops and routes to a person when it should.",
      "Monitor cost, latency and quality in production and report on them weekly.",
    ],
    requirements: [
      "Four or more years of software engineering in Python or TypeScript.",
      "At least one LLM application shipped to real users, with measured results.",
      "Hands-on experience with retrieval, embeddings and a vector store such as pgvector.",
      "A disciplined approach to evaluation. You can show how you measured quality on a past project.",
      "Strong API and backend fundamentals.",
    ],
    niceToHave: [
      "Experience in a regulated sector such as finance or healthcare.",
      "Workflow automation with n8n, Temporal or similar.",
      "Voice or WhatsApp channel integrations.",
    ],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Quality",
    location: "Remote",
    type: "Full time, hybrid",
    experience: "3+ years",
    posted: "2026-10-26",
    summary:
      "Own the automated test suites that let us release every week without fear. You will test web, mobile and API layers on systems that businesses run on.",
    about: [
      "QA here starts at the requirements stage. You will read the scope with the engineers and write acceptance tests before the feature is built.",
      "Our clients run hospitals, restaurants and warehouses on this software. A missed regression has a real cost, and your work prevents it.",
    ],
    responsibilities: [
      "Build and maintain end to end tests in Playwright for web applications.",
      "Automate mobile tests with Detox or Maestro.",
      "Write API and contract tests that run in CI on every pull request.",
      "Design test data and environments that mirror production safely.",
      "Run performance tests before major releases and report the findings.",
      "Sign off each release with a written summary of coverage and known risks.",
    ],
    requirements: [
      "Three or more years in test automation.",
      "Strong Playwright or Cypress experience and working TypeScript.",
      "Experience testing REST APIs and reading SQL.",
      "Familiarity with CI systems such as GitHub Actions.",
      "Precise written bug reports that an engineer can act on without a call.",
    ],
    niceToHave: [
      "Load testing with k6.",
      "Accessibility testing against WCAG 2.1 AA.",
      "Experience with data migration testing.",
    ],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Toronto, Canada or remote",
    type: "Full time, hybrid",
    experience: "5+ years",
    posted: "2026-11-12",
    summary:
      "Design software for people who use it eight hours a day. You will spend time in kitchens, wards and warehouses before you open Figma.",
    about: [
      "We design operational software: POS, ERP screens, dispatch consoles, patient records. Success is measured in seconds saved and errors avoided.",
      "You will be the only designer on your project, working beside engineers from discovery to launch, with a design lead for critique.",
    ],
    responsibilities: [
      "Run discovery: site visits, interviews and workflow mapping with client staff.",
      "Produce flows, wireframes and high-fidelity designs in Figma.",
      "Test prototypes with real users and change the design based on what you see.",
      "Maintain a component library that matches what engineers build.",
      "Review builds before each release and log design defects.",
    ],
    requirements: [
      "Five or more years designing web or mobile products, with shipped work to show.",
      "A portfolio that includes complex, data-heavy interfaces.",
      "Evidence of research changing your design decisions.",
      "Strong Figma skills including components, variables and auto layout.",
      "Working understanding of accessibility standards.",
    ],
    niceToHave: [
      "Experience designing for tablets, kiosks or handheld scanners.",
      "Basic HTML and CSS.",
      "Experience presenting to executive stakeholders.",
    ],
  },
  {
    slug: "delivery-manager",
    title: "Delivery Manager",
    department: "Delivery",
    location: "Toronto, Canada",
    type: "Full time, hybrid",
    experience: "6+ years",
    posted: "2026-11-05",
    summary:
      "Be the accountable person for two or three client projects. You hold scope, budget and timeline, and you are the first call when a client has a concern.",
    about: [
      "Delivery managers sit in our Canadian office and work in the client's time zone. You are the link between the client and the engineering team.",
      "We sell fixed scope proposals. Your job is to keep them fixed, or to bring a clear change request to the client before any extra work starts.",
    ],
    responsibilities: [
      "Run kickoff, weekly demos and monthly steering meetings with clients.",
      "Maintain the project plan, risk log and budget for each engagement.",
      "Write change requests with cost and schedule impact.",
      "Coordinate with engineering leads on priorities and blockers.",
      "Send a written status report to every client each Friday.",
      "Support proposals with timelines and staffing plans.",
    ],
    requirements: [
      "Six or more years managing software delivery, at least three in a client-facing role.",
      "A record of fixed scope projects delivered on budget.",
      "Enough technical understanding to question an estimate.",
      "Excellent written English. Your status reports need no follow-up questions.",
      "Experience working with distributed teams across time zones.",
    ],
    niceToHave: [
      "Background in ERP or healthcare implementations.",
      "PMP or Scrum certification.",
      "Experience with Canadian public sector procurement.",
    ],
  },
];

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
