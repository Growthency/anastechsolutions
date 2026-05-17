-- Adds the show_on_blog flag used by the admin "Show on Blog" toggle.
-- Run this once in the Supabase SQL editor on an existing database that
-- was created before the flag was introduced.
--
-- Idempotent — safe to re-run.

alter table public.blog_posts
  add column if not exists show_on_blog boolean default true;

-- Backfill existing rows so they remain visible.
update public.blog_posts
   set show_on_blog = true
 where show_on_blog is null;
