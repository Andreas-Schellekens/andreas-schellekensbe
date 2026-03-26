"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";

const labels = {
  nl: {
    brand: "Andreas Schellekens",
    home: "Home",
    about: "Over mij",
    projects: "Projecten",
    contact: "Contact",
    dutch: "NL",
    english: "EN",
    languageLabel: "Taal",
  },
  en: {
    brand: "Andreas Schellekens",
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    dutch: "NL",
    english: "EN",
    languageLabel: "Language",
  },
} as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const t = labels[language];
  const projectsHref = pathname === "/" ? "#projects" : "/#projects";

  return (
    <header className="site-header sticky top-0 z-50">
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 pr-28 sm:px-6 sm:pr-36">
        <Link href="/" className="site-brand">
          {t.brand}
        </Link>

        <div className="site-lang-corner flex items-center gap-2">
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:inline">
            {t.languageLabel}
          </span>
          <div className="site-toggle">
            <button
              type="button"
              onClick={() => setLanguage("nl")}
              className={`site-toggle-btn ${language === "nl" ? "site-toggle-btn-active" : ""}`}
              aria-pressed={language === "nl"}
            >
              {t.dutch}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`site-toggle-btn ${language === "en" ? "site-toggle-btn-active" : ""}`}
              aria-pressed={language === "en"}
            >
              {t.english}
            </button>
          </div>
        </div>

        <ul className="order-3 flex w-full items-center justify-center gap-1 pt-1 sm:order-none sm:w-auto sm:pt-0">
          <li>
            <Link href="/" className={`site-nav-link ${pathname === "/" ? "site-nav-link-active" : ""}`}>
              {t.home}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`site-nav-link ${pathname.startsWith("/about") ? "site-nav-link-active" : ""}`}
            >
              {t.about}
            </Link>
          </li>
          <li>
            <Link href={projectsHref} className="site-nav-link">
              {t.projects}
            </Link>
          </li>
          <li>
            <a href="mailto:andreas.schellekens8@gmail.com" className="site-nav-link">
              {t.contact}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
