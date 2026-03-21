"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "nl" | "en";

const content = {
  nl: {
    nav: {
      home: "Home",
      about: "Over mij",
      projects: "Projecten",
      contact: "Contact",
      languageLabel: "Taal",
      dutch: "Nederlands",
      english: "Engels",
    },
    hero: {
      welcome: "Welkom",
      greeting: "Hey, ik ben Andreas",
      headline:
        "Ik ontwerp en bouw moderne digitale ervaringen die snel, doordacht en opvallend zijn.",
      cta: "Bekijk mijn werk",
      profileAlt: "Profielfoto",
    },
    featured: {
      title: "Uitgelicht Werk",
      subtitle: "Wat ik doe",
      projects: [
        {
          title: "Binderbase",
          description:
            "Beheer je Pokemon kaarten, verzamelingen en binders met gemak. Alles overzichtelijk, veilig en intuïtief op één plek.",
          image: "/BinderBase.svg",
        },
        {
          title: "Project komt binnenkort",
          description: "Dit project vul ik later nog aan.",
          image: "/window.svg",
        },
        {
          title: "Project komt binnenkort",
          description: "Dit project vul ik later nog aan.",
          image: "/globe.svg",
        },
      ],
      projectButton: "Bekijk project",
      projectCoverAlt: "Project omslag",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
      contact: "Contact",
      languageLabel: "Language",
      dutch: "Dutch",
      english: "English",
    },
    hero: {
      welcome: "Welcome",
      greeting: "Hi, I am Andreas",
      headline:
        "I design and build modern digital experiences that are fast, thoughtful, and built to stand out.",
      cta: "View My Work",
      profileAlt: "Profile picture",
    },
    featured: {
      title: "Featured Work",
      subtitle: "What I Do",
      projects: [
        {
          title: "Binderbase",
          description:
            "Binderbase is a featured project. The other projects will be Manage your Pokémon cards, collections, and binders with ease. Everything is organized, secure, and intuitive—all in one place.",
          image: "/BinderBase.svg",
        },
        {
          title: "Project coming soon",
          description: "I will add this project later.",
          image: "/window.svg",
        },
        {
          title: "Project coming soon",
          description: "I will add this project later.",
          image: "/globe.svg",
        },
      ],
      projectButton: "Explore Project",
      projectCoverAlt: "Project cover",
    },
  },
} as const;

export default function Home() {
  const [language, setLanguage] = useState<Language>("nl");
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-bg)_82%,transparent)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-60" />
        <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="#" className="group space-y-1">
            <p className="text-lg font-semibold tracking-wide text-[var(--color-accent)] transition-all duration-300 group-hover:text-[var(--color-highlight)]">
              Andreas Schellekens
            </p>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Digital Builder</p>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
            <ul className="flex items-center gap-1.5 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_70%,transparent)] px-2 py-3 text-sm shadow-lg shadow-black/20 sm:text-base">
              <li>
                <a
                  href="#"
                  className="rounded-full px-4 py-2 text-slate-200 transition-all duration-300 hover:bg-[var(--color-deep)] hover:text-[var(--color-accent)]"
                >
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="rounded-full px-4 py-2 text-slate-200 transition-all duration-300 hover:bg-[var(--color-deep)] hover:text-[var(--color-accent)]"
                >
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="rounded-full px-4 py-2 text-slate-200 transition-all duration-300 hover:bg-[var(--color-deep)] hover:text-[var(--color-accent)]"
                >
                  {t.nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="rounded-full px-4 py-2 text-slate-200 transition-all duration-300 hover:bg-[var(--color-deep)] hover:text-[var(--color-accent)]"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-1.5 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_72%,transparent)] px-2 py-1.5 text-xs text-slate-300 shadow-lg shadow-black/20 sm:text-sm">
              <span className="pl-1 uppercase tracking-wider">{t.nav.languageLabel}</span>
              <div className="flex items-center rounded-full bg-[var(--color-bg)] p-1">
                <button
                  type="button"
                  onClick={() => setLanguage("nl")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 sm:text-sm ${
                    language === "nl"
                      ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                      : "text-slate-300 hover:text-[var(--color-accent)]"
                  }`}
                  aria-pressed={language === "nl"}
                >
                  {t.nav.dutch}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 sm:text-sm ${
                    language === "en"
                      ? "bg-[var(--color-accent)] text-[var(--color-bg)]"
                      : "text-slate-300 hover:text-[var(--color-accent)]"
                  }`}
                  aria-pressed={language === "en"}
                >
                  {t.nav.english}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-12 sm:py-16">
        <section className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">{t.hero.welcome}</p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t.hero.greeting}
            </h1>
            <h2 className="max-w-xl text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl">
              {t.hero.headline}
            </h2>
            <a
              href="#"
              className="inline-flex items-center rounded-full bg-[var(--color-accent)] px-7 py-3 text-sm font-semibold text-[var(--color-bg)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-highlight)] hover:text-white"
            >
              {t.hero.cta}
            </a>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-surface)] bg-[var(--color-layer)] shadow-2xl shadow-black/30">
              <Image
                src="/andreas.png"
                alt={t.hero.profileAlt}
                width={400}
                height={400}
                unoptimized
                className="h-full w-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{t.featured.title}</h3>
            <span className="text-sm text-slate-300">{t.featured.subtitle}</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.featured.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="group overflow-hidden rounded-2xl border border-[var(--color-surface)] bg-[var(--color-layer)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent)]"
              >
                <div className="overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} ${t.featured.projectCoverAlt}`}
                    width={600}
                    height={400}
                    unoptimized
                    className="h-52 w-full bg-white p-8 object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                  <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--color-deep)] bg-[color-mix(in_srgb,var(--color-deep)_40%,transparent)] px-4 py-2 text-sm font-medium text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-highlight)] hover:text-white"
                  >
                    {t.featured.projectButton}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
