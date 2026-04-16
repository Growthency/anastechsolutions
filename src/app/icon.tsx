import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
          <polygon points="20,2 38,34 2,34" fill="#ED1C24" opacity="0.9" />
          <polygon points="20,10 35,36 5,36" fill="#0F75BC" opacity="0.85" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
