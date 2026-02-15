"use client";
import { useEffect, useState } from "react";

export default function Slide12() {
  const images = [
    "/images/slide12_4.jpg",
    "/images/slide12_5.jpg",
    "/images/slide12_3.jpg",
  ];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // title
      setTimeout(() => setPhase(2), 1200), // images
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
      <div className="mx-auto w-full max-w-6xl">

        {/* top divider */}
        <div className="mb-6 border-t border-white/15" style={show(1)} />

        {/* title */}
        <h1
          className="text-center text-5xl md:text-6xl font-black text-pink-500 mb-10"
          style={show(1)}
        >
          And the best birthday celebration EVER!
        </h1>

        {/* collage row */}
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

          {/* left image */}
          <div className="md:w-[32%]" style={show(2)}>
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-white/10">
              <img
                src={images[0]}
                alt=""
                className="w-full h-[420px] object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* center image */}
          <div className="md:w-[36%] md:-mt-6" style={{ ...show(2), transitionDelay: "0.15s" }}>
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-white/10">
              <img
                src={images[1]}
                alt=""
                className="w-full h-[460px] object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* right image */}
          <div className="md:w-[28%] md:mt-6" style={{ ...show(2), transitionDelay: "0.3s" }}>
            <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-white/10">
              <img
                src={images[2]}
                alt=""
                className="w-full h-[380px] object-cover"
                draggable={false}
              />
            </div>
          </div>

        </div>

        {/* bottom divider */}
        <div className="mt-12 border-t border-pink-500" style={show(2)} />

      </div>
    </div>
  );
}
