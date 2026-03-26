"use client";

import { motion, useMotionValue } from "framer-motion";
import { type PointerEvent } from "react";
import { useLanguage } from "../language-provider";
import { portfolioContent } from "./content";
import HeroIntro from "./hero-intro";
import ProjectStage from "./project-stage";
import ReactiveBackdrop from "./reactive-backdrop";

const cardVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function PortfolioExperience() {
  const { language } = useLanguage();
  const t = portfolioContent[language];

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
        <HeroIntro key={language} hero={t.hero} />

        <section id="trajectory" className="portfolio-section space-y-8">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.42 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="portfolio-section-title">{t.trajectory.title}</h2>
            <p className="portfolio-section-subtitle">{t.trajectory.subtitle}</p>
          </motion.div>

          <div className="trajectory-grid">
            {t.trajectory.cards.map((card, index) => (
              <motion.article
                key={card.title}
                className={`trajectory-card ${index === 1 ? "trajectory-card-middle" : ""}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                custom={index}
              >
                <p className="trajectory-card-metric">{card.metric}</p>
                <h3 className="trajectory-card-title">{card.title}</h3>
                <p className="trajectory-card-body">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <ProjectStage projects={t.projects} />

        <section id="contact" className="portfolio-contact-card">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="portfolio-contact-title">{t.contact.title}</h2>
            <p className="portfolio-contact-body">{t.contact.body}</p>
            <div className="portfolio-contact-links">
              <a href={`mailto:${t.contact.email}`} data-cursor="interactive">
                <span>{t.contact.emailLabel}</span>
                <strong>{t.contact.email}</strong>
              </a>
              <a href={t.contact.socialUrl} target="_blank" rel="noreferrer" data-cursor="interactive">
                <span>{t.contact.socialLabel}</span>
                <strong>{t.contact.socialName}</strong>
              </a>
            </div>
            <p className="portfolio-contact-footer">{t.contact.footer}</p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
