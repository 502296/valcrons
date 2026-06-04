"use client";

import { useEffect, useState } from "react";
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
          <h1 className="text-4xl font-bold text-[#111827]">
            My Requests
          </h1>

          <p className="mt-3 text-[#4b5563]">
            View and manage your facility requests.
          </p>

          {loading ? (
            <div className="mt-10 rounded-3xl bg-white p-8">
              Loading...
            </div>
          ) : requests.length === 0 ? (
            <div className="mt-10 rounded-3xl bg-white p-8">
              No requests found.
            </div>
          ) : (
            <div className="mt-10 grid gap-6">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold">
                    {request.facility_type}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {request.location}
                  </p>

                  <p className="mt-4 text-gray-700">
                    {request.problem_description}
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                      {request.urgency}
                    </span>
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
