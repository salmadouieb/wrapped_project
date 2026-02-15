"use client";

import { useMemo, useState, useEffect, useRef } from "react";

type Note = {
  id: string;
  tabTitle: string;
  noteTitle: string;
  body: string;
};

export default function Slide19() {
  const notes: Note[] = useMemo(
    () => [
      {
        id: "note-1",
        tabTitle: "File 1",
        noteTitle: "Salma's favorite things about Luc",
        body: `I love lots and lots of things about you. But there are some I want you to remember the most! I love that you're super surious about life, and want to do great things, I love that you make the prettiest flower bouquets, I love that you love cats, and I love your smile.`,
      },
      {
        id: "note-2",
        tabTitle: "File 2",
        noteTitle: "Most romantic memory",
        body: `After thanksgiving lunch, we were in my room in Cumberland just listening to music, hugging, sort of swaying along. I don't even really remember what we were listening to, but I remember thinking to myself that I have never felt so loved and so safe. I think I could've stayed in that moment forever.`,
      },
      {
        id: "note-3",
        tabTitle: "File 3",
        noteTitle: "Top Luc W",
        body: `Sometimes your timing is impeccable, like the time when we sprinted to the record store, we needed to get back before your swipe access was disabled. I thought we wouldn't make it, but not only did we get the record, we returned with just 2 minuted to spaer!`,
      },
      {
        id: "note-4",
        tabTitle: "File 4",
        noteTitle: "Top movie moments",
        body: `One thing we've done a lot of is movie watching. Let's take a look back at some of the most memorable movie moments of the year. Firstly, we have the korean sex movie... what the actual fuck was that! Remember when we had our big movie marathon and trader joes snakcs, the movie about the gradfather, the Anthony Hopkins movie. I mean that was also crazy. And the movie with the guy who was getting with the older woman in the town who was a total bitch and he ended up killing her! Or the mexican road trip movie. Somehow we've watched some very sex oriented movies over our time! Excited to watch all the movies in the world with you! Every month for the rest of our lives!`,
      },
      {
        id: "note-5",
        tabTitle: "File 5",
        noteTitle: "Top Salma W",
        body: `I got in to grad school! Hehe... I couldn't have done it without you cheering me on the whole time, and encouraging me to email professors to work for them. I remember when I pitched you the idea in the first place, saying that I think I am going to email some professors at Johns Hopkins and The University of Maryland, and how you helped me look into them. I remember how I was so close to not doing it because I thought it wouldn't work out, and you encouraging me to! Imagine if I hadn't!`,
      },
    ],
    []
  );

  const accentColors = ["#f472b6", "#a78bfa", "#34d399", "#fb923c", "#60a5fa"];

  const [openId, setOpenId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isHoveringStack, setIsHoveringStack] = useState(false);
  const [phase, setPhase] = useState(0);
  const stackRef = useRef<HTMLDivElement>(null);

  const openNote = notes.find((n) => n.id === openId) ?? null;
  const openNoteIdx = notes.findIndex((n) => n.id === openId);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (openId) {
      requestAnimationFrame(() => setModalVisible(true));
    } else {
      setModalVisible(false);
    }
  }, [openId]);

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => setOpenId(null), 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stackRef.current) return;
    const rect = stackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const idx = Math.min(Math.floor(pct * notes.length), notes.length - 1);
    setHoveredIdx(idx);
  };

  const getCardStyle = (idx: number): React.CSSProperties => {
    const total = notes.length;
    const isActive = hoveredIdx === idx;

    if (!isHoveringStack) {
      const stackOffset = idx * 5;
      const stackRotation = (idx - (total - 1) / 2) * 4;
      return {
        position: "absolute",
        width: "260px",
        height: "340px",
        bottom: 0,
        left: "50%",
        transform: `translateX(-50%) translateY(-${stackOffset}px) rotate(${stackRotation}deg)`,
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        cursor: "pointer",
        zIndex: idx,
        boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
      };
    }

    const spread = 85;
    const totalWidth = spread * (total - 1);
    const xOffset = idx * spread - totalWidth / 2;
    const rotDeg = (idx - (total - 1) / 2) * 9;
    const yLift = isActive ? -36 : 0;
    const scale = isActive ? 1.07 : 1;

    return {
      position: "absolute",
      width: "260px",
      height: "340px",
      bottom: 0,
      left: "50%",
      transform: `translateX(calc(-50% + ${xOffset}px)) translateY(${yLift}px) rotate(${rotDeg}deg) scale(${scale})`,
      transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
      cursor: "pointer",
      zIndex: isActive ? 100 : idx,
      boxShadow: isActive
        ? `0 24px 60px rgba(0,0,0,0.8), 0 0 0 2px ${accentColors[idx]}`
        : "0 8px 32px rgba(0,0,0,0.5)",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 2rem",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "5rem",
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          The Archives
        </h1>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.3)",
            fontWeight: 400,
          }}
        >

        </p>
      </div>

      {/* Card stack */}
      <div
        ref={stackRef}
        onMouseEnter={() => setIsHoveringStack(true)}
        onMouseLeave={() => {
          setIsHoveringStack(false);
          setHoveredIdx(null);
        }}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          width: "640px",
          height: "400px",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 0.7s ease 0.2s",
        }}
      >
        {notes.map((note, idx) => (
          <div
            key={note.id}
            style={getCardStyle(idx)}
            onClick={() => setOpenId(note.id)}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "3px",
                  borderRadius: "2px",
                  backgroundColor: accentColors[idx],
                  width: "40px",
                  marginBottom: "1.25rem",
                }}
              />

              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: accentColors[idx],
                    marginBottom: "0.5rem",
                  }}
                >
                  Archive {String(idx + 1).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  {note.noteTitle}
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.22)",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {note.body.slice(0, 80).replace(/\n/g, " ")}…
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openId && openNote && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={handleClose}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.88)",
              backdropFilter: "blur(8px)",
              opacity: modalVisible ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: "620px",
              backgroundColor: "#0d0d0d",
              borderRadius: "24px",
              border: `1px solid ${accentColors[openNoteIdx % accentColors.length]}50`,
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              padding: "2.5rem",
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div
              style={{
                height: "3px",
                width: "48px",
                borderRadius: "2px",
                backgroundColor: accentColors[openNoteIdx % accentColors.length],
                marginBottom: "1.5rem",
              }}
            />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: accentColors[openNoteIdx % accentColors.length],
                    marginBottom: "0.4rem",
                  }}
                >
                  Archive {String(openNoteIdx + 1).padStart(2, "0")}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                    fontWeight: 900,
                    color: "#fff",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {openNote.noteTitle}
                </h2>
              </div>

              <button
                onClick={handleClose}
                style={{
                  flexShrink: 0,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.07)", marginBottom: "1.75rem" }} />

            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.8)",
                margin: 0,
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: 400,
              }}
            >
              {openNote.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
