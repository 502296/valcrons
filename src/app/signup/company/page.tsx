"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default function CompanySignupPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        email,
        role: "company",
        company_name: companyName,
        full_name: contactName,
        phone,
        location,
      });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }
    }

    setMessage("Company account created. Please check your email, then log in.");
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1eb] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/signup"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back
          </Link>

          <section className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Facility Access
            </p>

            <h1 className="mt-4 text-4xl font-bold text-[#111827]">
              Create Company Account
            </h1>

            <p className="mt-4 max-w-2xl text-[#4b5563]">
              Register your facility to post industrial support requests,
              manage operational needs, and communicate securely with verified
              experts.
            </p>

            <form onSubmit={handleSignup} className="mt-10 grid gap-6 md:grid-cols-2">
              <input
                required
                placeholder="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                placeholder="Contact person"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                type="email"
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              {error && (
                <div className="md:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="md:col-span-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                  {message}
                </div>
              )}

              <button
                disabled={loading}
                className="md:col-span-2 rounded-xl bg-[#111827] px-6 py-4 font-semibold text-white hover:bg-black disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Company Account"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
