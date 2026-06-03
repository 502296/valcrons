"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Video,
  ShieldCheck,
  UserCircle2,
  ArrowRight,
  Globe,
  Mail,
  Wrench,
  Lock,
  BadgeCheck,
  Factory,
  MapPin,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

type View =
  | "landing"
  | "login"
  | "signupChoice"
  | "signupFacility"
  | "signupExpert"
  | "profile"
  | "plants"
  | "experts"
  | "plantForm"
  | "expertForm"
  | "requests"
  | "requestDetails";

type FacilityRequest = {
  id: number;
  created_at: string;
  facility_type: string | null;
  urgency: string | null;
  issue_type: string | null;
  location: string | null;
  problem_description: string | null;
  status: string | null;
};

type CurrentUser = {
  id: string;
  email: string | null;
  role: "facility" | "expert" | null;
  full_name?: string | null;
  company_name?: string | null;
  phone?: string | null;
  location?: string | null;
  specialty?: string | null;
};

export default function ValcronsPro() {
  const [view, setView] = useState<View>("landing");
  const [selectedRequest, setSelectedRequest] = useState<FacilityRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const primaryButton =
    "bg-[#2563eb]/80 hover:bg-[#2563eb] text-white transition-colors";

  const secondaryButton =
    "bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] text-white transition-colors";

  const cardClass = "border border-white/10 bg-white/[0.025] rounded-[2rem]";

  const inputClass =
    "w-full bg-white/[0.035] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-white/20 transition-colors";

  const labelClass =
    "text-xs font-bold text-gray-400 uppercase tracking-[0.14em]";

  const loadCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      setCurrentUser(null);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name, company_name, phone, location, specialty")
      .eq("id", data.user.id)
      .maybeSingle();

    setCurrentUser({
      id: data.user.id,
      email: data.user.email ?? null,
      role: profile?.role ?? null,
      full_name: profile?.full_name ?? null,
      company_name: profile?.company_name ?? null,
      phone: profile?.phone ?? null,
      location: profile?.location ?? null,
      specialty: profile?.specialty ?? null,
    });
  };

  useEffect(() => {
    loadCurrentUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async () => {
      await loadCurrentUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const BackButton = ({ to = "landing" }: { to?: View }) => (
    <button
      onClick={() => setView(to)}
      className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );

  const loadRequests = async () => {
    setIsLoadingRequests(true);

    const { data, error } = await supabase
      .from("facility_requests")
      .select(
        "id, created_at, facility_type, urgency, issue_type, location, problem_description, status"
      )
      .order("created_at", { ascending: false });

    setIsLoadingRequests(false);

    if (error) {
      console.error("Request queue load error:", error);
      alert("Could not load requests.");
      return;
    }

    setRequests(data || []);
  };

  const saveProjectAction = async (
    request: FacilityRequest,
    actionType: "saved" | "accepted" | "contacted"
  ) => {
    if (!currentUser) {
      alert("Please log in first.");
      setView("login");
      return;
    }

    const technicianId = currentUser.email || currentUser.id;

    const { error } = await supabase.from("technician_project_actions").upsert(
      {
        technician_id: technicianId,
        project_id: request.id,
        action_type: actionType,
      },
      {
        onConflict: "technician_id,project_id,action_type",
      }
    );

    if (error) {
      console.error(error);
      alert("Could not save this action.");
      return;
    }

    alert(actionType === "saved" ? "Saved to your profile." : "Request accepted.");
  };

  const submitFacilityRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from("facility_requests").insert([
      {
        company_name: formData.get("company_name"),
        contact_person: formData.get("contact_person"),
        work_email: formData.get("work_email"),
        phone_number: formData.get("phone_number"),
        facility_type: formData.get("facility_type"),
        urgency: formData.get("urgency"),
        issue_type: formData.get("issue_type"),
        location: formData.get("location"),
        problem_description: formData.get("problem_description"),
        status: "pending",
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Facility request submitted successfully.");
    e.currentTarget.reset();
    setView("requests");
    loadRequests();
  };

  const submitExpertApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const { error } = await supabase.from("expert_applications").insert([
      {
        full_name: formData.get("full_name"),
        email: formData.get("email"),
        phone_number: formData.get("phone_number"),
        location: formData.get("location"),
        primary_specialty: formData.get("primary_specialty"),
        years_experience: formData.get("years_experience"),
        availability: formData.get("availability"),
        certifications: formData.get("certifications"),
        technical_background: formData.get("technical_background"),
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Expert application submitted successfully.");
    e.currentTarget.reset();
    setView("requests");
    loadRequests();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error || !data.user) {
      alert(error?.message || "Could not log in.");
      return;
    }

    await loadCurrentUser();
    alert("Logged in successfully.");
    setView("landing");
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>,
    role: "facility" | "expert"
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const fullName = String(formData.get("full_name") || "");
    const companyName = String(formData.get("company_name") || "");
    const phone = String(formData.get("phone") || "");
    const location = String(formData.get("location") || "");
    const specialty = String(formData.get("specialty") || "");

   const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      role,
      full_name: fullName,
      company_name: companyName,
      phone,
      location,
      specialty,
    },
  },
});

    if (error || !data.user) {
      setIsSubmitting(false);
      alert(error?.message || "Could not create account.");
      return;
    }

    setIsSubmitting(false);
await loadCurrentUser();

alert("Account created successfully. Please confirm your email if required.");

setView("profile");

    await loadCurrentUser();
    alert("Account created successfully.");
    setView("profile");
  };

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.get("full_name"),
        company_name: formData.get("company_name"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        specialty: formData.get("specialty"),
      })
      .eq("id", currentUser.id);

    setIsSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    await loadCurrentUser();
    alert("Profile updated.");
  };

  const Header = () => (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView("landing")}
          >
            <div className="w-8 h-8 bg-[#2563eb]/80 rounded-lg flex items-center justify-center">
              <Zap size={18} fill="white" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase italic">
              Valcrons
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-400 font-medium">
            <button onClick={() => setView("plants")} className="hover:text-white transition-colors">
              Facilities
            </button>

            <button onClick={() => setView("experts")} className="hover:text-white transition-colors">
              Experts
            </button>

            <button
              onClick={() => {
                setView("requests");
                loadRequests();
              }}
              className="hover:text-white transition-colors"
            >
              Requests
            </button>

            <button onClick={() => alert("Safety page coming soon.")} className="hover:text-white transition-colors">
              Safety
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <button
                onClick={() => setView("profile")}
                className="text-[13px] text-gray-400 hover:text-white font-medium"
              >
                My Profile
              </button>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setCurrentUser(null);
                  setView("landing");
                }}
                className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-gray-200 transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setView("login")}
                className="text-[13px] text-gray-400 hover:text-white font-medium"
              >
                Log in
              </button>

              <button
                onClick={() => setView("signupChoice")}
                className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-gray-200 transition-colors"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="border-t border-white/5 bg-[#050505] py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[13px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-[#60a5fa]" />
            <span className="font-bold uppercase tracking-tighter">Valcrons</span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            The industrial expertise network connecting facilities with verified technical expertise.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-500">
            <li><button onClick={() => alert("Privacy Policy coming soon.")}>Privacy Policy</button></li>
            <li><button onClick={() => alert("Terms of Service coming soon.")}>Terms of Service</button></li>
            <li><button onClick={() => alert("Compliance page coming soon.")}>Compliance</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-gray-500">
            <li className="flex items-center gap-2">
              <Mail size={14} />
              <span className="text-[#93c5fd]">support@valcrons.com</span>
            </li>
            <li><button onClick={() => alert("Help Center coming soon.")}>Help Center</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Statement</h4>
          <p className="text-[11px] text-gray-600 uppercase tracking-widest leading-tight">
            Valcrons is a connection and diagnostic coordination platform. We do not operate machinery directly.
          </p>
        </div>
      </div>
    </footer>
  );

  const LandingPage = () => (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/industrial-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <Header />

      <div className="relative z-10 max-w-5xl mx-auto text-center pt-24 px-6">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          Industrial Expertise Network
        </motion.span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Connect Industrial Facilities With <br />
          <span className="text-white">Trusted Experts.</span>
        </h1>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          A professional network connecting industrial facilities with experienced technicians, engineers, and specialized service providers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-28">
          <button
            onClick={() => setView("plants")}
            className={`${primaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3`}
          >
            For Plants & Facilities <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setView("experts")}
            className={`${secondaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3`}
          >
            For Experts & Technicians <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              setView("requests");
              loadRequests();
            }}
            className={`${secondaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3`}
          >
            View Requests <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-20">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#93c5fd]">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold">Verified Industrial Experts</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Build trust with experienced industrial professionals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-emerald-300/80">
              <Video size={20} />
            </div>
            <h3 className="font-bold">Remote First</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Start with expert review and coordination before on-site escalation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-amber-200/80">
              <Globe size={20} />
            </div>
            <h3 className="font-bold">Built for Scale</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Designed for facilities, factories, and distributed industrial operations.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-40">
        <Footer />
      </div>
    </div>
  );

  const PlantsPage = () => (
    <PageShell>
      <section className="max-w-6xl mx-auto">
        <BackButton />

        <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
          For Plants & Facilities
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Post Industrial Requests <br />
          <span className="text-gray-500">And Find Trusted Expertise.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Valcrons helps factories and facility leaders connect with verified industrial experts for diagnostics, guidance, and technical escalation.
        </p>

        <button
          onClick={() => setView("plantForm")}
          className={`${primaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3`}
        >
          Create Facility Request <ArrowRight size={18} />
        </button>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <Factory size={22} />,
              title: "Industrial Facilities",
              text: "Built for manufacturing, distribution, food processing, packaging, and industrial operations.",
            },
            {
              icon: <Wrench size={22} />,
              title: "Expert Matching",
              text: "Submit the issue and let qualified experts review where they can help.",
            },
            {
              icon: <Lock size={22} />,
              title: "Clear Boundaries",
              text: "Valcrons connects and coordinates. We do not operate machinery directly.",
            },
          ].map((item) => (
            <InfoCard key={item.title} {...item} color="text-[#93c5fd]" />
          ))}
        </div>
      </section>
    </PageShell>
  );

  const ExpertsPage = () => (
    <PageShell>
      <section className="max-w-6xl mx-auto">
        <BackButton />

        <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-emerald-300/80 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
          For Experts & Technicians
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Join the Network for <br />
          <span className="text-gray-500">Industrial Problem Solvers.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Valcrons is built for experienced technicians, automation specialists, electricians, mechanics, controls engineers, and troubleshooters.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setView("expertForm")}
            className="bg-emerald-500/70 hover:bg-emerald-500/80 text-white transition-colors px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3"
          >
            Apply as an Expert <ArrowRight size={18} />
          </button>

          <button
            onClick={() => {
              setView("requests");
              loadRequests();
            }}
            className={`${secondaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3`}
          >
            View Requests <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <BadgeCheck size={22} />,
              title: "Verified Expert Profile",
              text: "Build professional trust through skill verification and specialization.",
            },
            {
              icon: <Wrench size={22} />,
              title: "High-Value Industrial Work",
              text: "Connect with facilities that need real technical expertise.",
            },
            {
              icon: <UserCircle2 size={22} />,
              title: "Professional Network",
              text: "A focused industrial network instead of a general job board.",
            },
          ].map((item) => (
            <InfoCard key={item.title} {...item} color="text-emerald-300/80" />
          ))}
        </div>
      </section>
    </PageShell>
  );

  const LoginPage = () => (
    <PageShell narrow>
      <BackButton />
      <AuthCard title="Log In">
        <form onSubmit={handleLogin} className="space-y-5">
          <input name="email" type="email" placeholder="Email" className={inputClass} required />
          <input name="password" type="password" placeholder="Password" className={inputClass} required />
          <button type="submit" disabled={isSubmitting} className={`${primaryButton} w-full py-4 rounded-2xl font-bold disabled:opacity-60`}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </AuthCard>
    </PageShell>
  );

  const SignupChoicePage = () => (
    <PageShell>
      <section className="max-w-4xl mx-auto">
        <BackButton />

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Choose Account Type</h1>
          <p className="text-gray-400">Select how you want to use Valcrons.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className={`${cardClass} p-8`}>
            <h2 className="text-2xl font-bold mb-4">Facility / Company</h2>
            <p className="text-gray-400 mb-8">
              Post industrial requests and connect with qualified experts.
            </p>
            <button onClick={() => setView("signupFacility")} className={`${primaryButton} w-full py-4 rounded-2xl font-bold`}>
              Continue as Company
            </button>
          </div>

          <div className={`${cardClass} p-8`}>
            <h2 className="text-2xl font-bold mb-4">Industrial Expert</h2>
            <p className="text-gray-400 mb-8">
              Build your profile and respond to industrial opportunities.
            </p>
            <button onClick={() => setView("signupExpert")} className={`${primaryButton} w-full py-4 rounded-2xl font-bold`}>
              Continue as Expert
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );

  const SignupFacilityPage = () => (
    <PageShell narrow>
      <BackButton to="signupChoice" />
      <AuthCard title="Company Registration">
        <form onSubmit={(e) => handleSignup(e, "facility")} className="space-y-5">
          <input name="company_name" placeholder="Company Name" className={inputClass} required />
          <input name="full_name" placeholder="Contact Person" className={inputClass} required />
          <input name="email" type="email" placeholder="Email" className={inputClass} required />
          <input name="password" type="password" placeholder="Password" className={inputClass} required />
          <input name="phone" placeholder="Phone Number" className={inputClass} />
          <input name="location" placeholder="City, State" className={inputClass} />
          <button type="submit" disabled={isSubmitting} className={`${primaryButton} w-full py-4 rounded-2xl font-bold disabled:opacity-60`}>
            {isSubmitting ? "Creating account..." : "Create Company Account"}
          </button>
        </form>
      </AuthCard>
    </PageShell>
  );

  const SignupExpertPage = () => (
    <PageShell narrow>
      <BackButton to="signupChoice" />
      <AuthCard title="Expert Registration">
        <form onSubmit={(e) => handleSignup(e, "expert")} className="space-y-5">
          <input name="full_name" placeholder="Full Name" className={inputClass} required />
          <input name="email" type="email" placeholder="Email" className={inputClass} required />
          <input name="password" type="password" placeholder="Password" className={inputClass} required />
          <input name="location" placeholder="City, State" className={inputClass} />
          <input name="specialty" placeholder="Specialty / Trade" className={inputClass} />
          <input name="phone" placeholder="Phone Number" className={inputClass} />
          <button type="submit" disabled={isSubmitting} className={`${primaryButton} w-full py-4 rounded-2xl font-bold disabled:opacity-60`}>
            {isSubmitting ? "Creating account..." : "Create Expert Account"}
          </button>
        </form>
      </AuthCard>
    </PageShell>
  );

  const ProfilePage = () => (
    <PageShell>
      <section className="max-w-4xl mx-auto">
        <BackButton />

        {!currentUser ? (
          <div className={`${cardClass} p-8`}>
            <h1 className="text-3xl font-bold mb-4">Please log in first.</h1>
            <button onClick={() => setView("login")} className={`${primaryButton} px-6 py-3 rounded-2xl font-bold`}>
              Log In
            </button>
          </div>
        ) : (
          <div className={`${cardClass} p-8`}>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              My Profile
            </span>

            <h1 className="text-4xl font-bold mb-3">Account Profile</h1>
            <p className="text-gray-400 mb-8">
              Manage your Valcrons account information.
            </p>

            <div className="mb-8 grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className={labelClass}>Email</p>
                <p className="mt-2 text-white">{currentUser.email}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className={labelClass}>Account Type</p>
                <p className="mt-2 text-white capitalize">{currentUser.role || "Not set"}</p>
              </div>
            </div>

            <form onSubmit={updateProfile} className="grid md:grid-cols-2 gap-5">
              <input name="full_name" defaultValue={currentUser.full_name || ""} placeholder="Full Name / Contact Person" className={inputClass} />
              <input name="company_name" defaultValue={currentUser.company_name || ""} placeholder="Company Name" className={inputClass} />
              <input name="phone" defaultValue={currentUser.phone || ""} placeholder="Phone Number" className={inputClass} />
              <input name="location" defaultValue={currentUser.location || ""} placeholder="City, State" className={inputClass} />
              <input name="specialty" defaultValue={currentUser.specialty || ""} placeholder="Specialty / Trade" className={`${inputClass} md:col-span-2`} />

              <button type="submit" disabled={isSubmitting} className={`${primaryButton} md:col-span-2 py-4 rounded-2xl font-bold disabled:opacity-60`}>
                {isSubmitting ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>
        )}
      </section>
    </PageShell>
  );

  const PlantFormPage = () => (
    <PageShell>
      <section className="max-w-5xl mx-auto">
        <BackButton to="plants" />

        <div className="mb-10">
          <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Facility Request
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Request Industrial Support.
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Tell us about your facility and the issue. Experts can review and respond when their experience matches.
          </p>
        </div>

        <form onSubmit={submitFacilityRequest} className={`grid md:grid-cols-2 gap-5 ${cardClass} p-6 md:p-8`}>
          <input name="company_name" className={inputClass} placeholder="Company Name" required />
          <input name="contact_person" className={inputClass} placeholder="Contact Person" required />
          <input name="work_email" className={inputClass} placeholder="Work Email" type="email" required />
          <input name="phone_number" className={inputClass} placeholder="Phone Number" />
          <select name="facility_type" className={inputClass} defaultValue="" required>
            <option value="" disabled>Choose facility type</option>
            <option>Manufacturing Plant</option>
            <option>Warehouse / Distribution</option>
            <option>Food Processing</option>
            <option>Printing / Packaging</option>
            <option>Machine Shop</option>
            <option>Other Industrial Facility</option>
          </select>
          <select name="urgency" className={inputClass} defaultValue="" required>
            <option value="" disabled>Choose urgency</option>
            <option>Emergency — production stopped</option>
            <option>High — major issue</option>
            <option>Normal — needs diagnosis</option>
            <option>Planning — future support</option>
          </select>
          <input name="issue_type" className={inputClass} placeholder="Issue Type: PLC, motor, conveyor..." />
          <input name="location" className={inputClass} placeholder="City, State" />
          <textarea name="problem_description" className={`${inputClass} md:col-span-2 min-h-[140px] resize-none`} placeholder="Describe the problem..." required />
          <button type="submit" disabled={isSubmitting} className={`${primaryButton} md:col-span-2 px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 disabled:opacity-60`}>
            {isSubmitting ? "Submitting..." : "Submit Facility Request"} <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </PageShell>
  );

  const ExpertFormPage = () => (
    <PageShell>
      <section className="max-w-5xl mx-auto">
        <BackButton to="experts" />

        <div className="mb-10">
          <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-emerald-300/80 text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Expert Application
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Apply to Join Valcrons.
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Tell us about your technical background, specialties, and availability.
          </p>
        </div>

        <form onSubmit={submitExpertApplication} className={`grid md:grid-cols-2 gap-5 ${cardClass} p-6 md:p-8`}>
          <input name="full_name" className={inputClass} placeholder="Full Name" required />
          <input name="email" className={inputClass} placeholder="Email" type="email" required />
          <input name="phone_number" className={inputClass} placeholder="Phone Number" />
          <input name="location" className={inputClass} placeholder="City, State" />
          <select name="primary_specialty" className={inputClass} defaultValue="" required>
            <option value="" disabled>Choose specialty</option>
            <option>PLC / Automation</option>
            <option>Industrial Electrical</option>
            <option>Mechanical Maintenance</option>
            <option>Hydraulics / Pneumatics</option>
            <option>Controls Engineering</option>
            <option>Industrial Troubleshooting</option>
          </select>
          <select name="years_experience" className={inputClass} defaultValue="" required>
            <option value="" disabled>Choose experience</option>
            <option>1–3 years</option>
            <option>4–7 years</option>
            <option>8–15 years</option>
            <option>15+ years</option>
          </select>
          <select name="availability" className={inputClass} defaultValue="">
            <option value="" disabled>Choose availability</option>
            <option>Remote diagnostics only</option>
            <option>On-site only</option>
            <option>Remote and on-site</option>
            <option>Emergency availability</option>
          </select>
          <input name="certifications" className={inputClass} placeholder="Certifications" />
          <textarea name="technical_background" className={`${inputClass} md:col-span-2 min-h-[140px] resize-none`} placeholder="Technical background..." required />
          <button type="submit" disabled={isSubmitting} className="bg-emerald-500/70 hover:bg-emerald-500/80 text-white transition-colors md:col-span-2 px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 disabled:opacity-60">
            {isSubmitting ? "Submitting..." : "Submit Expert Application"} <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </PageShell>
  );

  const RequestsPage = () => (
    <PageShell>
      <section className="max-w-6xl mx-auto">
        <BackButton />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              Request Queue
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Active Industrial Requests.
            </h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Review facility-submitted requests and respond only when your expertise matches the issue.
            </p>
          </div>

          <button onClick={loadRequests} className="bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/30 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
            <RefreshCw size={15} className={isLoadingRequests ? "animate-spin" : ""} />
            Refresh Queue
          </button>
        </div>

        {requests.length === 0 ? (
          <div className={`${cardClass} p-10 text-gray-500`}>
            No active industrial requests yet.
          </div>
        ) : (
          <div className="grid gap-5">
            {requests.map((request) => (
              <div key={request.id} className={`${cardClass} p-6 md:p-7 hover:border-[#2563eb]/50 transition-all duration-300`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#93c5fd] bg-[#2563eb]/5 px-2 py-1 rounded-md">
                        {request.facility_type || "Industrial Facility"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-gray-400">
                        {request.status || "pending"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3 text-gray-100">
                      {request.issue_type || "Industrial Request"}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                      {request.problem_description || "No description provided."}
                    </p>
                  </div>

                  <div className="min-w-[190px] text-sm text-gray-500 md:text-right space-y-2">
                    <p className="flex md:justify-end items-center gap-2">
                      <MapPin size={14} />
                      {request.location || "Location not listed"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setSelectedRequest(request);
                      setView("requestDetails");
                    }}
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-2xl font-bold text-sm"
                  >
                    Review Request
                  </button>

                  <button
                    onClick={() => saveProjectAction(request, "saved")}
                    className="bg-white/[0.03] border border-white/10 hover:bg-white/[0.1] text-white px-5 py-3 rounded-2xl font-bold text-sm"
                  >
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );

  const RequestDetailsPage = () => {
    if (!selectedRequest) {
      return (
        <PageShell>
          <section className="max-w-4xl mx-auto">
            <BackButton to="requests" />
            <div className={`${cardClass} p-8 text-gray-400`}>
              No request selected.
            </div>
          </section>
        </PageShell>
      );
    }

    return (
      <PageShell>
        <section className="max-w-5xl mx-auto">
          <BackButton to="requests" />

          <div className="mb-10">
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              Industrial Request
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {selectedRequest.issue_type || "Industrial Request"}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {selectedRequest.problem_description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["Facility Type", selectedRequest.facility_type || "Industrial Facility"],
              ["Urgency", selectedRequest.urgency || "Pending Review"],
              ["Location", selectedRequest.location || "Unknown"],
              ["Status", selectedRequest.status || "Pending"],
            ].map(([label, value]) => (
              <div key={label} className={`${cardClass} p-7`}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                  {label}
                </p>
                <h3 className="text-xl font-bold">{value}</h3>
              </div>
            ))}
          </div>

          <div className={`mt-10 ${cardClass} p-8`}>
            <h2 className="text-2xl font-bold mb-5">Technical Summary</h2>
            <p className="text-gray-400 leading-relaxed text-[15px]">
              This request has been submitted to the Valcrons industrial queue and is awaiting expert review.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => saveProjectAction(selectedRequest, "accepted")}
                className={`${primaryButton} px-7 py-4 rounded-2xl font-bold text-sm`}
              >
                Accept Request
              </button>

              <button
                onClick={() => saveProjectAction(selectedRequest, "saved")}
                className={`${secondaryButton} px-7 py-4 rounded-2xl font-bold text-sm`}
              >
                Save for Later
              </button>
            </div>
          </div>
        </section>
      </PageShell>
    );
  };

  const PageShell = ({
    children,
    narrow = false,
  }: {
    children: React.ReactNode;
    narrow?: boolean;
  }) => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />
      <div className={narrow ? "max-w-xl mx-auto" : ""}>{children}</div>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );


  const AuthCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className={`${cardClass} p-8`}>
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      {children}
    </div>
  );

  const InfoCard = ({
    icon,
    title,
    text,
    color,
  }: {
    icon: React.ReactNode;
    title: string;
    text: string;
    color: string;
  }) => (
    <div className={`${cardClass} p-7`}>
      <div className={`w-11 h-11 rounded-xl bg-white/[0.04] ${color} flex items-center justify-center mb-5`}>
        {icon}
      </div>
      <h3 className="font-bold mb-3">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
    </div>
  );

  const renderView = () => {
    switch (view) {
      case "login":
        return <LoginPage />;
      case "signupChoice":
        return <SignupChoicePage />;
      case "signupFacility":
        return <SignupFacilityPage />;
      case "signupExpert":
        return <SignupExpertPage />;
      case "plants":
        return <PlantsPage />;
      case "experts":
        return <ExpertsPage />;
      case "plantForm":
        return <PlantFormPage />;
      case "expertForm":
        return <ExpertFormPage />;
        case "profile":
      return <ProfilePage />;
      case "requests":
        return <RequestsPage />;
      case "requestDetails":
        return <RequestDetailsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}
