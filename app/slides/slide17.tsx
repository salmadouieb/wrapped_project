"use client";
import { useEffect, useState } from "react";

export default function Slide17() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // "And finally"
      setTimeout(() => setPhase(2), 1100),  // "Boyfriend of the year..."
      setTimeout(() => setPhase(3), 2000),  // image
      setTimeout(() => setPhase(4), 2900),  // name
      setTimeout(() => setPhase(5), 3600),  // "most kind"
      setTimeout(() => setPhase(6), 4200),  // "most handsome"
      setTimeout(() => setPhase(7), 4800),  // "most loving"
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: number, delay = "0s") => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.6s ease ${delay}, transform 0.6s ease ${delay}`,
  });

  return (
    <div className="h-screen bg-black px-8 py-8" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      <div className="mx-auto h-full w-full max-w-6xl grid grid-rows-[auto_1fr_auto] gap-6">

        {/* Top text */}
        <div>
          <div
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "#f472b6", ...show(1) }}
          >
            And finally
          </div>
          <div
            className="mt-3 text-4xl md:text-5xl font-black text-white"
            style={show(2)}
          >
            Boyfriend of the year award goes to:
          </div>
        </div>

        {/* Image */}
        <div className="min-h-0 flex items-center justify-center" style={show(3)}>
          <div className="rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-lg bg-zinc-900">
            <img
              src="/images/slide17.jpg"
              alt=""
              className="block max-w-full max-h-[50vh] w-auto h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center pb-2">
          <div
            className="text-4xl md:text-6xl font-black"
            style={{ color: "#1ed760", ...show(4) }}
          >
            Luc Bojorquez-Lopez
          </div>
          <div className="mt-3 space-y-1 text-lg md:text-2xl">
            <div style={{ color: "#fb923c", fontWeight: 700, ...show(5) }}>
              For being the MOST kind
            </div>
            <div style={{ color: "#a78bfa", fontWeight: 700, ...show(6) }}>
              For being the MOST handsome
            </div>
            <div style={{ color: "#60a5fa", fontWeight: 700, ...show(7) }}>
              For being the MOST loving
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
