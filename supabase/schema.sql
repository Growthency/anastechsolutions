-- Run this in the Supabase SQL editor.
-- Drops and recreates blog_posts with the full admin-editor schema.
-- WARNING: destructive — back up any existing content first if it matters.

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
drop function if exists public.set_updated_at();
drop table if exists public.blog_posts cascade;

create table public.blog_posts (
  id               bigserial primary key,
  title            text not null,
  slug             text not null unique,
  excerpt          text,
  content          text,                           -- HTML body
  featured_image   text,
  category         text default 'Insights',
  is_premium       boolean default false,
  views            integer default 0,
  read_time        text default '5 min read',
  status           text default 'draft',           -- draft | published
  author_name      text default 'Anas Tech Solutions',
  author_role      text default 'Editorial Team',
  meta_title       text,
  meta_description text,
  layout           text default 'with-sidebar',    -- with-sidebar | full-page
  custom_css       text,
  custom_schema    text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now(),
  published_at     timestamptz
);

create index if not exists idx_blog_posts_slug on public.blog_posts (slug);
create index if not exists idx_blog_posts_status on public.blog_posts (status);
create index if not exists idx_blog_posts_created_at on public.blog_posts (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- RLS: public can read published posts. Writes go through the service role
-- (the admin API routes) which bypasses RLS.
alter table public.blog_posts enable row level security;

drop policy if exists "blog_posts_public_read" on public.blog_posts;
create policy "blog_posts_public_read"
  on public.blog_posts
  for select
  using (status = 'published');

-- Storage bucket for uploaded images (used by /api/admin/upload).
-- Create the bucket once via the Supabase dashboard: name "images", public.
-- No SQL needed for the bucket itself, but RLS-like policies live under
-- storage.objects if you want to tighten public read later.
