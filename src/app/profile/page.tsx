"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
  email: string | null;
  specialty: string | null;
  company_name: string | null;
  phone: string | null;
  location: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    specialty: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (data) {
      setProfile(data);
      setForm({
        full_name: data.full_name || "",
        company_name: data.company_name || "",
        specialty: data.specialty || "",
        phone: data.phone || "",
        location: data.location || "",
      });
    }

    setLoading(false);
  }

  async function saveProfile() {
    if (!profile) return;

    setSaving(true);
    setError("");
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: form.full_name,
        company_name: form.company_name,
        specialty: form.specialty,
        phone: form.phone,
        location: form.location,
      })
      .eq("id", profile.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setProfile({
      ...profile,
      full_name: form.full_name,
      company_name: form.company_name,
      specialty: form.specialty,
      phone: form.phone,
      location: form.location,
    });

    setEditing(false);
    setSaving(false);
    setMessage("Profile updated successfully.");
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#f4f1ea] px-6 py-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
            Loading profile...
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!profile) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#f4f1ea] px-6 py-32">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-sm">
            Profile not found.
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isCompany = profile.role === "company" || profile.role === "facility";

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1ea] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back
          </Link>

          <section className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              VALCRONS PROFILE
            </p>

            <h1 className="mt-4 text-4xl font-bold text-[#111827]">
              {isCompany ? "Company Profile" : "Expert Profile"}
            </h1>

            <p className="mt-4 max-w-2xl text-[#4b5563]">
              Manage your verified VALCRONS account information and professional access.
            </p>

            {message && (
              <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {!editing ? (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {isCompany ? (
                  <>
                    <Info label="Company Name" value={profile.company_name} />
                    <Info label="Contact Person" value={profile.full_name} />
                    <Info label="Email" value={profile.email} />
                    <Info label="Phone" value={profile.phone} />
                    <Info label="Location" value={profile.location} />
                    <Info label="Account Type" value="Company / Facility" />
                  </>
                ) : (
                  <>
                    <Info label="Full Name" value={profile.full_name} />
                    <Info label="Specialty" value={profile.specialty} />
                    <Info label="Email" value={profile.email} />
                    <Info label="Phone" value={profile.phone} />
                    <Info label="Location" value={profile.location} />
                    <Info label="Account Type" value="Expert / Technician" />
                  </>
                )}
              </div>
            ) : (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {isCompany && (
                  <Field
                    label="Company Name"
                    value={form.company_name}
                    onChange={(v) => setForm({ ...form, company_name: v })}
                  />
                )}

                <Field
                  label={isCompany ? "Contact Person" : "Full Name"}
                  value={form.full_name}
                  onChange={(v) => setForm({ ...form, full_name: v })}
                />

                {!isCompany && (
                  <Field
                    label="Specialty"
                    value={form.specialty}
                    onChange={(v) => setForm({ ...form, specialty: v })}
                  />
                )}

                <Field
                  label="Phone"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />

                <Field
                  label="Location"
                  value={form.location}
                  onChange={(v) => setForm({ ...form, location: v })}
                />
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white hover:bg-black"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white hover:bg-black disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    onClick={() => setEditing(false)}
                    className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                  >
                    Cancel
                  </button>
                </>
              )}

              <button className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]">
                Account Settings
              </button>
            </div>
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-3">
            <Card title={isCompany ? "Active Requests" : "Saved Requests"} value="0" />
            <Card title={isCompany ? "Pending Reviews" : "Contacted Facilities"} value="0" />
            <Card title={isCompany ? "Closed Requests" : "Accepted Work"} value="0" />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a3f]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[#111827]">
        {value || "Not provided"}
      </p>
    </div>
  );
}

function Field({
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
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a3f]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]"
      />
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
        {title}
      </p>
      <p className="mt-3 text-3xl font-bold text-[#111827]">{value}</p>
    </div>
  );
}
