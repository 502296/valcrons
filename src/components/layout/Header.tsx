"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type UserRole = "expert" | "company" | "facility" | null;

type UserProfile = {
  role: UserRole;
  is_admin?: boolean | null;
  full_name?: string | null;
  company_name?: string | null;
};

const ADMIN_EMAIL = "ali.kathem.edu@gmail.com";

const PUBLIC_NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Experts", href: "/experts" },
  { label: "Industries", href: "/#industries" },
  { label: "Safety", href: "/safety" },
];

export default function Header() {
  const [role, setRole] = useState<UserRole>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [displayName, setDisplayName] = useState("User");
  const [menuOpen, setMenuOpen] = useState(false);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setLoggedIn(false);
      setRole(null);
      setIsAdmin(false);
      setUnreadCount(0);
      setDisplayName("User");
      return;
    }

    setLoggedIn(true);

    const isAdminByEmail = data.user.email === ADMIN_EMAIL;
    let profile: UserProfile | null = null;

    const byId = await supabase
      .from("profiles")
      .select("role, is_admin, full_name, company_name")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!byId.error && byId.data) {
      profile = byId.data as UserProfile;
    }

    if (!profile && data.user.email) {
      const byEmail = await supabase
        .from("profiles")
        .select("role, is_admin, full_name, company_name")
        .eq("email", data.user.email)
        .maybeSingle();

      if (!byEmail.error && byEmail.data) {
        profile = byEmail.data as UserProfile;
      }
    }

    const userRole = (profile?.role as UserRole) || (isAdminByEmail ? "company" : null);

    setRole(userRole);
    setIsAdmin(profile?.is_admin === true || isAdminByEmail);

    const name =
      userRole === "expert"
        ? profile?.full_name || data.user.email || "Expert"
        : profile?.company_name || profile?.full_name || data.user.email || "Company";

    setDisplayName(name);

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

  const shortName = displayName.split(" ").slice(0, 2).join(" ");
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Image
            src="/valcrons-logo.png"
            alt="VALCRONS Logo"
            width={60}
            height={60}
            className="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14"
            priority
          />

          <div className="min-w-0">
            <div className="text-[19px] font-black leading-none tracking-[0.22em] text-[#111827] sm:text-2xl sm:tracking-[0.24em]">
              VALCRONS
            </div>

            <div className="mt-1 text-[8px] font-semibold uppercase leading-tight tracking-[0.26em] text-[#6b7280] sm:text-[10px] sm:tracking-[0.32em]">
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

          {loggedIn && isAdmin && (
            <Link
              href="/admin"
              className="rounded-xl border border-[#9a7a3f]/30 bg-[#f8f1df] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#7a5c1f] shadow-sm transition hover:bg-[#ead9aa] hover:text-black"
            >
              Admin
            </Link>
          )}

          {loggedIn && role === "expert" && (
            <>
              <Link
                href="/requests"
                className="rounded-xl bg-[#9a7a3f] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#9a7a3f]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#85652f] hover:shadow-lg hover:shadow-[#9a7a3f]/40"
              >
                Browse Requests
              </Link>

              <Link href="/my-projects" className="hover:text-black">
                My Projects
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
            </>
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {loggedIn && (
            <Link
              href="/notifications"
              aria-label="Notifications"
              className="relative rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea] sm:px-4 sm:py-3"
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
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-[#111827] shadow-sm transition hover:bg-[#f4f1ea] sm:px-4 sm:py-3 sm:text-sm"
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="rounded-xl bg-[#111827] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-black sm:px-5 sm:py-3 sm:text-sm"
              >
                <span className="sm:hidden">Join</span>
                <span className="hidden sm:inline">Request Access</span>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-2 py-2 shadow-sm transition hover:bg-[#f4f1ea] sm:px-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9a7a3f] text-sm font-black text-white shadow-sm">
                  {initial}
                </span>

                <span className="hidden max-w-[130px] truncate text-sm font-semibold text-[#111827] sm:block">
                  {shortName}
                </span>

                <span className="text-xs text-[#6b7280]">⌄</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-black/10 bg-white p-2 shadow-xl">
                  <div className="border-b border-black/5 px-3 py-3">
                    <p className="truncate text-sm font-bold text-[#111827]">
                      {displayName}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#9a7a3f]">
                      {role || "Account"}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 block rounded-xl px-3 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                  >
                    My Profile
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
                  >
                    Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
