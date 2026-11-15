"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountLayout, { accountAction, accountLink } from "./AccountLayout";
import AccountForm, { type Field } from "./AccountForm";
import { accountDestination, rememberCompany, saveCompany } from "@/lib/account-onboarding";
import { supabase } from "@/lib/supabase";

const contactFields: Field[] = [
  { name: "location", label: "City and state" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel" },
];

const passwordField: Field = {
  name: "password", label: "Password", type: "password", autoComplete: "new-password",
};

const companyFields: Field[] = [
  { name: "company_name", label: "Company name", autoComplete: "organization" },
  { name: "full_name", label: "Contact name", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  ...contactFields,
  passwordField,
];

const expertFields: Field[] = [
  { name: "full_name", label: "Full name", autoComplete: "name" },
  { name: "specialty", label: "Primary specialty" },
  { name: "experience", label: "Years of experience", inputMode: "decimal" },
  { name: "email", label: "Professional email", type: "email", autoComplete: "email" },
  ...contactFields,
  passwordField,
];

export default function SignupForm({ role }: { role: "company" | "expert" }) {
  const router = useRouter();
  const company = role === "company";
  const title = company ? "Create Company Account" : "Create Expert Account";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{ email: string; pendingCompany: boolean }>();
  const [continueToLogin, setContinueToLogin] = useState(false);

  async function signup(values: FormData) {
    const read = (name: string) => String(values.get(name) ?? "").trim();
    const email = read("email").toLowerCase();
    const details = { full_name: read("full_name"), phone: read("phone"), location: read("location") };
    setBusy(true);
    setError("");

    try {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password: String(values.get("password")),
        options: {
          emailRedirectTo: new URL("/login", window.location.origin).href,
          ...(company ? {} : {
            data: { role, ...details, specialty: read("specialty"), experience: read("experience") },
          }),
        },
      });
      if (signupError) throw signupError;

      let pendingCompany = false;
      if (company && data.user && data.user.identities?.length !== 0) {
        const companyDetails = { company_name: read("company_name"), ...details };
        const { error: profileError } = await saveCompany(data.user, companyDetails);
        if (profileError) {
          pendingCompany = rememberCompany(data.user, companyDetails);
          if (data.session) {
            setContinueToLogin(true);
            throw new Error("Your account was created, but the company profile could not be saved.");
          }
          if (!pendingCompany) {
            setError("Your company details could not be saved in this browser. After verifying, you may need to complete your profile.");
          }
        }
      }

      if (!data.session) {
        setConfirmation({ email, pendingCompany });
        return;
      }

      setContinueToLogin(true);
      router.replace(await accountDestination(data.session.user));
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Account creation failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AccountLayout>
      <Link href="/signup" className={accountLink}>← Account choices</Link>
      <section className="rounded-2xl border border-[#dfddd5] bg-white p-4 shadow-sm sm:p-7">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-[#485364]">
          {company ? "Register your company to request industrial support." : "Create a professional profile and discover industrial support requests."}
        </p>
        {confirmation ? (
          <div className="mt-5 space-y-3">
            <div role="status" className="rounded-xl border border-[#cbd8f3] bg-[#f1f5ff] p-4">
              <h2 className="font-bold">Check your email</h2>
              <p className="mt-1 text-sm">
                If registration can proceed for <strong className="break-all">{confirmation.email}</strong>, you’ll receive a verification link. Open it before logging in.
                {confirmation.pendingCompany && " Use this browser to finish saving your company details."}
              </p>
            </div>
            {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
            <Link href="/login" className={accountAction}>Continue to Log In</Link>
          </div>
        ) : continueToLogin ? (
          <div className="mt-5 space-y-3">
            {error && <p role="alert" className="text-sm text-red-800">{error}</p>}
            <Link href="/login" className={accountAction}>Continue to Your Account</Link>
          </div>
        ) : (
          <>
            <AccountForm fields={company ? companyFields : expertFields} action={title}
              busyLabel={company ? "Creating company account…" : "Creating expert account…"}
              busy={busy} error={error} onSubmit={signup} />
            <Link href="/login" className={`mt-2 ${accountLink}`}>Log In to an Existing Account</Link>
          </>
        )}
      </section>
    </AccountLayout>
  );
}
