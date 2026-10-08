"use client";

import { useEffect } from "react";
import { useMotionSettings } from "./motion-provider";

/**
 * Moves the specular highlight of the liquid-glass surface under the pointer.
 * Glass surfaces are recognised by their backdrop-filter (not inherited, so only the
 * surface itself matches) and receive --glass-x/--glass-y in local pixels.
 * Off for reduced motion and touch input: the highlight then stays at its resting spot.
 */
export default function GlassSheen() {
  const { reducedMotion } = useMotionSettings();

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      const event = lastEvent;
      if (!event) return;

      let element = event.target instanceof Element ? event.target : null;
      while (element && element !== document.body) {
        if (element instanceof HTMLElement && getComputedStyle(element).backdropFilter !== "none") {
          const rect = element.getBoundingClientRect();
          element.style.setProperty("--glass-x", `${event.clientX - rect.left}px`);
          element.style.setProperty("--glass-y", `${event.clientY - rect.top}px`);
        }
        element = element.parentElement;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return null;
}
