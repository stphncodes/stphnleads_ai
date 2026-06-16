# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ The import above is load-bearing: this is a **modified Next.js 16** with breaking changes from training-data Next.js. Read the relevant guide in `node_modules/next/dist/docs/` before writing routing/data/caching code, and heed deprecation notices.

## Project

**stphnLead AI** — an AI lead-generation + CRM SaaS. Every screen is built and clickable, backed by a **Supabase backend**: real email/password auth and per-user data (leads, deals, campaigns, meetings, inbox) live behind Row Level Security. The **AI agent and third-party integrations are still mocked** in the browser. See the Backend section below.

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

### Backend (Supabase)
- **Schema** lives in `supabase/migrations/0001_init.sql`: `profiles` + the business tables, all under per-user **Row Level Security** (`auth.uid() = user_id`), plus an `on_auth_user_created` trigger that auto-provisions a profile row on signup. Apply it via the Supabase SQL editor / CLI.
- **Clients** in `lib/supabase/`: `server.ts` (Server Components / Actions, cookie-based session), `client.ts` (browser/`"use client"`), `admin.ts` (service-role, **server-only** — never import client-side). `lib/supabase/proxy.ts` holds the session-refresh + route-guard logic, invoked by the root **`proxy.ts`** (Next 16's renamed middleware) — unauthenticated hits to `(app)` routes redirect to `/sign-in?redirect=…`.
- **Data access** goes through `lib/queries.ts` (`getLeads`, `getDeals`, …): server-side, runs as the signed-in user so RLS scopes results, and maps DB snake_case → the camelCase domain types in `types/index.ts`. `(app)` pages are **async server components** that await these — adding `cookies()`/Supabase reads makes them dynamic, not statically prerendered.
- **Env:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (gitignored — keep the service-role key out of commits). `npm run seed` (`scripts/seed.ts`) loads the mock datasets for a demo user; `scripts/check.ts` probes connectivity.

### Data & config (where to change behavior)
- `data/` still holds the **deterministic** mock datasets — now consumed by `scripts/seed.ts` to populate Supabase, and still rendered directly by the not-yet-migrated surfaces (analytics, AI agent). **Never use `Math.random()` or `Date.now()` at render/module-eval** — non-determinism causes hydration mismatches. Generators derive everything from indices; timestamps are fixed ISO strings.
- `lib/utils.ts` — `cn()` plus formatters. Use the **UTC-fixed** formatters (`formatClock`, `formatDay`, `formatTime`, `formatTimeRange`) for any rendered timestamp, so SSR and client output match.
- `lib/nav.ts` — sidebar/nav items + `currentUser`. `lib/lead-status.ts` — status/stage/priority → label+tone config maps consumed across leads, CRM, and badges.
- `types/index.ts` — all domain models (`Lead`, `Deal`, `Campaign`, `Meeting`, `InboxThread`, `AgentMessage`, …).

## Conventions

- Path alias `@/*` → repo root.
- Feature components live in `components/<feature>/` (e.g. `leads/`, `crm/`, `agent/`); shared primitives in `components/ui/`.
- New authenticated pages go under `app/(app)/<route>/page.tsx` and a matching `lib/nav.ts` entry; they inherit the shell automatically.
- Work has been delivered on **stacked feature branches** (`feat/phase-N-*`), each branched off the previous and verified with typecheck + build + smoke test before pushing.
