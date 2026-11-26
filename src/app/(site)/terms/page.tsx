import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

const description = `The terms that apply when you use the ${site.name} website, book a consultation or send us a project enquiry.`;

export const metadata: Metadata = pageMetadata({ title: "Terms of Use", description, path: "/terms" });

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      `These terms cover your use of this website, which is operated by ${site.legalName} By using the site you accept them. If you do not accept them, please do not use the site.`,
      "Client projects are governed by a separate signed agreement. Nothing on this website forms part of that agreement unless it says so.",
    ],
  },
  {
    heading: "Information on this site",
    paragraphs: [
      "We work to keep the content accurate and current, but it is general information and not professional advice. Timelines, team sizes and results described on the site are examples. What applies to your project is set out in your proposal and contract.",
    ],
  },
  {
    heading: "Consultations and enquiries",
    paragraphs: [
      "Consultations booked through this site are free and carry no obligation on either side. A booking is a request for a meeting and does not create a client relationship.",
      "Please do not send confidential material through the site forms. If confidentiality matters, ask us for a non-disclosure agreement first.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `The text, design and code of this website belong to ${site.name} or its licensors. You may share links to it and quote short passages with credit. You may not copy the site or present its content as your own.`,
    ],
  },
  {
    heading: "Acceptable use",
    paragraphs: [
      "Do not attempt to disrupt the site, gain access to systems you are not authorised to use, or submit false or unlawful information through its forms.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "The site is provided as it is. To the extent the law allows, we are not liable for losses that arise from relying on its content or from the site being unavailable.",
    ],
  },
  {
    heading: "Governing law and contact",
    paragraphs: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.",
      `Questions about these terms can be sent to ${site.email}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of use"
      lead="The ground rules for using this website. Client work is covered by its own signed agreement."
      crumb="Terms"
      updated="November 2026"
      sections={sections}
    />
  );
}
