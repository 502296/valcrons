"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type NotificationItem = {
  id: number;
  user_id: string;
  title: string | null;
  message: string | null;
  type: string | null;
  related_request_id: number | null;
  is_read: boolean | null;
  created_at: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
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

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMessage("Notifications could not be loaded.");
      setLoading(false);
      return;
    }

    setNotifications((data || []) as NotificationItem[]);
    setLoading(false);
  }

  async function markAsRead(id: number) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      setErrorMessage("Notification could not be updated.");
      return;
    }

    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: true } : item))
    );
  }

  async function markAllAsRead() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", session.user.id)
      .eq("is_read", false);

    if (error) {
      setErrorMessage("Notifications could not be updated.");
      return;
    }

    setNotifications((prev) =>
      prev.map((item) => ({ ...item, is_read: true }))
    );

    setMessage("All notifications marked as read.");
  }

  const unreadCount = notifications.filter((item) => !item.is_read).length;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1ea] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
          >
            ← Back
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#111827]">
                VALCRONS Notifications
              </p>

              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#111827]">
                Notifications
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#374151]">
                Track important updates about expert contact requests, approvals,
                project activity, and facility responses.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Mark All Read
              </button>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard title="Total" value={notifications.length} />
            <StatCard title="Unread" value={unreadCount} />
            <StatCard
              title="Read"
              value={notifications.length - unreadCount}
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

          {loading ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-black/10 bg-white p-10 text-[#111827] shadow-sm">
              <h2 className="text-2xl font-semibold">No notifications yet.</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#374151]">
                When companies or experts take action, important updates will
                appear here.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-4">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-[2rem] border p-6 shadow-sm ${
                    item.is_read
                      ? "border-black/10 bg-white/70"
                      : "border-black/10 bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-[#111827]">
                          {item.title || "Notification"}
                        </h3>

                        {!item.is_read && (
                          <span className="rounded-full bg-[#111827] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                            New
                          </span>
                        )}

                        <span className="rounded-full border border-black/10 bg-[#f8f6f1] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#111827]">
                          {item.type || "general"}
                        </span>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#374151]">
                        {item.message || "No message provided."}
                      </p>

                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex min-w-[170px] flex-col gap-3">
                      {item.related_request_id && (
                        <Link
                          href="/my-requests"
                          className="rounded-xl bg-[#111827] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-black"
                        >
                          View Request
                        </Link>
                      )}

                      {!item.is_read && (
                        <button
                          onClick={() => markAsRead(item.id)}
                          className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                        >
                          Mark as Read
                        </button>
                      )}
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
        Notification metric
      </p>
    </div>
  );
}
