import { ImageResponse } from "next/og";
import { getServiceBySlug } from "@/lib/data/services";

// Image metadata
export const alt = "AnasTech Solutions Service";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// IMPORTANT: do NOT use webp anywhere in this file (Satori cannot decode webp).
// Use PNG / pure CSS only.

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const title = service?.title ?? "AnasTech Solutions";
  const tagline =
    service?.tagline ??
    "Enterprise digital services for businesses across Bangladesh and beyond.";
  const accent = service?.color ?? "#0F75BC";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #FFFFFF 0%, #F7F8FB 60%, #EEF1F7 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent bar (left) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 14,
            background: `linear-gradient(180deg, ${accent} 0%, #ED1C24 100%)`,
            display: "flex",
          }}
        />

        {/* Top row — brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `${accent}20`,
              border: `2px solid ${accent}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: accent,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#0B0B0F", letterSpacing: -0.5 }}>
              Anas<span style={{ color: "#ED1C24" }}>Tech</span>
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", letterSpacing: 4, textTransform: "uppercase" }}>
              Solutions
            </span>
          </div>

          {/* Pill */}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 16,
              fontWeight: 700,
              padding: "8px 18px",
              borderRadius: 999,
              background: `${accent}15`,
              color: accent,
              border: `1px solid ${accent}30`,
              textTransform: "uppercase",
              letterSpacing: 2,
              display: "flex",
            }}
          >
            AnasTech Service
          </div>
        </div>

        {/* Middle — title + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            marginTop: 24,
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#0B0B0F",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "#3B4252",
              lineHeight: 1.35,
              marginTop: 24,
              maxWidth: 1000,
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Bottom — domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: accent }}>
            anastechsolutions.com
          </span>
          <span style={{ fontSize: 18, color: "#6B7280", fontWeight: 600 }}>
            Dhaka, Bangladesh · Worldwide
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
