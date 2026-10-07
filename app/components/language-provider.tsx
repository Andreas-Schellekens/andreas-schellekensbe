"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo } from "react";
import { LOCALE_COOKIE, localizePath, stripLocale, type Language } from "@/lib/i18n";

export type { Language };

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Prefixes an app path with the current language: href("/about") -> "/en/about". */
  href: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// The language lives in the URL (/nl/..., /en/...), so the server renders the right
// language from the first byte. The cookie only tells proxy.ts where to send "/" next time.
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
      router.push(localizePath(next, stripLocale(pathname)), { scroll: false });
    },
    [language, pathname, router],
  );

  const href = useCallback((path: string) => localizePath(language, path), [language]);

  const value = useMemo(() => ({ language, setLanguage, href }), [language, setLanguage, href]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
