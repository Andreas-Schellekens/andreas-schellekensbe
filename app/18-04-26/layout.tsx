import type { Metadata } from "next";
import { Dancing_Script, Nunito, Playfair_Display } from "next/font/google";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--love-font-script",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--love-font-display",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--love-font-body",
});

export const metadata: Metadata = {
  title: "18.04.26",
  description: "A private little note.",
};

export default function LoveLayout({ children }: { children: React.ReactNode }) {
  return (
    <section
      className={`${dancingScript.variable} ${playfair.variable} ${nunito.variable} min-h-svh overflow-x-hidden bg-[#fff7f7] text-[#4b1720]`}
    >
      {children}
    </section>
  );
}
