"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

type ActionRow = {
  id: string;
  technician_id: string;
  project_id: number;
  action_type: "saved" | "accepted" | "contacted";
  created_at: string;
  contact_message: string | null;
  attachment_urls: unknown;
};

type FacilityRequest = {
  id: number;
  created_at: string;
  company_name: string | null;
  facility_type: string | null;
  urgency: string | null;
  issue_type: string | null;
  location: string | null;
  problem_description: string | null;
  status: string | null;
};

type TabType = "saved" | "accepted" | "contacted";

export default function MyProjectsPage() {
  const [actions, setActions] = useState<ActionRow[]>([]);
  const [projects, setProjects] = useState<FacilityRequest[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("saved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyProjects();
  }, []);

  const loadMyProjects = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: actionData, error: actionError } = await supabase
      .from("technician_project_actions")
      .select("*")
      .eq("technician_id", user.id)
      .order("created_at", { ascending: false });

    if (actionError) {
      console.error("Could not load technician actions:", actionError);
      setLoading(false);
      return;
    }

    const safeActions = (actionData || []) as ActionRow[];
    setActions(safeActions);

    const projectIds = Array.from(
      new Set(safeActions.map((a) => a.project_id).filter(Boolean))
    );

    if (projectIds.length === 0) {
      setProjects([]);
      setLoading(false);
      return;
    }

    const { data: projectData, error: projectError } = await supabase
      .from("facility_requests")
      .select(
        "id, created_at, company_name, facility_type, urgency, issue_type, location, problem_description, status"
      )
      .in("id", projectIds);

    if (projectError) {
      console.error("Could not load facility requests:", projectError);
      setLoading(false);
      return;
    }

    setProjects((projectData || []) as FacilityRequest[]);
    setLoading(false);
  };

  const projectsById = useMemo(() => {
    const map = new Map<number, FacilityRequest>();
    projects.forEach((project) => map.set(project.id, project));
    return map;
  }, [projects]);

  const uniqueActionsByType = (type: TabType) => {
    const filtered = actions.filter((a) => a.action_type === type);
    const seen = new Set<number>();

    return filtered.filter((action) => {
      if (seen.has(action.project_id)) return false;
      seen.add(action.project_id);
      return true;
    });
  };

  const savedActions = uniqueActionsByType("saved");
  const acceptedActions = uniqueActionsByType("accepted");
  const contactedActions = uniqueActionsByType("contacted");

  const visibleActions =
    activeTab === "saved"
      ? savedActions
      : activeTab === "accepted"
      ? acceptedActions
      : contactedActions;

  const tabLabel =
    activeTab === "saved"
      ? "Saved Projects"
      : activeTab === "accepted"
      ? "Accepted Projects"
      : "Contacted Facilities";

  const badgeStyle =
    activeTab === "saved"
      ? "border-[#9a7a3f]/30 bg-[#f4f1ea] text-[#7a5c25]"
      : activeTab === "accepted"
      ? "border-blue-200 bg-blue-50 text-blue-700"
      : "border-green-200 bg-green-50 text-green-700";

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Expert Workspace
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              My Projects
            </h1>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600">
              Review the industrial requests you saved, accepted, or contacted
              through VALCRONS.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StatCard title="Saved Projects" value={savedActions.length} />
            <StatCard title="Accepted Projects" value={acceptedActions.length} />
            <StatCard
              title="Contacted Facilities"
              value={contactedActions.length}
            />
          </div>

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row">
              <TabButton
                active={activeTab === "saved"}
                label="Saved"
                onClick={() => setActiveTab("saved")}
              />
              <TabButton
                active={activeTab === "accepted"}
                label="Accepted"
                onClick={() => setActiveTab("accepted")}
              />
              <TabButton
                active={activeTab === "contacted"}
                label="Contacted"
                onClick={() => setActiveTab("contacted")}
              />
            </div>
          </div>

          <div className="mt-8 rounded-[2.5rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7a3f]">
                  {tabLabel}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                  Project history
                </h2>
              </div>

              <p className="text-sm text-gray-500">
                {visibleActions.length} record
                {visibleActions.length === 1 ? "" : "s"}
              </p>
            </div>

            {loading ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-[#f4f1ea] p-6 text-sm text-gray-600">
                Loading your projects...
              </div>
            ) : visibleActions.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-[#f4f1ea] p-6 text-sm text-gray-600">
                No {tabLabel.toLowerCase()} yet.
              </div>
            ) : (
              <div className="mt-8 grid gap-5">
                {visibleActions.map((action) => {
                  const project = projectsById.get(action.project_id);

                  if (!project) return null;

                 return (
              <Link
              key={action.id}
              href={`/requests?request=${project.id}`}
               className="block rounded-[2rem] border border-black/10 bg-[#fbfaf7] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#9a7a3f]/40 hover:shadow-lg"
            >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle}`}
                          >
                            {activeTab === "saved"
                              ? "Saved For Review"
                              : activeTab === "accepted"
                              ? "Accepted Project"
                              : "Contact Requested"}
                          </div>

                          <h3 className="mt-4 text-xl font-semibold">
                            {project.issue_type || "Industrial Support Request"}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {project.problem_description ||
                              "No description provided."}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                          #{project.id}
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-4">
                        <Info label="Facility Type" value={project.facility_type} />
                        <Info label="Urgency" value={project.urgency} />
                        <Info label="Location" value={project.location} />
                        <Info label="Status" value={project.status || "pending"} />
                      </div>

                      {activeTab === "contacted" && action.contact_message && (
                        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                            Contact Message
                          </p>
                          <p className="mt-3 text-sm leading-6 text-gray-700">
                            {action.contact_message}
                          </p>
                        </div>
                      )}
                   </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
        {title}
      </p>
      <p className="mt-4 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
        active
          ? "bg-[#111827] text-white"
          : "border border-black/10 bg-white text-[#111827] hover:bg-black/5"
      }`}
    >
      {label}
    </button>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-gray-700">
        {value || "Not provided"}
      </p>
    </div>
  );
}
