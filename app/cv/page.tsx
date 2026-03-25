"use client";

import type { CSSProperties } from "react";
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
    <div className="relative min-h-screen overflow-x-clip bg-[var(--color-bg)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-orb ambient-orb--one" />
        <div className="ambient-orb ambient-orb--two" />
        <div className="ambient-orb ambient-orb--three" />
        <div className="ambient-grid" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:py-16">
        <section className="reveal-item space-y-3" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_72%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-highlight)] pulse-dot" />
            {t.badge}
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{t.title}</h1>
          <p className="max-w-3xl text-slate-300">{t.intro}</p>
          <a href={cvPdfPath} download="CV_Andreas_Schellekens.pdf" className="ghost-btn w-fit">
            {t.download}
          </a>
        </section>

        <section className="glass-panel reveal-item overflow-hidden rounded-3xl p-4 sm:p-6" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
          <iframe
            src={cvPdfPath}
            title="CV PDF preview"
            className="h-[72vh] w-full rounded-2xl border border-[var(--color-surface)] bg-white"
          />
        </section>
      </main>
    </div>
  );
}
