import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, isLocale, type Language } from "./lib/i18n";

function preferredLocale(request: NextRequest): Language {
  const fromCookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  // Accept-Language looks like "en-US,en;q=0.9,nl;q=0.8". Pick the highest-weighted supported language.
  const accepted = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((param) => param.trim().startsWith("q="));
      return { language: tag.split("-")[0].toLowerCase(), weight: q ? Number(q.trim().slice(2)) : 1 };
    })
    .filter((entry) => LOCALES.includes(entry.language as Language))
    .sort((a, b) => b.weight - a.weight);

  return (accepted[0]?.language as Language | undefined) ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, metadata routes and any file with an extension (images, the CV PDF, icon.svg, ...).
  matcher: ["/((?!_next|sitemap.xml|robots.txt|.*\\..*).*)"],
};
