import type { Industry } from "@/lib/types";

/**
 * Industry content.
 * This is the starting content: it seeds the database (supabase/seed.sql) and is
 * served only as a fallback if the database cannot be reached. Once Supabase is
 * connected, edit content there, not here.
 * Figures in `stats` are sample values. REPLACE with audited numbers before launch.
 */
export const industries: Industry[] = [
  {
    slug: "healthcare",
    icon: "healthcare",
    name: "Healthcare",
    tagline: "Hospital management, patient portals and clinical workflows.",
    summary:
      "Software for hospitals, clinics and health technology companies. We build systems that reduce administrative load on clinical staff and keep patient data protected under PHIPA, PIPEDA and HIPAA.",
    heroTitle: "Software that gives clinicians time back and keeps patient data protected.",
    heroLead:
      "Clinical staff lose hours each shift to duplicate entry and systems that do not share a record. We build hospital management systems, patient portals and integrations that follow the way care is delivered, with privacy controls your privacy officer can audit.",
    stats: [
      { value: "30-40%", label: "less administrative time at registration and discharge" },
      { value: "100%", label: "of record access logged and auditable" },
      { value: "15 min", label: "response time for system down incidents, at any hour" },
    ],
    challenges: [
      { title: "Fragmented patient records", body: "Registration, clinical notes, lab results and billing sit in separate systems, so staff re-enter data and chase information by phone." },
      { title: "Privacy obligations", body: "PHIPA, PIPEDA and HIPAA require access controls, audit trails and breach procedures that many legacy systems cannot demonstrate." },
      { title: "Legacy integrations", body: "Lab, imaging and pharmacy systems speak HL7 v2, and connecting them to anything modern takes specialist knowledge." },
      { title: "Staff adoption", body: "Clinicians reject software that adds clicks. A system that is not used at the bedside does not improve care." },
    ],
    solutions: [
      { title: "Hospital management systems", body: "Admissions, bed management, appointments, EMR, pharmacy, lab orders and billing on one patient record." },
      { title: "Patient portals and apps", body: "Online booking, results, prescriptions and secure messaging on web, iOS and Android, built to WCAG 2.2 AA." },
      { title: "Interoperability", body: "HL7 v2 and FHIR interfaces between your existing lab, imaging and provincial systems." },
      { title: "AI for administration", body: "Assistants for appointment enquiries and automation for referral intake and claims, with clinical decisions left to clinicians." },
    ],
    compliance: ["PHIPA", "PIPEDA", "HIPAA", "HL7 v2 and FHIR", "SOC 2 Type II", "WCAG 2.2 AA"],
    services: ["management-software", "mobile-app-development", "ai-automation", "full-stack-development"],
    caseStudies: ["hospital-management-system"],
    faqs: [
      { q: "Where is patient data hosted?", a: "In the region your regulations require. For Canadian providers we host in Canadian data centres on AWS or Azure. Data is encrypted in transit and at rest, and production access is limited to named engineers with logged sessions." },
      { q: "Do your engineers access real patient data during development?", a: "No. Development and testing use synthetic or de-identified data. Production access is granted only for support incidents, with approval from your team and a full audit record." },
      { q: "Can you integrate with our existing EMR or lab system?", a: "Yes. We build HL7 v2 and FHIR interfaces and have experience with integration engines such as Mirth Connect. Each interface is specified and tested with your vendor before go live." },
      { q: "How do you train clinical staff?", a: "Training runs on each shift, in short sessions on the ward, with super users appointed in every department. Engineers stay on call through the first weeks of use." },
    ],
    seo: {
      title: "Healthcare Software Development",
      description:
        "Healthcare software development: hospital management systems, patient portals and HL7 and FHIR integrations built to PHIPA, PIPEDA and HIPAA requirements.",
    },
  },
  {
    slug: "restaurants-hospitality",
    icon: "restaurant",
    name: "Restaurants and Hospitality",
    tagline: "POS, kitchen display, ordering and multi-branch reporting.",
    summary:
      "Software for restaurant groups, cafes, hotels and franchises. We build POS, kitchen display, online ordering and reporting systems that hold up during a Friday night rush and show head office the numbers live.",
    heroTitle: "Systems that hold up on a Friday night and report to head office by Saturday morning.",
    heroLead:
      "Margins in hospitality are thin and service windows are short. We build POS, kitchen display, ordering and inventory systems that keep tickets moving when the internet drops, and give owners live sales, food cost and labour figures across every location.",
    stats: [
      { value: "100%", label: "of orders captured during internet outages" },
      { value: "2-4 pts", label: "typical reduction in food cost percentage with recipe level tracking" },
      { value: "Live", label: "sales and labour figures across all branches" },
    ],
    challenges: [
      { title: "Outages at peak hours", body: "A cloud only POS that loses connection during service means handwritten tickets, lost sales and an angry floor." },
      { title: "Delivery platform fees and tablet clutter", body: "Each delivery service brings its own tablet, its own menu and a commission of up to 30 percent." },
      { title: "No view of food cost", body: "Without recipe level inventory, wastage and over-portioning stay invisible until the monthly accounts." },
      { title: "Inconsistent branches", body: "Menus, prices and promotions drift between locations when each is updated by hand." },
    ],
    solutions: [
      { title: "Custom POS and payments", body: "Offline first tills and server tablets, split bills, tips and your choice of payment processor." },
      { title: "Kitchen display and routing", body: "Orders routed to the right station with timers, so the pass sees every ticket in order." },
      { title: "Direct ordering and loyalty", body: "Your own web and mobile ordering with loyalty, plus delivery platform orders merged into one queue." },
      { title: "Inventory and head office reporting", body: "Recipe costing, supplier orders, wastage and live reports by branch, with central menu and price control." },
    ],
    compliance: ["PCI DSS", "PIPEDA", "CASL for marketing messages", "WCAG 2.2 AA", "Provincial sales tax and HST rules"],
    services: ["custom-pos-systems", "management-software", "mobile-app-development", "ai-chatbots"],
    caseStudies: ["restaurant-group-pos-rollout"],
    faqs: [
      { q: "What happens when the internet goes down mid service?", a: "Tills, tablets and kitchen screens keep working on the local network. Orders, payments and stock movements are stored on site and synced to the cloud when the connection returns." },
      { q: "Can you integrate delivery platforms?", a: "Yes. Orders from the major delivery services are pulled into the same kitchen queue and the same sales reports, so staff work from one screen." },
      { q: "Can we roll out one location at a time?", a: "That is how we recommend doing it. A pilot site runs for two to four weeks, feedback is built in, then remaining locations go live in waves with support during each first week." },
    ],
    seo: {
      title: "Restaurant and Hospitality Software Development",
      description:
        "Restaurant software development: custom POS, kitchen display systems, online ordering, inventory and multi-branch reporting that keeps working offline.",
    },
  },
  {
    slug: "retail-ecommerce",
    icon: "retail",
    name: "Retail and E-commerce",
    tagline: "Unified inventory, storefronts and in-store point of sale.",
    summary:
      "Software for retailers selling in store and online. We build storefronts, POS and inventory systems that share one stock count and one customer record across every channel.",
    heroTitle: "One stock count and one customer record, in store and online.",
    heroLead:
      "Retailers lose sales when the website shows stock the shop sold an hour ago, and lose customers when a page takes four seconds to load. We build fast storefronts, connected POS and inventory systems that keep every channel in agreement.",
    stats: [
      { value: "< 2.0s", label: "storefront load time target on mobile" },
      { value: "1 inventory", label: "shared by stores, warehouse and online channels" },
      { value: "99.95%", label: "uptime target through peak season" },
    ],
    challenges: [
      { title: "Overselling and stockouts", body: "Online and in-store stock are counted separately, so customers order items that are already gone." },
      { title: "Slow storefronts", body: "Every extra second of load time on mobile reduces conversion, and themes loaded with plugins get slower each year." },
      { title: "Peak season failures", body: "Checkout errors on Black Friday cost more than the entire year of hosting." },
      { title: "Disconnected customer data", body: "Loyalty, purchase history and marketing consent live in different tools, so offers miss the mark." },
    ],
    solutions: [
      { title: "Headless storefronts", body: "Next.js front ends on Shopify, commercetools or a custom back end, built to pass Core Web Vitals." },
      { title: "Retail POS", body: "In-store tills connected to the same catalogue, prices and stock as the website." },
      { title: "Inventory and order management", body: "Real time stock across locations, ship from store, click and collect and returns." },
      { title: "Customer service automation", body: "AI assistants for order status, returns and product questions, with handover to staff." },
    ],
    compliance: ["PCI DSS", "PIPEDA", "CASL", "GDPR for EU customers", "WCAG 2.2 AA", "AODA"],
    services: ["frontend-development", "custom-pos-systems", "full-stack-development", "ai-chatbots"],
    caseStudies: ["retail-storefront-rebuild"],
    faqs: [
      { q: "Do we have to leave Shopify?", a: "No. A headless build keeps Shopify for catalogue, checkout and payments and replaces only the front end. You keep the admin your team knows and gain the speed and design control." },
      { q: "How do you prepare for peak traffic?", a: "We load test at three times your previous peak, set up autoscaling and caching, and agree a change freeze before key dates. Engineers are on call through the peak period." },
      { q: "Can you connect our POS, ERP and online store?", a: "Yes. We integrate stock, orders, prices and customers across systems through APIs, with reconciliation reports that flag any mismatch." },
    ],
    seo: {
      title: "Retail and E-commerce Software Development",
      description:
        "Retail and e-commerce development: headless storefronts in Next.js, connected POS and unified inventory and order management across every channel.",
    },
  },
  {
    slug: "fintech",
    icon: "finance",
    name: "Financial Services",
    tagline: "Secure platforms, reconciliations and client onboarding.",
    summary:
      "Software for lenders, payment companies, wealth managers and insurers. We build secure platforms and automations that pass security reviews and reduce the cost of onboarding, servicing and reconciliation.",
    heroTitle: "Financial software that passes the security review and the audit.",
    heroLead:
      "In financial services a defect is a regulatory event. We build lending platforms, client portals, onboarding flows and reconciliation engines with security controls documented from the first sprint, so your auditors and partner banks get the evidence they ask for.",
    stats: [
      { value: "Minutes", label: "to onboard a client with automated identity checks" },
      { value: "100%", label: "of transactions reconciled automatically or flagged" },
      { value: "SOC 2", label: "aligned controls in every environment we build" },
    ],
    challenges: [
      { title: "Slow onboarding", body: "Manual identity checks and document review take days, and applicants leave for a competitor that approves in minutes." },
      { title: "Security and audit pressure", body: "Partner banks, regulators and enterprise clients expect SOC 2 reports, penetration tests and evidence for every control." },
      { title: "Manual reconciliation", body: "Finance teams match bank files, processor reports and ledgers in spreadsheets, and breaks surface days later." },
      { title: "Legacy cores", body: "Core banking and policy systems are hard to change, so new products wait behind long release cycles." },
    ],
    solutions: [
      { title: "Digital onboarding and KYC", body: "Identity verification, document capture and risk scoring integrated with providers such as Persona, Onfido or Trulioo." },
      { title: "Lending and servicing platforms", body: "Origination, decisioning, disbursement, collections and borrower portals." },
      { title: "Reconciliation and reporting", body: "Automated matching across banks, processors and ledgers, with exception queues and regulatory reports." },
      { title: "AI support and document processing", body: "Assistants that answer from approved policy content, and extraction of statements and applications with full audit trails." },
    ],
    compliance: ["SOC 2 Type II", "PCI DSS", "PIPEDA", "FINTRAC AML and KYC requirements", "OSFI B-13", "ISO 27001"],
    services: ["full-stack-development", "ai-chatbots", "ai-automation", "frontend-development"],
    caseStudies: ["lender-ai-support-assistant"],
    faqs: [
      { q: "How do you handle security during development?", a: "Engineers work on managed devices with single sign on and least privilege access. Code is scanned for vulnerabilities and secrets on every commit, dependencies are monitored, and each release passes a security checklist. We support third party penetration tests before launch." },
      { q: "Can you work under our compliance programme?", a: "Yes. We sign your NDA and data processing agreements, follow your change management process and provide evidence for SOC 2 and ISO 27001 audits." },
      { q: "Do you keep data in Canada?", a: "When required, yes. Production environments are deployed in Canadian cloud regions, and we document data flows so you can show where each data element is stored and processed." },
      { q: "Can AI be used safely with regulated customer communication?", a: "With limits. Assistants answer only from approved content, cite sources, avoid advice and escalate regulated topics to licensed staff. Every conversation is logged for review." },
    ],
    seo: {
      title: "Fintech and Financial Services Software Development",
      description:
        "Financial services software development: onboarding and KYC, lending platforms, reconciliation and AI support built to SOC 2, PCI DSS and FINTRAC requirements.",
    },
  },
  {
    slug: "logistics",
    icon: "logistics",
    name: "Logistics and Supply Chain",
    tagline: "Dispatch, tracking and warehouse operations.",
    summary:
      "Software for carriers, couriers, freight brokers and warehouses. We build dispatch systems, driver apps and tracking portals that cut phone calls and give customers a delivery time they can trust.",
    heroTitle: "Know where every load is without picking up the phone.",
    heroLead:
      "Dispatchers spend their day calling drivers, and customers call dispatchers. We build driver apps, dispatch boards, tracking portals and warehouse tools that share one live picture, including in areas with no signal.",
    stats: [
      { value: "50-70%", label: "fewer status calls to dispatch after live tracking" },
      { value: "Same day", label: "invoicing with electronic proof of delivery" },
      { value: "Offline", label: "driver app keeps working without coverage" },
    ],
    challenges: [
      { title: "No live visibility", body: "Status lives in drivers' heads and dispatchers' notebooks, so every customer question becomes a phone call." },
      { title: "Paper proof of delivery", body: "Signed paperwork returns days later, delaying invoices and inviting disputes." },
      { title: "Manual planning", body: "Routes and loads are planned from experience and spreadsheets, leaving empty kilometres and missed windows." },
      { title: "Disconnected systems", body: "TMS, WMS, telematics and accounting do not share data, so the same shipment is entered several times." },
    ],
    solutions: [
      { title: "Driver mobile apps", body: "Job lists, navigation, scanning, photos and signatures, working offline and syncing on reconnect." },
      { title: "Dispatch and route planning", body: "Live boards, automated assignment and route optimisation against delivery windows and vehicle capacity." },
      { title: "Customer tracking portals", body: "Live status, estimated arrival and documents, with notifications by SMS and email." },
      { title: "Warehouse and integration", body: "Barcode driven receiving, picking and dispatch, with EDI and API links to customers, carriers and telematics." },
    ],
    compliance: ["ELD mandate (Canada and US)", "PIPEDA", "EDI X12 (204, 210, 214)", "SOC 2", "CBSA ACI eManifest"],
    services: ["mobile-app-development", "full-stack-development", "erp-development", "ai-automation"],
    caseStudies: ["logistics-driver-app"],
    faqs: [
      { q: "Will drivers actually use the app?", a: "They do when it saves them time. We design with drivers, keep the main flow to a few taps, and make it work with gloves, in sunlight and without signal. Adoption is measured during the pilot." },
      { q: "Can you integrate with our TMS and telematics?", a: "Yes. We connect to common TMS platforms, telematics providers such as Samsara and Geotab, and customer systems through API and EDI." },
      { q: "Do you build route optimisation?", a: "We integrate proven optimisation engines and tune them to your constraints: time windows, vehicle types, driver hours and priorities. Dispatchers keep the ability to override." },
    ],
    seo: {
      title: "Logistics and Supply Chain Software Development",
      description:
        "Logistics software development: driver apps, dispatch and route planning, tracking portals and warehouse systems with EDI and telematics integration.",
    },
  },
  {
    slug: "real-estate",
    icon: "realestate",
    name: "Real Estate",
    tagline: "Listings, CRM and property management portals.",
    summary:
      "Software for brokerages, developers and property managers. We build listing platforms, CRMs and tenant portals that respond to leads in minutes and take rent, maintenance and leasing off paper.",
    heroTitle: "Respond to every lead in minutes and run every property from one screen.",
    heroLead:
      "The first agent to respond usually wins the client, and the property manager with the fewest manual steps keeps the margin. We build listing platforms, CRMs and tenant and owner portals connected to MLS feeds, payments and accounting.",
    stats: [
      { value: "< 5 min", label: "lead response time with automated routing and follow up" },
      { value: "90%+", label: "of rent collected online through tenant portals" },
      { value: "1 portal", label: "for tenants, owners and maintenance teams" },
    ],
    challenges: [
      { title: "Slow lead response", body: "Enquiries from portals, the website and social channels land in different inboxes and wait hours for a reply." },
      { title: "Paper heavy leasing", body: "Applications, screening, leases and deposits involve printing, scanning and chasing signatures." },
      { title: "Maintenance by phone and email", body: "Requests are lost, tenants call repeatedly and owners see no record of what was done." },
      { title: "Generic listing sites", body: "Template websites load slowly, rank poorly and look the same as every competitor." },
    ],
    solutions: [
      { title: "Listing platforms", body: "Fast property search with map views, saved searches and MLS and IDX integration." },
      { title: "CRM and lead automation", body: "Leads captured from every source, routed to the right agent and followed up automatically." },
      { title: "Tenant and owner portals", body: "Online applications, e-signature, rent payments, maintenance requests and owner statements." },
      { title: "AI assistants", body: "Round the clock answers to listing questions and showing bookings, with qualified leads passed to agents." },
    ],
    compliance: ["PIPEDA", "CASL", "RECO and provincial advertising rules", "CREA DDF and MLS data policies", "PCI DSS", "WCAG 2.2 AA"],
    services: ["full-stack-development", "frontend-development", "mobile-app-development", "ai-chatbots"],
    caseStudies: [],
    faqs: [
      { q: "Can you integrate MLS listings?", a: "Yes. We integrate CREA DDF, regional board feeds and IDX and RESO Web API sources, and follow each board's display rules." },
      { q: "Can tenants pay rent through the portal?", a: "Yes. We integrate pre-authorised debit, card and Interac options through a payment processor, with receipts and ledger entries posted automatically." },
      { q: "Does it connect to our accounting software?", a: "Yes. Rent, fees and owner disbursements sync to QuickBooks, Xero, Yardi or your existing property accounting system." },
    ],
    seo: {
      title: "Real Estate Software Development",
      description:
        "Real estate software development: listing platforms with MLS integration, CRM and lead automation, and tenant and owner portals with online payments.",
    },
  },
  {
    slug: "education",
    icon: "education",
    name: "Education",
    tagline: "Learning platforms and school administration systems.",
    summary:
      "Software for schools, colleges, training providers and education technology companies. We build learning platforms and administration systems that work on any device and protect student data.",
    heroTitle: "Learning platforms students use and administrators can run.",
    heroLead:
      "Education software has to serve a 9 year old on a shared tablet and a registrar closing the term. We build learning platforms, student information systems and admissions portals that are accessible, dependable in exam week and careful with student data.",
    stats: [
      { value: "WCAG 2.2 AA", label: "accessibility on every learner facing screen" },
      { value: "10x", label: "normal traffic load tested before enrolment and exam periods" },
      { value: "1 login", label: "across LMS, SIS and library through single sign on" },
    ],
    challenges: [
      { title: "Peak load failures", body: "Platforms that run well all term fail on enrolment day and during exams, when they matter most." },
      { title: "Too many logins", body: "Students and staff move between an LMS, a student system, payment pages and email with separate accounts." },
      { title: "Accessibility requirements", body: "AODA and similar laws require accessible digital content, and many platforms fall short." },
      { title: "Manual administration", body: "Admissions, timetabling, fees and transcripts depend on spreadsheets and re-keyed forms." },
    ],
    solutions: [
      { title: "Learning platforms", body: "Courses, live classes, assessments and progress tracking on web and mobile, with offline access to materials." },
      { title: "Student information systems", body: "Admissions, enrolment, attendance, grading, fees and transcripts in one system." },
      { title: "Integrations and single sign on", body: "LTI 1.3, SCORM, xAPI and SSO with Google Workspace and Microsoft Entra ID." },
      { title: "AI study and support assistants", body: "Assistants that answer from course material and school policy, with safeguards suited to younger users." },
    ],
    compliance: ["FIPPA and MFIPPA", "PIPEDA", "FERPA", "COPPA", "AODA and WCAG 2.2 AA", "LTI 1.3"],
    services: ["full-stack-development", "mobile-app-development", "frontend-development", "ai-chatbots"],
    caseStudies: [],
    faqs: [
      { q: "Can you extend an existing LMS such as Moodle or Canvas?", a: "Yes. We build LTI tools, plugins and integrations for existing platforms, and recommend a custom platform only when your teaching model does not fit a standard LMS." },
      { q: "How do you protect student data?", a: "Data is hosted in the region your regulations require, access is role based and logged, and we collect only what is needed. We work with your privacy office on FIPPA, FERPA and COPPA obligations." },
      { q: "Will it cope with exam week?", a: "We load test at ten times normal traffic before each peak period, configure autoscaling and keep engineers on call during exams and enrolment." },
    ],
    seo: {
      title: "Education Software Development",
      description:
        "Education software development: learning platforms, student information systems and admissions portals with LTI integration, single sign on and WCAG 2.2 AA accessibility.",
    },
  },
  {
    slug: "manufacturing",
    icon: "manufacturing",
    name: "Manufacturing",
    tagline: "Production planning, quality control and ERP.",
    summary:
      "Software for manufacturers and distributors. We build ERP, production planning and shop floor systems that connect orders, materials and machines, so you know your true cost and delivery date for every job.",
    heroTitle: "Know the true cost and delivery date of every job on the floor.",
    heroLead:
      "When planning lives in spreadsheets and the shop floor reports on paper, nobody can say what a job cost until weeks after it ships. We build ERP, planning and shop floor systems that connect sales orders to materials, machines and labour in real time.",
    stats: [
      { value: "5 days", label: "typical month end close, down from 12 to 15" },
      { value: "98%+", label: "inventory accuracy with barcode driven stock movements" },
      { value: "Live", label: "job costing across materials, labour and machine time" },
    ],
    challenges: [
      { title: "Planning in spreadsheets", body: "Production schedules are rebuilt by hand whenever an order changes, and material shortages appear on the day." },
      { title: "Inaccurate inventory", body: "Stock moves without being recorded, so purchasing over-orders and production still runs short." },
      { title: "No real job costing", body: "Labour and machine time are estimated, so margin by product is a guess." },
      { title: "Quality records on paper", body: "Inspection results and traceability data sit in binders, which makes audits and recalls slow." },
    ],
    solutions: [
      { title: "Manufacturing ERP", body: "Sales, purchasing, bills of materials, MRP, inventory and finance in one system, on Odoo, ERPNext or Dynamics 365." },
      { title: "Shop floor data capture", body: "Tablets and scanners at each work centre to record time, quantities and scrap as they happen." },
      { title: "Quality and traceability", body: "Inspection plans, non-conformance tracking and lot traceability from raw material to shipment." },
      { title: "Automation and reporting", body: "Automated purchase order and invoice processing, plus dashboards for OEE, on time delivery and margin." },
    ],
    compliance: ["ISO 9001", "ISO 27001", "CSA and UL documentation requirements", "EDI X12 (850, 856, 810)", "PIPEDA", "SOC 2"],
    services: ["erp-development", "ai-automation", "full-stack-development", "mobile-app-development"],
    caseStudies: ["distributor-erp-migration"],
    faqs: [
      { q: "Can the ERP connect to machines on the floor?", a: "Yes. We collect data from PLCs and machines through OPC UA and MQTT, or through operator tablets where machines are older. The level of connection is decided by what the data is worth to you." },
      { q: "How do you avoid disrupting production during go live?", a: "Old and new systems run in parallel for a full accounting period, cutover happens on a weekend or shutdown, and engineers are on site or on call for the first week." },
      { q: "Do you support EDI with our customers and suppliers?", a: "Yes. We implement X12 and EDIFACT documents such as purchase orders, ship notices and invoices through your VAN or direct AS2 connections." },
    ],
    seo: {
      title: "Manufacturing Software and ERP Development",
      description:
        "Manufacturing software development: ERP with MRP, shop floor data capture, quality and traceability, and live job costing for manufacturers and distributors.",
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
