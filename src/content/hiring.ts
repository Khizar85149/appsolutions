import type { TitledText } from "@/lib/types";

/**
 * The four stage hiring process behind the "top 3%" figure.
 * Pass-through rates are illustrative. REPLACE with real funnel data.
 */
export const hiringStages: (TitledText & { pass: string })[] = [
  {
    title: "Application review",
    body: "An engineer, not a recruiter, reads every application. We look for shipped work, clear writing and evidence of ownership.",
    pass: "About 1 in 4 continue",
  },
  {
    title: "Take-home exercise",
    body: "A three hour task drawn from a real project. We grade correctness, tests, readability and the written explanation of trade-offs.",
    pass: "About 2 in 5 continue",
  },
  {
    title: "Live technical interview",
    body: "Ninety minutes with two senior engineers. You extend your own take-home solution and defend the design under changing requirements.",
    pass: "About 1 in 2 continue",
  },
  {
    title: "Client simulation",
    body: "A mock client call. You explain a delay, propose options and answer hard questions in plain English. Many strong coders stop here.",
    pass: "About 3 in 5 receive an offer",
  },
];
