# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

cketloom is a marketing/landing page for an e-invoicing infrastructure API for Thailand. It's a single-page Next.js 16 app (App Router) with no backend logic — purely a static marketing site.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build (TypeScript errors are ignored via `ignoreBuildErrors: true` in next.config.mjs)
- `pnpm lint` — run ESLint

## Architecture

- **Single page app**: `app/page.tsx` composes all sections (Hero, Philosophy, FeaturedProducts, Technology, Gallery, Collection, Editorial, Testimonials, Footer) plus a sticky Header
- **Section components**: `components/sections/` — each section is a self-contained component
- **UI primitives**: `components/ui/` — shadcn/ui components (Radix-based), do not manually edit these
- **Styling**: Tailwind CSS v4 via PostCSS (`@import 'tailwindcss'` in `globals.css`), with CSS custom properties for theming (light/dark). Custom animations defined in `globals.css`
- **Path alias**: `@/*` maps to project root
- **Package manager**: pnpm
- **Fonts**: Inter (via `next/font/google`), plus custom `--font-display` and `--font-mono` defined in CSS
- **Images**: unoptimized (`next.config.mjs`), uses a custom `FadeImage` wrapper component
