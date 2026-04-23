import { NextRequest, NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import {
  encryptSecret,
  safeDecrypt,
} from "@/lib/vault/crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CredentialRow {
  id: number;
  site_name: string;
  site_url: string | null;
  username: string | null;
  password_encrypted: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

type Guard =
  | { ok: true; admin: ReturnType<typeof getSupabaseAdmin> }
  | { ok: false; response: NextResponse };

async function requireAdmin(): Promise<Guard> {
  const session = await readSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Supabase is not configured", items: [] },
        { status: 503 },
      ),
    };
  }
  return { ok: true, admin: getSupabaseAdmin() };
}

function rowToDto(row: CredentialRow, reveal: boolean) {
  return {
    id: row.id,
    site_name: row.site_name,
    site_url: row.site_url ?? "",
    username: row.username ?? "",
    password: reveal ? safeDecrypt(row.password_encrypted) : "",
    notes: row.notes ?? "",
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const reveal = url.searchParams.get("reveal") === "1";

  if (id) {
    const { data, error } = await admin
      .from("vault_credentials")
      .select("*")
      .eq("id", Number(id))
      .single();
    if (error || !data) {
      return NextResponse.json({ error: error?.message ?? "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item: rowToDto(data as CredentialRow, reveal) });
  }

  const { data, error } = await admin
    .from("vault_credentials")
    .select("*")
    .order("site_name", { ascending: true });
  if (error) {
    return NextResponse.json({ error: error.message, items: [] }, { status: 500 });
  }
  const items = (data ?? []).map((r) => rowToDto(r as CredentialRow, false));
  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const site_name = String(body.site_name ?? "").trim();
  const password = String(body.password ?? "");
  if (!site_name) {
    return NextResponse.json({ error: "site_name is required" }, { status: 400 });
  }
  if (!password) {
    return NextResponse.json({ error: "password is required" }, { status: 400 });
  }

  const encrypted = encryptSecret(password);

  const { data, error } = await admin
    .from("vault_credentials")
    .insert({
      site_name,
      site_url: String(body.site_url ?? "").trim() || null,
      username: String(body.username ?? "").trim() || null,
      password_encrypted: encrypted,
      notes: String(body.notes ?? "").trim() || null,
    })
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Insert failed" }, { status: 500 });
  }
  return NextResponse.json({ item: rowToDto(data as CredentialRow, false) }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.site_name === "string") {
    const v = body.site_name.trim();
    if (!v) return NextResponse.json({ error: "site_name cannot be empty" }, { status: 400 });
    patch.site_name = v;
  }
  if (typeof body.site_url === "string") {
    patch.site_url = body.site_url.trim() || null;
  }
  if (typeof body.username === "string") {
    patch.username = body.username.trim() || null;
  }
  if (typeof body.notes === "string") {
    patch.notes = body.notes.trim() || null;
  }
  if (typeof body.password === "string" && body.password.length > 0) {
    patch.password_encrypted = encryptSecret(body.password);
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("vault_credentials")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "Update failed" }, { status: 500 });
  }
  return NextResponse.json({ item: rowToDto(data as CredentialRow, false) });
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await admin.from("vault_credentials").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
