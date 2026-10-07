@AGENTS.md

# Project notes

Personal portfolio of Andreas Schellekens (andreas-schellekens.be). Next.js 16.2 App Router + React 19.2, Tailwind CSS v4, framer-motion. Bilingual (NL default / EN).

## Commands

- `npm run dev` – dev server (Turbopack)
- `npm run build` – production build; run this plus `npm run lint` to verify changes
- `npm run lint` – ESLint flat config (`next lint` no longer exists in Next 16)
- If the build fails with stale route types after deleting a route, remove `.next/` and rebuild.

## Architecture

- `app/layout.tsx` – fonts (Syne for body text, IBM Plex Mono for mono), palette CSS variables (`--color-bg`, `--color-layer`, `--color-surface`, `--color-accent`, `--color-highlight`, `--color-deep`), then `MotionProvider` > `LanguageProvider` > `SiteHeader`.
- Routes: `/` (`components/portfolio/portfolio-experience.tsx`), `/about`, `/projects`, `/contact`, `/cv`, plus `not-found.tsx`.
- `app/components/language-provider.tsx` / `motion-provider.tsx` – persisted settings via `useSyncExternalStore` (localStorage, with an in-memory fallback). Don't reintroduce setState-in-effect; the React hooks lint rule rejects it.
- `app/components/portfolio/page-shell.tsx` – wraps every portfolio page: cursor-reactive `ReactiveBackdrop` + `<main className="portfolio-main">`. New pages should use it instead of copying the cursor logic.
- `app/components/portfolio/content.ts` – shared, typed copy and the project list, plus contact links (email/LinkedIn/GitHub). The contact page reads its links from here.
- `app/components/visuals/` – WebGL effects for the 404 (ogl `FaultyTerminal`, three.js `ASCIIText`).
- `components/BorderGlow.*` and `app/components/portfolio/ScrollStack.*` are plain-JSX react-bits components.

## Conventions

- Every user-facing string needs both `nl` and `en`: a `content = { nl, en } as const` object read with `useLanguage()` (or `content.ts` for shared copy). This includes alt text and aria-labels.
- Respect the motion toggle: read `useMotionSettings().reducedMotion` for anything animated outside framer-motion (framer picks it up through `MotionConfig`). With reduced motion, show static content.
- Styling: semantic classes in `app/globals.css` mixed with Tailwind utilities; use the palette variables rather than new hard-coded colours. Remove CSS when you remove the component that used it.
- Shared easing curve: `[0.22, 1, 0.36, 1]`.
- Contact form posts to FormSubmit's AJAX endpoint; show localized error messages, never the provider's raw text.
- No shadcn/ui setup. If you need react-bits/shadcn components again, run `npx shadcn init` first.

## History

- The private `/18-04-26` page was extracted to a separate project (`C:\Users\Schel\Documents\PersonlijkeProjecten\Export`) and must not be added back here.
