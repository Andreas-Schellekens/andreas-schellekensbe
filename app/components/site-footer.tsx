"use client";

import { portfolioContent } from "./portfolio/content";
import { useLanguage } from "./language-provider";
import { useMotionSettings } from "./motion-provider";

const labels = {
  nl: {
    tagline: "Student Toegepaste Informatica · Thomas More",
    email: "E-mail",
    backToTop: "Terug naar boven",
  },
  en: {
    tagline: "Applied Computer Science student · Thomas More",
    email: "Email",
    backToTop: "Back to top",
  },
} as const;

export default function SiteFooter() {
  const { language } = useLanguage();
  const { reducedMotion } = useMotionSettings();
  const t = labels[language];
  const contact = portfolioContent[language].contact;

  const links = [
    { href: `mailto:${contact.email}`, label: t.email },
    { href: contact.linkedinUrl, label: contact.linkedinLabel, external: true },
    { href: contact.githubUrl, label: contact.githubLabel, external: true },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-identity">
          <p className="site-footer-brand">Andreas Schellekens</p>
          <p className="site-footer-tagline">{t.tagline}</p>
        </div>

        <ul className="site-footer-links">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="site-footer-link"
                {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="site-footer-bottom">
          {/* Prerendered at build time; the client fills in the current year. */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} Andreas Schellekens</p>
          <button
            type="button"
            className="site-footer-top"
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          >
            {t.backToTop}
            <span aria-hidden="true"> ↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
