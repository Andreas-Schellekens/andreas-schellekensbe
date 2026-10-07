import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n";

export const alt = "Andreas Schellekens | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const copy = {
  nl: { role: "Student Toegepaste Informatica · Thomas More", tagline: "Webapps, frontend en product thinking" },
  en: { role: "Applied Computer Science student · Thomas More", tagline: "Web apps, frontend and product thinking" },
} as const;

// Shared by every page under /[lang]; generated once per language at build time.
export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = copy[isLocale(lang) ? lang : DEFAULT_LOCALE];
  const portrait = await readFile(join(process.cwd(), "public/andreas.png"));
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #181A2F 0%, #242E49 60%, #37415C 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#FDA481" }}>Portfolio</div>
          <div style={{ marginTop: 24, fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Andreas Schellekens</div>
          <div style={{ marginTop: 28, fontSize: 27, color: "#dbeafe" }}>{t.role}</div>
          <div style={{ marginTop: 12, fontSize: 27, color: "#93c5fd" }}>{t.tagline}</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse only renders plain <img>. */}
        <img
          src={portraitSrc}
          alt=""
          width={300}
          height={345}
          style={{ borderRadius: 28, objectFit: "cover", border: "3px solid #FDA481" }}
        />
      </div>
    ),
    size,
  );
}
