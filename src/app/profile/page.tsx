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
  avatar_url: string | null;
  bio: string | null;
  certifications: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    company_name: "",
    specialty: "",
    phone: "",
    location: "",
    avatar_url: "",
    bio: "",
    certifications: "",
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

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (error || !data) {
      setError("Profile could not be loaded.");
      setLoading(false);
      return;
    }

    setProfile(data as Profile);
    setForm({
      full_name: data.full_name || "",
      company_name: data.company_name || "",
      specialty: data.specialty || "",
      phone: data.phone || "",
      location: data.location || "",
      avatar_url: data.avatar_url || "",
      bio: data.bio || "",
      certifications: data.certifications || "",
    });

    setLoading(false);
  }

  function completionScore() {
    const fields = [
      form.full_name,
      profile?.email,
      form.phone,
      form.location,
      form.avatar_url,
      form.bio,
      profile?.role === "company" || profile?.role === "facility"
        ? form.company_name
        : form.specialty,
      profile?.role === "expert" ? form.certifications : "company",
    ];

    const completed = fields.filter((field) => field && String(field).trim()).length;
    return Math.round((completed / fields.length) * 100);
  }

  async function uploadAvatar(file: File) {
    if (!profile) return;

    setUploading(true);
    setError("");
    setMessage("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
    const filePath = `${profile.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    setForm((prev) => ({ ...prev, avatar_url: publicUrl }));

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", profile.id);

    if (updateError) {
      setError(updateError.message);
      setUploading(false);
      return;
    }

    setProfile({ ...profile, avatar_url: publicUrl });
    setUploading(false);
    setMessage("Profile image updated.");
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
        avatar_url: form.avatar_url,
        bio: form.bio,
        certifications: form.certifications,
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
      avatar_url: form.avatar_url,
      bio: form.bio,
      certifications: form.certifications,
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
  const score = completionScore();

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

          <section className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <div className="bg-[#111827] px-8 py-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96b]">
                VALCRONS PROFESSIONAL PROFILE
              </p>

              <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border border-white/20 bg-white/10">
                    {form.avatar_url ? (
                      <img
                        src={form.avatar_url}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl font-bold text-[#c8a96b]">
                        {(form.full_name || form.company_name || "V").charAt(0)}
                      </span>
                    )}
                  </div>

                  <div>
                    <h1 className="text-4xl font-bold tracking-[-0.04em]">
                      {isCompany
                        ? form.company_name || "Company Profile"
                        : form.full_name || "Expert Profile"}
                    </h1>

                    <p className="mt-3 text-white/70">
                      {isCompany
                        ? form.full_name || "Facility account"
                        : form.specialty || "Industrial expert"}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#c8a96b]">
                      {form.location || "Location not provided"}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 min-w-[220px]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Profile Completion
                  </p>

                  <p className="mt-3 text-4xl font-bold">{score}%</p>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#c8a96b]"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {message && (
                <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div className="mb-8 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a3f]">
                  Profile Image / Logo
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadAvatar(file);
                  }}
                  className="mt-4 block w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm"
                />

                <p className="mt-3 text-xs text-[#6b7280]">
                  {uploading ? "Uploading image..." : "Upload a professional image or company logo."}
                </p>
              </div>

              {!editing ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {isCompany ? (
                    <>
                      <Info label="Company Name" value={profile.company_name} />
                      <Info label="Contact Person" value={profile.full_name} />
                      <Info label="Email" value={profile.email} />
                      <Info label="Phone" value={profile.phone} />
                      <Info label="Location" value={profile.location} />
                      <Info label="Account Type" value="Company / Facility" />
                      <Info label="Company Summary" value={profile.bio} large />
                    </>
                  ) : (
                    <>
                      <Info label="Full Name" value={profile.full_name} />
                      <Info label="Specialty" value={profile.specialty} />
                      <Info label="Email" value={profile.email} />
                      <Info label="Phone" value={profile.phone} />
                      <Info label="Location" value={profile.location} />
                      <Info label="Account Type" value="Expert / Technician" />
                      <Info label="Professional Summary" value={profile.bio} large />
                      <Info label="Certifications" value={profile.certifications} large />
                    </>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
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

                  <TextArea
                    label={isCompany ? "Company Summary" : "Professional Summary"}
                    value={form.bio}
                    onChange={(v) => setForm({ ...form, bio: v })}
                  />

                  {!isCompany && (
                    <TextArea
                      label="Certifications"
                      value={form.certifications}
                      onChange={(v) =>
                        setForm({ ...form, certifications: v })
                      }
                    />
                  )}
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

                <Link
                  href="/settings"
                  className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                >
                  Account Settings
                </Link>
              </div>
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

function Info({
  label,
  value,
  large,
}: {
  label: string;
  value: string | null;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/10 bg-[#f8f6f1] p-5 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a3f]">
        {label}
      </p>

      <p className="mt-2 whitespace-pre-line text-lg font-semibold leading-8 text-[#111827]">
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

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9a7a3f]">
        {label}
      </label>

      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm leading-7 text-[#111827] outline-none focus:border-[#9a7a3f]"
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
