"use client";

import { motion, useMotionValue } from "framer-motion";
import { type PointerEvent } from "react";
import ReactiveBackdrop from "../components/portfolio/reactive-backdrop";
import { useLanguage } from "../components/language-provider";

const cvPdfPath = "/cv/CV_Andreas_Schellekens.pdf";

const content = {
  nl: {
    badge: "CV",
    title: "Curriculum Vitae",
    intro: "Hier kan je mijn CV bekijken.",
    download: "Download CV (PDF)",
  },
  en: {
    badge: "CV",
    title: "Curriculum Vitae",
    intro: "You can view my CV here.",
    download: "Download CV (PDF)",
  },
} as const;

export default function CvPage() {
  const { language } = useLanguage();
  const t = content[language];

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    cursorX.set(x);
    cursorY.set(y);
  };

  const resetCursorPosition = () => {
    cursorX.set(50);
    cursorY.set(50);
  };

  return (
    <div className="portfolio-root" onPointerMove={handlePointerMove} onPointerLeave={resetCursorPosition}>
      <ReactiveBackdrop cursorX={cursorX} cursorY={cursorY} />

      <main className="portfolio-main">
        <motion.section
          className="portfolio-section space-y-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-pill">
            <span className="hero-pill-dot" />
            {t.badge}
          </p>
          <h1 className="portfolio-section-title">{t.title}</h1>
          <p className="portfolio-section-subtitle">{t.intro}</p>
          <a href={cvPdfPath} download="CV_Andreas_Schellekens.pdf" className="portfolio-btn-secondary w-fit">
            {t.download}
          </a>
        </motion.section>

        <motion.section
          className="portfolio-contact-card overflow-hidden p-4 sm:p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            src={cvPdfPath}
            title="CV PDF preview"
            className="h-[72vh] w-full rounded-2xl border border-[var(--color-surface)] bg-white"
          />
        </motion.section>
      </main>
    </div>
  );
}
