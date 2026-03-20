import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
  title: "Portfolio",
  description: "Modern portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
