@AGENTS.md

# Project notes

Personal portfolio of Andreas Schellekens (andreas-schellekens.be). Next.js 16.2 App Router + React 19.2, Tailwind CSS v4, framer-motion. Bilingual (NL default / EN).

## Commands

- `npm run dev` – dev server (Turbopack)
- `npm run build` – production build; run this plus `npm run lint` to verify changes
- `npm run lint` – ESLint flat config (`next lint` no longer exists in Next 16)
- If the build fails with stale route types after deleting a route, remove `.next/` and rebuild.

## Architecture

- **Locale routing:** every page lives under `app/[lang]/` (`/nl/...`, `/en/...`), so the server renders the right language and both are pre-rendered (`generateStaticParams` + `dynamicParams = false` in the layout).
  - `proxy.ts` redirects locale-less URLs (`/`, `/about`, …) using the `site-language` cookie, then `Accept-Language`, then `nl`. Its matcher skips `_next`, `sitemap.xml`, `robots.txt` and any path with a file extension.
  - `lib/i18n.ts` holds `LOCALES`, `isLocale`, `localizePath`, `stripLocale` and `SITE_URL` (`https://andreas-schellekens.be`).
  - `LanguageProvider` gets the language from the layout's `params`. `useLanguage()` returns `{ language, setLanguage, href }`; always build internal links with `href("/path")`. `setLanguage` sets the cookie and navigates to the same page in the other language.
- `app/[lang]/layout.tsx` is the root layout: fonts from `app/fonts.ts`, palette CSS variables (`--color-bg`, `--color-layer`, `--color-surface`, `--color-accent`, `--color-highlight`, `--color-deep`), then `MotionProvider` > `LanguageProvider` > `SiteHeader`.
- **Pages:** each route has a server `page.tsx` that only exports `generateMetadata` (via `pageMetadata()` in `lib/page-metadata.ts`) and renders a client `*-view.tsx`. Home renders `components/portfolio/portfolio-experience.tsx`. To add a page: add its path and NL/EN copy to `PAGE_PATHS`/`pageCopy` (this also adds it to the sitemap).
- **SEO files:** `app/sitemap.ts`, `app/robots.ts`, `app/[lang]/opengraph-image.tsx` (generated 1200×630 card per language; `pageMetadata` points subpages at it because a page-level `openGraph` replaces the inherited image).
- **404:** `app/global-not-found.tsx` (experimental `globalNotFound` flag in `next.config.ts`, needed because the root layout is dynamic) renders `components/not-found-view.tsx`, which detects the language from the URL or cookie. It has its own `<html>`, so it wraps itself in `MotionProvider`.
- `app/components/motion-provider.tsx`: reduced-motion setting via `useSyncExternalStore` (localStorage with an in-memory fallback). Don't reintroduce setState-in-effect; the React hooks lint rule rejects it.
- `app/components/use-media-query.ts`: SSR-safe media query hook (server/hydration value `false`).
- `app/components/portfolio/page-shell.tsx`: wraps every portfolio page with the cursor-reactive `ReactiveBackdrop` + `<main className="portfolio-main">`. The WebGL `FloatingLines` (three.js) is loaded with `next/dynamic` and only rendered at ≥768px on devices without data-saver or low memory.
- `app/components/portfolio/content.ts`: shared, typed copy, the project list (`featured: true` puts a project on the home page) and contact links.
- `app/components/visuals/`: WebGL effects for the 404 (ogl `FaultyTerminal`, three.js `ASCIIText`).
- `components/BorderGlow.*` and `app/components/portfolio/ScrollStack.*` are plain-JSX react-bits components.

## Conventions

- Every user-facing string needs both `nl` and `en`: a `content = { nl, en } as const` object read with `useLanguage()` (or `content.ts` for shared copy). This includes alt text, aria-labels and page metadata.
- Respect the motion toggle: read `useMotionSettings().reducedMotion` for anything animated outside framer-motion (framer picks it up through `MotionConfig`). With reduced motion, show static content.
- Above-the-fold content (hero heading, portraits) must not start at `opacity: 0`; it delays the first paint.
- Images go through `next/image` with a realistic `sizes`; never `unoptimized`. Use `preload` (not the deprecated `priority`) for the main above-the-fold image.
- Styling: semantic classes in `app/globals.css` mixed with Tailwind utilities; use the palette variables rather than new hard-coded colours, and keep body text at ≥88% opacity on the dark background. Remove CSS when you remove the component that used it.
- Shared easing curve: `[0.22, 1, 0.36, 1]`.
- Contact form: client-side validation with per-field localized errors (`noValidate`, `aria-invalid`, `aria-describedby`), posts to FormSubmit's AJAX endpoint, and never shows the provider's raw text.
- No shadcn/ui setup. If you need react-bits/shadcn components again, run `npx shadcn init` first.

## History

- The private `/18-04-26` page was extracted to a separate project (`C:\Users\Schel\Documents\PersonlijkeProjecten\Export`) and must not be added back here.
