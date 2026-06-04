"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1eb] px-6 pt-32 pb-20">
        <section className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a7a3f]">
            Secure Access
          </p>

          <h1 className="mt-4 text-3xl font-bold text-[#111827]">
            Log in to VALCRONS
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#4b5563]">
            Access your industrial dashboard as a facility or verified expert.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-[#111827]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[#111827] outline-none focus:border-[#111827]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#111827]">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-[#111827] outline-none focus:border-[#111827]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}
