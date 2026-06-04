"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  facility_type: string | null;
  urgency: string | null;
  location: string | null;
  problem_description: string | null;
  created_at: string;
  status: string | null;
  issue_type?: string | null;
};

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data } = await supabase
      .from("facility_requests")
      .select("*")
      .eq("work_email", userData.user.email)
      .order("created_at", { ascending: false });

    setRequests(data || []);
    setLoading(false);
  }

  async function closeRequest(id: string) {
    setUpdatingId(id);

    const { error } = await supabase
      .from("facility_requests")
      .update({ status: "closed" })
      .eq("id", id);

    if (!error) {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "closed" } : request
        )
      );
    }

    setUpdatingId(null);
  }

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

          <h1 className="text-4xl font-bold text-[#111827]">
            My Requests
          </h1>

          <p className="mt-3 text-[#4b5563]">
            Review, track, and manage all requests submitted by your facility.
          </p>

          {loading ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
              Loading requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
              No requests have been submitted yet.
            </div>
          ) : (
            <div className="mt-10 grid gap-6">
              {requests.map((request) => {
                const isExpanded = expandedId === request.id;
                const status = request.status || "pending";

                return (
                  <div
                    key={request.id}
                    className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-[#111827]">
                            {request.facility_type || "Industrial Request"}
                          </h3>

                          <span className="rounded-full bg-[#f8f6f1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#374151]">
                            {status}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-[#6b7280]">
                          {request.location || "Location not specified"}
                        </p>

                        <p className="mt-4 text-[#374151] leading-relaxed">
                          {request.problem_description ||
                            "No problem description provided."}
                        </p>

                        {isExpanded && (
                          <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5 text-sm text-[#374151] md:grid-cols-2">
                            <Detail
                              label="Support Type"
                              value={request.issue_type || "Not specified"}
                            />
                            <Detail
                              label="Priority"
                              value={request.urgency || "Pending"}
                            />
                            <Detail
                              label="Request ID"
                              value={request.id}
                            />
                            <Detail
                              label="Created"
                              value={new Date(
                                request.created_at
                              ).toLocaleString()}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 md:items-end">
                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                          {request.urgency || "Pending"}
                        </span>

                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : request.id)
                          }
                          className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>

                        {status !== "closed" && (
                          <button
                            onClick={() => closeRequest(request.id)}
                            disabled={updatingId === request.id}
                            className="rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
                          >
                            {updatingId === request.id
                              ? "Closing..."
                              : "Close Request"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#111827]">
        {value}
      </p>
    </div>
  );
}
