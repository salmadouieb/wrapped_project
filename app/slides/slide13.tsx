"use client";

import { useEffect, useMemo, useState } from "react";

type Tile = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  z: number;
};

export default function Slide13() {
  const images = [
    "/images/slide13_1.jpg",
    "/images/slide13_2.jpg",
    "/images/slide13_3.jpg",
    "/images/slide13_4.jpg",
    "/images/slide13_5.jpg",
    "/images/slide13_6.jpg",
    "/images/slide13_7.jpg",
    "/images/slide13_8.jpg",
  ];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),  // title
      setTimeout(() => setPhase(2), 1200), // photos
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const tiles: Tile[] = useMemo(
    () => [
      { x: 6,  y: 8,  w: 22, h: 30, r: -6, z: 1, src: "" },
      { x: 26, y: 4,  w: 24, h: 34, r:  3, z: 3, src: "" },
      { x: 52, y: 6,  w: 20, h: 28, r: -4, z: 2, src: "" },
      { x: 72, y: 10, w: 22, h: 30, r:  5, z: 1, src: "" },
      { x: 4,  y: 42, w: 23, h: 32, r:  4, z: 2, src: "" },
      { x: 28, y: 44, w: 22, h: 30, r: -3, z: 4, src: "" },
      { x: 50, y: 38, w: 21, h: 30, r:  2, z: 3, src: "" },
      { x: 70, y: 46, w: 24, h: 34, r: -5, z: 2, src: "" },
    ],
    []
  );

  const placed = useMemo(() => {
    return images.map((src, i) => {
      const t = tiles[i % tiles.length];
      return { ...t, src };
    });
  }, [images, tiles]);

  return (
    <div className="min-h-screen bg-black px-8 py-12 flex flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-6xl">

        {/* Title */}
        <h1
          className="text-center text-5xl md:text-6xl font-black text-pink-500 mb-10"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          There was a lot to be thankful for...
        </h1>

        {/* Collage canvas */}
        <div className="relative w-full h-[600px]">
          {placed.map((t, idx) => (
            <div
              key={t.src + idx}
              className="absolute"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.w}%`,
                height: `${t.h}%`,
                transform: phase >= 2
                  ? `rotate(${t.r}deg)`
                  : `rotate(${t.r}deg) translateY(30px)`,
                zIndex: t.z,
                opacity: phase >= 2 ? 1 : 0,
                transition: `opacity 0.6s ease, transform 0.6s ease`,
                transitionDelay: `${idx * 0.08}s`,
              }}
            >
              <div className="h-full w-full rounded-2xl overflow-hidden bg-white p-2 shadow-2xl">
                <img
                  src={t.src}
                  alt=""
                  className="h-full w-full object-cover rounded-xl"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
