"use client";

import { useMotionValue } from "framer-motion";
import { type PointerEvent, type ReactNode } from "react";
import ReactiveBackdrop from "./reactive-backdrop";

export default function PageShell({ children }: { children: ReactNode }) {
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    cursorX.set((event.clientX / window.innerWidth) * 100);
    cursorY.set((event.clientY / window.innerHeight) * 100);
  };

  const resetCursorPosition = () => {
    cursorX.set(50);
    cursorY.set(50);
  };

  return (
    <div className="portfolio-root" onPointerMove={handlePointerMove} onPointerLeave={resetCursorPosition}>
      <ReactiveBackdrop cursorX={cursorX} cursorY={cursorY} />
      <main className="portfolio-main">{children}</main>
    </div>
  );
}
