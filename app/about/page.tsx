"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useLanguage } from "../components/language-provider";

const cvPdfPath = "/cv/CV_Andreas_Schellekens.pdf";

const content = {
  nl: {
    badge: "Over mij",
    title: "Wie ik ben",
    intro:
      "Ik ben Andreas, een student Toegepaste Informatica die energie krijgt van technologie met echte impact.",
    timelineTitle: "Mijn traject",
    timeline: [
      {
        year: "Voor 2024",
        title: "Nieuwsgierigheid eerst",
        description:
          "Technologie boeide me al lang voor mijn opleiding. Ik onderzocht graag hoe digitale producten werken en hoe je complexe dingen helder kan maken voor gebruikers.",
      },
      {
        year: "2024",
        title: "Start aan Thomas More",
        description:
          "In 2024 startte ik Toegepaste Informatica aan Thomas More. Daar legde ik een sterke basis in softwareontwikkeling, logisch denken en projectwerk.",
      },
      {
        year: "2025",
        title: "Leren door te bouwen",
        description:
          "Ik verdiepte mijn kennis door projectmatig te werken, nieuwe frameworks te verkennen en zowel frontend als backend in de praktijk te combineren.",
      },
      {
        year: "2026",
        title: "Nieuwe technologie blijven ontdekken",
        description:
          "Ik blijf actief bijleren rond moderne webtechnologie, performance en schaalbare architectuur om oplossingen te bouwen die lang meegaan.",
      },
    ],
    studyChoiceTitle: "Waarom Toegepaste Informatica",
    studyChoiceBody:
      "Ik koos voor deze richting omdat ik graag problemen oplos die zowel technisch uitdagend als praktisch relevant zijn. De mix van engineering, software en toepasbare projecten past perfect bij hoe ik leer: door te ontwerpen, bouwen en verbeteren.",
    ambitionsTitle: "Toekomst en professionele ambities",
    ambitions: [
      "Uitgroeien tot een sterke full-stack developer met bijzondere focus op frontend performance en gebruikerservaring.",
      "Meewerken aan digitale producten die dagelijks door veel mensen gebruikt worden.",
      "Op termijn een technische leadrol opnemen waarin ik codekwaliteit en teamgroei combineer.",
    ],
    cvTitle: "CV",
    cvBody: "Mijn CV is beschikbaar op een aparte pagina en als downloadbare PDF.",
    cvView: "Bekijk CV op aparte pagina",
    cvDownload: "Download CV (PDF)",
    skillsTitle: "Skills (extract uit mijn CV)",
    skillsSubtitle: "Actuele technische en soft skills, zonder irrelevante kantoorsoftware.",
    technicalTitle: "Technische skills",
    technicalSkills: [
      "Front-end development: React, HTML, CSS",
      "Back-end development: Java, .NET, PHP (Laravel)",
      "API development: Python, Java, .NET",
      "Data & databases: MySQL, basis data science",
    ],
    toolsTitle: "Tools & technologieen",
    toolSkills: [
      "Git & version control",
      "Development tools: VS Code, PhpStorm",
    ],
    softTitle: "Soft skills",
    softSkills: [
      "Sterke communicatieve vaardigheden",
      "Probleemoplossend denken",
      "Leergierig en snel nieuwe technologieen oppikken",
      "Teamwork & samenwerking",
    ],
    otherTitle: "Overig",
    otherItems: ["Rijbewijs B"],
  },
  en: {
    badge: "About me",
    title: "Who I am",
    intro:
      "I am Andreas, an Applied Computer Science student who enjoys building technology with real impact.",
    timelineTitle: "My journey",
    timeline: [
      {
        year: "Before 2024",
        title: "Curiosity came first",
        description:
          "Technology fascinated me long before my formal studies. I was always exploring how digital products work and how to make complex ideas clearer for users.",
      },
      {
        year: "2024",
        title: "Started at Thomas More",
        description:
          "In 2024, I started Applied Computer Science at Thomas More, where I built a strong foundation in software development, logic, and project work.",
      },
      {
        year: "2025",
        title: "Learning by building",
        description:
          "I grew by working on practical projects, exploring new frameworks, and combining both frontend and backend development in real implementations.",
      },
      {
        year: "2026",
        title: "Continuing to discover new technology",
        description:
          "I keep learning modern web technologies, performance optimization, and scalable architecture to build solutions that last.",
      },
    ],
    studyChoiceTitle: "Why Applied Computer Science",
    studyChoiceBody:
      "I chose this field because I enjoy solving problems that are both technically challenging and practically useful. The combination of engineering, software, and applied projects fits how I learn best: by designing, building, and improving.",
    ambitionsTitle: "Future dreams and professional ambitions",
    ambitions: [
      "Grow into a strong full-stack developer with a special focus on frontend performance and user experience.",
      "Contribute to digital products used by many people in daily life.",
      "Move into a technical leadership role where I combine code quality with team growth.",
    ],
    cvTitle: "CV",
    cvBody: "My CV is available on a separate page and as a downloadable PDF.",
    cvView: "View CV on a separate page",
    cvDownload: "Download CV (PDF)",
    skillsTitle: "Skills (CV extract)",
    skillsSubtitle: "Current technical and soft skills, without outdated office tools.",
    technicalTitle: "Technical skills",
    technicalSkills: [
      "Front-end development: React, HTML, CSS",
      "Back-end development: Java, .NET, PHP (Laravel)",
      "API development: Python, Java, .NET",
      "Data & databases: MySQL, basic data science",
    ],
    toolsTitle: "Tools & Technologies",
    toolSkills: [
      "Git & version control",
      "Development tools: VS Code, PhpStorm",
    ],
    softTitle: "Soft skills",
    softSkills: [
      "Strong communication skills",
      "Problem-solving mindset",
      "Eager to learn and quickly adopt new technologies",
      "Teamwork & collaboration",
    ],
    otherTitle: "Other",
    otherItems: ["Driver's license B"],
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
        <section className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal-item space-y-4" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_72%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-highlight)] pulse-dot" />
              {t.badge}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">{t.title}</h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">{t.intro}</p>
          </div>

          <div className="reveal-item mx-auto w-full max-w-sm" style={{ "--reveal-delay": "220ms" } as CSSProperties}>
            <div className="profile-shell">
              <Image
                src="/andreas.png"
                alt="Andreas profile photo"
                width={420}
                height={460}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.timelineTitle}</h2>
          <div className="relative">
            <div className="pointer-events-none absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-surface)] to-transparent sm:left-1/2 sm:-translate-x-1/2" />
            <ol className="space-y-8">
              {t.timeline.map((item, index) => (
                <li
                  key={item.year}
                  className="relative"
                  style={{ "--reveal-delay": `${220 + index * 120}ms` } as CSSProperties}
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
                    <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-slate-300">{item.description}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "300ms" } as CSSProperties}>
            <h2 className="text-2xl font-semibold text-white">{t.studyChoiceTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-300">{t.studyChoiceBody}</p>
          </article>

          <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "360ms" } as CSSProperties}>
            <h2 className="text-2xl font-semibold text-white">{t.ambitionsTitle}</h2>
            <ul className="mt-3 space-y-2 text-slate-300">
              {t.ambitions.map((ambition) => (
                <li key={ambition} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{ambition}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="glass-panel reveal-item rounded-3xl p-6 sm:p-8" style={{ "--reveal-delay": "420ms" } as CSSProperties}>
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.cvTitle}</h2>
          <p className="mt-3 text-slate-300">{t.cvBody}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link href="/cv" className="primary-btn">
              {t.cvView}
            </Link>
            <a href={cvPdfPath} download="CV_Andreas_Schellekens.pdf" className="ghost-btn">
              {t.cvDownload}
            </a>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">{t.skillsTitle}</h2>
            <p className="mt-2 text-slate-300">{t.skillsSubtitle}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "480ms" } as CSSProperties}>
              <h3 className="text-xl font-semibold text-white">{t.technicalTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.technicalSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "540ms" } as CSSProperties}>
              <h3 className="text-xl font-semibold text-white">{t.toolsTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.toolSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "600ms" } as CSSProperties}>
              <h3 className="text-xl font-semibold text-white">{t.softTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.softSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel reveal-item rounded-2xl p-6" style={{ "--reveal-delay": "660ms" } as CSSProperties}>
              <h3 className="text-xl font-semibold text-white">{t.otherTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.otherItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
