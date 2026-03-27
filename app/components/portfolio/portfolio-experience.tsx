"use client";

import { motion, useMotionValue } from "framer-motion";
import { type PointerEvent } from "react";
import { useLanguage } from "../language-provider";
import BorderGlow from "@/components/BorderGlow";
import ContactDock from "./contact-dock";
import { portfolioContent } from "./content";
import HeroIntro from "./hero-intro";
import ProjectStage from "./project-stage";
import ReactiveBackdrop from "./reactive-backdrop";

type IconProps = {
  className?: string;
};

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0Zm13.58 8.47c0-3.35-1.79-4.91-4.18-4.91a3.63 3.63 0 0 0-3.27 1.8V8.5H9.91V20h3.38v-6.04c0-1.59.3-3.12 2.26-3.12 1.94 0 1.97 1.81 1.97 3.22V20h3.38v-6.59Z" />
    </svg>
  );
}

function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.09.67-.2.67-.48v-1.67c-2.73.58-3.3-1.18-3.3-1.18-.46-1.13-1.1-1.43-1.1-1.43-.9-.6.07-.59.07-.59 1 .07 1.53 1.03 1.53 1.03.88 1.55 2.32 1.1 2.88.84.09-.65.34-1.1.62-1.35-2.18-.25-4.47-1.13-4.47-5a3.96 3.96 0 0 1 1.03-2.75c-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.78 1.05.8-.23 1.67-.34 2.53-.34.86 0 1.73.1 2.53.34 1.93-1.33 2.77-1.05 2.77-1.05.56 1.4.22 2.44.11 2.7a3.9 3.9 0 0 1 1.03 2.75c0 3.88-2.3 4.75-4.49 5 .35.3.67.9.67 1.82v2.7c0 .28.19.58.68.48A9.8 9.8 0 0 0 12 2.2Z" />
    </svg>
  );
}

function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.1" y="5.2" width="17.8" height="13.6" rx="2.2" />
      <path d="m4.4 7.2 7.6 6.1 7.6-6.1" />
    </svg>
  );
}

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
        <HeroIntro key={language} hero={t.hero} contactEmail={t.contact.email} />

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
              <motion.div
                key={card.title}
                className={index === 1 ? "trajectory-card-middle" : ""}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                custom={index}
              >
                <BorderGlow
                  className="trajectory-border-glow"
                  borderRadius={18}
                  glowRadius={30}
                  glowIntensity={0.82}
                  glowColor="214 88 72"
                  colors={["#96BCFF", "#4F73CD", "#FDA481"]}
                  backgroundColor="#152340"
                  fillOpacity={0.34}
                  edgeSensitivity={24}
                  coneSpread={24}
                >
                  <article className="trajectory-card">
                    <p className="trajectory-card-metric">{card.metric}</p>
                    <h3 className="trajectory-card-title">{card.title}</h3>
                    <p className="trajectory-card-body">{card.body}</p>
                  </article>
                </BorderGlow>
              </motion.div>
            ))}
          </div>
        </section>

        <ProjectStage projects={t.projects} />

        <section id="contact" className="portfolio-section">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactDock
              items={[
                {
                  href: `mailto:${t.contact.email}`,
                  label: t.contact.emailLabel,
                  description: t.contact.email,
                  icon: <MailIcon className="contact-dock-icon" />,
                },
                {
                  href: t.contact.linkedinUrl,
                  label: t.contact.linkedinLabel,
                  description: t.contact.linkedinName,
                  icon: <LinkedInIcon className="contact-dock-icon" />,
                },
                {
                  href: t.contact.githubUrl,
                  label: t.contact.githubLabel,
                  description: t.contact.githubName,
                  icon: <GitHubIcon className="contact-dock-icon" />,
                },
              ]}
            />
          </motion.div>
        </section>
      </main>
    </div>
  );
}
