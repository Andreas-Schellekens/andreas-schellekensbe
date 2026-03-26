"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Language } from "../language-provider";
import type { PortfolioSectionId } from "./content";

type OrbitalNavigationProps = {
  activeSection: PortfolioSectionId;
  language: Language;
  setLanguage: (language: Language) => void;
  labels: {
    sections: Record<PortfolioSectionId, string>;
    languageLabel: string;
    dutch: string;
    english: string;
  };
};

const sectionOrder: PortfolioSectionId[] = ["intro", "trajectory", "projects", "contact"];

export default function OrbitalNavigation({
  activeSection,
  language,
  setLanguage,
  labels,
}: OrbitalNavigationProps) {
  return (
    <motion.nav
      className="orbital-nav"
      aria-label="Section navigation"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="orbital-nav-ring" />
      <ul className="orbital-links">
        {sectionOrder.map((section) => {
          const isActive = activeSection === section;

          return (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`orbital-link ${isActive ? "orbital-link-active" : ""}`}
                data-cursor="interactive"
                aria-current={isActive ? "page" : undefined}
              >
                <span className="orbital-link-dot" aria-hidden />
                <span className="orbital-link-label">{labels.sections[section]}</span>
                <AnimatePresence>
                  {isActive ? (
                    <motion.span
                      className="orbital-link-glow"
                      layoutId="nav-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  ) : null}
                </AnimatePresence>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="orbital-language-panel">
        <p className="orbital-language-label">{labels.languageLabel}</p>
        <div className="orbital-language-buttons">
          <button
            type="button"
            onClick={() => setLanguage("nl")}
            className={`orbital-language-button ${language === "nl" ? "orbital-language-button-active" : ""}`}
            data-cursor="interactive"
            aria-pressed={language === "nl"}
          >
            {labels.dutch}
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`orbital-language-button ${language === "en" ? "orbital-language-button-active" : ""}`}
            data-cursor="interactive"
            aria-pressed={language === "en"}
          >
            {labels.english}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
