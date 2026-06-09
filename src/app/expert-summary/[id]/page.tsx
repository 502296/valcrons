"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ContactAttachment = {
  name: string;
  path?: string;
  size?: number;
  type?: string;
};

type ExpertSummary = {
  contact_id: number;
  request_id: number;
  expert_id: string;
  expert_message: string | null;
  attachment_names: ContactAttachment[] | string | null;
  contact_status: string | null;
  contact_created_at: string;
  expert_name: string | null;
  expert_email: string | null;
  expert_phone: string | null;
  expert_location: string | null;
  expert_specialty: string | null;
  facility_type: string | null;
  request_location: string | null;
  request_urgency: string | null;
  request_issue_type: string | null;
  request_description: string | null;
};

function parseAttachments(value: ContactAttachment[] | string | null): ContactAttachment[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ExpertSummaryPage() {
  const params = useParams();

  const [summary, setSummary] = useState<ExpertSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedAt] = useState(() => new Date());

  useEffect(() => {
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loading && summary) {
      const timer = setTimeout(() => window.print(), 500);
      return () => clearTimeout(timer);
    }
  }, [loading, summary]);

  async function loadSummary() {
    setLoading(true);

    const contactId = Number(params?.id);

    if (!contactId) {
      setErrorMessage("Invalid expert summary link.");
      setLoading(false);
      return;
    }

    const { data: contact, error: contactError } = await supabase
      .from("expert_contact_requests")
      .select("*")
      .eq("id", contactId)
      .maybeSingle();

    if (contactError || !contact) {
      setErrorMessage("Expert contact request could not be found.");
      setLoading(false);
      return;
    }

    const { data: expert } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, location, specialty")
      .eq("id", contact.expert_id)
      .maybeSingle();

    const { data: request } = await supabase
      .from("facility_requests")
      .select("id, facility_type, urgency, location, issue_type, problem_description")
      .eq("id", contact.request_id)
      .maybeSingle();

    setSummary({
      contact_id: contact.id,
      request_id: contact.request_id,
      expert_id: contact.expert_id,
      expert_message: contact.expert_message,
      attachment_names: contact.attachment_names,
      contact_status: contact.status,
      contact_created_at: contact.created_at,
      expert_name: expert?.full_name || null,
      expert_email: expert?.email || null,
      expert_phone: expert?.phone || null,
      expert_location: expert?.location || null,
      expert_specialty: expert?.specialty || null,
      facility_type: request?.facility_type || null,
      request_location: request?.location || null,
      request_urgency: request?.urgency || null,
      request_issue_type: request?.issue_type || null,
      request_description: request?.problem_description || null,
    });

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white text-[#111827]">
        <p className="text-sm font-semibold">Preparing expert summary...</p>
      </main>
    );
  }

  if (errorMessage || !summary) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-[#111827]">
        <div className="max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {errorMessage || "Expert summary could not be loaded."}
        </div>
      </main>
    );
  }

  const attachments = parseAttachments(summary.attachment_names);

  return (
    <main className="min-h-screen bg-white px-8 py-10 text-[#111827] print:px-0 print:py-0">
      <section className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-10 shadow-sm print:border-0 print:shadow-none">
        <header className="border-b border-black/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            VALCRONS
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
            Industrial Expert Summary
          </h1>

          <p className="mt-3 text-sm text-[#6b7280]">
            Generated for facility review and internal operational coordination.
          </p>

          <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 bg-[#f8f6f1] p-4 text-sm sm:grid-cols-2">
            <Info label="Report ID" value={`EXP-${summary.contact_id}`} />
            <Info label="Generated" value={generatedAt.toLocaleString()} />
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
            Expert Information
          </h2>

          <div className="mt-4 grid gap-4 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5 sm:grid-cols-2">
            <Info label="Name" value={summary.expert_name || "Not provided"} />
            <Info label="Specialty" value={summary.expert_specialty || "Not provided"} />
            <Info label="Location" value={summary.expert_location || "Not provided"} />
            <Info label="Status" value={summary.contact_status || "pending"} />
            <Info label="Email" value={summary.expert_email || "Not provided"} blue />
            <Info label="Phone" value={summary.expert_phone || "Not provided"} blue />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
            Facility Request
          </h2>

          <div className="mt-4 grid gap-4 rounded-2xl border border-black/10 bg-white p-5 sm:grid-cols-2">
            <Info label="Request ID" value={String(summary.request_id)} />
            <Info label="Industry" value={summary.facility_type || "Not specified"} />
            <Info label="Location" value={summary.request_location || "Not specified"} />
            <Info label="Priority" value={summary.request_urgency || "Not specified"} />
            <Info label="Support Type" value={summary.request_issue_type || "Not specified"} />
            <Info
              label="Submitted"
              value={new Date(summary.contact_created_at).toLocaleString()}
            />
          </div>
        </section>

        {summary.request_description && (
          <section className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
              Facility Problem Description
            </h2>

            <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5">
              <p className="whitespace-pre-line text-sm leading-7 text-[#374151]">
                {summary.request_description}
              </p>
            </div>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
            Expert Message
          </h2>

          <div className="mt-4 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5">
            <p className="whitespace-pre-line text-sm leading-7 text-[#374151]">
              {summary.expert_message || "No expert message provided."}
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
            Attachments
          </h2>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-5">
            {attachments.length > 0 ? (
              <ul className="space-y-2 text-sm font-medium text-[#374151]">
                {attachments.map((file) => (
                  <li key={file.name}>• {file.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#6b7280]">No attachments submitted.</p>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5">
          <h2 className="text-sm font-bold uppercase tracking-[0.22em]">
            Internal Review
          </h2>

          <div className="mt-4 grid gap-3 text-sm font-medium text-[#111827] sm:grid-cols-3">
            <p>☐ Contact Approved</p>
            <p>☐ Further Review Required</p>
            <p>☐ Not Selected</p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-t border-black/20 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
              Reviewed By
            </div>

            <div className="border-t border-black/20 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
              Review Date
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-black/10 pt-5 text-xs leading-6 text-[#6b7280]">
          <p>Generated by VALCRONS Industrial Expertise Network.</p>
          <p>
            This summary is intended for facility review, internal coordination,
            and expert contact documentation.
          </p>
        </footer>
      </section>
    </main>
  );
}

function Info({
  label,
  value,
  blue = false,
}: {
  label: string;
  value: string;
  blue?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b7280]">
        {label}
      </p>

      <p className={`mt-1 font-semibold ${blue ? "text-[#2563eb]" : "text-[#111827]"}`}>
        {value}
      </p>
    </div>
  );
}
