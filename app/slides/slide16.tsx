"use client";
import { useEffect, useState } from "react";

export default function Slide16() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // "Our relationship age"
      setTimeout(() => setPhase(2), 1300), // "52"
      setTimeout(() => setPhase(3), 2300), // "It's giving old married couple..."
      setTimeout(() => setPhase(4), 3200), // "In a good way!"
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
      <div style={{ maxWidth: "700px", width: "100%", textAlign: "center" }}>

        {/* "Our relationship age" */}
        <p
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
            fontWeight: 700,
            color: "#f472b6",
            margin: 0,
            marginBottom: "0.5rem",
            letterSpacing: "0.02em",
            ...show(1),
          }}
        >
          Our relationship age is...
        </p>

        {/* Big 52 */}
        <p
          style={{
            fontSize: "clamp(7rem, 20vw, 14rem)",
            fontWeight: 900,
            color: "#1ed760",
            lineHeight: 1,
            margin: 0,
            marginBottom: "1rem",
            ...show(2),
          }}
        >
          52
        </p>

        {/* "It's giving old married couple..." */}
        <p
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.3,
            margin: 0,
            marginBottom: "0.5rem",
            ...show(3),
          }}
        >
          It's giving old married couple…
        </p>

        {/* "In a good way!" */}
        <p
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.3,
            margin: 0,
            ...show(4),
          }}
        >
          In a good way!
        </p>

      </div>
    </div>
  );
}
