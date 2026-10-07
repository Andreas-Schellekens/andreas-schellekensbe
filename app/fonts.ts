import { IBM_Plex_Mono, Syne } from "next/font/google";

// Shared by the [lang] root layout and global-not-found, which both render <html>.
export const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
