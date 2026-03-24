"use client";

import Image from "next/image";
import { CSSProperties, MouseEvent, useMemo, useState } from "react";
import { useLanguage } from "./components/language-provider";

type PointerState = { x: number; y: number; active: boolean };

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
      welcome: "Beschikbaar voor nieuwe projecten",
      greeting: "Hey, ik ben Andreas",
      headline:
        "Ik ontwerp en bouw moderne digitale ervaringen die snel, doordacht en opvallend zijn.",
      ctaPrimary: "Bekijk mijn werk",
      ctaSecondary: "Contact",
      profileAlt: "Profielfoto",
      highlights: ["UX-first", "Frontend + Product", "Snel en schaalbaar"],
    },
    about: {
      title: "Wat ik doe",
      subtitle:
        "Van design thinking tot productiecode: ik lever interfaces die helder voelen en sterk presteren.",
      cards: [
        {
          title: "Strategische UX",
          description: "Van wireframes tot pixel-perfect flows die intuitief aanvoelen.",
        },
        {
          title: "Snelle ontwikkeling",
          description: "Moderne stacks, duidelijke componenten en focus op performance.",
        },
        {
          title: "Product samenwerking",
          description: "Korte feedbackloops met stakeholders en iteratie op echte data.",
        },
      ],
    },
    featured: {
      title: "Uitgelicht Werk",
      subtitle: "Recente cases",
      projects: [
        {
          title: "Binderbase",
          description:
            "Beheer je Pokemon kaarten, verzamelingen en binders met gemak. Alles overzichtelijk, veilig en intuitief op een plek.",
          image: "/BinderBase.svg",
          tags: ["Web App", "UX Design", "Frontend", "Backend"],
        },
        {
          title: "Project komt binnenkort",
          description: "Dit project vul ik later nog aan.",
          image: "/window.svg",
          tags: ["SaaS", "Dashboard", "In opbouw"],
        },
        {
          title: "Project komt binnenkort",
          description: "Dit project vul ik later nog aan.",
          image: "/globe.svg",
          tags: ["Brand Site", "Performance", "In opbouw"],
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
      welcome: "Open for new projects",
      greeting: "Hi, I am Andreas",
      headline:
        "I design and build modern digital experiences that are fast, thoughtful, and built to stand out.",
      ctaPrimary: "View My Work",
      ctaSecondary: "Contact",
      profileAlt: "Profile picture",
      highlights: ["UX-first", "Frontend + Product", "Fast and scalable"],
    },
    about: {
      title: "What I do",
      subtitle:
        "From design thinking to production code: I ship interfaces that feel clear and perform well.",
      cards: [
        {
          title: "Strategic UX",
          description: "From wireframes to pixel-perfect flows that feel intuitive.",
        },
        {
          title: "Fast development",
          description: "Modern stacks, clean components, and a strong focus on performance.",
        },
        {
          title: "Product collaboration",
          description: "Short feedback loops with stakeholders and iteration on real data.",
        },
      ],
    },
    featured: {
      title: "Featured Work",
      subtitle: "Recent cases",
      projects: [
        {
          title: "Binderbase",
          description:
            "Manage your Pokemon cards, collections, and binders with ease. Everything is organized, secure, and intuitive in one place.",
          image: "/BinderBase.svg",
          tags: ["Web App", "UX Design", "Backend", "Frontend"],
        },
        {
          title: "Project coming soon",
          description: "I will add this project later.",
          image: "/window.svg",
          tags: ["SaaS", "Dashboard", "In progress"],
        },
        {
          title: "Project coming soon",
          description: "I will add this project later.",
          image: "/globe.svg",
          tags: ["Brand Site", "Performance", "In progress"],
        },
      ],
      projectButton: "Explore Project",
      projectCoverAlt: "Project cover",
    },
  },
} as const;

export default function Home() {
  const { language } = useLanguage();
  const [heroPointer, setHeroPointer] = useState<PointerState>({
    x: 50,
    y: 50,
    active: false,
  });
  const t = content[language];

  const heroCardStyle = useMemo(
    () =>
      ({
        transform: `perspective(900px) rotateX(${
          heroPointer.active ? (50 - heroPointer.y) / 7 : 0
        }deg) rotateY(${heroPointer.active ? (heroPointer.x - 50) / 6 : 0}deg)`,
      }) as CSSProperties,
    [heroPointer.active, heroPointer.x, heroPointer.y],
  );

  const heroShineStyle = useMemo(
    () =>
      ({
        "--shine-x": `${heroPointer.x}%`,
        "--shine-y": `${heroPointer.y}%`,
      }) as CSSProperties,
    [heroPointer.x, heroPointer.y],
  );

  const revealStyle = (delay: number) =>
    ({
      "--reveal-delay": `${delay}ms`,
    }) as CSSProperties;

  const handleHeroMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    setHeroPointer({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
      active: true,
    });
  };

  const resetHeroPointer = () => {
    setHeroPointer({ x: 50, y: 50, active: false });
  };

  const handleProjectMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    event.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
    event.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
  };

  const resetProjectSpotlight = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--spotlight-x", "50%");
    event.currentTarget.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--color-bg)] text-slate-100">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="ambient-orb ambient-orb--one" />
        <div className="ambient-orb ambient-orb--two" />
        <div className="ambient-orb ambient-orb--three" />
        <div className="ambient-grid" />
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-12 sm:py-16">
        <section id="home" className="grid items-center gap-10 lg:grid-cols-2">
          <div className="reveal-item space-y-8" style={revealStyle(120)}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_72%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <span className="inline-flex h-2 w-2 rounded-full bg-[var(--color-highlight)] pulse-dot" />
              {t.hero.welcome}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t.hero.greeting}
            </h1>
            <h2 className="max-w-xl text-xl font-medium leading-relaxed text-slate-200 sm:text-2xl">
              {t.hero.headline}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#projects" className="primary-btn">
                {t.hero.ctaPrimary}
                <span className="primary-btn-arrow" aria-hidden>
                  {"->"}
                </span>
              </a>
              <a href="mailto:hello@andreas-schellekens.be" className="ghost-btn">
                {t.hero.ctaSecondary}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 sm:text-sm">
              {t.hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_60%,transparent)] px-3 py-1.5 tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal-item mx-auto w-full max-w-sm" style={revealStyle(260)}>
            <div
              className="profile-shell"
              style={heroCardStyle}
              onMouseMove={handleHeroMove}
              onMouseLeave={resetHeroPointer}
            >
              <div className="profile-shine" style={heroShineStyle} />
              <Image
                src="/andreas.png"
                alt={t.hero.profileAlt}
                width={400}
                height={400}
                unoptimized
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.04]"
              />
            </div>
          </div>
        </section>

        <section id="about" className="reveal-item space-y-8" style={revealStyle(160)}>
          <div className="max-w-3xl space-y-3">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{t.about.title}</h3>
            <p className="leading-relaxed text-slate-300">{t.about.subtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.cards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className="glass-panel reveal-item rounded-2xl p-5"
                style={revealStyle(220 + index * 80)}
              >
                <h4 className="text-lg font-semibold text-white">{card.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="reveal-item" style={revealStyle(200)}>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{t.featured.title}</h3>
            <span className="text-sm text-slate-300">{t.featured.subtitle}</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.featured.projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="project-card reveal-item group overflow-hidden rounded-2xl border border-[var(--color-surface)] bg-[var(--color-layer)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-accent)]"
                onMouseMove={handleProjectMove}
                onMouseLeave={resetProjectSpotlight}
                style={revealStyle(220 + index * 100)}
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
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.title}-${tag}`}
                        className="rounded-full border border-[var(--color-surface)] bg-[color-mix(in_srgb,var(--color-layer)_55%,transparent)] px-2.5 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
