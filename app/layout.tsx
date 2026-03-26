import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne } from "next/font/google";
import { LanguageProvider } from "./components/language-provider";
import SiteHeader from "./components/site-header";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const palette = {
  bg: "#181A2F",
  layer: "#242E49",
  surface: "#37415C",
  accent: "#FDA481",
  highlight: "#B4182D",
  deep: "#54162B",
};

export const metadata: Metadata = {
  title: "Andreas Schellekens | Portfolio",
  description: "Interactive portfolio experience by Andreas Schellekens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${syne.variable} ${ibmPlexMono.variable} h-full antialiased`}
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
        <LanguageProvider>
          <SiteHeader />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
