import type { Metadata } from "next";
import { IBM_Plex_Mono, Syne, Geist } from "next/font/google";
import { LanguageProvider } from "./components/language-provider";
import SiteHeader from "./components/site-header";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={cn("h-full", "antialiased", syne.variable, ibmPlexMono.variable, "font-sans", geist.variable)}
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
