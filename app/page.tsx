"use client";

import { useEffect, useRef, useState } from "react";
import { SLIDES } from "./slides";

export default function Home() {
  const TOTAL_SLIDES = 19;

  const [started, setStarted] = useState(false);
  const [slide, setSlide] = useState(1); // slides are 1..19 (intro is separate)

  // One swipe gesture = one slide.
  // Advance once, then ignore wheel events until scrolling is quiet for QUIET_MS.
  const lockedRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

  const QUIET_MS = 220;

  useEffect(() => {
    if (!started) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      // If locked, keep extending the unlock timer and do nothing else
      if (lockedRef.current) {
        if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = window.setTimeout(() => {
          lockedRef.current = false;
        }, QUIET_MS);
        return;
      }

      // Lock on first wheel event in the gesture
      lockedRef.current = true;

      const goingDown = event.deltaY > 0;

      setSlide((prev) => {
        if (goingDown) return Math.min(prev + 1, TOTAL_SLIDES);
        return Math.max(prev - 1, 1);
      });

      // Unlock only after wheel events stop for QUIET_MS
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = window.setTimeout(() => {
        lockedRef.current = false;
      }, QUIET_MS);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel as any);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      lockedRef.current = false;
    };
  }, [started]);

  // ----- Intro (NOT counted as a slide) -----
  if (!started) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        <button
          className="rounded-lg bg-black px-6 py-3 text-white text-lg"
          onClick={() => {
            setStarted(true);
            setSlide(1);
          }}
        >
          Start
        </button>
      </div>
    );
  }

  // Pick the correct slide component (slide is 1..19)
  const SlideComponent = SLIDES[slide - 1];

  return <SlideComponent />;
}





