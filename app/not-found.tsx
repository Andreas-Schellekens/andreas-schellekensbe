"use client";

import Link from "next/link";
import ASCIIText from "./components/visuals/ASCIIText";
import FaultyTerminal from "./components/visuals/FaultyTerminal";
import styles from "./not-found.module.css";

export default function NotFound() {
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
        <h1 className={styles.title}>Pagina niet gevonden</h1>
        <p className={styles.body}>
          De link die je volgde bestaat niet (meer). Gebruik de knoppen hieronder om terug te keren naar de
          website.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>
            Terug naar home
          </Link>
          <Link href="/projects" className={styles.secondary}>
            Bekijk projecten
          </Link>
        </div>
      </div>
    </main>
  );
}
