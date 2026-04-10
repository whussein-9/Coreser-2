# Coreser — Enterprise Cybersecurity Platform

## Project Overview

A multi-page marketing website for **Coreser**, an enterprise-grade cybersecurity platform targeting mid-market businesses.

**Brand**: White and sage green color palette (#8A9A5B ≈ hsl(95, 26%, 48%))  
**Fonts**: DM Sans (body) + Outfit (display headings)  
**Stack**: React + TypeScript + Vite (static build — GitHub Pages compatible)

---

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `pages/Home.tsx` | Homepage with Hero, Security Gap, How It Works preview, Modular Architecture, CISA Framework, CTA, Contact |
| `/how-it-works` | `pages/HowItWorks.tsx` | 5-step visual journey with timeline layout |
| `/features` | `pages/FeaturesPage.tsx` | Detailed feature sections + comparison table |
| `/pricing` | `pages/Pricing.tsx` | Interactive module-based pricing builder |
| `/industries` | `pages/Industries.tsx` | Healthcare, Fintech, Retail, Manufacturing, SaaS |
| `/resources` | `pages/Resources.tsx` | Blog, Security Quiz, Case Studies, Employee Survey |

---

## Architecture

### Frontend (`client/src/`)
- **Components**: `Navbar.tsx`, `Footer.tsx`, `ContactSection.tsx`
- **Pages**: All 6 pages listed above + `not-found.tsx`
- **Routing**: `wouter` (SPA routing)
- **Animations**: `framer-motion`
- **Data fetching**: `@tanstack/react-query`
- **Forms**: `react-hook-form` + `zod` validation

### Static Deployment
- **Build output**: `dist/public/` (served as static files)
- **Contact form**: Uses Formspree. Set `VITE_FORMSPREE_ENDPOINT` env var (or GitHub Actions secret) to your Formspree form URL. Without it, form shows a simulated success in dev.
- **GitHub Actions**: `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages on push to `main`
- **SPA routing**: `client/public/404.html` + `client/index.html` script handle deep-link routing on GitHub Pages

### Shared (`shared/`)
- `schema.ts` — Zod insert schemas for contact form validation

---

## Key Features

- **Pricing Builder**: Interactive module selector with real-time price calculation, annual/monthly toggle, endpoint slider
- **Security Quiz**: 5-question interactive quiz with instant score display
- **CISA Framework Alignment**: All content maps to Identify/Protect/Detect/Respond/Recover
- **Coreser Score System**: 0-100 composite security posture rating
- **Contact Form**: Submits via Formspree (static-compatible); set `VITE_FORMSPREE_ENDPOINT` to enable

---

## Running Locally

The `Start application` workflow runs `npm run dev` which starts:
- Express server on port 5000
- Vite dev server (proxied through Express)
