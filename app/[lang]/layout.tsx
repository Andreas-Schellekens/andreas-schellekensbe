import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GlassSheen from "../components/glass-sheen";
import { LanguageProvider } from "../components/language-provider";
import { MotionProvider } from "../components/motion-provider";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
import { ibmPlexMono, syne } from "../fonts";
import { isLocale, LOCALES } from "@/lib/i18n";
import { rootMetadata } from "@/lib/page-metadata";
import "../globals.css";

const palette = {
  bg: "#181A2F",
  layer: "#242E49",
  surface: "#37415C",
  accent: "#FDA481",
  highlight: "#B4182D",
  deep: "#54162B",
};

export const metadata: Metadata = rootMetadata;

// Only /nl and /en exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`h-full antialiased ${syne.variable} ${ibmPlexMono.variable}`}
      style={
        {
          "--color-bg": palette.bg,
          "--color-layer": palette.layer,
          "--color-surface": palette.surface,
          "--color-accent": palette.accent,
          "--color-highlight": palette.highlight,
          "--color-deep": palette.deep,
        } as React.CSSProperties
      }
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <GlassSheen />
          <LanguageProvider language={lang}>
            <SiteHeader />
            {children}
            <SiteFooter />
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
