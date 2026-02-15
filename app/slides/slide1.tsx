"use client";
import { useEffect, useState } from "react";

export default function Slide01() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Circular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "800px" }}>
        {/* Line 1 — big bold headline */}
        <p
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: "1.5rem",
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          It's been a big year for us.
        </p>

        {/* Line 2 — lighter follow-up */}
        <p
          style={{
            fontSize: "clamp(1.2rem, 3vw, 2rem)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.4,
            margin: 0,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          And as physicists we know that numbers never lie.
        </p>
      </div>
    </div>
  );
}
