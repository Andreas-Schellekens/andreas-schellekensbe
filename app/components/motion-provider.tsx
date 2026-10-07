"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";

type MotionContextValue = {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
};

const STORAGE_KEY = "site-reduced-motion";
const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

const listeners = new Set<() => void>();
// Fallback for when localStorage is unavailable (e.g. blocked in private mode).
let memoryPreference: boolean | null = null;

function readReducedMotion(): boolean {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true" || stored === "false") return stored === "true";
  } catch {
    // Fall through to the in-memory value.
  }
  if (memoryPreference !== null) return memoryPreference;

  // No explicit choice yet: follow the operating system setting.
  return window.matchMedia(MEDIA_QUERY).matches;
}

function subscribe(listener: () => void) {
  const media = window.matchMedia(MEDIA_QUERY);
  listeners.add(listener);
  window.addEventListener("storage", listener);
  media.addEventListener("change", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
    media.removeEventListener("change", listener);
  };
}

function setReducedMotion(value: boolean) {
  memoryPreference = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Storage unavailable; the in-memory value keeps the choice for this session.
  }
  listeners.forEach((listener) => listener());
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribe, readReducedMotion, () => false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduced-motion", reducedMotion);
    root.dataset.reducedMotion = reducedMotion ? "true" : "false";
  }, [reducedMotion]);

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
    }),
    [reducedMotion],
  );

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? "always" : "never"}>{children}</MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionSettings() {
  const context = useContext(MotionContext);

  if (!context) {
    throw new Error("useMotionSettings must be used within a MotionProvider");
  }

  return context;
}
