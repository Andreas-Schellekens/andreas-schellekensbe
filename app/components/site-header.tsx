"use client";

import { useEffect, useState } from "react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = labels[language];
  const projectsHref = pathname === "/" ? "#projects" : "/#projects";

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: t.home, isActive: pathname === "/", external: false },
    { href: "/about", label: t.about, isActive: pathname.startsWith("/about"), external: false },
    { href: projectsHref, label: t.projects, isActive: false, external: false },
    { href: "mailto:andreas.schellekens8@gmail.com", label: t.contact, isActive: false, external: true },
  ] as const;

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 sm:sticky">
      <nav className="site-nav mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6">
        <Link href="/" className="site-brand" onClick={() => setIsMobileMenuOpen(false)}>
          {t.brand}
        </Link>

        <button
          type="button"
          className="site-menu-btn sm:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-menu"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span className={`site-menu-btn-line ${isMobileMenuOpen ? "site-menu-btn-line-top-open" : ""}`} />
          <span className={`site-menu-btn-line ${isMobileMenuOpen ? "site-menu-btn-line-middle-open" : ""}`} />
          <span className={`site-menu-btn-line ${isMobileMenuOpen ? "site-menu-btn-line-bottom-open" : ""}`} />
        </button>

        <div
          id="site-mobile-menu"
          className={`site-menu-panel ${isMobileMenuOpen ? "site-menu-panel-open" : ""} sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-3`}
        >
          <ul className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    className={`site-nav-link ${item.isActive ? "site-nav-link-active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`site-nav-link ${item.isActive ? "site-nav-link-active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="site-lang-corner">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{t.languageLabel}</span>
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
        </div>
      </nav>
    </header>
  );
}
