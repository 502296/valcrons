"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  role: string | null;
  email: string | null;
  company_name: string | null;
  phone: string | null;
  location: string | null;
};

export default function RequestSupportPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    phoneNumber: "",
    facilityLocation: "",
    industry: "",
    priorityLevel: "",
    supportType: "",
    issueDescription: "",
  });

  useEffect(() => {
    async function checkUserAndLoadProfile() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setLoggedIn(false);
        setCheckingAuth(false);
        return;
      }

      setLoggedIn(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (profile) {
        const p = profile as Profile;

        setFormData((prev) => ({
          ...prev,
          companyName: p.company_name || "",
          contactPerson: p.full_name || "",
          workEmail: p.email || userData.user.email || "",
          phoneNumber: p.phone || "",
          facilityLocation: p.location || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          workEmail: userData.user.email || "",
        }));
      }

      setCheckingAuth(false);
    }

    checkUserAndLoadProfile();
  }, []);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.from("facility_requests").insert({
      company_name: formData.companyName,
      contact_person: formData.contactPerson,
      work_email: formData.workEmail,
      phone_number: formData.phoneNumber,
      location: formData.facilityLocation,
      facility_type: formData.industry,
      urgency: formData.priorityLevel,
      issue_type: formData.supportType,
      problem_description: formData.issueDescription,
      status: "pending",
    });

    setIsSubmitting(false);

    if (error) {
      setErrorMessage("Request could not be submitted. Please try again.");
      console.error(error);
      return;
    }

    router.push("/my-requests");
  }

  if (checkingAuth) {
    return (
      <>
        <main className="min-h-screen bg-[#f4f1ea]">
          <Header />

          <section className="px-6 py-32">
            <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-10 text-center text-[#111827] shadow-sm">
              Checking secure access...
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  if (!loggedIn) {
    return (
      <>
        <main className="min-h-screen bg-[#f4f1ea]">
          <Header />

          <section className="px-6 py-32">
            <div className="mx-auto mb-8 max-w-3xl">
              <Link
                href="/"
                className="inline-flex text-sm font-semibold text-[#374151] hover:text-black"
              >
                ← Back
              </Link>
            </div>

            <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                Company Access Required
              </p>

              <h1 className="mt-4 text-4xl font-bold text-[#111827]">
                Create an Account to Post a Request
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-[#4b5563]">
                Industrial support requests can only be submitted through a
                registered company account. VALCRONS protects facilities,
                experts, and operational information through verified
                account-based access.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/login"
                  className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white hover:bg-black"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
            >
              ← Back
            </Link>

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
              Request Expert Support
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
              Submit an industrial support request.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
              Provide the essential operational details so VALCRONS can prepare
              your request for qualified industrial experts.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-14 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <FormInput
                  label="Company Name"
                  value={formData.companyName}
                  placeholder="Example: BlueRiver Manufacturing"
                  required
                  onChange={(value) => updateField("companyName", value)}
                />

                <FormInput
                  label="Contact Person"
                  value={formData.contactPerson}
                  placeholder="Full name"
                  required
                  onChange={(value) => updateField("contactPerson", value)}
                />

                <FormInput
                  label="Work Email"
                  type="email"
                  value={formData.workEmail}
                  placeholder="name@company.com"
                  required
                  onChange={(value) => updateField("workEmail", value)}
                />

                <FormInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phoneNumber}
                  placeholder="+1 (502) 000-0000"
                  onChange={(value) => updateField("phoneNumber", value)}
                />

                <FormInput
                  label="Facility Location"
                  value={formData.facilityLocation}
                  placeholder="City, State"
                  required
                  onChange={(value) => updateField("facilityLocation", value)}
                />

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Industry
                  </label>
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]"
                  >
                    <option value="">Select industry</option>
                    <option>Manufacturing</option>
                    <option>Energy</option>
                    <option>Automation</option>
                    <option>Food Processing</option>
                    <option>Logistics</option>
                    <option>Heavy Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Priority Level
                  </label>
                  <select
                    required
                    value={formData.priorityLevel}
                    onChange={(e) =>
                      updateField("priorityLevel", e.target.value)
                    }
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]"
                  >
                    <option value="">Select priority</option>
                    <option>Urgent — Operations affected now</option>
                    <option>High Priority — Needs expert review soon</option>
                    <option>Review — Planning or evaluation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Support Type
                  </label>
                  <select
                    required
                    value={formData.supportType}
                    onChange={(e) => updateField("supportType", e.target.value)}
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]"
                  >
                    <option value="">Select support type</option>
                    <option>Remote expert review</option>
                    <option>On-site expert support</option>
                    <option>Emergency response coordination</option>
                    <option>General industrial consultation</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                  Operational Issue Description
                </label>
                <textarea
                  required
                  rows={7}
                  value={formData.issueDescription}
                  onChange={(e) =>
                    updateField("issueDescription", e.target.value)
                  }
                  placeholder="Describe the issue, affected equipment, urgency, symptoms, downtime impact, and what support is needed."
                  className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm leading-7 text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                />
              </div>

              {errorMessage && (
                <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                  {errorMessage}
                </p>
              )}

              <div className="mt-8 rounded-3xl border border-black/10 bg-[#f8f6f1] p-5">
                <p className="text-sm leading-7 text-[#374151]">
                  VALCRONS is a connection platform. Submitting this request
                  does not guarantee repair service or equipment operation.
                  Qualified experts may review the request and coordinate next
                  steps.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-[#374151]">
                  By submitting, you confirm that the information provided is
                  accurate and authorized by your facility.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-[#07111f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request →"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FormInput({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
        {label}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
      />
    </div>
  );
}
