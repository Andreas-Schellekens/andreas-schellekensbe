"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ContactDockItem = {
  href: string;
  label: string;
  description?: string;
  icon: ReactNode;
};

type ContactDockProps = {
  items: ContactDockItem[];
};

function DockButton({ item, mouseX }: { item: ContactDockItem; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return 999;
    return value - (bounds.left + bounds.width / 2);
  });

  const targetSize = useTransform(distance, [-160, -80, 0, 80, 160], [48, 56, 70, 56, 48]);
  const size = useSpring(targetSize, { mass: 0.2, stiffness: 260, damping: 20 });
  const iconScale = useTransform(size, [48, 70], [1, 1.18]);

  const isExternal = item.href.startsWith("http");
  const ariaLabel = item.description ? `${item.label}: ${item.description}` : item.label;

  return (
    <motion.a
      ref={ref}
      href={item.href}
      aria-label={ariaLabel}
      data-cursor="interactive"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="contact-dock-item"
      style={{ width: size, height: size }}
    >
      <motion.span className="contact-dock-icon-wrap" style={{ scale: iconScale }}>
        {item.icon}
      </motion.span>
      <span className="contact-dock-tooltip">
        {item.label}
        {item.description ? <small>{item.description}</small> : null}
      </span>
    </motion.a>
  );
}

export default function ContactDock({ items }: ContactDockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);

  return (
    <div className="contact-dock-shell">
      <motion.div
        className="contact-dock"
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
      >
        {items.map((item) => (
          <DockButton key={item.href} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}
