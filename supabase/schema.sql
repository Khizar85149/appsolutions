-- =====================================================================
-- Apps Solutions Tech: database schema
--
-- Run this whole file once in Supabase: Dashboard > SQL Editor > New query.
-- Then run supabase/seed.sql to load the starting content.
-- It is safe to run again: nothing is dropped and no data is removed.
--
-- Access model
--   * The website talks to the database only from the server, using the
--     secret (service role) key. That key bypasses row level security.
--   * Row level security is on for every table. The public (anon) key can
--     read published content and nothing else. It cannot read or write
--     enquiries, applications or bookings.
-- =====================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------
-- Content: services
-- ---------------------------------------------------------------------
create table if not exists public.services (
  slug            text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position        integer not null default 0,
  published       boolean not null default true,
  icon            text not null default 'code',
  name            text not null,
  tagline         text not null default '',
  summary         text not null default '',
  hero_title      text not null default '',
  hero_lead       text not null default '',
  outcomes        jsonb not null default '[]',   -- [{ "value": "", "label": "" }]
  signals         text[] not null default '{}',
  deliverables    jsonb not null default '[]',   -- [{ "title": "", "body": "" }]
  process         jsonb not null default '[]',   -- [{ "title": "", "body": "" }]
  stack           text[] not null default '{}',
  engagement      jsonb not null default '{}',   -- { "timeline": "", "team": "", "model": "" }
  faqs            jsonb not null default '[]',   -- [{ "q": "", "a": "" }]
  industries      text[] not null default '{}',  -- industry slugs
  case_studies    text[] not null default '{}',  -- case study slugs
  seo_title       text not null default '',
  seo_description text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Content: industries
-- ---------------------------------------------------------------------
create table if not exists public.industries (
  slug            text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position        integer not null default 0,
  published       boolean not null default true,
  icon            text not null default 'globe',
  name            text not null,
  tagline         text not null default '',
  summary         text not null default '',
  hero_title      text not null default '',
  hero_lead       text not null default '',
  stats           jsonb not null default '[]',   -- [{ "value": "", "label": "" }]
  challenges      jsonb not null default '[]',   -- [{ "title": "", "body": "" }]
  solutions       jsonb not null default '[]',   -- [{ "title": "", "body": "" }]
  compliance      text[] not null default '{}',
  services        text[] not null default '{}',  -- service slugs
  case_studies    text[] not null default '{}',  -- case study slugs
  faqs            jsonb not null default '[]',   -- [{ "q": "", "a": "" }]
  seo_title       text not null default '',
  seo_description text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Content: case studies
-- ---------------------------------------------------------------------
create table if not exists public.case_studies (
  slug            text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position        integer not null default 0,
  published       boolean not null default true,
  client          text not null,
  title           text not null,
  summary         text not null default '',
  industry        text not null default '',      -- industry slug
  services        text[] not null default '{}',  -- service slugs
  location        text not null default '',
  year            text not null default '',
  duration        text not null default '',
  team            text not null default '',
  featured        boolean not null default false,
  tone            text not null default 'ink' check (tone in ('ink', 'lime', 'sand', 'sage')),
  hero_metric     jsonb not null default '{}',   -- { "value": "", "label": "" }
  metrics         jsonb not null default '[]',   -- [{ "value": "", "label": "" }]
  challenge       text[] not null default '{}',
  approach        jsonb not null default '[]',   -- [{ "title": "", "body": "" }]
  solution        text[] not null default '{}',
  results         text[] not null default '{}',
  stack           text[] not null default '{}',
  quote           jsonb,                         -- { "text": "", "role": "" } or empty
  seo_title       text not null default '',
  seo_description text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Content: open roles
-- ---------------------------------------------------------------------
create table if not exists public.jobs (
  slug             text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position         integer not null default 0,
  published        boolean not null default true,
  title            text not null,
  department       text not null default '',
  location         text not null default '',
  type             text not null default '',
  experience       text not null default '',
  posted           date not null default current_date,
  summary          text not null default '',
  about            text[] not null default '{}',
  responsibilities text[] not null default '{}',
  requirements     text[] not null default '{}',
  nice_to_have     text[] not null default '{}',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Content: consultation session types
-- ---------------------------------------------------------------------
create table if not exists public.consultation_types (
  slug            text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  position        integer not null default 0,
  published       boolean not null default true,
  icon            text not null default 'calendar',
  name            text not null,
  duration        integer not null check (duration between 15 and 240 and duration % 15 = 0),  -- minutes
  summary         text not null default '',
  description     text not null default '',
  agenda          text[] not null default '{}',
  host_name       text not null default '',
  host_role       text not null default '',
  seo_title       text not null default '',
  seo_description text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Enquiries from the contact form
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  company    text not null default '',
  phone      text not null default '',
  service    text not null default '',
  budget     text not null default '',
  timeline   text not null default '',
  message    text not null,
  status     text not null default 'new' check (status in ('new', 'replied', 'qualified', 'closed', 'spam')),
  ip_hash    text,
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_ip_idx on public.contact_messages (ip_hash, created_at desc);

-- ---------------------------------------------------------------------
-- Job applications. The résumé file is stored in the private "resumes"
-- storage bucket; resume_path is the file's path inside that bucket.
-- ---------------------------------------------------------------------
create table if not exists public.job_applications (
  id          uuid primary key default gen_random_uuid(),
  job_slug    text not null,
  job_title   text not null default '',
  name        text not null,
  email       text not null,
  phone       text not null default '',
  link        text not null default '',
  note        text not null default '',
  resume_path text not null,
  resume_name text not null default '',
  status      text not null default 'new' check (status in ('new', 'reviewing', 'interview', 'offer', 'rejected', 'withdrawn')),
  ip_hash     text,
  created_at  timestamptz not null default now()
);
create index if not exists job_applications_job_idx on public.job_applications (job_slug, created_at desc);
create index if not exists job_applications_ip_idx on public.job_applications (ip_hash, created_at desc);

-- ---------------------------------------------------------------------
-- Consultation bookings.
-- The exclusion constraint makes double booking impossible: the database
-- refuses a second confirmed booking that overlaps an existing one, even
-- if two visitors press "Schedule" at the same moment.
-- To free a slot, set status to 'cancelled'.
-- ---------------------------------------------------------------------
create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  consultation_slug text not null,
  consultation_name text not null default '',
  starts_at         timestamptz not null,
  ends_at           timestamptz not null,
  time_zone         text not null default '',      -- the visitor's time zone
  name              text not null,
  email             text not null,
  company           text not null default '',
  phone             text not null default '',
  guests            text[] not null default '{}',
  budget            text not null default '',
  notes             text not null default '',
  status            text not null default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed', 'no_show')),
  ip_hash           text,
  created_at        timestamptz not null default now(),
  constraint bookings_time_order check (ends_at > starts_at),
  constraint bookings_no_overlap exclude using gist (tstzrange(starts_at, ends_at, '[)') with &&) where (status = 'confirmed')
);
create index if not exists bookings_starts_idx on public.bookings (starts_at);
create index if not exists bookings_ip_idx on public.bookings (ip_hash, created_at desc);

-- ---------------------------------------------------------------------
-- Times the calendar must not offer: holidays, leave, outside meetings.
-- Add a row and those hours disappear from the booking page.
-- ---------------------------------------------------------------------
create table if not exists public.availability_blocks (
  id         uuid primary key default gen_random_uuid(),
  starts_at  timestamptz not null,
  ends_at    timestamptz not null,
  reason     text not null default '',
  created_at timestamptz not null default now(),
  constraint availability_blocks_time_order check (ends_at > starts_at)
);
create index if not exists availability_blocks_range_idx on public.availability_blocks (starts_at, ends_at);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array['services', 'industries', 'case_studies', 'jobs', 'consultation_types'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------
-- Row level security and grants
-- ---------------------------------------------------------------------
alter table public.services            enable row level security;
alter table public.industries          enable row level security;
alter table public.case_studies        enable row level security;
alter table public.jobs                enable row level security;
alter table public.consultation_types  enable row level security;
alter table public.contact_messages    enable row level security;
alter table public.job_applications    enable row level security;
alter table public.bookings            enable row level security;
alter table public.availability_blocks enable row level security;

grant usage on schema public to anon, authenticated, service_role;
grant select on public.services, public.industries, public.case_studies, public.jobs, public.consultation_types
  to anon, authenticated;
grant all on public.services, public.industries, public.case_studies, public.jobs, public.consultation_types,
  public.contact_messages, public.job_applications, public.bookings, public.availability_blocks
  to service_role;

do $$
declare
  t text;
begin
  foreach t in array array['services', 'industries', 'case_studies', 'jobs', 'consultation_types'] loop
    execute format('drop policy if exists "Published rows are public" on public.%I', t);
    execute format(
      'create policy "Published rows are public" on public.%I for select to anon, authenticated using (published)', t
    );
  end loop;
end;
$$;
-- contact_messages, job_applications, bookings and availability_blocks have
-- no policies on purpose: only the server (secret key) can touch them.

-- ---------------------------------------------------------------------
-- Private storage bucket for résumés (Supabase Storage, 4 MB per file).
-- No storage policies are created, so only the server can read or write.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  4194304,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- ---------------------------------------------------------------------
-- Admin panel access (/admin).
-- A person can sign in to the admin panel only if (1) they have a user in
-- Supabase Authentication and (2) that user is listed here. To grant access:
--   1. Dashboard > Authentication > Users > Add user (email + password,
--      tick "Auto Confirm User").
--   2. Run:  insert into public.admin_users (user_id)
--            select id from auth.users where email = 'you@example.com';
-- Delete the row to remove access at once.
-- ---------------------------------------------------------------------
create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
grant all on public.admin_users to service_role;
-- No policies: only the server (secret key) can read this table.
