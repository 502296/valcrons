"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default function ExpertSignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      options: {
        data: {
          role: "expert",
          full_name: fullName,
          specialty,
          location,
          phone,
          experience,
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    setMessage("Expert account created. Please check your email, then log in.");
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
              Expert Access
            </p>

            <h1 className="mt-4 text-4xl font-bold text-[#111827]">
              Create Expert Account
            </h1>

            <p className="mt-4 max-w-2xl text-[#4b5563]">
              Join VALCRONS as an industrial expert or technician to browse
              verified facility requests, save opportunities, and communicate
              securely with companies.
            </p>

            <form
              onSubmit={handleSignup}
              className="mt-10 grid gap-6 md:grid-cols-2"
            >
              <input
                required
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                placeholder="Primary specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827]"
              />

              <input
                required
                placeholder="Years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
                type="email"
                placeholder="Professional email"
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
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border border-black/10 px-4 py-3 text-[#111827] md:col-span-2"
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
                {loading ? "Creating Account..." : "Create Expert Account"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
