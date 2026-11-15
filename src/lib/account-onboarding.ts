import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type CompanyDetails = {
  company_name: string;
  full_name: string;
  phone: string;
  location: string;
};

const pendingCompanyKey = "valcrons_pending_company";

export function rememberCompany(user: User, details: CompanyDetails) {
  try {
    localStorage.setItem(pendingCompanyKey, JSON.stringify({ id: user.id, details }));
    return true;
  } catch {
    return false;
  }
}

export async function saveCompany(user: User, details: CompanyDetails) {
  return supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    role: "company",
    ...details,
  });
}

export async function accountDestination(user: User) {
  const { data: profile, error } = await supabase.from("profiles")
    .select("role").eq("id", user.id).maybeSingle();
  if (error) throw new Error("Your account could not be loaded. Try continuing again.");

  const raw = localStorage.getItem(pendingCompanyKey);
  const pending = raw ? JSON.parse(raw) as { id: string; details: CompanyDetails } : null;

  if (pending?.id === user.id) {
    if (!profile?.role || profile.role === "company" || profile.role === "facility") {
      // Complete the original company profile write once the verified session can use RLS.
      // Keep any role already assigned by the database.
      const { error: saveError } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        company_name: pending.details.company_name,
        full_name: pending.details.full_name,
        phone: pending.details.phone,
        location: pending.details.location,
        role: profile?.role ?? "company",
      });
      if (saveError) throw new Error("Your company profile could not be saved. Try continuing again.");
      localStorage.removeItem(pendingCompanyKey);
      return "/request-support";
    }
    localStorage.removeItem(pendingCompanyKey);
  }

  if (profile?.role === "company" || profile?.role === "facility") return "/request-support";
  if (profile?.role === "expert") return "/profile";

  if (!profile?.role && user.email) {
    const { data } = await supabase.from("profiles").select("role")
      .eq("email", user.email).maybeSingle();
    if (data?.role === "company" || data?.role === "facility") return "/request-support";
    if (data?.role === "expert") return "/requests";
  }

  return "/";
}
