# Coreser — Enterprise Cybersecurity Platform

## Project Overview

A multi-page marketing website for **Coreser**, an enterprise-grade cybersecurity platform targeting mid-market businesses.

**Brand**: White and sage green color palette (#8A9A5B ≈ hsl(95, 26%, 48%))  
**Fonts**: DM Sans (body) + Outfit (display headings)  
**Stack**: React + TypeScript + Express + PostgreSQL + Drizzle ORM

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

### Backend (`server/`)
- **Framework**: Express.js
- **Database**: PostgreSQL via Drizzle ORM
- **Storage**: `DatabaseStorage` class implements `IStorage`
- **Routes**: `POST /api/contact` — stores contact form submissions

### Shared (`shared/`)
- `schema.ts` — Drizzle schema + Zod insert schemas
  - `contact_messages` table: `id`, `name`, `email`, `message`, `createdAt`

---

## Key Features

- **Pricing Builder**: Interactive module selector with real-time price calculation, annual/monthly toggle, endpoint slider
- **Security Quiz**: 5-question interactive quiz with instant score display
- **CISA Framework Alignment**: All content maps to Identify/Protect/Detect/Respond/Recover
- **Coreser Score System**: 0-100 composite security posture rating
- **Contact Form**: Posts to `/api/contact`, stored in PostgreSQL

---

## Running Locally

The `Start application` workflow runs `npm run dev` which starts:
- Express server on port 5000
- Vite dev server (proxied through Express)
