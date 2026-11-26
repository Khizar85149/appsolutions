import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: custom software, ERP, AI and mobile app development`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#151613",
          color: "#f1f1e9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30 }}>
          <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#c5f569" />
            <path d="M7.25 20.5 14 7.25l6.75 13.25" stroke="#151613" strokeWidth="2.5" strokeLinecap="square" />
            <rect x="12" y="16.5" width="4" height="4" fill="#151613" />
          </svg>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 76, lineHeight: 1.04, letterSpacing: -3, maxWidth: 980 }}>
            Serious software, built by the top 3% of engineers.
          </div>
          <div style={{ fontSize: 28, color: "#a2a59a" }}>
            ERP. AI automation. Mobile apps. POS and management systems. Based in Canada.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
