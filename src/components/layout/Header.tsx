"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type UserRole = "expert" | "company" | "facility" | null;

const PUBLIC_NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Experts", href: "/experts" },
  { label: "Industries", href: "/#industries" },
  { label: "Safety", href: "/safety" },
];

export default function Header() {
  const [role, setRole] = useState<UserRole>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setLoggedIn(false);
      setRole(null);
      setUnreadCount(0);
      return;
    }

    setLoggedIn(true);

    let profile = null;

    const byId = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    profile = byId.data;

    if (!profile) {
      const byUid = await supabase
        .from("profiles")
        .select("role")
        .eq("uid", data.user.id)
        .maybeSingle();

      profile = byUid.data;
    }

    if (!profile && data.user.email) {
      const byEmail = await supabase
        .from("profiles")
        .select("role")
        .eq("email", data.user.email)
        .maybeSingle();

      profile = byEmail.data;
    }

    setRole((profile?.role as UserRole) || null);

    await loadUnreadNotifications(data.user.id);
  }

  async function loadUnreadNotifications(userId?: string) {
    let activeUserId = userId;

    if (!activeUserId) {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setUnreadCount(0);
        return;
      }

      activeUserId = data.user.id;
    }

    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", activeUserId)
      .or("is_read.eq.false,is_read.is.null");

    if (error) {
      setUnreadCount(0);
      return;
    }

    setUnreadCount(count || 0);
  }

  useEffect(() => {
    loadUser();

    const handleNotificationsUpdate = () => {
      loadUnreadNotifications();
    };

    window.addEventListener(
      "valcrons-notifications-updated",
      handleNotificationsUpdate
    );

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      window.removeEventListener(
        "valcrons-notifications-updated",
        handleNotificationsUpdate
      );

      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/valcrons-logo.png"
            alt="VALCRONS Logo"
            width={60}
            height={60}
            className="h-14 w-14 object-contain"
            priority
          />

          <div>
            <div className="text-2xl font-black tracking-[0.24em] text-[#111827]">
              VALCRONS
            </div>

            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6b7280]">
              Industrial Expertise Network
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#374151] md:flex">
          {!loggedIn && (
            <>
              {PUBLIC_NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-black">
                  {link.label}
                </Link>
              ))}

              <Link
                href="/requests"
                className="font-semibold text-[#111827] hover:text-black"
              >
                Browse Requests
              </Link>
            </>
          )}

          {loggedIn && role === "expert" && (
            <>
              <Link
                href="/requests"
                className="font-semibold text-[#111827] hover:text-black"
              >
                Browse Requests
              </Link>

              <Link href="/my-projects" className="hover:text-black">
                My Projects
              </Link>

              <Link href="/profile" className="hover:text-black">
                Profile
              </Link>
            </>
          )}

          {loggedIn && (role === "company" || role === "facility") && (
            <>
              <Link
                href="/request-support"
                className="font-semibold text-[#111827] hover:text-black"
              >
                Post Request
              </Link>

              <Link href="/my-requests" className="hover:text-black">
                My Requests
              </Link>

              <Link href="/profile" className="hover:text-black">
                Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {loggedIn && (
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="relative rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
            >
              🔔
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111827] px-1.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium text-[#374151] hover:text-black sm:block"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                Request Access
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
