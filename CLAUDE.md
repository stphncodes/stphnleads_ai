# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ The import above is load-bearing: this is a **modified Next.js 16** with breaking changes from training-data Next.js. Read the relevant guide in `node_modules/next/dist/docs/` before writing routing/data/caching code, and heed deprecation notices.

## Project

**stphnLead AI** — an AI lead-generation + CRM SaaS. This repo is a **frontend MVP**: every screen is built and clickable on realistic mock data. There is **no backend** — auth, the AI agent, and integrations are mocked; nothing leaves the browser.

## Commands

```bash
npm run dev        # dev server (localhost:3000; quietly moves to 3001 if taken)
npm run build      # production build — also runs full TypeScript check
npm run start      # serve the production build
npm run lint       # eslint
npx tsc --noEmit   # type-check only (faster than a full build)
```

There is **no test suite**. The verification loop is: `npx tsc --noEmit` → `npm run build` → smoke-test routes against `npm run start`.

**Stale-port gotcha:** an orphaned `next-server` on `:3000` returns "Internal Server Error" while a fresh `next dev` silently binds `:3001`. Fix: `pkill -9 -f next-server && rm -rf .next`.

## Architecture

### Route groups (the backbone)
`app/` is split into three groups, each with its own `layout.tsx` — this is the primary structural decision:
- `(marketing)/` → public site, navbar + footer chrome. Owns `/` (homepage).
- `(auth)/` → `sign-in`, `sign-up`, `forgot-password`; split-screen `AuthShell`.
- `(app)/` → the authenticated product; `AppShell` provides sidebar + topbar. Holds `dashboard`, `leads`, `crm`, `campaigns`, `ai-agent`, `analytics`, `inbox`, `meetings`, `settings`.

The root `app/layout.tsx` sets dark theme, fonts, and metadata for all three.

### Server vs. Client boundary
Pages are **Server Components by default**; interactivity lives in `"use client"` islands. The app shell pattern is: a thin server `layout.tsx` renders a client shell (`AppShell`, `AuthShell`) that owns UI state.

**Critical RSC rule:** a component that passes a **function prop** (e.g. a chart `formatter`) to a Client Component must itself be a Client Component — functions can't cross the server→client boundary and the build will fail at prerender. This is why the dashboard/analytics widget wrappers are `"use client"`. When adding a chart card, mark its wrapper `"use client"`.

### Styling & design system
- **Tailwind CSS v4** — all tokens are defined in `app/globals.css` via `@theme`. **There is no `tailwind.config`.** Add design tokens there.
- Custom utilities to reuse instead of re-rolling: `.glass`, `.glass-strong`, `.text-gradient`, `.text-gradient-brand`, `.glow-brand`, `.ring-glow`, `.grid-bg`, `.border-gradient`, `.no-scrollbar`, plus `aurora`/`shimmer`/`float` animations.
- Tailwind v4 generates fractional/arbitrary spacing on demand (`size-4.5`, `h-15` work).

### UI primitives
`components/ui/` are **hand-built, shadcn-style, no Radix**. Reuse these rather than introducing a component library: `Button`, `Card`, `Badge`, `Input`/`Textarea`/`Label`, `Avatar`, `Sheet` (slide-over), `Dropdown` (click-outside + esc), `Tabs` (animated underline), `Switch`, `Checkbox`, `Progress`, `Skeleton`, `RingStat`.

- Icons: `components/ui/icon.tsx` renders any **lucide** icon by string name. **lucide has no brand icons** (`Twitter`/`Linkedin`/`Github`/etc. don't exist and break the build) — use `components/ui/channel-icon.tsx` or an inline `<svg>` for brand marks.
- Charts: `components/charts/index.tsx` wraps Recharts (`AreaChart`, `BarChart`, `DonutChart`, `Sparkline`) themed to the palette via `CHART_COLORS`.
- Drag & drop: the CRM Kanban uses **dnd-kit** (`components/crm/kanban-board.tsx`) — multi-container sortable with `onDragOver` for cross-column moves.

### Data & config (where to change behavior)
- `data/` holds **deterministic** mock datasets (leads, deals, campaigns, meetings, inbox, analytics, agent). **Never use `Math.random()` or `Date.now()` at render/module-eval** — these pages are statically prerendered, so non-determinism causes hydration mismatches. Generators derive everything from indices; timestamps are fixed ISO strings.
- `lib/utils.ts` — `cn()` plus formatters. Use the **UTC-fixed** formatters (`formatClock`, `formatDay`, `formatTime`, `formatTimeRange`) for any rendered timestamp, so SSR and client output match.
- `lib/nav.ts` — sidebar/nav items + `currentUser`. `lib/lead-status.ts` — status/stage/priority → label+tone config maps consumed across leads, CRM, and badges.
- `types/index.ts` — all domain models (`Lead`, `Deal`, `Campaign`, `Meeting`, `InboxThread`, `AgentMessage`, …).

## Conventions

- Path alias `@/*` → repo root.
- Feature components live in `components/<feature>/` (e.g. `leads/`, `crm/`, `agent/`); shared primitives in `components/ui/`.
- New authenticated pages go under `app/(app)/<route>/page.tsx` and a matching `lib/nav.ts` entry; they inherit the shell automatically.
- Work has been delivered on **stacked feature branches** (`feat/phase-N-*`), each branched off the previous and verified with typecheck + build + smoke test before pushing.
