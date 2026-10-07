# andreas-schellekens.be

Personal portfolio of Andreas Schellekens, built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and framer-motion. The site is bilingual (Dutch / English) and has a user-controlled motion toggle.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                 |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint (flat config)     |

## Structure

```
app/
  layout.tsx                 Root layout: fonts, palette variables, providers, header
  page.tsx                   Home (renders PortfolioExperience)
  about/ projects/ contact/ cv/
  not-found.tsx              404 with WebGL terminal + ASCII effect
  components/
    language-provider.tsx    NL/EN state, persisted in localStorage
    motion-provider.tsx      Reduced-motion state (follows OS setting until the user chooses)
    site-header.tsx          Navigation + language/motion toggles
    portfolio/
      content.ts             Shared portfolio copy and project list (per language)
      page-shell.tsx         Page wrapper: cursor-reactive backdrop + <main>
      ...                    Hero, contact dock, scroll stack, backdrop effects
    visuals/                 FaultyTerminal (ogl) and ASCIIText (three.js) for the 404
components/BorderGlow.*      Glow card used on the home page
public/                      Images and the CV PDF
```

## Conventions

- Page copy lives in a `content = { nl, en } as const` object and is read through `useLanguage()`.
- Styling is mostly semantic classes in `app/globals.css`, mixed with Tailwind utilities. Palette tokens (`--color-bg`, `--color-accent`, …) are set in `app/layout.tsx`.
- Animations should respect `useMotionSettings().reducedMotion`; framer-motion picks this up automatically through `MotionConfig`.
- The contact form posts to [FormSubmit](https://formsubmit.co). The first submission sends an activation email that must be confirmed once.
