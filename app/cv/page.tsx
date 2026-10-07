"use client";

import { motion } from "framer-motion";
import PageShell from "../components/portfolio/page-shell";
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

  return (
    <PageShell>
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
        <a href={cvPdfPath} download="CV_Andreas_Schellekens.pdf" className="portfolio-btn-secondary w-full justify-center sm:w-fit">
          {t.download}
        </a>
      </motion.section>

      <motion.section
        className="portfolio-contact-card overflow-hidden p-3 sm:p-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <iframe
          src={cvPdfPath}
          title="CV PDF preview"
          className="h-[58vh] min-h-[18rem] w-full rounded-2xl border border-[var(--color-surface)] bg-white sm:h-[72vh]"
        />
      </motion.section>
    </PageShell>
  );
}
