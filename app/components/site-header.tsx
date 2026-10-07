"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { useMotionSettings } from "./motion-provider";
import { stripLocale } from "@/lib/i18n";

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
    motionLabel: "Animaties",
    motionOn: "Aan",
    motionOff: "Uit",
    openMenu: "Navigatiemenu openen",
    closeMenu: "Navigatiemenu sluiten",
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
    motionLabel: "Motion",
    motionOn: "On",
    motionOff: "Off",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },
} as const;

export default function SiteHeader() {
  const pathname = stripLocale(usePathname());
  const { language, setLanguage, href } = useLanguage();
  const { reducedMotion, setReducedMotion } = useMotionSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = labels[language];

  const navItems = [
    { href: href("/"), label: t.home, isActive: pathname === "/" },
    { href: href("/about"), label: t.about, isActive: pathname.startsWith("/about") },
    { href: href("/projects"), label: t.projects, isActive: pathname.startsWith("/projects") },
    { href: href("/contact"), label: t.contact, isActive: pathname.startsWith("/contact") },
  ] as const;

  return (
    <header className="site-header sticky inset-x-0 top-0 z-50">
      <nav className="site-nav flex flex-wrap items-center justify-between gap-3 py-3 sm:flex-nowrap">
        <Link href={href("/")} className="site-brand" onClick={() => setIsMobileMenuOpen(false)}>
          {t.brand}
        </Link>

        <button
          type="button"
          className="site-menu-btn sm:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-menu"
          aria-label={isMobileMenuOpen ? t.closeMenu : t.openMenu}
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
                <Link
                  href={item.href}
                  className={`site-nav-link ${item.isActive ? "site-nav-link-active" : ""}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="site-controls">
            <div className="site-lang-corner">
              <span className="site-control-label">{t.languageLabel}</span>
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

            <div className="site-motion-corner">
              <span className="site-control-label">{t.motionLabel}</span>
              <div className="site-toggle">
                <button
                  type="button"
                  onClick={() => setReducedMotion(false)}
                  className={`site-toggle-btn ${!reducedMotion ? "site-toggle-btn-active" : ""}`}
                  aria-pressed={!reducedMotion}
                >
                  {t.motionOn}
                </button>
                <button
                  type="button"
                  onClick={() => setReducedMotion(true)}
                  className={`site-toggle-btn ${reducedMotion ? "site-toggle-btn-active" : ""}`}
                  aria-pressed={reducedMotion}
                >
                  {t.motionOff}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
