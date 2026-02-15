"use client";
import { useEffect, useState } from "react";

export default function Slide09() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // title
      setTimeout(() => setPhase(2), 1200),  // cat + letters
      setTimeout(() => setPhase(3), 2200),  // main text
      setTimeout(() => setPhase(4), 3200),  // scrabble + caption
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: number, extraStyle?: React.CSSProperties) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
    ...extraStyle,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        padding: "2.5rem",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        gap: "2rem",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 900,
          color: "#60a5fa",
          margin: 0,
          ...show(1),
        }}
      >
        Our long, long distance era
      </h1>

      {/* Main content row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          flex: 1,
          alignItems: "center",
        }}
      >
        {/* LEFT: crying cat */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "100%",
              maxWidth: "340px",
              aspectRatio: "1",
              borderRadius: "1rem",
              overflow: "hidden",
              ...show(2),
            }}
          >
            <img
              src="/images/crying_cat.jpg"
              alt="crying cat"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              draggable={false}
            />
          </div>
        </div>

        {/* RIGHT: letters + text + scrabble */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Stacked letters visual */}
          <div style={{ position: "relative", height: "100px", ...show(2) }}>
            {["-6deg", "2deg", "8deg"].map((rot, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${i * 18}px`,
                  top: `${i * 4}px`,
                  width: "80px",
                  height: "60px",
                  backgroundColor: "transparent",
                  border: "2px solid #60a5fa",
                  borderRadius: "4px",
                  transform: `rotate(${rot})`,
                  opacity: 0.7 + i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Text */}
          <p
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 700,
              color: "#60a5fa",
              lineHeight: 1.4,
              margin: 0,
              ...show(3),
            }}
          >
            Exchanging love letters, yearning the way god intended.
          </p>

          {/* Scrabble + caption */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.2rem",
              ...show(4),
            }}
          >
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "0.75rem",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src="/images/scrabble.jpg"
                alt="scrabble"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                draggable={false}
              />
            </div>
            <p
              style={{
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                fontWeight: 700,
                color: "#60a5fa",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              And lots of scrabble.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
