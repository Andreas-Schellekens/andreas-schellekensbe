"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Language = "nl" | "en";

const content = {
  nl: {
    nav: {
      home: "Home",
      about: "Over mij",
      contact: "Contact",
      languageLabel: "Taal",
      dutch: "Nederlands",
      english: "Engels",
    },
    hero: {
      welcome: "Welkom",
      greeting: "Hallo, ik ben [Naam]",
      headline:
        "Ik ontwerp en bouw moderne digitale ervaringen die snel, doordacht en opvallend zijn.",
      cta: "Bekijk mijn werk",
      profileAlt: "Profielfoto",
    },
    featured: {
      title: "Uitgelicht Werk",
      subtitle: "Wat ik doe",
      projectTitle: "Project",
      projectDescription:
        "Hier komt een korte beschrijving van dit project. Vervang deze placeholder door echte projectdetails.",
      projectButton: "Bekijk project",
      projectCoverAlt: "Project omslag",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Me",
      contact: "Contact",
      languageLabel: "Language",
      dutch: "Dutch",
      english: "English",
    },
    hero: {
      welcome: "Welcome",
      greeting: "Hi, I am [Name]",
      headline:
        "I design and build modern digital experiences that are fast, thoughtful, and built to stand out.",
      cta: "View My Work",
      profileAlt: "Profile picture",
    },
    featured: {
      title: "Featured Work",
      subtitle: "What I Do",
      projectTitle: "Project",
      projectDescription:
        "A short description of this project will go here. Replace this placeholder with your real work details.",
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
      <header className="border-b border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="text-lg font-semibold tracking-wide text-[var(--color-accent)]">
            YourName
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <ul className="flex items-center gap-4 text-sm sm:gap-6 sm:text-base">
            <li>
              <a
                href="#"
                className="text-slate-200 transition-all duration-300 hover:text-[var(--color-accent)]"
              >
                {t.nav.home}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-200 transition-all duration-300 hover:text-[var(--color-accent)]"
              >
                {t.nav.about}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-slate-200 transition-all duration-300 hover:text-[var(--color-accent)]"
              >
                {t.nav.contact}
              </a>
            </li>
            </ul>
            <label className="flex items-center gap-2 text-xs text-slate-300 sm:text-sm">
              <span>{t.nav.languageLabel}</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="rounded-md border border-[var(--color-surface)] bg-[var(--color-layer)] px-2 py-1 text-slate-100 outline-none transition-all duration-300 hover:border-[var(--color-accent)] focus:border-[var(--color-accent)]"
                aria-label={t.nav.languageLabel}
              >
                <option value="nl">{t.nav.dutch}</option>
                <option value="en">{t.nav.english}</option>
              </select>
            </label>
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
            {[1, 2, 3].map((project) => (
              <article
                key={project}
                className="group overflow-hidden rounded-2xl border border-[var(--color-surface)] bg-[var(--color-layer)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent)]"
              >
                <div className="overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/600x400"
                    alt={`${t.featured.projectTitle} ${project} ${t.featured.projectCoverAlt}`}
                    width={600}
                    height={400}
                    unoptimized
                    className="h-52 w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <h4 className="text-lg font-semibold text-white">
                    {t.featured.projectTitle} {project}
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {t.featured.projectDescription}
                  </p>
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
