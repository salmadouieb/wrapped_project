"use client";

import { useEffect, useRef, useState } from "react";
import { SLIDES } from "./slides";

type Stage = "gate" | "intro" | "nope" | "slides";

type SlideAudio = {
  src: string;
  startAt?: number; // seconds
  loop?: boolean;
};

export default function Home() {
  // -----------------------
  // Audio configuration
  // -----------------------
  const INTRO_AUDIO = "/audio/The Fratellis - Whistle For The Choir.mp3";

  const AUDIO_BY_SLIDE: Record<number, SlideAudio> = {
    // Operator: you asked for first line -> start at 0
    1: {
      src: "/audio/Jim Croce - Operator (Thats Not the Way It Feels) [Official Music Video].mp3",
      startAt: 15,
      loop: true,
    },
    // Same track consecutively -> omit startAt to keep continuous
    2: {
      src: "/audio/Jim Croce - Operator (Thats Not the Way It Feels) [Official Music Video].mp3",
      loop: true,
    },

    // These are best-guess “nice entry points” — tweak as you like
    3: { src: "/audio/The Marías  Sienna.mp3", startAt: 52, loop: true },
    4: {
      src: "/audio/Red Hot Chili Peppers - Otherside [Official Music Video].mp3",
      startAt: 78,
      loop: true,
    },

    // ambience: start at 0 is fine
    5: { src: "/audio/rain-sound.mp3", startAt: 0, loop: true },

    6: { src: "/audio/Franz Ferdinand - Take Me Out (Video).mp3", startAt: 2, loop: true },
    // Same track consecutively -> omit startAt to keep continuous
    7: { src: "/audio/Franz Ferdinand - Take Me Out (Video).mp3", loop: true },

    // sound effect: do not loop
    8: { src: "/audio/ringtone.mp3", startAt: 0, loop: false },

    9: {
      src: "/audio/Bob Dylan - Don't Think Twice, It's All Right (Official Audio).mp3",
      startAt: 6,
      loop: true,
    },

    // sound effect: do not loop
    10: { src: "/audio/level-up.mp3", startAt: 0, loop: false },

    11: { src: "/audio/The Strokes - Reptilia (Official HD Video).mp3", startAt: 20, loop: true },
    12: { src: "/audio/The Black Keys - Lonely Boy [Official Music Video].mp3", startAt: 63, loop: true },

    13: { src: "/audio/Girl (Remastered 2009).mp3", startAt: 0, loop: true },
    14: { src: "/audio/Cage The Elephant - Cigarette Daydreams (Lyrics).mp3", startAt: 18, loop: true },

    15: { src: "/audio/I Am The Walrus (Remastered 2009).mp3", startAt: 54, loop: true },
    // Same track consecutively -> omit startAt to keep continuous
    16: { src: "/audio/I Am The Walrus (Remastered 2009).mp3", loop: true },

    // Sultans of Swing: you asked for guitar solo.
    // I cannot hear your exact file, so this is an estimate; tweak this number.
    17: {
      src: "/audio/Dire Straits - Sultans Of Swing (Official Music Video).mp3",
      startAt: 1, // 
      loop: true,
    },

    18: { src: "/audio/@coldplay  - Sparks (Lyrics).mp3", startAt: 28, loop: true },
    // Same track consecutively -> omit startAt to keep continuous
    19: { src: "/audio/@coldplay  - Sparks (Lyrics).mp3", loop: true },
  };

  const TOTAL_SLIDES = SLIDES.length;

  // -----------------------
  // Stages
  // -----------------------
  const [stage, setStage] = useState<Stage>("gate");
  const [slide, setSlide] = useState(1);

  // -----------------------
  // Scroll control (one gesture = one slide)
  // -----------------------
  const lockedRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);
  const QUIET_MS = 140;

  // -----------------------
  // Audio control
  // -----------------------
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  // Track what we intended to play (avoids URL encoding issues)
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
      audioRef.current.volume = 0; // fade in
    }

    const audio = audioRef.current;

    const isSameTrack = currentTrackRef.current === src && !audio.paused;

    // ✅ If same track and no explicit startAt, keep continuous playback
    if (isSameTrack && startAt === undefined) return;

    // Fade out only if changing tracks
    if (!isSameTrack) fadeTo(0, 180);

    window.setTimeout(async () => {
      if (!audioRef.current) return;

      // Change src only if track changed
      if (!isSameTrack) {
        currentTrackRef.current = src;
        audioRef.current.src = src;
        audioRef.current.loop = loop;
        audioRef.current.currentTime = 0;
      } else {
        // same track but we DO want a jump (because startAt is set)
        audioRef.current.loop = loop;
      }

      // Seek to desired starting point if provided
      if (startAt !== undefined) {
        try {
          audioRef.current.currentTime = startAt;
        } catch {
          // ignore
        }
      }

      try {
        await audioRef.current.play();
        fadeTo(1, 250);
      } catch {
        // blocked until a user gesture; your gate "Yes" click unlocks it
      }
    }, isSameTrack ? 0 : 200);
  };

  const playIntroAudio = async () => {
    await playTrack(INTRO_AUDIO, { loop: true, startAt: 10 });
  };

  const playSlideAudio = async (slideNumber: number) => {
    const cfg = AUDIO_BY_SLIDE[slideNumber];
    if (!cfg) return;

    await playTrack(cfg.src, {
      loop: cfg.loop ?? true,
      startAt: cfg.startAt,
    });
  };

  // Wheel listener only during slideshow
  useEffect(() => {
    if (stage !== "slides") return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (lockedRef.current) {
        if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = window.setTimeout(() => {
          lockedRef.current = false;
        }, QUIET_MS);
        return;
      }

      lockedRef.current = true;

      const goingDown = event.deltaY > 0;

      setSlide((prev) => {
        if (goingDown) return Math.min(prev + 1, TOTAL_SLIDES);
        return Math.max(prev - 1, 1);
      });

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
  }, [stage, TOTAL_SLIDES]);

  // When slide changes, update audio (only during slides)
  useEffect(() => {
    if (stage !== "slides") return;
    playSlideAudio(slide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide, stage]);

  useEffect(() => {
    return () => clearFadeTimer();
  }, []);

  // -------------------------
  // Stage 1: Gate
  // -------------------------
  if (stage === "gate") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-xl text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black">
            Ready for your Valentine’s gift?
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
  // Stage 2: Sad face
  // -------------------------
  if (stage === "nope") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="text-6xl text-black">:(</div>
      </div>
    );
  }

  // -------------------------
  // Stage 3: Real intro screen (music already playing)
  // -------------------------
  if (stage === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black px-6">
        <div className="w-full max-w-xl text-center space-y-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white">
            Okay. One last thing…
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Scroll through this like a little story.
          </p>

          <button
            className="rounded-lg bg-black px-6 py-3 text-white text-lg"
            onClick={() => {
              setSlide(1);
              setStage("slides");
            }}
          >
            Start ✨
          </button>
        </div>
      </div>
    );
  }

  // -------------------------
  // Stage 4: Slides
  // -------------------------
  const SlideComponent = SLIDES[slide - 1];
  return <SlideComponent />;
}






