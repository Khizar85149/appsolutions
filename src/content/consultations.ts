import type { ConsultationType } from "@/lib/types";

const HOST = "Nexora Solutions Team";

export const consultations: ConsultationType[] = [
  {
    slug: "project-discovery",
    icon: "search",
    name: "Project Discovery Call",
    duration: 30,
    summary: "You have something to build. We help you size it, sequence it and price it.",
    description:
      "A working conversation about the product or system you have in mind. We ask about your users, your deadline and what already exists, then tell you plainly how we would approach it and what it is likely to cost.",
    agenda: [
      "Your goals, users and deadline",
      "What exists today and what must connect to it",
      "A first view of scope, team and budget range",
      "Risks we would want to settle before a line of code is written",
    ],
    host: { name: HOST, role: "Senior Solutions Architect" },
    seo: {
      title: "Book a Free Project Discovery Call",
      description:
        "Thirty minutes with a senior solutions architect. Leave with a first view of scope, team and budget for your software project, and a written summary within two business days.",
    },
  },
  {
    slug: "ai-automation-assessment",
    icon: "automation",
    name: "AI and Automation Assessment",
    duration: 45,
    summary: "Find the two or three workflows where AI pays for itself, and the ones where it will not.",
    description:
      "Bring a process that eats your team's hours: support tickets, data entry, document handling, lead follow-up. We map it with you and say which steps a chatbot or an automation can take over, what data it needs, and what the result is worth.",
    agenda: [
      "Walk through one or two of your manual workflows",
      "Where a chatbot or an automation fits, and where it does not",
      "Data, privacy and integration requirements",
      "Expected savings and a sensible first pilot",
    ],
    host: { name: HOST, role: "AI Solutions Lead" },
    seo: {
      title: "Book a Free AI and Automation Assessment",
      description:
        "A 45 minute session with an AI solutions lead. We review your manual workflows and identify where chatbots and automation will save real hours, with a written summary afterwards.",
    },
  },
  {
    slug: "erp-and-systems-review",
    icon: "erp",
    name: "ERP and Systems Review",
    duration: 45,
    summary: "For teams running on spreadsheets, disconnected tools or an ERP that no longer fits.",
    description:
      "We look at how finance, inventory, sales and operations data moves through your business today. You get an honest opinion on whether to extend what you have, replace it, or build a system around the way you work.",
    agenda: [
      "Your current systems and where data is entered twice",
      "Reporting gaps that slow down decisions",
      "Build, buy or extend: the real cost of each option",
      "A phased rollout that does not stop the business",
    ],
    host: { name: HOST, role: "ERP Practice Lead" },
    seo: {
      title: "Book a Free ERP and Systems Review",
      description:
        "A 45 minute review of your ERP, POS or management systems with a practice lead. Understand whether to extend, replace or build, and what a phased rollout would look like.",
    },
  },
  {
    slug: "technical-audit",
    icon: "wrench",
    name: "Technical Audit Session",
    duration: 60,
    summary: "A second opinion on an existing product or codebase before you invest more in it.",
    description:
      "For products that are slow, fragile or expensive to change. Share access or a walkthrough and a principal engineer will review architecture, code quality, performance and security with you, then rank what to fix first.",
    agenda: [
      "Architecture and code walkthrough",
      "Performance, security and reliability concerns",
      "What to fix now, what can wait and what to leave alone",
      "Effort estimates for the top priorities",
    ],
    host: { name: HOST, role: "Principal Engineer" },
    seo: {
      title: "Book a Free Technical Audit Session",
      description:
        "Sixty minutes with a principal engineer reviewing your existing product or codebase. Get a ranked list of what to fix first, with effort estimates, at no cost.",
    },
  },
];

export function getConsultation(slug: string): ConsultationType | undefined {
  return consultations.find((c) => c.slug === slug);
}
