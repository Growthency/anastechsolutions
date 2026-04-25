import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/data/posts";

// Image metadata
export const alt = "AnasTech Solutions Blog Article";
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
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "AnasTech Solutions Blog";
  const excerpt =
    post?.excerpt ??
    "Expert articles on web development, mobile apps, SMS marketing & business growth.";
  const category = post?.category ?? "Insights";
  const author = post?.author ?? "AnasTech Solutions";
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

          {/* Category pill */}
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
            {category}
          </div>
        </div>

        {/* Middle — title + excerpt */}
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
              fontSize: 64,
              fontWeight: 800,
              color: "#0B0B0F",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: -1.5,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#3B4252",
              lineHeight: 1.4,
              marginTop: 24,
              maxWidth: 1000,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
        </div>

        {/* Bottom — author + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid #E5E7EB",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "linear-gradient(135deg, #0F75BC 0%, #ED1C24 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              {author[0]?.toUpperCase() ?? "A"}
            </div>
            <span style={{ fontSize: 20, color: "#0B0B0F", fontWeight: 700 }}>
              {author}
            </span>
          </div>
          <span style={{ fontSize: 22, fontWeight: 700, color: accent }}>
            anastechsolutions.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
