import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — Websites, SaaS, AI automation, SEO & GEO in Dhaka`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image for every page (Facebook, WhatsApp, LinkedIn, X). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(120% 90% at 85% 110%, #1d3a99 0%, #0a1020 55%, #060a14 100%)",
          color: "#e8ecf4",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#3b6bff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div style={{ width: 20, height: 20, borderRadius: 999, background: "#fff" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>
            Websites, SaaS & AI that make brands grow.
          </div>
          <div style={{ fontSize: 30, color: "#afc3ff" }}>
            Next.js · E-commerce · AI automation · SEO & GEO
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8b95ab" }}>
          <div>scaleupweb.xyz</div>
          <div>Dhaka, Bangladesh</div>
        </div>
      </div>
    ),
    size
  );
}
