import type { Metadata } from "next";
import { LOCALES, localizePath, SITE_URL, type Language } from "./i18n";

export const SITE_NAME = "Andreas Schellekens";

/** App paths (without locale prefix) of every portfolio page; also drives the sitemap. */
export const PAGE_PATHS = ["/", "/about", "/projects", "/contact", "/cv"] as const;

export type PagePath = (typeof PAGE_PATHS)[number];

const pageCopy: Record<PagePath, Record<Language, { title: string; description: string }>> = {
  "/": {
    nl: {
      title: "Andreas Schellekens | Portfolio",
      description:
        "Portfolio van Andreas Schellekens, student Toegepaste Informatica aan Thomas More: webapps, frontend en product thinking.",
    },
    en: {
      title: "Andreas Schellekens | Portfolio",
      description:
        "Portfolio of Andreas Schellekens, Applied Computer Science student at Thomas More: web apps, frontend and product thinking.",
    },
  },
  "/about": {
    nl: {
      title: "Over mij",
      description: "Mijn traject in IT, waarom ik voor Toegepaste Informatica koos, mijn ambities en skills.",
    },
    en: {
      title: "About",
      description: "My journey in IT, why I chose Applied Computer Science, my ambitions and skills.",
    },
  },
  "/projects": {
    nl: {
      title: "Projecten",
      description: "Overzicht van mijn projecten: Binderbase, spuddy.be, Poutrel en meer.",
    },
    en: {
      title: "Projects",
      description: "An overview of my projects: Binderbase, spuddy.be, Poutrel and more.",
    },
  },
  "/contact": {
    nl: {
      title: "Contact",
      description: "Stuur me een bericht over je project, of bereik me via LinkedIn of GitHub.",
    },
    en: {
      title: "Contact",
      description: "Send me a message about your project, or reach me through LinkedIn or GitHub.",
    },
  },
  "/cv": {
    nl: {
      title: "CV",
      description: "Bekijk of download het CV van Andreas Schellekens.",
    },
    en: {
      title: "CV",
      description: "View or download the CV of Andreas Schellekens.",
    },
  },
};

const ogLocale: Record<Language, string> = { nl: "nl_BE", en: "en_US" };

export function pageMetadata(language: Language, path: PagePath): Metadata {
  const { title, description } = pageCopy[path][language];
  const url = localizePath(language, path);
  const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
  // A page-level openGraph object replaces the inherited one, so point at app/[lang]/opengraph-image explicitly.
  const image = { url: `/${language}/opengraph-image`, width: 1200, height: 630, alt: `${SITE_NAME} | Portfolio` };

  return {
    // The home title is already complete; other pages get " | Andreas Schellekens" from the layout template.
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((locale) => [locale, localizePath(locale, path)])),
        "x-default": localizePath("nl", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: ogLocale[language],
      alternateLocale: LOCALES.filter((locale) => locale !== language).map((locale) => ogLocale[locale]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Portfolio`,
    template: `%s | ${SITE_NAME}`,
  },
};
