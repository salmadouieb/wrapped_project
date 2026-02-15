"use client";
import { useEffect, useState } from "react";

export default function Slide15() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: number) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "760px", width: "100%", textAlign: "center" }}>
        <p
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#f472b6",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: "1.5rem",
            ...show(1),
          }}
        >
          They say age is just a number.
        </p>

        <p
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#f472b6",
            lineHeight: 1.2,
            margin: 0,
            ...show(2),
          }}
        >
          So while the calendar might say a year…
        </p>
      </div>
    </div>
  );
}
