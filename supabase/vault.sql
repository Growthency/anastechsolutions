-- Secure Vault: encrypted credentials storage
-- Run this in the Supabase SQL editor (one time).

create table if not exists public.vault_credentials (
  id                 bigserial primary key,
  site_name          text not null,
  site_url           text,
  username           text,
  password_encrypted text not null,   -- AES-256-GCM, base64(iv||authTag||ciphertext)
  notes              text,
  created_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

create index if not exists idx_vault_site_name on public.vault_credentials (site_name);
create index if not exists idx_vault_created_at on public.vault_credentials (created_at desc);

-- Reuse the updated_at trigger from the main schema if it exists;
-- otherwise create a local copy.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_vault_updated_at on public.vault_credentials;
create trigger trg_vault_updated_at
  before update on public.vault_credentials
  for each row execute function public.set_updated_at();

-- RLS: never publicly readable. Only the service role (admin API) touches this.
alter table public.vault_credentials enable row level security;
-- No policies = default deny for anon/authenticated roles. Service role bypasses RLS.
