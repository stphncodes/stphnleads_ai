"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* ---------------- shared parts ---------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} className="pr-11" {...props} />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center text-faint hover:text-foreground"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function SocialAuth() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button" className="w-full">
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
            />
          </svg>
          Google
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.85-1.01.613 0 2.792.06 4.22 2.12-.123.07-2.452 1.45-2.452 4.36 0 3.36 2.952 4.49 2.953 4.49z" />
          </svg>
          Apple
        </Button>
      </div>
      <div className="relative my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/[0.08]" />
        <span className="text-xs text-faint">or continue with email</span>
        <span className="h-px flex-1 bg-white/[0.08]" />
      </div>
    </>
  );
}

const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

/* ---------------- Sign In ---------------- */

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be 6+ characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      setErrors({ password: error.message });
      return;
    }
    const redirect = searchParams.get("redirect") ?? "/dashboard";
    router.push(redirect);
    router.refresh();
  }

  return (
    <motion.div {...fade}>
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">
        Sign in to your stphnLead AI workspace.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <SocialAuth />
        <Field id="email" label="Email" error={errors.email}>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              className="size-3.5 rounded border-white/20 bg-white/5 accent-brand-500"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-brand-300 hover:text-brand-200"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="group w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-medium text-brand-300 hover:text-brand-200">
          Sign up free
        </Link>
      </p>
    </motion.div>
  );
}

/* ---------------- Sign Up ---------------- */

function strengthOf(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-4
}

export function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const strength = strengthOf(form.password);
  const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Tell us your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { name: form.name } },
    });
    if (error) {
      setLoading(false);
      setErrors({ email: error.message });
      return;
    }
    // With email confirmation enabled, there's no active session yet.
    if (!data.session) {
      setLoading(false);
      setErrors({
        email: "Check your inbox to confirm your email, then sign in.",
      });
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <motion.div {...fade}>
      <h1 className="text-2xl font-semibold tracking-tight">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Start your 14-day free trial. No credit card required.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <SocialAuth />
        <Field id="name" label="Full name" error={errors.name}>
          <Input
            id="name"
            placeholder="Alex Stone"
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
          />
        </Field>
        <Field id="email" label="Work email" error={errors.email}>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
          />
        </Field>
        <Field id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.password}
            onChange={update("password")}
          />
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex flex-1 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors",
                      i < strength
                        ? strength <= 1
                          ? "bg-rose-400"
                          : strength === 2
                            ? "bg-amber-400"
                            : strength === 3
                              ? "bg-sky-400"
                              : "bg-emerald-400"
                        : "bg-white/10",
                    )}
                  />
                ))}
              </div>
              <span className="text-[11px] text-faint">
                {strengthLabels[strength]}
              </span>
            </div>
          )}
        </Field>

        <Button type="submit" size="lg" className="group w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Create account
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
        <p className="text-center text-[11px] leading-relaxed text-faint">
          By signing up you agree to our{" "}
          <Link href="#" className="text-muted hover:text-foreground">
            Terms
          </Link>{" "}
          &amp;{" "}
          <Link href="#" className="text-muted hover:text-foreground">
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-brand-300 hover:text-brand-200">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

/* ---------------- Forgot Password ---------------- */

export function ForgotPasswordForm() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/sign-in` },
    );
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div {...fade} className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="size-7" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-muted">
          We sent a password reset link to{" "}
          <span className="text-foreground">{email}</span>. It expires in 30
          minutes.
        </p>
        <Button
          variant="outline"
          className="mt-8 w-full"
          onClick={() => setSent(false)}
        >
          Use a different email
        </Button>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/sign-in" className="font-medium text-brand-300 hover:text-brand-200">
            ← Back to sign in
          </Link>
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div {...fade}>
      <div className="grid size-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-300">
        <Mail className="size-6" />
      </div>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-muted">
        Enter the email tied to your account and we&apos;ll send you a reset
        link.
      </p>

      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field id="email" label="Email" error={error}>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Send reset link"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Remembered it?{" "}
        <Link href="/sign-in" className="font-medium text-brand-300 hover:text-brand-200">
          Back to sign in
        </Link>
      </p>
    </motion.div>
  );
}
