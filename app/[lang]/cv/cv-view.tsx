"use client";

import { motion } from "framer-motion";
import PageShell from "../../components/portfolio/page-shell";
import { useLanguage } from "../../components/language-provider";
import { useMediaQuery } from "../../components/use-media-query";

const cvPdfPath = "/cv/CV_Andreas_Schellekens.pdf";

const content = {
  nl: {
    badge: "CV",
    title: "Curriculum Vitae",
    intro: "Hier kan je mijn CV bekijken of downloaden.",
    open: "Open PDF",
    download: "Download CV (PDF)",
    previewTitle: "Voorbeeld van mijn CV (PDF)",
    mobileTitle: "Bekijk mijn CV als PDF",
    mobileBody: "Op een smartphone opent het CV het best in je eigen PDF-viewer.",
  },
  en: {
    badge: "CV",
    title: "Curriculum Vitae",
    intro: "You can view or download my CV here.",
    open: "Open PDF",
    download: "Download CV (PDF)",
    previewTitle: "Preview of my CV (PDF)",
    mobileTitle: "View my CV as a PDF",
    mobileBody: "On a phone, the CV opens best in your own PDF viewer.",
  },
} as const;

export default function CvView() {
  const { language } = useLanguage();
  const t = content[language];
  // Embedded PDFs are unreliable on phones (iOS shows one page, Android downloads), and a hidden
  // iframe would still download the file, so only create it on wider screens.
  const showPreview = useMediaQuery("(min-width: 640px)");

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
        <div className="flex flex-wrap gap-3">
          <a
            href={cvPdfPath}
            target="_blank"
            rel="noreferrer"
            className="portfolio-btn-primary w-full justify-center sm:w-fit"
          >
            {t.open}
          </a>
          <a
            href={cvPdfPath}
            download="CV_Andreas_Schellekens.pdf"
            className="portfolio-btn-secondary w-full justify-center sm:w-fit"
          >
            {t.download}
          </a>
        </div>
      </motion.section>

      <motion.section
        className="portfolio-contact-card overflow-hidden p-3 sm:p-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="space-y-2 p-3 sm:hidden">
          <h2 className="text-xl font-semibold text-white">{t.mobileTitle}</h2>
          <p className="trajectory-card-body">{t.mobileBody}</p>
        </div>

        <div className="hidden h-[72vh] min-h-[18rem] sm:block">
          {showPreview ? (
            <iframe
              src={cvPdfPath}
              title={t.previewTitle}
              className="h-full w-full rounded-2xl border border-[var(--color-surface)] bg-white"
            />
          ) : null}
        </div>
      </motion.section>
    </PageShell>
  );
}
