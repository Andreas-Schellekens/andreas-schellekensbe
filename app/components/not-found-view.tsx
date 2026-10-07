"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE, localizePath, type Language } from "@/lib/i18n";
import ASCIIText from "./visuals/ASCIIText";
import FaultyTerminal from "./visuals/FaultyTerminal";
import styles from "./not-found-view.module.css";

const content = {
  nl: {
    title: "Pagina niet gevonden",
    body: "De link die je volgde bestaat niet (meer). Gebruik de knoppen hieronder om terug te keren naar de website.",
    home: "Terug naar home",
    projects: "Bekijk projecten",
  },
  en: {
    title: "Page not found",
    body: "The link you followed does not exist (anymore). Use the buttons below to return to the website.",
    home: "Back to home",
    projects: "View projects",
  },
} as const;

// The 404 renders outside the [lang] layout, so derive the language from the URL or the saved cookie.
function detectLanguage(): Language {
  const fromPath = window.location.pathname.split("/")[1];
  if (isLocale(fromPath)) return fromPath;

  const fromCookie = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]+)`))?.[1];
  return isLocale(fromCookie) ? fromCookie : DEFAULT_LOCALE;
}

const subscribe = () => () => {};

export default function NotFoundView() {
  const language = useSyncExternalStore(subscribe, detectLanguage, () => DEFAULT_LOCALE);
  const t = content[language];

  return (
    <main className={styles.root}>
      <div className={styles.backdrop} aria-hidden="true">
        <FaultyTerminal
          className={styles.terminal}
          scale={1.45}
          gridMul={[2, 1]}
          digitSize={1.15}
          timeScale={0.55}
          pause={false}
          scanlineIntensity={0.7}
          glitchAmount={1.08}
          flickerAmount={0.7}
          noiseAmp={0.35}
          chromaticAberration={0.6}
          dither={0}
          curvature={0.18}
          tint="#bcd3ff"
          mouseReact
          mouseStrength={0.25}
          pageLoadAnimation
          brightness={0.65}
        />
      </div>

      <div className={styles.ascii} aria-hidden="true">
        <ASCIIText text="404" enableWaves={false} asciiFontSize={9} textFontSize={260} />
      </div>

      <div className={styles.content}>
        <span className={styles.kicker}>404</span>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.body}>{t.body}</p>
        <div className={styles.actions}>
          <Link href={localizePath(language, "/")} className={styles.primary}>
            {t.home}
          </Link>
          <Link href={localizePath(language, "/projects")} className={styles.secondary}>
            {t.projects}
          </Link>
        </div>
      </div>
    </main>
  );
}
