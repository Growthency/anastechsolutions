"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, Mail, AlertCircle, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue text-white py-3 rounded-button font-semibold shadow-blue hover:-translate-y-0.5 hover:bg-brand-blue-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
    >
      {pending ? (
        <>
          <span className="inline-block size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          Signing in…
        </>
      ) : (
        <>
          <LogIn className="size-4" />
          Sign in
        </>
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState<LoginState | undefined, FormData>(
    loginAction,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-ink mb-1.5"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="size-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state?.email ?? ""}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-paper text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-ink mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="size-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-paper text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all"
          />
        </div>
      </div>

      {state?.error && (
        <div className="flex items-start gap-2 bg-brand-red/8 border border-brand-red/20 text-brand-red text-sm rounded-xl px-4 py-3">
          <AlertCircle className="size-4 mt-0.5 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
