import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          borderRadius: 36,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 38,34 2,34" fill="#ED1C24" opacity="0.9" />
          <polygon points="20,10 35,36 5,36" fill="#0F75BC" opacity="0.85" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
