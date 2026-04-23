import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import { Logo } from "@/components/shared/Logo";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to manage AnasTech Solutions blog posts.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await readSession();
  if (session) redirect("/admin");

  return (
    <main className="min-h-screen bg-paper-2 flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 dot-grid pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute -top-32 -right-32 size-96 rounded-full bg-brand-blue/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-red/8 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 mb-8"
          aria-label="AnasTech Solutions Home"
        >
          <Logo size={52} priority />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-xl text-ink tracking-tight">
              Anas<span className="text-brand-red">Tech</span>
            </span>
            <span className="text-[10px] font-semibold text-ink-muted tracking-[0.22em] uppercase mt-0.5">
              Solutions
            </span>
          </div>
        </Link>

        <div className="bg-paper border border-border rounded-2xl shadow-card p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold text-ink mb-1">
              Admin sign in
            </h1>
            <p className="text-sm text-ink-soft">
              Sign in to manage your blog posts.
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
