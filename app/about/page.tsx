"use client";

import type { CSSProperties } from "react";
import { useLanguage } from "../components/language-provider";

const content = {
  nl: {
    badge: "Mijn traject",
    title: "Over Mij Tijdlijn",
    intro:
      "Een korte blik op hoe mijn pad in technologie groeide: van vroege nieuwsgierigheid tot studie en constante ontdekking.",
    timeline: [
      {
        year: "Voor 2024",
        title: "Nieuwsgierigheid eerst",
        description:
          "Nog voor mijn opleiding was technologie al een grote interesse. Ik onderzocht graag hoe digitale producten werken en hoe sterke interfaces complexe dingen eenvoudig laten aanvoelen.",
      },
      {
        year: "2024",
        title: "Start Computer Science aan Thomas More",
        description:
          "Ik ben gestart met Computer Science aan Thomas More, waar ik een sterke basis heb gelegd in softwareontwikkeling, probleemoplossing en moderne ontwikkelmethodes.",
      },
      {
        year: "2025",
        title: "Leren en bouwen met nieuwe technologie",
        description:
          "Ik heb mijn toolkit verbreed met praktijkprojecten, mijn frontend- en backendkennis verdiept en actief nieuwe technologieen verkend.",
      },
      {
        year: "2026",
        title: "Blijven ontdekken wat er komt",
        description:
          "Ik blijf experimenteren met opkomende technologie, performancegerichte workflows verfijnen en nieuwe ideeen omzetten in duidelijke, gebruiksvriendelijke ervaringen.",
      },
    ],
  },
  en: {
    badge: "My journey",
    title: "About Me Timeline",
    intro:
      "A quick look at how my path in technology evolved, from early curiosity to formal study and continuous discovery.",
    timeline: [
      {
        year: "Before 2024",
        title: "Curiosity came first",
        description:
          "Long before my formal studies, technology already fascinated me. I was always exploring how digital products work and how thoughtful interfaces can make complex ideas feel simple.",
      },
      {
        year: "2024",
        title: "Started Computer Science at Thomas More",
        description:
          "I began my Computer Science journey at Thomas More, where I built strong foundations in software development, problem-solving, and modern development practices.",
      },
      {
        year: "2025",
        title: "Learning and building with new tech",
        description:
          "I expanded my toolkit through practical projects, sharpened both frontend and backend skills, and actively discovered new technologies by building with them.",
      },
      {
        year: "2026",
        title: "Discovering what is next",
        description:
          "I continue to explore emerging technologies, refine performance-focused workflows, and turn fresh ideas into clean, user-centered digital experiences.",
      },
    ],
  },
} as const;

export default function AboutPage() {
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

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-12 sm:py-16">
        <section className="reveal-item space-y-4" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_72%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-highlight)] pulse-dot" />
            {t.badge}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{t.title}</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">{t.intro}</p>
        </section>

        <section className="relative">
          <div className="pointer-events-none absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-surface)] to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <ol className="space-y-8">
            {t.timeline.map((item, index) => (
              <li
                key={item.year}
                className="relative"
                style={
                  {
                    "--reveal-delay": `${220 + index * 120}ms`,
                  } as CSSProperties
                }
              >
                <span className="pulse-dot absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_20%,transparent)] sm:left-1/2 sm:-translate-x-1/2" />
                <article
                  className={`glass-panel reveal-item ml-10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] sm:ml-0 sm:w-[calc(50%-1.5rem)] ${
                    index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {item.year}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 leading-relaxed text-slate-300">{item.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
