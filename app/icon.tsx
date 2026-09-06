import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: may tinh cam tay (cream / ink). */
export default function Icon() {
  const btn = {
    width: 4,
    height: 3,
    borderRadius: 1,
    background: "#ECE3D0",
  } as const;
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
            width: 20,
            height: 26,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            background: "#1C1A17",
            paddingTop: 3,
            paddingBottom: 2,
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <div
            style={{
              width: 16,
              height: 6,
              borderRadius: 1,
              background: "#ECE3D0",
              marginBottom: 2,
              opacity: 0.95,
            }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: 16,
              gap: 1,
              justifyContent: "space-between",
            }}
          >
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
            <div style={btn} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
