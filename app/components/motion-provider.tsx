"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type MotionContextValue = {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
};

const STORAGE_KEY = "site-reduced-motion";

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotionState] = useState(false);
  const hasStoredPreferenceRef = useRef(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true" || stored === "false") {
      hasStoredPreferenceRef.current = true;
      setReducedMotionState(stored === "true");
      return undefined;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotionState(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      if (!hasStoredPreferenceRef.current) {
        setReducedMotionState(event.matches);
      }
    };

    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("reduced-motion", reducedMotion);
    root.dataset.reducedMotion = reducedMotion ? "true" : "false";
  }, [reducedMotion]);

  const setReducedMotion = useCallback((value: boolean) => {
    hasStoredPreferenceRef.current = true;
    setReducedMotionState(value);
    window.localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const value = useMemo(
    () => ({
      reducedMotion,
      setReducedMotion,
    }),
    [reducedMotion, setReducedMotion],
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
