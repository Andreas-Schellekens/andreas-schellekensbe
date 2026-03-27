"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "incoming" | "impact" | "recover";

const STRATAGEM_SEQUENCE = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowDown", "ArrowDown"] as const;

export default function HelldiverEasterEgg() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [runKey, setRunKey] = useState(0);

  const progressRef = useRef(0);
  const activeRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const startBombSequence = () => {
    if (activeRef.current) return;

    activeRef.current = true;
    setRunKey((value) => value + 1);
    setPhase("incoming");

    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("impact");
        document.body.classList.add("helldiver-ui-distort");
      }, 1400),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("recover");
        document.body.classList.remove("helldiver-ui-distort");
      }, 2200),
    );

    timersRef.current.push(
      window.setTimeout(() => {
        setPhase("idle");
        activeRef.current = false;
      }, 2900),
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeRef.current) return;

      const expected = STRATAGEM_SEQUENCE[progressRef.current];
      const isCorrect = event.key === expected;

      if (isCorrect) {
        progressRef.current += 1;
        if (progressRef.current === STRATAGEM_SEQUENCE.length) {
          progressRef.current = 0;
          startBombSequence();
        }
        return;
      }

      progressRef.current = event.key === STRATAGEM_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);

    if (process.env.NODE_ENV !== "production") {
      // Subtle hint for developers.
      console.info("%c[Helldiver Hint]%c Try ArrowUp, ArrowRight, ArrowDown, ArrowDown, ArrowDown", "color:#93c5fd", "color:#cbd5e1");
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimers();
      document.body.classList.remove("helldiver-ui-distort");
    };
  }, []);

  if (phase === "idle") return null;

  const isShaking = phase === "incoming" || phase === "impact";

  return (
    <div
      key={runKey}
      className={`pointer-events-none fixed inset-0 z-[200] overflow-hidden ${isShaking ? "animate-[helldiver_camera_shake_150ms_linear_infinite]" : ""}`}
      aria-hidden
    >
      {phase === "incoming" ? (
        <>
          <div className="absolute inset-0 bg-slate-950/48 backdrop-blur-[1.2px]" />
          <div className="absolute inset-0 bg-white/90 animate-[helldiver_preflash_440ms_ease-out_forwards]" />

          <div className="absolute inset-0 grid place-items-center px-6">
            <p className="text-center text-3xl font-semibold tracking-[0.2em] text-amber-100 drop-shadow-[0_0_24px_rgba(251,191,36,0.7)] md:text-5xl">
              💣 500KG INCOMING
            </p>
          </div>

          <div className="absolute left-1/2 top-[58%] h-2 w-56 -translate-x-1/2 rounded-full bg-amber-200/60 blur-md animate-[helldiver_beacon_920ms_ease-in-out_infinite]" />
        </>
      ) : null}

      {phase === "impact" ? (
        <>
          <div className="absolute inset-0 bg-white animate-[helldiver_impact_flash_320ms_ease-out_forwards]" />
          <div className="absolute inset-0 bg-orange-400/12 mix-blend-screen" />

          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/70 blur-2xl animate-[helldiver_core_burst_760ms_ease-out_forwards]" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-50/90 animate-[helldiver_shockwave_900ms_ease-out_forwards]" />
          <div
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-100/65 animate-[helldiver_shockwave_900ms_ease-out_forwards]"
            style={{ animationDelay: "110ms" }}
          />

          {Array.from({ length: 10 }).map((_, index) => (
            <span
              key={`spark-${index}`}
              className="absolute left-1/2 top-1/2 h-1.5 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/90 animate-[helldiver_spark_620ms_ease-out_forwards]"
              style={{
                transform: `translate(-50%, -50%) rotate(${index * 36}deg)`,
                animationDelay: `${index * 24}ms`,
              }}
            />
          ))}
        </>
      ) : null}

      {phase === "recover" ? <div className="absolute inset-0 bg-slate-950/0 animate-[helldiver_fade_out_460ms_ease-out_forwards]" /> : null}
    </div>
  );
}
