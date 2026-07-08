"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const PASSWORD = "saapje";
const HEART_PATH =
  "M150 270 C65 198 30 160 30 106 C30 65 62 38 101 38 C124 38 141 51 150 70 C159 51 176 38 199 38 C238 38 270 65 270 106 C270 160 235 198 150 270 Z";
const HEART_PATH_LENGTH = 980;
const HEART_CLIP_ID = "love-heart-clip";

const floatingHearts = [
  { symbol: "♡", left: "9%", top: "14%", size: "1.1rem", delay: 0.1, duration: 8.8 },
  { symbol: "♥", left: "84%", top: "16%", size: "0.85rem", delay: 0.9, duration: 9.6 },
  { symbol: "♡", left: "76%", top: "66%", size: "1.25rem", delay: 1.8, duration: 10.4 },
  { symbol: "♡", left: "16%", top: "72%", size: "0.95rem", delay: 2.4, duration: 8.4 },
  { symbol: "♥", left: "48%", top: "9%", size: "0.7rem", delay: 1.2, duration: 11 },
  { symbol: "♡", left: "58%", top: "86%", size: "1rem", delay: 0.5, duration: 9.2 },
] as const;

export default function LovePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <MotionConfig reducedMotion="never">
      <main className="relative min-h-svh overflow-x-hidden bg-[linear-gradient(165deg,#fff8f4_0%,#ffe7ec_48%,#f8bec9_100%)] [font-family:var(--love-font-body)]">
        <SoftBackground />

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <PasswordGate key="gate" onUnlock={() => setIsUnlocked(true)} />
          ) : (
            <HeartReveal key="heart" />
          )}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}

function SoftBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.72),transparent_36%),radial-gradient(circle_at_20%_88%,rgba(255,215,223,0.62),transparent_34%)]" />
      {floatingHearts.map((heart) => (
        <motion.span
          key={`${heart.left}-${heart.top}`}
          className="absolute text-[#c64e63]/25"
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: heart.size,
            fontFamily: "var(--love-font-script)",
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.18, 0.34, 0.18],
            rotate: [-4, 5, -4],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {heart.symbol}
        </motion.span>
      ))}
    </div>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === PASSWORD) {
      setError("");
      onUnlock();
      return;
    }

    setPassword("");
    setError("Probeer opnieuw.");
    setShakeKey((current) => current + 1);
  };

  return (
    <motion.section
      className="relative z-10 grid min-h-svh place-items-center px-5 py-10 text-center text-[#4d1622]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="w-full max-w-sm">
        <motion.p
          className="mb-3 text-sm text-[#9c4052]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          18.04.26
        </motion.p>
        <motion.h1
          className="text-5xl leading-none text-[#8f2338] [font-family:var(--love-font-script)] sm:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Een verrassing
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-xs text-base leading-7 text-[#713040]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          Vul het wachtwoord in om verder te gaan.
        </motion.p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <motion.div
            key={shakeKey}
            animate={shakeKey ? { x: [0, -10, 8, -6, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.36, ease: "easeInOut" }}
          >
            <input
              autoFocus
              aria-label="Wachtwoord"
              aria-invalid={Boolean(error)}
              autoComplete="off"
              className="h-14 w-full rounded-full border border-[#f2a8b5] bg-white/78 px-5 text-center text-lg text-[#4d1622] shadow-[0_14px_34px_rgba(143,35,56,0.12)] outline-none transition focus:border-[#c94f65] focus:ring-4 focus:ring-[#f7bdc8]/45"
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError("");
              }}
              placeholder="Wachtwoord"
              type="password"
              value={password}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="h-14 w-full rounded-full bg-[#b9374d] px-6 text-base font-semibold text-white shadow-[0_18px_38px_rgba(185,55,77,0.26)] transition hover:bg-[#a92d43] focus:outline-none focus:ring-4 focus:ring-[#e88296]/45"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Ontgrendel
          </motion.button>
        </form>

        <AnimatePresence>
          {error ? (
            <motion.p
              className="mt-4 text-sm text-[#9b2d42]"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              role="status"
            >
              {error}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function HeartReveal() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Replace this placeholder message with your final personal text.
  const placeholderMessage =
    "Liefje van me, ik probeer het zo vaak mogelijk te zeggen en te laten merken, maar ik ben echt zo gelukkig met jou en ik hou ontzettend veel van je. Als er iets is wat ik voor altijd nog zou willen ervaren is wat ik voel wanneer ik samen met jou ben. Ik wil voor jou de beste versie van mezelf zijn, want jij verdient het allerbeste. I love you forever ever <3";
  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowMessage(true);
    }, 3650);

    return () => window.clearTimeout(timer);
  }, [hasStarted]);

  return (
    <motion.section
      className="relative z-10 flex min-h-svh flex-col items-center px-5 py-10 text-center text-[#4d1622]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="flex min-h-[calc(100svh-5rem)] w-full flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.button
              key="start-button"
              type="button"
              className="min-h-16 w-full max-w-xs rounded-full bg-[#b9374d] px-8 text-xl font-semibold text-white shadow-[0_24px_48px_rgba(185,55,77,0.28)] focus:outline-none focus:ring-4 focus:ring-[#e88296]/45"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.92 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setHasStarted(true)}
            >
              Open
            </motion.button>
          ) : (
            <motion.div
              key="heart"
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <svg
                aria-hidden
                className="h-auto w-[min(78vw,22rem)] overflow-visible"
                viewBox="0 0 300 300"
              >
                <defs>
                  <clipPath id={HEART_CLIP_ID} clipPathUnits="userSpaceOnUse">
                    <path d={HEART_PATH} />
                  </clipPath>
                </defs>

                <image
                  href="/IMG_7240.jpg"
                  x="30"
                  y="38"
                  width="240"
                  height="232"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${HEART_CLIP_ID})`}
                  opacity="0.92"
                />

                <motion.path
                  d={HEART_PATH}
                  fill="#dc5269"
                  opacity="0.14"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.14 }}
                  transition={{ delay: 2.05, duration: 0.65, ease: "easeOut" }}
                />
                <motion.path
                  d={HEART_PATH}
                  fill="none"
                  stroke="#b9374d"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="9"
                  strokeDasharray={HEART_PATH_LENGTH}
                  initial={{ strokeDashoffset: HEART_PATH_LENGTH }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2.15, ease: "easeInOut" }}
                />
              </svg>

              <motion.p
                className="-mt-6 text-5xl leading-none text-[#8f2338] [font-family:var(--love-font-script)] sm:text-7xl"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.65, duration: 0.75, ease: "easeOut" }}
              >
                ik hou van jou &lt;3
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showMessage ? (
          <motion.section
            className="mb-10 w-full max-w-xl rounded-lg border border-[#f5bec9]/80 bg-white/58 p-5 text-left shadow-[0_22px_48px_rgba(143,35,56,0.12)] backdrop-blur sm:p-7"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-lg leading-8 text-[#5b2633] [font-family:var(--love-font-display)]">
              {placeholderMessage}
            </p>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
