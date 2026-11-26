import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

const description = `How ${site.name} collects, uses and protects the personal information you share through this website.`;

export const metadata: Metadata = pageMetadata({ title: "Privacy Policy", description, path: "/privacy" });

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "We collect the details you choose to give us through the contact form, the consultation scheduler and job applications. That usually means your name, work email, company, phone number and what you tell us about your project.",
      "We also collect basic technical information, such as browser type and pages visited, to keep the site secure and to understand how it is used.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "We use your information to reply to your enquiry, to prepare for and hold a consultation, to send a proposal you asked for, and to assess a job application.",
      "We do not sell personal information. We do not send marketing email unless you have asked to receive it.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      `Your information is shared within our team so the right people can respond. Some team members and service providers are located outside Canada. Everyone who handles it follows the same confidentiality standards.`,
      "We use a small number of service providers, for example for email, hosting and scheduling. They may process your information on our behalf and only under our instructions.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiry and consultation records for as long as we are in conversation with you and for a reasonable period afterwards. Application records are kept for up to twelve months unless you ask us to remove them sooner.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can ask to see the personal information we hold about you, to correct it or to have it deleted. Depending on where you live, laws such as PIPEDA in Canada or the GDPR in Europe may give you further rights.",
      `To make a request, email ${site.email}. We respond within thirty days.`,
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "We limit access to personal information to the people who need it, encrypt data in transit and review our practices regularly. No system is perfectly secure, and we will tell you promptly if a breach affects your information.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "If we change how we handle personal information we will update this page and the date at the top. Significant changes will be made clear on the site.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      lead="What we collect when you contact us, why we collect it and what you can ask us to do with it."
      crumb="Privacy"
      updated="November 2026"
      sections={sections}
    />
  );
}
