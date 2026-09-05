import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: cream/ink "L$" mark matching brand colors. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ECE3D0",
          color: "#1C1A17",
          fontSize: 15,
          fontWeight: 700,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        L$
      </div>
    ),
    { ...size },
  );
}
