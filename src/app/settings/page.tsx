"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingPassword, setSavingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  async function updatePassword() {
    setMessage("");
    setError("");

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSavingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: passwordForm.newPassword,
    });

    setSavingPassword(false);

    if (error) {
      setError(error.message);
      return;
    }

    setPasswordForm({
      newPassword: "",
      confirmPassword: "",
    });

    setShowPasswordForm(false);
    setMessage("Password updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  async function signOutEverywhere() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  function cancelPasswordChange() {
    setShowPasswordForm(false);
    setError("");
    setMessage("");
    setPasswordForm({
      newPassword: "",
      confirmPassword: "",
    });
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#f4f1ea] px-6 py-32">
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
            Loading settings...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1ea] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/profile"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back to Profile
          </Link>

          <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <div className="bg-[#111827] px-8 py-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96b]">
                VALCRONS ACCOUNT SECURITY
              </p>

              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">
                Account Settings
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65">
                Manage secure access to your VALCRONS account. Keep your login
                protected when working with facility requests, expert
                communication, and operational records.
              </p>
            </div>

            <div className="p-8">
              {(message || error) && (
                <div
                  className={`mb-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {error || message}
                </div>
              )}

              <div className="grid gap-6">
                <section className="rounded-[1.75rem] border border-black/10 bg-[#f8f6f1] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                    Security
                  </p>

                  <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#111827]">
                        Password
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
                        Your password protects access to your professional
                        profile, company requests, and VALCRONS account
                        activity.
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        showPasswordForm
                          ? cancelPasswordChange()
                          : setShowPasswordForm(true)
                      }
                      className="w-full rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black md:w-auto"
                    >
                      {showPasswordForm ? "Cancel" : "Change Password"}
                    </button>
                  </div>

                  {showPasswordForm && (
                    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
                      <div className="grid gap-5 md:grid-cols-2">
                        <PasswordField
                          label="New Password"
                          value={passwordForm.newPassword}
                          onChange={(value) =>
                            setPasswordForm({
                              ...passwordForm,
                              newPassword: value,
                            })
                          }
                        />

                        <PasswordField
                          label="Confirm New Password"
                          value={passwordForm.confirmPassword}
                          onChange={(value) =>
                            setPasswordForm({
                              ...passwordForm,
                              confirmPassword: value,
                            })
                          }
                        />
                      </div>

                      <button
                        onClick={updatePassword}
                        disabled={savingPassword}
                        className="mt-6 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
                      >
                        {savingPassword ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  )}
                </section>

                <section className="rounded-[1.75rem] border border-black/10 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                    Account Access
                  </p>

                  <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#111827]">
                        Sign Out
                      </h2>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
                        Sign out of your current VALCRONS session. Recommended
                        when using a shared or public device.
                      </p>
                    </div>

                    <button
                      onClick={signOutEverywhere}
                      className="w-full rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea] md:w-auto"
                    >
                      Sign Out
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a3f]">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#111827]"
      />
    </div>
  );
}
