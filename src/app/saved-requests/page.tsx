"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type SavedRequest = {
  id: number;
  created_at: string;
  facility_type: string | null;
  urgency: string | null;
  issue_type: string | null;
  location: string | null;
  problem_description: string | null;
  status: string | null;
};

export default function SavedRequestsPage() {
  const [requests, setRequests] = useState<SavedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadSavedRequests();
  }, []);

  async function loadSavedRequests() {
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    const userId = session.user.id;

    const { data: actions, error: actionsError } = await supabase
      .from("technician_project_actions")
      .select("project_id")
      .eq("technician_id", userId)
      .eq("action_type", "saved");

    if (actionsError) {
      setErrorMessage("Saved requests could not be loaded.");
      setLoading(false);
      return;
    }

    const requestIds = Array.from(
      new Set((actions || []).map((item) => Number(item.project_id)))
    );

    if (requestIds.length === 0) {
      setRequests([]);
      setLoading(false);
      return;
    }

    const { data: savedRequests, error: requestsError } = await supabase
      .from("facility_requests")
      .select(
        "id, created_at, facility_type, urgency, issue_type, location, problem_description, status"
      )
      .in("id", requestIds)
      .order("created_at", { ascending: false });

    if (requestsError) {
      setErrorMessage("Saved request details could not be loaded.");
      setLoading(false);
      return;
    }

    setRequests((savedRequests || []) as SavedRequest[]);
    setLoading(false);
  }

  async function removeSavedRequest(requestId: number) {
    setMessage("");
    setErrorMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      window.location.href = "/login";
      return;
    }

    const { error } = await supabase
      .from("technician_project_actions")
      .delete()
      .eq("technician_id", session.user.id)
      .eq("project_id", requestId)
      .eq("action_type", "saved");

    if (error) {
      setErrorMessage("Saved request could not be removed.");
      return;
    }

    setRequests((prev) => prev.filter((request) => request.id !== requestId));
    setMessage("Saved request removed.");
  }

  function priorityLabel(value: string | null) {
    const text = (value || "").toLowerCase();

    if (text.includes("urgent")) return "URGENT";
    if (text.includes("high")) return "HIGH PRIORITY";
    if (text.includes("normal")) return "NORMAL";
    return "PENDING";
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1ea] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/requests"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back to Browse Requests
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#111827]">
                Expert Workspace
              </p>

              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#111827]">
                Saved Requests
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#374151]">
                Review industrial opportunities you saved for later and return
                to them when you are ready to take action.
              </p>
            </div>

            <Link
              href="/requests"
              className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Browse Requests →
            </Link>
          </div>

          {(message || errorMessage) && (
            <div
              className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
                errorMessage
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-black/10 bg-white text-[#111827]"
              }`}
            >
              {errorMessage || message}
            </div>
          )}

          {loading ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
              Loading saved requests...
            </div>
          ) : requests.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-10 text-[#111827] shadow-sm">
              <h2 className="text-2xl font-semibold">No saved requests yet.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#374151]">
                When you save an industrial request, it will appear here so you
                can review it later.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-bold text-[#111827]">
                          {request.problem_description?.slice(0, 80) ||
                            request.issue_type ||
                            "Industrial Request"}
                        </h3>

                        <span className="rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                          {priorityLabel(request.urgency)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium text-[#6b7280]">
                        {request.location || "Location not specified"}
                      </p>

                      <div className="mt-5 grid gap-4 text-sm text-[#374151] sm:grid-cols-3">
                        <Info
                          label="Industry"
                          value={request.facility_type || "Not specified"}
                        />
                        <Info
                          label="Support Type"
                          value={request.issue_type || "Not specified"}
                        />
                        <Info
                          label="Status"
                          value={request.status || "pending"}
                        />
                      </div>
                    </div>

                    <div className="flex min-w-[180px] flex-col gap-3">
                      <Link
                        href="/requests"
                        className="rounded-xl bg-[#111827] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-black"
                      >
                        View in Browse
                      </Link>

                      <button
                        onClick={() => removeSavedRequest(request.id)}
                        className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                      >
                        Remove Saved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#111827]">{value}</p>
    </div>
  );
}
