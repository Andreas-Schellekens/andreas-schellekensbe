"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent } from "react";
import ReactiveBackdrop from "../components/portfolio/reactive-backdrop";
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
        <section className="portfolio-section grid items-center gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-pill">
              <span className="hero-pill-dot" />
              {t.badge}
            </p>
            <h1 className="portfolio-section-title">{t.title}</h1>
            <p className="portfolio-section-subtitle text-base">{t.intro}</p>
          </motion.div>

          <motion.div
            className="mx-auto w-full max-w-sm"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-portrait-card">
              <div className="hero-portrait-image-shell">
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
          </motion.div>
        </section>

        <section className="portfolio-section space-y-6">
          <motion.h2
            className="portfolio-section-title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.timelineTitle}
          </motion.h2>

          <div className="relative">
            <div className="pointer-events-none absolute bottom-0 left-4 top-2 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-surface)] to-transparent sm:left-1/2 sm:-translate-x-1/2" />
            <ol className="space-y-8">
              {t.timeline.map((item, index) => (
                <li key={item.year} className="relative">
                  <span className="pulse-dot absolute left-4 top-8 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--color-accent)_20%,transparent)] sm:left-1/2 sm:-translate-x-1/2" />
                  <motion.article
                    className={`trajectory-card ml-10 sm:ml-0 sm:w-[calc(50%-1.5rem)] ${
                      index % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.56,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="trajectory-card-metric">{item.year}</p>
                    <h3 className="trajectory-card-title">{item.title}</h3>
                    <p className="trajectory-card-body">{item.description}</p>
                  </motion.article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="portfolio-section grid gap-5 lg:grid-cols-2">
          <motion.article
            className="trajectory-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl font-semibold text-white">{t.studyChoiceTitle}</h2>
            <p className="mt-3 leading-relaxed text-slate-300">{t.studyChoiceBody}</p>
          </motion.article>

          <motion.article
            className="trajectory-card"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl font-semibold text-white">{t.ambitionsTitle}</h2>
            <ul className="mt-3 space-y-2 text-slate-300">
              {t.ambitions.map((ambition) => (
                <li key={ambition} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{ambition}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </section>

        <motion.section
          className="portfolio-contact-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="portfolio-contact-title text-3xl">{t.cvTitle}</h2>
          <p className="portfolio-contact-body">{t.cvBody}</p>
          <div className="portfolio-contact-actions mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/cv"
              className="portfolio-btn-primary portfolio-action-link w-full justify-center sm:w-auto"
              prefetch={false}
            >
              {t.cvView}
            </Link>
            <a
              href={cvPdfPath}
              download="CV_Andreas_Schellekens.pdf"
              className="portfolio-btn-secondary portfolio-action-link w-full justify-center sm:w-auto"
            >
              {t.cvDownload}
            </a>
          </div>
        </motion.section>

        <section className="portfolio-section space-y-5">
          <div>
            <h2 className="portfolio-section-title">{t.skillsTitle}</h2>
            <p className="portfolio-section-subtitle mt-2">{t.skillsSubtitle}</p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <motion.article
              className="trajectory-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-white">{t.technicalTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.technicalSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="trajectory-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.04, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-white">{t.toolsTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.toolSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="trajectory-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.08, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-white">{t.softTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.softSkills.map((skill) => (
                  <li key={skill} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              className="trajectory-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.12, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-xl font-semibold text-white">{t.otherTitle}</h3>
              <ul className="mt-3 space-y-2 text-slate-300">
                {t.otherItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>
      </main>
    </div>
  );
}
