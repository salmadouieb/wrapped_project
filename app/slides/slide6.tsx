"use client";
import { useEffect, useState } from "react";

export default function Slide06() {
  const images = [
    "/images/slide6_1.jpg",
    "/images/slide6_2.jpg",
    "/images/slide6_3.jpg",
    "/images/slide6_4.jpg",
    "/images/slide6_5.jpg",
    "/images/slide6_6.jpg",
  ];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);  // title
    const t2 = setTimeout(() => setPhase(2), 1600); // arrow + caption
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const show = (p: number) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div className="h-screen bg-black px-6 py-8">
      <div className="mx-auto h-full w-full max-w-6xl grid grid-rows-[auto_1fr] gap-6">

        {/* Title */}
        <h1
          className="text-center text-4xl md:text-5xl font-black text-white"
          style={{ ...show(1), fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          The ULTRA fun bike ride!!!
        </h1>

        {/* Collage + annotation layer */}
        <div className="relative min-h-0">
          <div className="h-full grid grid-cols-3 grid-rows-2 gap-6">
            {images.slice(0, 6).map((src) => (
              <div
                key={src}
                className="rounded-2xl overflow-hidden bg-zinc-900 ring-1 ring-white/10 shadow-sm"
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Arrow + caption pointing at top-left photo (slide6_1) */}
          <div
            style={{
              position: "absolute",
              // sits just below the top-left cell, shifted right so arrow points up-left into the photo
              top: "38%",
              left: "12%",
              ...show(2),
              pointerEvents: "none",
            }}
          >
            {/* SVG arrow curving up-left toward the photo */}
            <svg
              width="90"
              height="80"
              viewBox="0 0 90 80"
              fill="none"
              style={{ display: "block", marginBottom: "-4px" }}
            >
              <path
                d="M80 70 C60 60, 20 40, 10 10"
                stroke="#ff6b6b"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Arrowhead */}
              <path
                d="M10 10 L18 22 M10 10 L22 14"
                stroke="#ff6b6b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                fontWeight: 700,
                color: "#ff6b6b",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              how could I not fall for this cutie!!!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
