import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon uy tin: nen cream, khung tron muc, chu T (Tinh/Thue). */
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
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            background: "#1C1A17",
            color: "#ECE3D0",
            fontSize: 16,
            fontWeight: 700,
            fontFamily:
              "system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size },
  );
}
