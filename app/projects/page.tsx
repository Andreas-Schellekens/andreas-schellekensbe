"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent } from "react";
import ReactiveBackdrop from "../components/portfolio/reactive-backdrop";
import ScrollStack, { ScrollStackItem } from "../components/portfolio/ScrollStack";
import { portfolioContent } from "../components/portfolio/content";
import { useLanguage } from "../components/language-provider";

const pageContent = {
  nl: {
    badge: "Projecten",
    title: "Project Stack",
    intro: "Een dedicated overzicht van mijn projecten, gepresenteerd als interactieve scroll stack.",
    soonTitle: "jouw project binnenkort?",
    soonBody:
      "Heb je een idee dat je wilt uitwerken tot een sterk digitaal product? Ik denk graag met je mee.",
    soonCta: "Ga naar contact",
    soonStatus: "Volgende case",
  },
  en: {
    badge: "Projects",
    title: "Project Stack",
    intro: "A dedicated overview of my projects, presented as an interactive scroll stack.",
    soonTitle: "Your project soon?",
    soonBody: "Do you have an idea you want to shape into a strong digital product? I would love to help.",
    soonCta: "Go to contact",
    soonStatus: "Next case",
  },
} as const;

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = pageContent[language];
  const projects = portfolioContent[language].projects;

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
        <motion.section
          className="portfolio-section space-y-4"
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
        </motion.section>

        <section className="portfolio-section">
          <ScrollStack
            className="projects-scroll-stack"
            itemDistance={28}
            itemScale={0.035}
            itemStackDistance={20}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.86}
            useWindowScroll
          >
            {projects.items.map((project) => (
              <ScrollStackItem key={project.title} itemClassName="projects-stack-item">
                <article className="projects-stack-shell">
                  <div className={`projects-stack-media ${project.imagePanelClass ?? ""}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      width={980}
                      height={600}
                      unoptimized
                      className={`h-full w-full object-cover object-top ${project.imageClass ?? ""}`}
                    />
                    <span className="projects-stack-chip">{projects.hoverLabel}</span>
                  </div>

                  <div className="projects-stack-content">
                    <p className="projects-stack-meta">
                      <span>{project.year}</span>
                      <span>{project.status}</span>
                    </p>
                    <h2 className="projects-stack-title">{project.title}</h2>
                    <p className="projects-stack-description">{project.description}</p>

                    <div className="projects-stack-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.title}-${tag}`} className="project-stage-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="portfolio-btn-secondary projects-stack-link"
                      >
                        {projects.openLabel}
                      </a>
                    ) : (
                      <span className="portfolio-btn-secondary projects-stack-link projects-stack-link-disabled">
                        {projects.noLinkLabel}
                      </span>
                    )}
                  </div>
                </article>
              </ScrollStackItem>
            ))}

            <ScrollStackItem itemClassName="projects-stack-item projects-stack-item-cta">
              <article className="projects-stack-shell projects-stack-shell-cta">
                <div className="projects-stack-content projects-stack-content-cta">
                  <p className="projects-stack-meta">
                    <span>2026</span>
                    <span>{t.soonStatus}</span>
                  </p>
                  <h2 className="projects-stack-title">{t.soonTitle}</h2>
                  <p className="projects-stack-description">{t.soonBody}</p>
                  <Link href="/contact" className="portfolio-btn-primary projects-stack-link-primary">
                    {t.soonCta}
                  </Link>
                </div>
              </article>
            </ScrollStackItem>
          </ScrollStack>
        </section>
      </main>
    </div>
  );
}
