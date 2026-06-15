<div align="center">

# ⚡ stphnLead AI

### Turn Prospects Into Clients With AI

**An AI-powered lead generation & CRM platform** — discover leads, qualify prospects, automate outreach, track conversations, and book meetings automatically. A premium, production-quality frontend MVP.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080?logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## ✨ Overview

**stphnLead AI** helps agencies, freelancers, sales teams, recruiters, and startup founders fill their pipeline and close more deals — all from one intelligent workspace. The design language is premium, dark, and futuristic (think Stripe · Vercel · Linear · Raycast), with glassmorphism, soft shadows, and electric blue/purple glow accents.

This repository is a **complete, fully clickable frontend MVP** built with realistic mock data. There's no backend yet — auth, the AI agent, and CRM interactions are mocked so the entire product can be demoed end-to-end.

## 🧭 Pages & routes

| Route | What it is |
|-------|------------|
| `/` | **Landing site** — hero, mock dashboard preview, features, product/CRM/demo showcase, testimonials, CTA |
| `/sign-in` · `/sign-up` · `/forgot-password` | **Auth** — premium split-screen, client-side validation, routes into the app |
| `/dashboard` | **Overview** — 6 stat widgets, revenue chart, lead-source donut, activity feed, AI recommendations |
| `/leads` | **Leads** — table with search, filters, sorting, pagination, bulk actions + lead-details drawer |
| `/crm` | **CRM** — drag-and-drop Kanban pipeline, deal cards, forecast & win-rate widgets |
| `/campaigns` | **Campaigns** — cold email / LinkedIn / follow-up cards with open & reply rates |
| `/ai-agent` | **stphnAgent** — AI chat workspace with typing animation & streaming responses |
| `/analytics` | **Analytics** — conversion funnel, response/revenue/meeting trends, source & campaign performance |
| `/inbox` | **Inbox** — unified Email / LinkedIn / Messages with threads, labels, AI reply suggestions |
| `/meetings` | **Meetings** — upcoming/past agenda with attendees and AI prep notes |
| `/settings` | **Settings** — Profile, Workspace, Notifications, Integrations, Billing (UI only) |

## 🚀 Features

#### Landing & onboarding
- Sticky glassmorphic navbar with an animated mobile menu
- Animated hero with a hand-built premium dashboard preview
- Features grid, product/CRM showcase (incl. a mini Kanban), testimonials, aurora CTA
- Auth: social buttons, password strength meter, validation, success states

#### The product (in-app)
- **Collapsible sidebar** with an animated active indicator + mobile drawer
- **Top bar** with search (`⌘K` hint), quick actions, notifications, and a user menu
- **Dashboard** — KPI widgets with sparklines, Recharts visualizations, activity timeline, AI recommendations
- **Leads** — sortable/filterable/paginated table, row selection + bulk action bar, rich detail drawer (AI insights, conversation history, notes, next actions)
- **CRM** — real **drag-and-drop** Kanban (dnd-kit) across 6 stages with live forecast, win rate, and stage distribution
- **Campaigns** — multi-channel cards with performance metrics and a type filter
- **stphnAgent** — chat with prompt suggestions, a typing indicator, and word-by-word streamed responses
- **Analytics** — conversion funnel, response/revenue/meeting trends, source & campaign breakdowns
- **Inbox** — unified channels, thread list + detail, labels, and one-click AI reply suggestions
- **Meetings** — day-grouped agenda, two-pane detail, AI prep notes
- **Settings** — tabbed profile, workspace, notification toggles, integrations, and billing

#### Across the board
- 🌑 Dark-mode-first premium design system
- 🪟 Glassmorphism, soft shadows, electric blue/purple glow
- 🎬 Framer Motion animations (page, hover, card, sidebar, loading)
- 📱 Fully responsive, mobile-first
- ♿ Keyboard-friendly, accessible primitives
- 🧩 Type-safe data models and reusable components throughout

## 🛠️ Tech stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16** (App Router, React Server Components) |
| Language | **TypeScript** (strict) |
| UI | **React 19** |
| Styling | **Tailwind CSS v4** (`@theme`, no config file) |
| Components | Custom **shadcn-style** primitives (no Radix) |
| Animation | **Framer Motion** |
| Charts | **Recharts** |
| Drag & drop | **dnd-kit** |
| Icons | **lucide-react** (+ inline SVGs for brand marks) |
| Utilities | `clsx`, `tailwind-merge` |

## 📂 Project structure

```
app/
  (marketing)/          # Landing site (navbar + footer layout)
  (auth)/               # Sign in / up / forgot password (split-screen layout)
  (app)/                # Authenticated app (sidebar + topbar shell)
    dashboard/  leads/  crm/  campaigns/  ai-agent/
    analytics/  inbox/  meetings/  settings/
  layout.tsx            # Root layout — dark theme, fonts, metadata
  globals.css           # Design system: tokens, glass, glow, animations

components/
  ui/                   # Primitives: button, card, badge, input, sheet,
                        #   dropdown, tabs, switch, checkbox, avatar, icon…
  brand/                # Logo + logo mark
  motion/               # Reveal / scroll-animation helpers
  landing/              # Marketing sections
  auth/                 # Auth shell + forms
  dashboard/            # App shell, sidebar, topbar, widgets
  charts/               # Themed Recharts wrappers (Area, Bar, Donut, Sparkline)
  leads/ crm/ campaigns/ agent/ inbox/ analytics/ meetings/ settings/

data/                   # Type-safe mock datasets (deterministic, SSR-safe)
types/                  # Domain models (Lead, Deal, Campaign, Meeting, …)
lib/                    # cn(), formatters, nav config, status configs
```

## 🏁 Getting started

**Prerequisites:** Node.js 18.18+ (Node 20+ recommended).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**.

> **Port already in use?** Next.js will quietly move to `3001`. If you see an
> "Internal Server Error" on `:3000`, a stale process is squatting the port —
> run `pkill -9 -f next-server`, then `rm -rf .next && npm run dev`.

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## 🎨 Design system

All design tokens live in `app/globals.css` via Tailwind v4's `@theme`:

- **Brand** (electric blue `--color-brand-*`) and **accent** (violet `--color-accent-*`) scales
- A dark **surface scale** (`bg`, `surface`, `elevated`, `border`…)
- Reusable utilities: `.glass`, `.glass-strong`, `.text-gradient`, `.glow-brand`, `.ring-glow`, `.grid-bg`
- Custom keyframes: `shimmer`, `float`, `pulse-glow`, `aurora`

UI primitives in `components/ui/` are hand-built (shadcn-style, no Radix) and styled to the brand — `Button`, `Card`, `Badge`, `Input`, `Sheet`, `Dropdown`, `Tabs`, `Switch`, `Checkbox`, `Avatar`, and more.

## 📊 Mock data

Everything is powered by realistic, **deterministic** mock data in `data/` (leads, deals, campaigns, meetings, inbox threads, analytics). Determinism (no `Math.random()` / `Date.now()` at render) keeps server and client output identical, avoiding hydration mismatches in statically prerendered pages.

## 🗺️ Roadmap

- [x] Design system, landing site & auth
- [x] App shell + dashboard home
- [x] Leads table + CRM Kanban
- [x] Campaigns, AI Agent & Inbox
- [x] Analytics, Meetings & Settings
- [ ] Polish pass — page transitions, skeletons, empty states, a11y sweep
- [ ] Backend integration (real auth, live AI agent, persistence)

## 📝 Note

This is a frontend MVP intended for product/design demonstration. Auth and AI
interactions are mocked; no data leaves the browser. Company names and
testimonials are placeholders.

<div align="center">

Built with ❤️ for modern revenue teams.

</div>
