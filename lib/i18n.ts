export const LOCALES = ["nl", "en"] as const;

export type Language = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Language = "nl";

/** Cookie that remembers the visitor's language choice; read by `proxy.ts`. */
export const LOCALE_COOKIE = "site-language";

/** Public origin of the site, used for canonical URLs, the sitemap and Open Graph tags. */
export const SITE_URL = "https://andreas-schellekens.be";

export function isLocale(value: string | undefined): value is Language {
  return LOCALES.includes(value as Language);
}

/** Prefixes an app path (e.g. "/about") with the locale: "/en/about". */
export function localizePath(language: Language, path: string) {
  return path === "/" ? `/${language}` : `/${language}${path}`;
}

/** Strips the locale prefix from a pathname: "/en/about" -> "/about". */
export function stripLocale(pathname: string) {
  const [, first, ...rest] = pathname.split("/");
  if (!isLocale(first)) return pathname;
  return rest.length ? `/${rest.join("/")}` : "/";
}
