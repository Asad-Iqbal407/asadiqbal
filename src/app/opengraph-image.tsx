import { ImageResponse } from "next/og";

export const alt = "Asad Iqbal - Full Stack Developer & AI Enthusiast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f0a1f 0%, #2e1065 55%, #4c1d95 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c4b5fd",
            marginBottom: 24,
          }}
        >
          Portfolio
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800 }}>
          Asad Iqbal
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            marginTop: 24,
            color: "#e9d5ff",
          }}
        >
          Full Stack Developer &amp; AI Enthusiast
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 40,
            color: "#a78bfa",
          }}
        >
          Next.js · React · MERN · Flask · Machine Learning
        </div>
      </div>
    ),
    size
  );
}
