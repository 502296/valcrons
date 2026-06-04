"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type Request = {
  id: string;
  facility_type: string;
  urgency: string;
  location: string;
  problem_description: string;
  created_at: string;
};

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

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
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                    <div>
                      <h3 className="text-2xl font-bold text-[#111827]">
                        {request.facility_type || "Industrial Request"}
                      </h3>

                      <p className="mt-2 text-sm text-[#6b7280]">
                        {request.location || "Location not specified"}
                      </p>

                      <p className="mt-4 text-[#374151] leading-relaxed">
                        {request.problem_description ||
                          "No problem description provided."}
                      </p>
                    </div>

                    <div>
                      <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                        {request.urgency || "Pending"}
                      </span>
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
