"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserRole = "expert" | "company" | "facility" | null;

export default function Hero() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<UserRole>(null);

  useEffect(() => {
    async function loadUserRole() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setLoggedIn(false);
        setRole(null);
        return;
      }

      setLoggedIn(true);

      const byId = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!byId.error && byId.data?.role) {
        setRole(byId.data.role as UserRole);
        return;
      }

      if (data.user.email) {
        const byEmail = await supabase
          .from("profiles")
          .select("role")
          .eq("email", data.user.email)
          .maybeSingle();

        if (!byEmail.error && byEmail.data?.role) {
          setRole(byEmail.data.role as UserRole);
        }
      }
    }

    loadUserRole();
  }, []);

  const isExpert = loggedIn && role === "expert";
  const isCompany = loggedIn && (role === "company" || role === "facility");
  const primary = isExpert
    ? { href: "/requests", label: "Browse requests" }
    : { href: "/request-support", label: "Request expert support" };
  const secondary = isExpert
    ? { href: "/my-projects", label: "My projects" }
    : isCompany
      ? { href: "/my-requests", label: "My requests" }
      : { href: "/signup/expert", label: "Join as an expert" };

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-28 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-36">
      <div>
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#785824]">
          Industrial expertise network
        </p>
        <h1 className="max-w-xl text-[clamp(2.85rem,6.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.07em]">
          When operations can&apos;t stop.
        </h1>
        <p className="mb-7 mt-6 max-w-md text-base leading-relaxed text-[#444d58] sm:text-lg">
          Connect with an independent engineer or technician who knows your equipment.
          Describe the issue, review relevant experience, and request direct contact.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={primary.href} className="valcrons-action valcrons-primary">
            {primary.label}
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <Link href={secondary.href} className="valcrons-action valcrons-secondary">
            {secondary.label}
          </Link>
        </div>
        {!loggedIn && (
          <p className="mt-4 text-sm text-[#505965]">
            Sign in or create an account to submit a request.
          </p>
        )}
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#171f2a] lg:aspect-[6/5]">
        <Image
          src="/industrial-hero.jpg"
          alt="Industrial facility"
          fill
          preload
          sizes="(min-width: 1280px) 580px, (min-width: 1024px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
