"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
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

type UserRole = "expert" | "company" | "facility" | null;

export default function NotificationsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function notifyHeaderBadgeUpdate() {
    window.dispatchEvent(new Event("valcrons-notifications-updated"));
  }

  function getNotificationTargetPath(item: NotificationItem) {
    if (!item.related_request_id) return "/notifications";

    const type = (item.type || "").toLowerCase();

    // إشعارات الخبير: موافقة/رفض الشركة
    if (type === "contact_approved" || type === "contact_declined") {
      return `/requests?request=${item.related_request_id}&from=notifications`;
    }

    // إشعارات الشركة: خبير أرسل طلب تواصل
    if (
      type === "contact_request" ||
      type === "expert_contact_request" ||
      type === "new_contact_request"
    ) {
      return `/my-requests?request=${item.related_request_id}&from=notifications`;
    }

    // fallback دائم حسب نوع الحساب
    if (userRole === "expert") {
      return `/requests?request=${item.related_request_id}&from=notifications`;
    }

    return `/my-requests?request=${item.related_request_id}&from=notifications`;
  }

  useEffect(() => {
    async function loadNotifications() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const [{ data: profile }, { data, error }] = await Promise.all([
        supabase.from("profiles").select("role").eq("id", session.user.id).single(),
        supabase.from("notifications").select("*").eq("user_id", session.user.id)
          .order("created_at", { ascending: false }),
      ]);

      setUserRole((profile?.role as UserRole) || null);
      if (error) {
        setErrorMessage("Notifications could not be loaded.");
      } else {
        setNotifications((data || []) as NotificationItem[]);
      }
      setLoading(false);
    }

    void loadNotifications();
  }, [router]);

  async function openNotification(event: MouseEvent<HTMLAnchorElement>, item: NotificationItem) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || item.is_read === true) return;
    event.preventDefault();
    setErrorMessage("");
    setMessage("");

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", item.id)
      .eq("user_id", item.user_id);

    if (error) {
      setErrorMessage("Notification could not be marked as read.");
      router.push(getNotificationTargetPath(item));
      return;
    }

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === item.id ? { ...notification, is_read: true } : notification
      )
    );

    notifyHeaderBadgeUpdate();

    router.push(getNotificationTargetPath(item));
  }

  async function markAllAsRead() {
    setErrorMessage("");
    setMessage("");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    setMarkingAll(true);
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", session.user.id)
      .or("is_read.eq.false,is_read.is.null");

    setMarkingAll(false);
    if (error) {
      setErrorMessage("Notifications could not be updated.");
      return;
    }

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        is_read: true,
      }))
    );

    setMessage("All notifications marked as read.");
    notifyHeaderBadgeUpdate();
  }

  const unreadCount = notifications.filter((item) => item.is_read !== true).length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f6f2] px-4 pb-16 pt-24 text-[#111a29] sm:px-6 sm:pt-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Notifications</h1>
            <button type="button" onClick={markAllAsRead}
              disabled={loading || markingAll || unreadCount === 0}
              className="min-h-11 rounded px-2 text-sm font-semibold text-[#234fb8] hover:underline focus-visible:outline-2 disabled:text-[#576170] disabled:no-underline">
              {markingAll ? "Marking as read…" : "Mark all as read"}
            </button>
            <p aria-live="polite" className="w-full text-sm font-medium text-[#485364]">
              {loading ? "Loading notifications…" : `${unreadCount} unread`}
            </p>
          </div>

          {errorMessage && <p role="alert" className="mb-3 text-sm text-red-800">{errorMessage}</p>}
          {message && <p role="status" className="sr-only">{message}</p>}

          {!loading && !errorMessage && notifications.length === 0 && (
            <p className="rounded-xl border border-[#dfddd5] bg-white p-4 text-sm">No notifications yet.</p>
          )}
          {notifications.length > 0 && (
            <ul className="divide-y divide-[#dfddd5] overflow-hidden rounded-xl border border-[#dfddd5] bg-white">
              {notifications.map(item => {
                const copy = notificationCopy(item);
                return (
                  <li key={item.id} className={`relative p-4 sm:flex sm:items-center sm:justify-between sm:gap-4 ${item.is_read !== true ? "bg-[#f1f5ff]" : ""}`}>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold">{copy.title}</h2>
                        {item.is_read !== true && (
                          <span className="rounded-full bg-[#dce7ff] px-2 py-0.5 text-xs font-semibold text-[#173875]">Unread</span>
                        )}
                      </div>
                      {copy.message && <p className="mt-1 break-words text-sm text-[#485364]">{copy.message}</p>}
                      <time dateTime={item.created_at} className="mt-1 block text-xs text-[#485364]">
                        {new Date(item.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                      </time>
                    </div>
                    {item.related_request_id && (
                      <Link href={getNotificationTargetPath(item)} onClick={event => openNotification(event, item)}
                        aria-label={`Open request: ${copy.title}`}
                        className="inline-flex min-h-11 shrink-0 items-center rounded text-sm font-semibold text-[#234fb8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
                        Open request <span aria-hidden="true" className="ml-1">→</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function notificationCopy(item: NotificationItem) {
  switch (item.type?.toLowerCase()) {
    case "contact_approved":
      return { title: "Contact approved", message: "The company approved your contact request. Open the request to follow up." };
    case "contact_declined":
      return { title: "Contact declined", message: "The company declined your contact request." };
    case "contact_request":
    case "expert_contact_request":
    case "new_contact_request":
      return { title: "New expert contact request", message: "An expert sent you a message about your support request." };
    default:
      return { title: item.title || "Request update", message: item.message };
  }
}
