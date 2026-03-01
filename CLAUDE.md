# Asmaa Salem - Specialized Life Coach Website

## Project Overview
Bilingual (Arabic RTL + English LTR) life coaching website for Asmaa Salem, specializing in Luscher Color Test psychology and MetaHealth. Built with Next.js 16 App Router.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (`@theme` tokens in `globals.css`, no config file)
- **Animations**: Framer Motion 12 (`ScrollReveal`, `StaggerChildren`)
- **Email**: Resend (contact form)
- **Font**: Cairo (Arabic) via `next/font/google`
- **Deployment**: Dokploy + Nixpacks

## Key Architecture

### i18n
- Locales: `ar` (default, RTL), `en` (LTR)
- All text in `src/lib/i18n/dictionaries/ar.json` and `en.json`
- Middleware redirects `/` to `/ar`
- Locale layout sets `dir`, `lang`, and `--color-accent` CSS variable

### Design Tokens
- Accent AR: `#ff523d` (orange-red), Accent EN: `#0195ff` (sky blue)
- Charcoal: `#2f353e`, Gray: `#abb8c3`
- Buttons: pill-shaped (`rounded-full`)
- Shadows: `--shadow-natural`, `--shadow-deep`

### Content Updates
Edit dictionary JSON files directly:
- `src/lib/i18n/dictionaries/ar.json` — Arabic content
- `src/lib/i18n/dictionaries/en.json` — English content
- Images in `public/images/` with descriptive subdirectories

## Commands
```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## File Structure
- `src/app/[locale]/` — Pages (homepage, about, instructors, testimonials, contact)
- `src/components/sections/` — Page section components
- `src/components/ui/` — Reusable UI primitives (Button, Container, Input, etc.)
- `src/components/layout/` — Header, Footer, MobileMenu
- `src/components/animation/` — ScrollReveal, StaggerChildren
- `src/lib/` — i18n config, constants, types, rate-limit
- `src/app/api/contact/` — Contact form POST handler

## Conventions
- Use CSS logical properties for RTL support (`ps-`, `pe-`, `ms-`, `me-`, `border-s-`)
- Use `var(--color-accent)` for theme-aware accent colors
- Server components by default; `'use client'` only when needed (forms, animations with state)
- All page sections wrapped in `ScrollReveal` for entrance animations
