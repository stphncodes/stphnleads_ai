import type { Metadata } from "next";
import { Suspense } from "react";
import { SignInForm } from "@/components/auth/forms";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  // SignInForm reads ?redirect= via useSearchParams(), which requires a
  // Suspense boundary to avoid a client-side-rendering bailout at prerender.
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
}
