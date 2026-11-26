export type LeadKind = "contact" | "consultation" | "application";

export interface LeadPayload {
  kind: LeadKind;
  [key: string]: unknown;
}

/**
 * Front-end stub. Every form on the site submits through this one function,
 * so wiring the backend later means replacing only this body with a real
 * request (for example `fetch("/api/leads", { method: "POST", body })`).
 * Until then nothing is sent or stored.
 */
export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (process.env.NODE_ENV !== "production") {
    console.info("[submitLead] backend not connected yet", payload);
  }
  return { ok: true };
}
