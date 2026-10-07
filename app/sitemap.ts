import type { MetadataRoute } from "next";
import { LOCALES, localizePath, SITE_URL } from "@/lib/i18n";
import { PAGE_PATHS } from "@/lib/page-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((alt) => [alt, `${SITE_URL}${localizePath(alt, path)}`])),
      },
    })),
  );
}
