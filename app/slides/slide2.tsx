"use client";
import { useEffect, useState } from "react";

const ACCENT = "#1ed760"; // Spotify green for the numbers

const items = [
  { number: "9,912", label: "miles travelled" },
  { number: "43,864", label: "minutes cuddling" },
  { number: "460", label: "phone calls" },
];

const DELAYS = [300, 1100, 2000, 2800, 3700, 4500, 5400];

export default function Slide02() {
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
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem 3rem",
      }}
    >
      {/* Stats list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {items.map((item, i) => (
          <div
            key={item.number}
            style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", flexWrap: "nowrap" }}
          >
            {/* Number */}
            <span
              style={{
                ...show(i * 2 + 1),
                color: ACCENT,
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontWeight: 900,
                whiteSpace: "nowrap",
              }}
            >
              {item.number}
            </span>

            {/* Label */}
            <span
              style={{
                ...show(i * 2 + 2),
                color: "#fff",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Final sentence */}
      <p
        style={{
          ...show(7),
          color: "#ccc",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          marginTop: "2.5rem",
          whiteSpace: "nowrap",
        }}
      >
        Those numbers <em>are</em> pretty big (like, bigger than 10)
      </p>
    </div>
  );
}

