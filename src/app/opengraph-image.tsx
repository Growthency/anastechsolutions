import { ImageResponse } from "next/og";

// Image metadata
export const alt = "AnasTech Solutions — Digital Agency Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// IMPORTANT: do NOT use webp anywhere in this file (Satori cannot decode webp).
// Use PNG / pure CSS only.

export default async function Image() {
  const accent = "#0F75BC";

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
              width: 72,
              height: 72,
              borderRadius: 18,
              background: `${accent}20`,
              border: `2px solid ${accent}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: accent,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: "#0B0B0F", letterSpacing: -0.5 }}>
              Anas<span style={{ color: "#ED1C24" }}>Tech</span>
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", letterSpacing: 4, textTransform: "uppercase" }}>
              Solutions
            </span>
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
              fontSize: 84,
              fontWeight: 800,
              color: "#0B0B0F",
              lineHeight: 1.0,
              margin: 0,
              letterSpacing: -2.5,
              maxWidth: 1020,
            }}
          >
            Digital Agency
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              for Bangladesh
            </span>
          </h1>
          <p
            style={{
              fontSize: 30,
              fontWeight: 500,
              color: "#3B4252",
              lineHeight: 1.4,
              marginTop: 28,
              maxWidth: 1000,
            }}
          >
            Enterprise websites, software, mobile apps, bulk SMS & call center solutions — built to scale your business.
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
          <span style={{ fontSize: 24, fontWeight: 700, color: accent }}>
            anastechsolutions.com
          </span>
          <span style={{ fontSize: 18, color: "#6B7280", fontWeight: 600 }}>
            Dhaka, Bangladesh · 80+ Clients · 10+ Countries
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
