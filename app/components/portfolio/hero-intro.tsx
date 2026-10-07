"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../language-provider";
import { useMotionSettings } from "../motion-provider";
import type { PortfolioLocale } from "./content";

type HeroIntroProps = {
  hero: PortfolioLocale["hero"];
};

export default function HeroIntro({ hero }: HeroIntroProps) {
  const { reducedMotion } = useMotionSettings();
  const { href } = useLanguage();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

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
  }, [deleting, hero.typingLines, phraseIndex, reducedMotion, typedText]);

  return (
    <section id="intro" className="portfolio-hero grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="space-y-8">
        {/* The heading is the first thing people see: render it immediately instead of fading in. */}
        <div>
          <h1 className="hero-title">{hero.greeting}</h1>
          <p className="hero-intro mt-5">{hero.intro}</p>
        </div>

        <motion.div
          className="hero-typing-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-typing-prefix">{hero.typingPrefix}</p>
          {reducedMotion ? (
            <p className="hero-typing-line">{hero.typingLines[0]}</p>
          ) : (
            <>
              {/* Screen readers get the full phrases once instead of every typed character. */}
              <p className="sr-only">{hero.typingLines.join(" ")}</p>
              <p className="hero-typing-line" aria-hidden>
                {typedText}
                <span className="hero-typing-caret">|</span>
              </p>
            </>
          )}
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href={href("/contact")} className="portfolio-btn-primary" data-cursor="interactive">
            {hero.ctaPrimary}
          </Link>
          <Link href={href("/projects")} className="portfolio-btn-secondary" data-cursor="interactive">
            {hero.ctaSecondary}
          </Link>
        </motion.div>

      </div>

      <div className="hero-portrait-wrapper">
        <article className="hero-portrait-card">
          <div className="hero-portrait-image-shell">
            <Image
              src="/andreas.png"
              alt={hero.profileAlt}
              width={560}
              height={640}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 90vw, 22rem"
              preload
              className="h-full w-full object-cover"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
