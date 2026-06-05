 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    requestUpdates: true,
    expertResponses: true,
    platformAlerts: true,
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

    setMessage("Password updated successfully.");
  }

  async function signOutEverywhere() {
    await supabase.auth.signOut();
    window.location.href = "/login";
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
        <div className="mx-auto max-w-6xl">
          <Link
            href="/profile"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back
          </Link>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
            Account Security
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#111827]">
            Account Settings
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#374151]">
            Manage your VALCRONS account security, notifications, and access preferences.
          </p>

          {(message || error) && (
            <div
              className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
                error
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-black/10 bg-white text-[#111827]"
              }`}
            >
              {error || message}
            </div>
          )}

          <div className="mt-10 grid gap-6">
            <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                Security
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#111827]">
                Change Password
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
                Update your password regularly to protect access to company requests and operational information.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <PasswordField
                  label="New Password"
                  value={passwordForm.newPassword}
                  onChange={(value) =>
                    setPasswordForm({ ...passwordForm, newPassword: value })
                  }
                />

                <PasswordField
                  label="Confirm New Password"
                  value={passwordForm.confirmPassword}
                  onChange={(value) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: value })
                  }
                />
              </div>

              <button
                onClick={updatePassword}
                disabled={savingPassword}
                className="mt-8 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                Notifications
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#111827]">
                Communication Preferences
              </h2>

              <div className="mt-8 grid gap-4">
                <CheckboxRow
                  label="Request updates"
                  checked={notifications.requestUpdates}
                  onChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      requestUpdates: checked,
                    })
                  }
                />

                <CheckboxRow
                  label="Expert responses"
                  checked={notifications.expertResponses}
                  onChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      expertResponses: checked,
                    })
                  }
                />

                <CheckboxRow
                  label="Platform alerts"
                  checked={notifications.platformAlerts}
                  onChange={(checked) =>
                    setNotifications({
                      ...notifications,
                      platformAlerts: checked,
                    })
                  }
                />
              </div>

              <button
                onClick={() => setMessage("Notification preferences saved.")}
                className="mt-8 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
              >
                Save Preferences
              </button>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                Account Access
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#111827]">
                Sign Out
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
                Sign out of your current VALCRONS session. Use this when working from shared or public devices.
              </p>

              <button
                onClick={signOutEverywhere}
                className="mt-8 rounded-xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Sign Out
              </button>
            </section>

            <section className="rounded-[2rem] border border-red-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700">
                Danger Zone
              </p>

              <h2 className="mt-3 text-2xl font-bold text-[#111827]">
                Delete Account
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#4b5563]">
                Account deletion will be added later with extra verification to protect company data and request history.
              </p>

              <button
                onClick={() =>
                  setError("Account deletion is not enabled yet for safety.")
                }
                className="mt-8 rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
              >
                Delete Account
              </button>
            </section>
          </div>
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
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#111827]"
      />
    </div>
  );
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {

 async function deleteAccount() {
  setMessage("");
  setError("");

  const confirmed = window.confirm(
    "Are you sure you want to permanently delete your VALCRONS account? This action cannot be undone."
  );

  if (!confirmed) return;

  const secondConfirm = window.confirm(
    "Final confirmation: delete this account permanently?"
  );

  if (!secondConfirm) return;

  const { data } = await supabase.auth.getSession();

  const token = data.session?.access_token;

  if (!token) {
    setError("Session expired. Please log in again.");
    return;
  }

  const response = await fetch("/api/delete-account", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    setError(result.error || "Account could not be deleted.");
    return;
  }

  await supabase.auth.signOut();
  window.location.href = "/login";
}
  return (
    <label className="flex items-center justify-between rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4">
      <span className="text-sm font-semibold text-[#111827]">{label}</span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-[#111827]"
      />
    </label>
  );
}
