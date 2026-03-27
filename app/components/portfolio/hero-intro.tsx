"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { PortfolioLocale } from "./content";

type HeroIntroProps = {
  hero: PortfolioLocale["hero"];
  contactEmail: string;
};

export default function HeroIntro({ hero, contactEmail }: HeroIntroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = hero.typingLines[phraseIndex] ?? "";
    const isTypingForward = !deleting;
    const reachedEnd = typedText === currentPhrase;
    const reachedStart = typedText.length === 0;

    let delay = isTypingForward ? 74 : 46;

    if (reachedEnd && isTypingForward) {
      delay = 1250;
    }

    if (reachedStart && !isTypingForward) {
      delay = 260;
    }

    const timer = window.setTimeout(() => {
      if (isTypingForward) {
        if (reachedEnd) {
          setDeleting(true);
          return;
        }

        setTypedText(currentPhrase.slice(0, typedText.length + 1));
        return;
      }

      if (reachedStart) {
        setDeleting(false);
        setPhraseIndex((previous) => (previous + 1) % hero.typingLines.length);
        return;
      }

      setTypedText(currentPhrase.slice(0, typedText.length - 1));
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [deleting, hero.typingLines, phraseIndex, typedText]);

  return (
    <section id="intro" className="portfolio-hero grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero-title">{hero.greeting}</h1>
          <p className="hero-intro mt-5">{hero.intro}</p>
        </motion.div>

        <motion.div
          className="hero-typing-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-typing-prefix">{hero.typingPrefix}</p>
          <p className="hero-typing-line" aria-live="polite">
            {typedText}
            <span className="hero-typing-caret" aria-hidden>
              |
            </span>
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href={`mailto:${contactEmail}`} className="portfolio-btn-primary" data-cursor="interactive">
            {hero.ctaPrimary}
          </a>
          <a href="#projects" className="portfolio-btn-secondary" data-cursor="interactive">
            {hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.ul
          className="flex flex-wrap items-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44, duration: 0.55 }}
        >
          {hero.badges.map((badge) => (
            <li key={badge} className="hero-badge">
              {badge}
            </li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        className="hero-portrait-wrapper"
        initial={{ opacity: 0, y: 22, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.14, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <article className="hero-portrait-card">
          <div className="hero-portrait-image-shell">
            <Image
              src="/andreas.png"
              alt={hero.profileAlt}
              width={560}
              height={640}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>
        </article>
      </motion.div>
    </section>
  );
}
