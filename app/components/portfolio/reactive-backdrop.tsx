"use client";

import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import FloatingLines from "./floating-lines";

type ReactiveBackdropProps = {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
};

export default function ReactiveBackdrop({ cursorX, cursorY }: ReactiveBackdropProps) {
  const { scrollYProgress } = useScroll();

  const layerOneX = useTransform(cursorX, [0, 100], [-60, 60]);
  const layerOneY = useTransform(cursorY, [0, 100], [-40, 40]);
  const layerTwoX = useTransform(cursorY, [0, 100], [55, -55]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [-140, 160]);
  const layerThreeX = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const layerThreeY = useTransform(cursorX, [0, 100], [45, -45]);
  const gridShiftY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const linesX = useTransform(cursorX, [0, 100], [-12, 12]);
  const linesY = useTransform(cursorY, [0, 100], [-10, 10]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <motion.div className="reactive-grid" style={{ y: gridShiftY }} />
      <motion.div className="reactive-orb reactive-orb-a" style={{ x: layerOneX, y: layerOneY }} />
      <motion.div className="reactive-orb reactive-orb-b" style={{ x: layerTwoX, y: layerTwoY }} />
      <motion.div className="reactive-orb reactive-orb-c" style={{ x: layerThreeX, y: layerThreeY }} />
      <motion.div className="floating-lines-host" style={{ x: linesX, y: linesY }}>
        <FloatingLines
          linesGradient={["#A9C8FF", "#6B8FE6", "#4A67B8", "#37415C"]}
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[3, 7, 4]}
          lineDistance={[5, 6, 5]}
          animationSpeed={1.05}
          interactive
          bendRadius={6}
          bendStrength={-0.65}
          mouseDamping={0.08}
          parallax
          parallaxStrength={0.18}
          mixBlendMode="screen"
        />
      </motion.div>
      <div className="reactive-noise" />
    </div>
  );
}
