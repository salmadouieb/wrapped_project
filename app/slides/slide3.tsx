"use client";
import { useEffect, useState } from "react";

const DELAYS = [300, 1800];

export default function Slide03() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = DELAYS.map((delay, i) =>
      setTimeout(() => setPhase(i + 1), delay)
    );
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
      <div style={{ maxWidth: "720px", width: "100%", textAlign: "center" }}>
        <p
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#ff6b6b",
            lineHeight: 1.2,
            margin: 0,
            marginBottom: "1.5rem",
            ...show(1),
          }}
        >
          Another year come and gone.
        </p>

        <p
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#ff6b6b",
            lineHeight: 1.2,
            margin: 0,
            ...show(2),
          }}
        >
          Let's take a look back at some eras from this year.
        </p>
      </div>
    </div>
  );
}
