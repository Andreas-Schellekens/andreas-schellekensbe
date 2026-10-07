import type { Metadata } from "next";
import { MotionProvider } from "./components/motion-provider";
import NotFoundView from "./components/not-found-view";
import { ibmPlexMono, syne } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Andreas Schellekens",
};

export default function GlobalNotFound() {
  return (
    <html lang="nl" className={`antialiased ${syne.variable} ${ibmPlexMono.variable}`}>
      <body>
        <MotionProvider>
          <NotFoundView />
        </MotionProvider>
      </body>
    </html>
  );
}
