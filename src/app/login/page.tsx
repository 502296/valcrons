"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountLayout, { accountAction, accountLink } from "@/components/account/AccountLayout";
import AccountForm, { type Field } from "@/components/account/AccountForm";
import { accountDestination } from "@/lib/account-onboarding";
import { supabase } from "@/lib/supabase";

const fields: Field[] = [
  { name: "email", label: "Email address", type: "email", autoComplete: "username" },
  { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
];

const savedEmailKey = "valcrons_login_email";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function prepareLogin() {
      try {
        setEmail(localStorage.getItem(savedEmailKey) ?? "");
        const fragment = new URLSearchParams(window.location.hash.slice(1));
        const query = new URLSearchParams(window.location.search);
        if (fragment.has("error") || query.has("error")) {
          setError("This verification link could not be used. Log in if you already verified your email, or request help from support.");
        }

        const { data } = await supabase.auth.getUser();
        if (!active || !data.user) return;
        setSignedIn(true);
        const destination = await accountDestination(data.user);
        if (active) router.replace(destination);
      } catch (failure) {
        if (active) setError(failure instanceof Error ? failure.message : "Account access could not be checked.");
      } finally {
        if (active) setChecking(false);
      }
    }

    void prepareLogin();
    return () => { active = false; };
  }, [router]);

  async function login(values: FormData) {
    const cleanEmail = String(values.get("email")).trim().toLowerCase();
    setBusy(true);
    setError("");

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: String(values.get("password")),
      });

      if (loginError?.code === "email_not_confirmed") {
        setError("Verify your email before logging in. Open the verification link sent when you registered.");
        return;
      }
      if (loginError) throw loginError;

      setSignedIn(true);
      localStorage.setItem(savedEmailKey, cleanEmail);
      router.replace(await accountDestination(data.user));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Login failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AccountLayout>
      <section className="rounded-2xl border border-[#dfddd5] bg-white p-4 shadow-sm sm:p-7">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Log in to VALCRONS</h1>
        <p className="mt-2 text-sm text-[#485364]">Continue to your company or expert account.</p>
        {checking || (signedIn && !error) ? (
          <p role="status" className="mt-5 text-sm font-semibold">
            {signedIn ? "Opening your account…" : "Checking your session…"}
          </p>
        ) : signedIn ? (
          <div className="mt-5 space-y-3">
            <p role="alert" className="text-sm text-red-800">{error}</p>
            <button type="button" className={accountAction} onClick={() => window.location.reload()}>Continue to Your Account</button>
          </div>
        ) : (
          <>
            <AccountForm fields={fields} action="Log In" busyLabel="Logging in…" busy={busy}
              error={error} defaultEmail={email} onSubmit={login} />
            <Link href="/signup" className={`mt-2 ${accountLink}`}>Choose an Account Type</Link>
          </>
        )}
      </section>
    </AccountLayout>
  );
}
