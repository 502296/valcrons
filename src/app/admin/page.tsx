"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "ali.kathem.edu@gmail.com";

type Profile = {
  id: string | null;
  email: string | null;
  full_name: string | null;
  role: string | null;
  company_name: string | null;
  location: string | null;
  phone: string | null;
  specialty: string | null;
  account_status: string | null;
  is_admin: boolean | null;
};

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
  status: string | null;
};

type ContactRequest = {
  id: number;
  created_at: string;
  request_id: number | null;
  expert_id: string | null;
  status: string | null;
};

export default function AdminPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userEmail = session?.user?.email || "";
      const isAdminByEmail = userEmail === ADMIN_EMAIL;

      if (!session?.user || !isAdminByEmail) {
        setAuthorized(false);
        setCheckingAuth(false);
        setLoading(false);
        return;
      }

      setAuthorized(true);
      setCheckingAuth(false);
      await loadAdminData();
    }

    init();
  }, []);

  async function loadAdminData() {
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const [profilesResult, requestsResult, contactResult] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          "id, email, full_name, role, company_name, location, phone, specialty, account_status, is_admin"
        )
        .order("email", { ascending: true }),

      supabase
        .from("facility_requests")
        .select(
          "id, created_at, company_name, contact_person, work_email, facility_type, urgency, issue_type, location, status"
        )
        .order("created_at", { ascending: false }),

      supabase
        .from("expert_contact_requests")
        .select("id, created_at, request_id, expert_id, status")
        .order("created_at", { ascending: false }),
    ]);

    if (profilesResult.error) {
      console.error("Profiles load error:", profilesResult.error);
      setErrorMessage("Users could not be loaded.");
      setProfiles([]);
    } else {
      setProfiles((profilesResult.data || []) as Profile[]);
    }

    if (requestsResult.error) {
      console.error("Requests load error:", requestsResult.error);
      setErrorMessage("Requests could not be loaded.");
      setRequests([]);
    } else {
      setRequests((requestsResult.data || []) as FacilityRequest[]);
    }

    if (contactResult.error) {
      console.error("Contact requests load error:", contactResult.error);
      setErrorMessage("Contact requests could not be loaded.");
      setContactRequests([]);
    } else {
      setContactRequests((contactResult.data || []) as ContactRequest[]);
    }

    setLoading(false);
  }

  async function updateUserStatus(
    profile: Profile,
    status: "active" | "suspended"
  ) {
    if (!profile.id) {
      setErrorMessage("User ID not found.");
      return;
    }

    setUpdating(profile.id);
    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({ account_status: status })
      .eq("id", profile.id);

    setUpdating(null);

    if (error) {
      console.error("Update user status error:", error);
      setErrorMessage("User status could not be updated.");
      return;
    }

    setProfiles((prev) =>
      prev.map((item) =>
        item.id === profile.id ? { ...item, account_status: status } : item
      )
    );

    setMessage(
      status === "suspended"
        ? "User suspended successfully."
        : "User reactivated successfully."
    );
  }

  async function updateRequestStatus(
    requestId: number,
    status: "pending" | "closed"
  ) {
    setUpdating(`request-${requestId}`);
    setMessage("");
    setErrorMessage("");

    const { error } = await supabase
      .from("facility_requests")
      .update({ status })
      .eq("id", requestId);

    setUpdating(null);

    if (error) {
      console.error("Update request status error:", error);
      setErrorMessage("Request status could not be updated.");
      return;
    }

    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request
      )
    );

    setMessage(status === "closed" ? "Request closed." : "Request reopened.");
  }

  const stats = useMemo(() => {
    const experts = profiles.filter((p) => p.role === "expert").length;
    const companies = profiles.filter(
      (p) => p.role === "company" || p.role === "facility"
    ).length;
    const suspended = profiles.filter(
      (p) => p.account_status === "suspended"
    ).length;
    const activeRequests = requests.filter((r) => r.status !== "closed").length;
    const closedRequests = requests.filter((r) => r.status === "closed").length;
    const pendingContacts = contactRequests.filter(
      (r) => r.status === "pending"
    ).length;

    return {
      users: profiles.length,
      experts,
      companies,
      suspended,
      activeRequests,
      closedRequests,
      pendingContacts,
    };
  }, [profiles, requests, contactRequests]);

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
        <Header />
        <section className="flex min-h-screen items-center justify-center px-6">
          <p className="text-sm font-semibold text-[#6b7280]">
            Checking admin access...
          </p>
        </section>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
        <Header />
        <section className="px-6 pb-28 pt-36">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-white p-10 text-center shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
              Access Denied
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
              Admin access only.
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              This area is protected and available only to authorized VALCRONS
              administrators.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
      <Header />

      <section className="px-6 pb-28 pt-36">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <div className="mt-8 rounded-[2.5rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                  VALCRONS Super Admin
                </p>
                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
                  Admin Dashboard.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
                  Control users, facility requests, contact requests, and core
                  platform safety from one protected command center.
                </p>
              </div>

              <button
                type="button"
                onClick={loadAdminData}
                className="rounded-2xl border border-black/10 bg-[#111827] px-6 py-4 text-sm font-semibold text-white transition hover:bg-black"
              >
                Refresh Admin Data
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard title="Total Users" value={stats.users} />
              <StatCard title="Experts" value={stats.experts} />
              <StatCard title="Companies" value={stats.companies} />
              <StatCard title="Suspended" value={stats.suspended} />
              <StatCard title="Active Requests" value={stats.activeRequests} />
              <StatCard title="Closed Requests" value={stats.closedRequests} />
              <StatCard title="Pending Contacts" value={stats.pendingContacts} />
              <StatCard title="All Contacts" value={contactRequests.length} />
            </div>
          </div>

          {(message || errorMessage) && (
            <div
              className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
                errorMessage
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {errorMessage || message}
            </div>
          )}

          {loading ? (
            <div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-10">
              <p className="text-sm font-semibold text-[#6b7280]">
                Loading admin data...
              </p>
            </div>
          ) : (
            <>
              <AdminSection title="Users Management">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                        <th className="py-4">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Admin</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profiles.map((profile) => {
                        const userId = profile.id || profile.email || "";
                        const isSuspended =
                          profile.account_status === "suspended";

                        return (
                          <tr
                            key={userId}
                            className="border-b border-black/5 align-top"
                          >
                            <td className="py-4 font-semibold">
                              {profile.full_name || "No name"}
                            </td>
                            <td>{profile.email || "No email"}</td>
                            <td>{profile.role || "Not set"}</td>
                            <td>{profile.company_name || "—"}</td>
                            <td>{profile.location || "—"}</td>
                            <td>
                              <Badge
                                label={profile.account_status || "active"}
                                tone={isSuspended ? "red" : "green"}
                              />
                            </td>
                            <td>{profile.is_admin ? "Yes" : "No"}</td>
                            <td>
                              {profile.is_admin ? (
                                <span className="text-xs font-semibold text-[#6b7280]">
                                  Protected
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  disabled={updating === profile.id}
                                  onClick={() =>
                                    updateUserStatus(
                                      profile,
                                      isSuspended ? "active" : "suspended"
                                    )
                                  }
                                  className="rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-2 text-xs font-semibold transition hover:bg-white disabled:opacity-50"
                                >
                                  {isSuspended ? "Reactivate" : "Suspend"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </AdminSection>

              <AdminSection title="Facility Requests">
                <div className="grid gap-4">
                  {requests.map((request) => {
                    const isClosed = request.status === "closed";

                    return (
                      <div
                        key={request.id}
                        className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a3f]">
                              Request #{request.id}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold">
                              {request.issue_type ||
                                request.facility_type ||
                                "Industrial request"}
                            </h3>
                            <p className="mt-2 text-sm text-[#4b5563]">
                              {request.company_name || "Unknown company"} ·{" "}
                              {request.location || "No location"} ·{" "}
                              {request.urgency || "No urgency"}
                            </p>
                            <p className="mt-2 text-sm text-[#6b7280]">
                              {request.work_email || "No email"}
                            </p>
                          </div>

                          <div className="flex flex-col gap-3 sm:flex-row">
                            <Badge
                              label={request.status || "pending"}
                              tone={isClosed ? "red" : "green"}
                            />

                            <button
                              type="button"
                              disabled={updating === `request-${request.id}`}
                              onClick={() =>
                                updateRequestStatus(
                                  request.id,
                                  isClosed ? "pending" : "closed"
                                )
                              }
                              className="rounded-xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold transition hover:bg-[#f4f1ea] disabled:opacity-50"
                            >
                              {isClosed ? "Reopen" : "Close"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AdminSection>

              <AdminSection title="Expert Contact Requests">
                <div className="grid gap-4">
                  {contactRequests.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a3f]">
                        Contact Request #{item.id}
                      </p>
                      <p className="mt-2 text-sm text-[#374151]">
                        Related request: {item.request_id || "Unknown"}
                      </p>
                      <p className="mt-1 text-sm text-[#374151]">
                        Expert ID: {item.expert_id || "Unknown"}
                      </p>
                      <div className="mt-3">
                        <Badge label={item.status || "pending"} tone="blue" />
                      </div>
                    </div>
                  ))}
                </div>
              </AdminSection>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function AdminSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-[#f8f6f1] p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
        {title}
      </p>
      <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
        {value}
      </p>
      <p className="mt-3 text-xs font-medium text-[#6b7280]">
        Admin control metric
      </p>
    </div>
  );
}

function Badge({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "red" | "blue";
}) {
  const styles =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "red"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${styles}`}
    >
      {label}
    </span>
  );
}
