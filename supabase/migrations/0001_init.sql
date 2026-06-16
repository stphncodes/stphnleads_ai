-- ============================================================
-- stphnLead AI — initial schema
-- All business tables are scoped to the owning user via RLS.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- profiles ----------
-- One row per auth user; created automatically on signup.
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null default '',
  email       text not null default '',
  role        text not null default 'Member',
  plan        text not null default 'Free',
  created_at  timestamptz not null default now()
);

-- ---------- leads ----------
create table public.leads (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  name          text not null,
  title         text not null default '',
  company       text not null default '',
  industry      text not null default '',
  email         text not null default '',
  phone         text,
  location      text not null default '',
  avatar        text,
  score         int  not null default 0,
  status        text not null default 'new',   -- new|contacted|interested|qualified|closed
  intent        text not null default 'low',   -- low|medium|high
  source        text not null default 'Inbound',
  value         int  not null default 0,
  tags          text[] not null default '{}',
  insights      text[] not null default '{}',
  last_contact  timestamptz,
  created_at    timestamptz not null default now()
);

create table public.lead_notes (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  author      text not null default '',
  body        text not null,
  created_at  timestamptz not null default now()
);

create table public.lead_actions (
  id        uuid primary key default gen_random_uuid(),
  lead_id   uuid not null references public.leads (id) on delete cascade,
  user_id   uuid not null references auth.users (id) on delete cascade,
  label     text not null,
  due       text not null default '',
  done      boolean not null default false,
  type      text not null default 'task'      -- email|call|meeting|task
);

create table public.lead_messages (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  channel     text not null default 'email',  -- email|linkedin|message
  direction   text not null default 'out',    -- in|out
  body        text not null,
  at          timestamptz not null default now()
);

-- ---------- deals (CRM) ----------
create table public.deals (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  title          text not null,
  lead_name      text not null default '',
  company        text not null default '',
  contact_email  text not null default '',
  value          int  not null default 0,
  stage          text not null default 'new',   -- new|qualified|proposal|negotiation|won|lost
  priority       text not null default 'medium',
  probability    int  not null default 0,
  owner          text not null default '',
  close_date     text not null default '',
  ai_suggestion  text,
  created_at     timestamptz not null default now()
);

-- ---------- campaigns ----------
create table public.campaigns (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  name            text not null,
  type            text not null default 'cold-email', -- cold-email|linkedin|follow-up
  status          text not null default 'draft',      -- active|paused|draft|completed
  sent            int  not null default 0,
  open_rate       numeric not null default 0,
  reply_rate      numeric not null default 0,
  meetings_booked int  not null default 0,
  sequence_steps  int  not null default 0,
  updated_at      timestamptz not null default now()
);

-- ---------- meetings ----------
create table public.meetings (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  title         text not null,
  lead_name     text not null default '',
  company       text not null default '',
  start_at      timestamptz not null,
  duration_mins int  not null default 30,
  type          text not null default 'intro',    -- intro|demo|follow-up|closing
  location      text not null default 'Zoom',
  status        text not null default 'upcoming', -- upcoming|completed|cancelled
  prep_notes    text[] not null default '{}',
  attendees     text[] not null default '{}'
);

-- ---------- inbox ----------
create table public.inbox_threads (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  channel       text not null default 'email',  -- email|linkedin|messages
  contact_name  text not null default '',
  company       text not null default '',
  subject       text not null default '',
  preview       text not null default '',
  unread        boolean not null default false,
  starred       boolean not null default false,
  labels        text[] not null default '{}',
  ai_replies    text[] not null default '{}',
  at            timestamptz not null default now()
);

create table public.inbox_messages (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid not null references public.inbox_threads (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  channel     text not null default 'email',
  direction   text not null default 'in',
  body        text not null,
  at          timestamptz not null default now()
);

-- ---------- AI agent chat ----------
create table public.agent_messages (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references auth.users (id) on delete cascade,
  role      text not null,                  -- user|assistant
  content   text not null,
  at        timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles        enable row level security;
alter table public.leads           enable row level security;
alter table public.lead_notes      enable row level security;
alter table public.lead_actions    enable row level security;
alter table public.lead_messages   enable row level security;
alter table public.deals           enable row level security;
alter table public.campaigns       enable row level security;
alter table public.meetings        enable row level security;
alter table public.inbox_threads   enable row level security;
alter table public.inbox_messages  enable row level security;
alter table public.agent_messages  enable row level security;

-- profiles: a user can see and edit only their own profile.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Generic owner policy for every business table: full CRUD on own rows.
do $$
declare
  t text;
begin
  foreach t in array array[
    'leads','lead_notes','lead_actions','lead_messages','deals',
    'campaigns','meetings','inbox_threads','inbox_messages','agent_messages'
  ]
  loop
    execute format(
      'create policy %I on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id);',
      t || '_owner', t
    );
  end loop;
end$$;

-- ============================================================
-- Auto-create a profile row whenever a new auth user signs up.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- helpful indexes ----------
create index leads_user_idx          on public.leads (user_id);
create index deals_user_idx          on public.deals (user_id);
create index campaigns_user_idx      on public.campaigns (user_id);
create index meetings_user_idx       on public.meetings (user_id);
create index inbox_threads_user_idx  on public.inbox_threads (user_id);
create index inbox_messages_thread_idx on public.inbox_messages (thread_id);
create index lead_notes_lead_idx     on public.lead_notes (lead_id);
create index lead_actions_lead_idx   on public.lead_actions (lead_id);
create index lead_messages_lead_idx  on public.lead_messages (lead_id);
