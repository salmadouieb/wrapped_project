"use client";
import { useEffect, useState } from "react";

export default function Slide10() {
  const image = "/images/slide10.jpg";
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // top text
      setTimeout(() => setPhase(2), 1200), // image
      setTimeout(() => setPhase(3), 2200), // bottom text
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: number) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 0.7s ease, transform 0.7s ease",
  });

  return (
    <div className="min-h-screen bg-black px-6 py-10">
      <div className="mx-auto w-full max-w-5xl flex flex-col items-center">

        {/* top text */}
        <div className="mb-10 w-full" style={show(1)}>
          <p className="text-center text-4xl md:text-5xl font-black text-white">
            But after not long, we were reunited!!
          </p>
        </div>

        {/* main image */}
        <div className="w-full flex justify-center mb-12" style={show(2)}>
          <div className="rounded-2xl bg-zinc-900 ring-1 ring-white/10 shadow-sm overflow-hidden">
            <img
              src={image}
              alt=""
              className="max-h-[520px] w-auto object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* bottom divider */}
        <div className="w-full border-t border-white/10 mb-6" style={show(3)} />

        {/* bottom text */}
        <p className="text-center text-3xl md:text-4xl font-black text-pink-500" style={show(3)}>
          And had many, many fun dates together
        </p>

      </div>
    </div>
  );
}
