"use client";

import { useEffect, useRef, useState } from "react";
import { SLIDES } from "./slides";

type Stage = "gate" | "intro" | "nope" | "slides";

type SlideAudio = {
  src: string;
  startAt?: number;
  loop?: boolean;
};

export default function Home() {
  const INTRO_AUDIO = "/audio/The Fratellis - Whistle For The Choir.mp3";

  const AUDIO_BY_SLIDE: Record<number, SlideAudio> = {
    1: {
      src: "/audio/Jim Croce - Operator (Thats Not the Way It Feels) [Official Music Video].mp3",
      startAt: 15,
      loop: true,
    },
    2: {
      src: "/audio/Jim Croce - Operator (Thats Not the Way It Feels) [Official Music Video].mp3",
      loop: true,
    },
    3: { src: "/audio/The Marías  Sienna.mp3", startAt: 52, loop: true },
    4: {
      src: "/audio/Red Hot Chili Peppers - Otherside [Official Music Video].mp3",
      startAt: 78,
      loop: true,
    },
    5: { src: "/audio/rain-sound.mp3", startAt: 0, loop: true },
    6: { src: "/audio/Franz Ferdinand - Take Me Out (Video).mp3", startAt: 2, loop: true },
    7: { src: "/audio/Franz Ferdinand - Take Me Out (Video).mp3", loop: true },
    8: { src: "/audio/ringtone.mp3", startAt: 0, loop: false },
    9: {
      src: "/audio/Bob Dylan - Don't Think Twice, It's All Right (Official Audio).mp3",
      startAt: 6,
      loop: true,
    },
    10: { src: "/audio/level-up.mp3", startAt: 0, loop: false },
    11: { src: "/audio/The Strokes - Reptilia (Official HD Video).mp3", startAt: 20, loop: true },
    12: { src: "/audio/The Black Keys - Lonely Boy [Official Music Video].mp3", startAt: 63, loop: true },
    13: { src: "/audio/Girl (Remastered 2009).mp3", startAt: 0, loop: true },
    14: { src: "/audio/Cage The Elephant - Cigarette Daydreams (Lyrics).mp3", startAt: 18, loop: true },
    15: { src: "/audio/I Am The Walrus (Remastered 2009).mp3", startAt: 54, loop: true },
    16: { src: "/audio/I Am The Walrus (Remastered 2009).mp3", loop: true },
    17: {
      src: "/audio/Dire Straits - Sultans Of Swing (Official Music Video).mp3",
      startAt: 1,
      loop: true,
    },
    18: { src: "/audio/@coldplay  - Sparks (Lyrics).mp3", startAt: 28, loop: true },
    19: { src: "/audio/@coldplay  - Sparks (Lyrics).mp3", loop: true },
  };

  const TOTAL_SLIDES = SLIDES.length;

  const [stage, setStage] = useState<Stage>("gate");
  const [slide, setSlide] = useState(1);

  // -------------------------------------------------------
  // Scroll: one intentional scroll = one slide change
  // Uses accumulated delta with a threshold + cooldown
  // -------------------------------------------------------
  const accDeltaRef = useRef(0);
  const cooldownRef = useRef(false);
  const DELTA_THRESHOLD = 80;   // px of scroll needed to trigger
  const COOLDOWN_MS = 900;      // ms before next slide change allowed

  // -------------------------------------------------------
  // Touch / swipe tracking
  // -------------------------------------------------------
  const touchStartYRef = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 50; // px of vertical swipe needed to trigger

  // -------------------------------------------------------
  // Audio
  // -------------------------------------------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const currentTrackRef = useRef<string | null>(null);

  const clearFadeTimer = () => {
    if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = null;
  };

  const fadeTo = (targetVolume: number, ms: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFadeTimer();
    const steps = 20;
    const interval = Math.max(10, Math.floor(ms / steps));
    const start = audio.volume;
    const delta = (targetVolume - start) / steps;
    let i = 0;
    fadeTimerRef.current = window.setInterval(() => {
      i += 1;
      const next = Math.min(1, Math.max(0, start + delta * i));
      audio.volume = next;
      if (i >= steps) {
        clearFadeTimer();
        audio.volume = targetVolume;
      }
    }, interval);
  };

  const playTrack = async (
    src: string,
    opts: { loop?: boolean; startAt?: number } = {}
  ) => {
    const { loop = true, startAt } = opts;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;
    const isSameTrack = currentTrackRef.current === src && !audio.paused;

    if (isSameTrack && startAt === undefined) return;

    if (!isSameTrack) fadeTo(0, 180);

    window.setTimeout(async () => {
      if (!audioRef.current) return;
      if (!isSameTrack) {
        currentTrackRef.current = src;
        audioRef.current.src = src;
        audioRef.current.loop = loop;
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.loop = loop;
      }
      if (startAt !== undefined) {
        try { audioRef.current.currentTime = startAt; } catch { /* ignore */ }
      }
      try {
        await audioRef.current.play();
        fadeTo(1, 250);
      } catch { /* blocked until user gesture */ }
    }, isSameTrack ? 0 : 200);
  };

  const playIntroAudio = async () => {
    await playTrack(INTRO_AUDIO, { loop: true, startAt: 10 });
  };

  const playSlideAudio = async (slideNumber: number) => {
    const cfg = AUDIO_BY_SLIDE[slideNumber];
    if (!cfg) return;
    await playTrack(cfg.src, { loop: cfg.loop ?? true, startAt: cfg.startAt });
  };

  // Helper: advance or retreat one slide (respects cooldown)
  const changeSlide = (direction: "next" | "prev") => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;

    setSlide((prev) => {
      if (direction === "next") return Math.min(prev + 1, TOTAL_SLIDES);
      return Math.max(prev - 1, 1);
    });

    window.setTimeout(() => {
      cooldownRef.current = false;
    }, COOLDOWN_MS);
  };

  // Wheel listener — fixed sensitivity
  useEffect(() => {
    if (stage !== "slides") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (cooldownRef.current) return;

      accDeltaRef.current += e.deltaY;

      if (Math.abs(accDeltaRef.current) >= DELTA_THRESHOLD) {
        const goingDown = accDeltaRef.current > 0;
        accDeltaRef.current = 0;
        changeSlide(goingDown ? "next" : "prev");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      accDeltaRef.current = 0;
      cooldownRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, TOTAL_SLIDES]);

  // Touch / swipe listener
  useEffect(() => {
    if (stage !== "slides") return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        // Swipe up (finger moves up) → deltaY positive → go to next slide
        changeSlide(deltaY > 0 ? "next" : "prev");
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      touchStartYRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, TOTAL_SLIDES]);

  useEffect(() => {
    if (stage !== "slides") return;
    playSlideAudio(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, stage]);

  useEffect(() => () => clearFadeTimer(), []);

  // -------------------------
  // Gate
  // -------------------------
  if (stage === "gate") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-xl text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black">
            Ready for your Valentine's gift?
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="rounded-lg bg-black px-6 py-3 text-white text-lg"
              onClick={async () => {
                await playIntroAudio();
                setStage("intro");
              }}
            >
              Yes 💘
            </button>
            <button
              className="rounded-lg border border-black px-6 py-3 text-black text-lg"
              onClick={() => setStage("nope")}
            >
              No 😐
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // Nope
  // -------------------------
  if (stage === "nope") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-6xl text-black">:(</div>
      </div>
    );
  }

  // -------------------------
  // Intro — redesigned
  // -------------------------
  if (stage === "intro") {
    return (
      <IntroScreen onStart={() => { setSlide(1); setStage("slides"); }} />
    );
  }

  // -------------------------
  // Slides
  // -------------------------
  const SlideComponent = SLIDES[slide - 1];
  return <SlideComponent />;
}

// -------------------------
// Intro screen component
// -------------------------
function IntroScreen({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const show = (p: number) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        gap: "0.5rem",
      }}
    >
      {/* "Salma and Luc" */}
      <p
        style={{
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          fontWeight: 700,
          color: "#f472b6",
          margin: 0,
          letterSpacing: "0.02em",
          ...show(1),
        }}
      >
        Salma and Luc's
      </p>

      {/* "Relationship Wrapped" */}
      <h1
        style={{
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 900,
          color: "#1ed760",
          margin: 0,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          textAlign: "center",
          ...show(2),
        }}
      >
        Relationship
        <br />
        Wrapped.
      </h1>

      {/* Button */}
      <div style={{ marginTop: "3rem", ...show(3) }}>
        <button
          onClick={onStart}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "1.1rem",
            padding: "0.9rem 2.5rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "transform 0.15s ease, background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f0f0f0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff";
          }}
        >
          Let's get started ✨
        </button>
      </div>
    </div>
  );
}