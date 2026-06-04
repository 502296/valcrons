"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

type FacilityRequest = {
  id: number;
  created_at: string;
  company_name: string;
  contact_person: string;
  work_email: string;
  facility_type: string;
  urgency: string;
  issue_type: string;
  location: string;
  problem_description: string;
  status: string;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    loadRequests();

    const saved = localStorage.getItem("valcrons_saved_requests");
    if (saved) {
      setSavedIds(JSON.parse(saved));
    }
  }, []);

  async function loadRequests() {
    const { data, error } = await supabase
      .from("facility_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }

    setLoading(false);
  }

  function saveRequest(id: number) {
    const updated = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];

    setSavedIds(updated);
    localStorage.setItem("valcrons_saved_requests", JSON.stringify(updated));
  }

  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <BackButton />

            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
                Industrial Requests
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
                Active industrial support requests.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
                Review operational requests submitted by industrial facilities
                seeking qualified expert support.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                  Active Requests
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#111827]">
                  {requests.length}
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                  Urgent
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#111827]">
                  {requests.filter((r) => r.urgency?.includes("Urgent")).length}
                </p>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                  Saved
                </p>
                <p className="mt-3 text-3xl font-semibold text-[#111827]">
                  {savedIds.length}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6">
              {loading && (
                <p className="text-sm text-[#374151]">Loading requests...</p>
              )}

              {!loading && requests.length === 0 && (
                <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
                  <p className="text-[#374151]">No requests available yet.</p>
                </div>
              )}

              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-10"
                >
                  <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                        {request.urgency || "Review"}
                      </p>

                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
                        {request.issue_type || "Industrial support request"}
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-[#374151]">
                        {request.problem_description}
                      </p>

                      <div className="mt-7 grid gap-4 text-sm text-[#374151] sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#111827]">
                            Industry
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.facility_type}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#111827]">
                            Location
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.location}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#111827]">
                            Status
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.status || "pending"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:min-w-[190px]">
                      <a
                        href={`mailto:${request.work_email}?subject=VALCRONS Expert Support Inquiry&body=Hello, I saw your industrial support request on VALCRONS and would like to discuss how I may be able to help.`}
                        className="rounded-2xl bg-[#07111f] px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-black"
                      >
                        Contact Facility →
                      </a>

                      <button
                        type="button"
                        onClick={() => saveRequest(request.id)}
                        className="rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-white"
                      >
                        {savedIds.includes(request.id)
                          ? "Saved ✓"
                          : "Save Request"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
