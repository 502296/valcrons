"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

type FacilityRequest = {
  id: number;
  created_at: string;
  company_name: string | null;
  contact_person: string | null;
  work_email: string | null;
  facility_type: string | null;
  urgency: string | null;
  issue_type: string | null;
  location: string | null;
  problem_description: string | null;
  status: string | null;
};

type ActionType = "saved" | "accepted" | "contact";

type ExpertActions = {
  saved: number[];
  accepted: number[];
  contact: number[];
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [expertId, setExpertId] = useState<string | null>(null);
  const [actions, setActions] = useState<ExpertActions>({
    saved: [],
    accepted: [],
    contact: [],
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingAction, setUpdatingAction] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoggedIn(false);
        setCheckingAuth(false);
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      setExpertId(session.user.id);
      setCheckingAuth(false);

      await loadRequests();
      await loadExpertActions(session.user.id);
    }

    init();
  }, []);

  async function loadRequests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("facility_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Requests could not be loaded. Please try again.");
      setLoading(false);
      return;
    }

    const openRequests = (data || []).filter(
      (request) => request.status !== "closed"
    );

    setRequests(openRequests);
    setLoading(false);
  }

  async function loadExpertActions(userId: string) {
    const { data, error } = await supabase
      .from("technician_project_actions")
      .select("project_id, action_type")
      .eq("technician_id", userId);

    if (error) return;

    const nextActions: ExpertActions = {
      saved: [],
      accepted: [],
      contact: [],
    };

    (data || []).forEach((item) => {
      const actionType = item.action_type as ActionType;
      const projectId = Number(item.project_id);

      if (
        actionType === "saved" ||
        actionType === "accepted" ||
        actionType === "contact"
      ) {
        nextActions[actionType].push(projectId);
      }
    });

    setActions(nextActions);
  }

  function hasAction(requestId: number, actionType: ActionType) {
    return actions[actionType].includes(requestId);
  }

  async function addExpertAction(requestId: number, actionType: ActionType) {
    if (!expertId) return;

    setMessage("");
    setErrorMessage("");
    setUpdatingAction(`${requestId}-${actionType}`);

    const alreadyExists = hasAction(requestId, actionType);

    if (alreadyExists) {
      setUpdatingAction(null);
      return;
    }

   const { error } = await supabase
  .from("technician_project_actions")
  .insert({
    technician_id: expertId,
    project_id: requestId,
    action_type: actionType,
  });

console.log("VALCRONS action result:", {
  requestId,
  actionType,
  expertId,
  error,
});

    setUpdatingAction(null);

    if (error) {
      setErrorMessage("Action could not be saved. Please check permissions.");
      return;
    }

    setActions((prev) => ({
      ...prev,
      [actionType]: [...prev[actionType], requestId],
    }));

    if (actionType === "saved") setMessage("Project saved successfully.");
    if (actionType === "accepted") setMessage("Project accepted successfully.");
    if (actionType === "contact") {
      setMessage("Contact request sent to the facility.");
    }
  }

  function getRequestTitle(request: FacilityRequest) {
    const description = request.problem_description || "";

    if (description.length > 8) {
      return description.length > 72
        ? `${description.slice(0, 72)}...`
        : description;
    }

    return request.issue_type || "Industrial support request";
  }

  function priorityLabel(value: string | null) {
    const text = (value || "").toLowerCase();

    if (text.includes("urgent")) return "URGENT — NEEDS IMMEDIATE REVIEW";
    if (text.includes("high")) return "HIGH PRIORITY — NEEDS EXPERT REVIEW SOON";
    if (text.includes("normal")) return "NORMAL PRIORITY";
    return "PENDING REVIEW";
  }

  const urgentCount = requests.filter((request) =>
    (request.urgency || "").toLowerCase().includes("urgent")
  ).length;

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />
        <section className="px-6 py-32">
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/10 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-[#374151]">
              Checking secure access...
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-32">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Secure Industrial Access
            </p>

            <h1 className="mt-4 text-4xl font-bold text-[#111827]">
              Industrial Access Required
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-[#4b5563]">
              To view industrial requests, you must create an account or log in
              first. VALCRONS protects facilities, experts, and operational
              information through verified account-based access.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/login"
                className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]"
              >
                Log In
              </a>

              <a
                href="/signup"
                className="rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white hover:bg-black"
              >
                Create Account
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
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
                Expert Operations Dashboard
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
                Active industrial support requests.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
                Review verified operational requests, save opportunities, accept
                projects, and request facility contact through VALCRONS.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard title="Available Requests" value={requests.length} />
              <StatCard title="Urgent Requests" value={urgentCount} />
              <StatCard title="Saved Projects" value={actions.saved.length} />
              <StatCard
                title="Accepted Projects"
                value={actions.accepted.length}
              />
              <StatCard
                title="Contact"
                value={actions.contact_requested.length}
              />
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

            <div className="mt-8 grid gap-6">
              {loading && (
                <p className="text-sm text-[#374151]">Loading requests...</p>
              )}

              {!loading && requests.length === 0 && (
                <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
                  <p className="text-[#374151]">No requests available yet.</p>
                </div>
              )}

              {requests.map((request) => {
                const isExpanded = expandedId === request.id;
                const saved = hasAction(request.id, "saved");
                const accepted = hasAction(request.id, "accepted");
                const contactRequested = hasAction(
                  request.id,
                  "contact"
                );

                return (
                  <article
                    key={request.id}
                    className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-10"
                  >
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                      <div className="max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                          {priorityLabel(request.urgency)}
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
                          {getRequestTitle(request)}
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#374151]">
                          {request.issue_type || "General industrial support"}
                        </p>

                        <div className="mt-7 grid gap-4 text-sm text-[#374151] sm:grid-cols-4">
                          <Info label="Industry" value={request.facility_type} />
                          <Info label="Location" value={request.location} />
                          <Info
                            label="Support Type"
                            value={request.issue_type}
                          />
                          <Info
                            label="Status"
                            value={request.status || "pending"}
                          />
                        </div>

                        {isExpanded && (
                          <div className="mt-8 rounded-3xl border border-black/10 bg-[#f8f6f1] p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                              Request Details
                            </p>

                            <p className="mt-4 text-sm leading-7 text-[#374151]">
                              {request.problem_description ||
                                "No additional details provided."}
                            </p>

                            <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                              <Info
                                label="Company"
                                value={
                                  contactRequested
                                    ? request.company_name || "Not provided"
                                    : "Hidden until contact request"
                                }
                              />

                              <Info
                                label="Contact"
                                value={
                                  contactRequested
                                    ? request.contact_person || "Not provided"
                                    : "Protected"
                                }
                              />

                              <Info
                                label="Email"
                                value={
                                  contactRequested
                                    ? request.work_email || "Not provided"
                                    : "Protected"
                                }
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 md:min-w-[210px]">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : request.id)
                          }
                          className="rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-white"
                        >
                          {isExpanded ? "Hide Details" : "View Details"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            addExpertAction(request.id, "contact")
                          }
                          disabled={
                            contactRequested ||
                            updatingAction ===
                              `${request.id}-contact_requested`
                          }
                          className="rounded-2xl bg-[#07111f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {contactRequested
                            ? "Contact Requested ✓"
                            : updatingAction ===
                              `${request.id}-contact_requested`
                            ? "Sending..."
                            : "Request Contact →"}
                        </button>

                        <button
                          type="button"
                          onClick={() => addExpertAction(request.id, "accepted")}
                          disabled={
                            accepted ||
                            updatingAction === `${request.id}-accepted`
                          }
                          className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-[#f8f6f1] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {accepted
                            ? "Accepted ✓"
                            : updatingAction === `${request.id}-accepted`
                            ? "Accepting..."
                            : "Accept Project"}
                        </button>

                        <button
                          type="button"
                          onClick={() => addExpertAction(request.id, "saved")}
                          disabled={
                            saved || updatingAction === `${request.id}-saved`
                          }
                          className="rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {saved
                            ? "Saved ✓"
                            : updatingAction === `${request.id}-saved`
                            ? "Saving..."
                            : "Save Project"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[1.6rem] border border-white/50 bg-white/45 p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)] backdrop-blur-xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
        {title}
      </p>

      <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
        {value}
      </p>

      <p className="mt-3 text-xs font-medium text-[#6b7280]">
        Expert activity metric
      </p>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-[#111827]">
        {label}
      </p>
      <p className="mt-2 font-medium text-[#111827]">
        {value || "Not specified"}
      </p>
    </div>
  );
}
