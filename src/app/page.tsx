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
  Menu,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Mail,
  Wrench,
  Radio,
  Lock,
  BadgeCheck,
  Factory,
  MapPin,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

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
};

export default function ValcronsPro() {
  const [view, setView] = useState<
    | "login"
    | "signupChoice"
    | "signupFacility"
    | "signupExpert"
    | "landing"
    | "platform"
    | "plants"
    | "experts"
    | "plantForm"
    | "expertForm"
    | "requests"
    | "requestDetails"
  >("landing");

  const [activeTab, setActiveTab] = useState("factories");
  const [selectedRequest, setSelectedRequest] =
    useState<FacilityRequest | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requests, setRequests] = useState<FacilityRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
  const loadUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setCurrentUser({
        id: data.user.id,
        email: data.user.email ?? null,
      });
    }
  };

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      setCurrentUser({
        id: session.user.id,
        email: session.user.email ?? null,
      });
    } else {
      setCurrentUser(null);
    }
  });

  return () => subscription.unsubscribe();
}, []);
  
  const primaryButton =
    "bg-[#2563eb]/80 hover:bg-[#2563eb] text-white transition-colors";

  const secondaryButton =
    "bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] text-white transition-colors";

  const cardClass = "border border-white/10 bg-white/[0.025] rounded-[2rem]";

  const inputClass =
    "w-full bg-white/[0.035] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-white/20 transition-colors";

  const labelClass =
    "text-xs font-bold text-gray-400 uppercase tracking-[0.14em]";

  const BackButton = ({ to = "landing" }: { to?: typeof view }) => (
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
      return;
    }

    setRequests(data || []);
  };

const updateRequestStatus = async (status: "accepted" | "saved") => {
  if (!selectedRequest?.id) {
    alert("No request selected.");
    return;
  }

  if (!currentUser) {
  alert("Please log in before accepting or saving a diagnostic case.");
  return;
}
  const now = new Date().toISOString();

  const { data: existingRequest, error: fetchError } = await supabase
    .from("facility_requests")
    .select("id")
    .eq("id", selectedRequest.id)
    .maybeSingle();

  if (fetchError || !existingRequest) {
    await loadRequests();
    setView("requests");
    alert("This request no longer exists in the live database. The queue has been refreshed.");
    return;
  }

  const updateData =
   status === "accepted"
  ? {
      status: "accepted",
      accepted_by: currentUser.email || currentUser.id,
      accepted_by_user_id: currentUser.id,
      accepted_at: now,
      saved_at: null,
      saved_by_user_id: null,
    }

    : {
status: "saved",
saved_at: now,
saved_by_user_id: currentUser.id,
};
  
  const { data, error } = await supabase
    .from("facility_requests")
    .update(updateData)
    .eq("id", existingRequest.id)
    .select(
      "id, created_at, facility_type, urgency, issue_type, location, problem_description, status"
    )
    .maybeSingle();

  if (error || !data) {
    console.error("Status update error:", error);
    alert("Could not update request status.");
    return;
  }

  setSelectedRequest(data);
  await loadRequests();

  alert(
    status === "accepted"
      ? "Diagnostic case accepted."
      : "Request saved for later."
  );
};
  const submitFacilityRequest = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
  };

  const submitExpertApplication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
  });

  if (error || !data.user) {
    setIsSubmitting(false);
    alert(error?.message || "Could not create account.");
    return;
  }

  const { error: profileError } = await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    role,
    full_name: fullName,
    company_name: companyName,
    phone,
    location,
    specialty,
  });

  setIsSubmitting(false);

  if (profileError) {
    alert(profileError.message);
    return;
  }

  alert("Account created successfully.");

  if (role === "expert") {
    setView("requests");
    loadRequests();
  } else {
    setView("plantForm");
  }
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
            <button
              onClick={() => setView("platform")}
              className="hover:text-white transition-colors"
            >
              Platform
            </button>
            <button
              onClick={() => setView("experts")}
              className="hover:text-white transition-colors"
            >
              Experts
            </button>
            <button
              onClick={() => setView("plants")}
              className="hover:text-white transition-colors"
            >
              Facilities
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
            <a href="#" className="hover:text-white transition-colors">
              Safety
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );

  const LoginPage = () => (
  <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
    <Header />

    <section className="max-w-xl mx-auto">
      <BackButton />

      <div className={`${cardClass} p-8`}>
        <h1 className="text-4xl font-bold mb-8">
          Log In
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className={labelClass}>Email</label>
            <input
              name="email"
              type="email"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              name="password"
              type="password"
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className={`${primaryButton} w-full py-4 rounded-2xl font-bold`}
          >
            Log In
          </button>

        </form>
      </div>
    </section>
  </div>
);

  const SignupChoicePage = () => (
  <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
    <Header />

    <section className="max-w-4xl mx-auto">
      <BackButton />

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Choose Account Type
        </h1>

        <p className="text-gray-400">
          Select how you want to use Valcrons.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className={`${cardClass} p-8`}>
          <h2 className="text-2xl font-bold mb-4">
            Facility / Company
          </h2>

          <p className="text-gray-400 mb-8">
            Post industrial requests and connect with qualified experts.
          </p>

          <button
            onClick={() => setView("signupFacility")}
            className={`${primaryButton} w-full py-4 rounded-2xl font-bold`}
          >
            Continue as Company
          </button>
        </div>

        <div className={`${cardClass} p-8`}>
          <h2 className="text-2xl font-bold mb-4">
            Industrial Expert
          </h2>

          <p className="text-gray-400 mb-8">
            Apply for opportunities and support industrial facilities.
          </p>

          <button
            onClick={() => setView("signupExpert")}
            className={`${primaryButton} w-full py-4 rounded-2xl font-bold`}
          >
            Continue as Expert
          </button>
        </div>

      </div>
    </section>
  </div>
);

const SignupFacilityPage = () => (
  <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
    <Header />

    <section className="max-w-2xl mx-auto">
      <BackButton to="signupChoice" />

      <div className={`${cardClass} p-8`}>
        <h1 className="text-4xl font-bold mb-8">
          Company Registration
        </h1>

        <form
  onSubmit={(e) => handleSignup(e, "facility")}
  className="space-y-5"
>
         <input
  name="company_name"
  placeholder="Company Name"
  className={inputClass}
/>

        <input
  name="full_name"
  placeholder="Contact Person"
  className={inputClass}
/>
         <input
  name="email"
  type="email"
  placeholder="Email"
  className={inputClass}
/>

         <input
  name="password"
  type="password"
  placeholder="Password"
  className={inputClass}
/>
          <input
  name="location"
  placeholder="City"
  className={inputClass}
/>

        <button
  type="submit"
  disabled={isSubmitting}
  className={`${primaryButton} w-full py-4 rounded-2xl font-bold disabled:opacity-60`}
>
  {isSubmitting ? "Creating account..." : "Create Company Account"}
</button>
          
        </form>
      </div>
    </section>
  </div>
);
  
  const Footer = () => (
    <footer className="border-t border-white/5 bg-[#050505] py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[13px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-[#60a5fa]" />
            <span className="font-bold uppercase tracking-tighter">
              Valcrons
            </span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            The industrial intelligence network connecting facilities with
            verified technical expertise.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-500">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Compliance</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-gray-500">
            <li className="flex items-center gap-2">
              <Mail size={14} />
              <span className="text-[#93c5fd]">support@valcrons.com</span>
            </li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Statement</h4>
          <p className="text-[11px] text-gray-600 uppercase tracking-widest leading-tight">
            Valcrons is a connection and diagnostic coordination platform. We
            do not operate machinery directly.
          </p>
        </div>
      </div>
    </footer>
  );

  const LandingPage = () => (
    <div
      className="relative min-h-screen bg-[#050505] pt-32 pb-20 px-6 overflow-hidden text-white"
     style={{
  backgroundImage: "url('/industrial-bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
}}
    >
      <div className="absolute inset-0 bg-black/30" />
      <Header />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-32">
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
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-20">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#93c5fd]">
              <Video size={20} />
            </div>
            <h3 className="font-bold">Live Diagnostic Sessions</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Connect facility teams with technical specialists for secure
              real-time video triage.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-emerald-300/80">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold">Verified Industrial Experts</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Built for PLC, automation, electrical, mechanical, and maintenance
              professionals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-amber-200/80">
              <Globe size={20} />
            </div>
            <h3 className="font-bold">Multi-Site Operations</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Designed for facilities, factories, and distributed industrial
              operations.
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
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

      <section className="max-w-6xl mx-auto">
        <BackButton />

        <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
          For Plants & Facilities
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Keep Production Moving <br />
          <span className="text-gray-500">When Equipment Fails.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Valcrons helps factories, facilities, and maintenance leaders connect
          with verified industrial experts for urgent diagnostics, remote
          guidance, and technical escalation.
        </p>

        <button
          onClick={() => setView("plantForm")}
          className={`${primaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3`}
        >
          Request Industrial Support <ArrowRight size={18} />
        </button>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <Factory size={22} />,
              title: "Emergency Support",
              text: "Request fast technical support when a line, machine, or system needs immediate attention.",
            },
            {
              icon: <Radio size={22} />,
              title: "Remote Video Triage",
              text: "Start a secure diagnostic session with an expert before sending anyone on-site.",
            },
            {
              icon: <Lock size={22} />,
              title: "Secure Coordination",
              text: "Built for professional industrial communication, safety notes, and controlled access.",
            },
          ].map((item) => (
            <div key={item.title} className={`${cardClass} p-7`}>
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] text-[#93c5fd] flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );

  const ExpertsPage = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

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
          Valcrons is built for experienced technicians, automation specialists,
          electricians, mechanics, controls engineers, and industrial
          troubleshooters who solve real production problems.
        </p>

        <button
          onClick={() => setView("expertForm")}
          className="bg-emerald-500/70 hover:bg-emerald-500/80 text-white transition-colors px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3"
        >
          Apply as an Expert <ArrowRight size={18} />
        </button>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              icon: <BadgeCheck size={22} />,
              title: "Verified Expert Profile",
              text: "Build professional trust through skill verification and industrial specialization.",
            },
            {
              icon: <Wrench size={22} />,
              title: "High-Value Industrial Work",
              text: "Connect with facilities that need real technical expertise, not general handyman service.",
            },
            {
              icon: <UserCircle2 size={22} />,
              title: "Remote & On-Site Potential",
              text: "Support diagnostics remotely first, then escalate to on-site service when needed.",
            },
          ].map((item) => (
            <div key={item.title} className={`${cardClass} p-7`}>
              <div className="w-11 h-11 rounded-xl bg-white/[0.04] text-emerald-300/80 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );

  const RequestsPage = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

      <section className="max-w-6xl mx-auto">
        <BackButton />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div>
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              Diagnostic Request Queue
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
              Active Industrial Requests.
            </h1>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              Review facility-submitted diagnostic requests and respond only
              when your expertise matches the issue.
            </p>
          </div>

          <button
            onClick={() => loadRequests()}
            className="bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/30 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
          >
            <RefreshCw
              size={15}
              className={isLoadingRequests ? "animate-spin" : ""}
            />
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
              <div
                key={request.id}
                className={`${cardClass} p-6 md:p-7 border border-white/10 hover:border-[#2563eb]/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.2)]`}
              >
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
                      {request.issue_type || "Industrial Diagnostic Request"}
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
                    className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Review Request
                  </button>
                  <button className="bg-white/[0.03] border border-white/10 hover:bg-white/[0.1] text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300">
                    Save for Later
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );

  const PlantFormPage = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

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
            Tell us about your facility and the issue. Valcrons will use this
            information to prepare the right technical response path.
          </p>
        </div>

        <form
          onSubmit={submitFacilityRequest}
          className={`grid md:grid-cols-2 gap-5 ${cardClass} p-6 md:p-8`}
        >
          <div className="space-y-2">
            <label className={labelClass}>Company Name</label>
            <input
              name="company_name"
              className={inputClass}
              placeholder="Example: Blue River Manufacturing"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Contact Person</label>
            <input
              name="contact_person"
              className={inputClass}
              placeholder="Full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Work Email</label>
            <input
              name="work_email"
              className={inputClass}
              placeholder="name@company.com"
              type="email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Phone Number</label>
            <input
              name="phone_number"
              className={inputClass}
              placeholder="(000) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Facility Type</label>
            <select name="facility_type" className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Choose facility type
              </option>
              <option>Manufacturing Plant</option>
              <option>Warehouse / Distribution</option>
              <option>Food Processing</option>
              <option>Printing / Packaging</option>
              <option>Machine Shop</option>
              <option>Other Industrial Facility</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Urgency</label>
            <select name="urgency" className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Choose urgency
              </option>
              <option>Emergency — production stopped</option>
              <option>High — major issue</option>
              <option>Normal — needs diagnosis</option>
              <option>Planning — future support</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Issue Type</label>
            <input
              name="issue_type"
              className={inputClass}
              placeholder="PLC, motor, conveyor, electrical, hydraulic..."
            />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Location</label>
            <input name="location" className={inputClass} placeholder="City, State" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className={labelClass}>Describe the Problem</label>
            <textarea
              name="problem_description"
              className={`${inputClass} min-h-[140px] resize-none`}
              placeholder="Briefly describe what failed, what changed, and whether production is currently stopped."
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${primaryButton} px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 disabled:opacity-60`}
            >
              {isSubmitting ? "Submitting..." : "Submit Facility Request"}{" "}
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => setView("plants")}
              className={`${secondaryButton} px-8 py-4 rounded-2xl font-bold text-sm`}
            >
              Back
            </button>
          </div>
        </form>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );

  const ExpertFormPage = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

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

        <form
          onSubmit={submitExpertApplication}
          className={`grid md:grid-cols-2 gap-5 ${cardClass} p-6 md:p-8`}
        >
          <div className="space-y-2">
            <label className={labelClass}>Full Name</label>
            <input name="full_name" className={inputClass} placeholder="Full name" required />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Email</label>
            <input name="email" className={inputClass} placeholder="name@email.com" type="email" required />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Phone Number</label>
            <input name="phone_number" className={inputClass} placeholder="(000) 000-0000" />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Location</label>
            <input name="location" className={inputClass} placeholder="City, State" />
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Primary Specialty</label>
            <select name="primary_specialty" className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Choose specialty
              </option>
              <option>PLC / Automation</option>
              <option>Industrial Electrical</option>
              <option>Mechanical Maintenance</option>
              <option>Hydraulics / Pneumatics</option>
              <option>Controls Engineering</option>
              <option>Industrial Troubleshooting</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Years of Experience</label>
            <select name="years_experience" className={inputClass} defaultValue="" required>
              <option value="" disabled>
                Choose experience
              </option>
              <option>1–3 years</option>
              <option>4–7 years</option>
              <option>8–15 years</option>
              <option>15+ years</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Availability</label>
            <select name="availability" className={inputClass} defaultValue="">
              <option value="" disabled>
                Choose availability
              </option>
              <option>Remote diagnostics only</option>
              <option>On-site only</option>
              <option>Remote and on-site</option>
              <option>Emergency availability</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className={labelClass}>Certifications</label>
            <input name="certifications" className={inputClass} placeholder="OSHA, PLC, electrical license, etc." />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className={labelClass}>Technical Background</label>
            <textarea
              name="technical_background"
              className={`${inputClass} min-h-[140px] resize-none`}
              placeholder="Briefly describe the systems, machines, industries, and problems you are strongest at solving."
              required
            />
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-500/70 hover:bg-emerald-500/80 text-white transition-colors px-8 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Expert Application"}{" "}
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => setView("experts")}
              className={`${secondaryButton} px-8 py-4 rounded-2xl font-bold text-sm`}
            >
              Back
            </button>
          </div>
        </form>
      </section>

      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );

  const PlatformView = () => (
    <div className="flex h-screen bg-[#050505] text-white">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        className={`${isSidebarOpen ? "w-64" : "w-20"} border-r border-white/5 bg-[#080808] flex flex-col transition-all duration-300`}
      >
        <div className="p-6 h-20 flex items-center justify-between">
          {isSidebarOpen && (
            <span className="font-bold text-sm uppercase tracking-tighter">
              Valcrons Hub
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg text-gray-500"
          >
            <Menu size={18} />
          </button>
        </div>

        <div className="flex-1 px-4 space-y-2">
          {[
            { id: "factories", label: "Factories", icon: <LayoutDashboard size={18} /> },
            { id: "experts", label: "Experts", icon: <UserCircle2 size={18} /> },
            { id: "settings", label: "Settings", icon: <Settings size={18} /> },
            { id: "help", label: "Help", icon: <HelpCircle size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-[#2563eb]/80 text-white"
                  : "text-gray-500 hover:bg-white/5"
              }`}
            >
              {item.icon}
              {isSidebarOpen && item.label}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={() => setView("landing")}
            className="w-full text-xs text-gray-600 hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowRight size={12} className="rotate-180" /> Exit Platform
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 overflow-y-auto">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
            {activeTab}
          </h2>

          <div className="flex items-center gap-4">
            <div className="bg-emerald-500/5 text-emerald-300/80 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300/80 animate-pulse" />
              Live Server 01
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
          </div>
        </header>

        <div className="p-10 max-w-6xl">
          <BackButton />

          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-video bg-[#111] rounded-[2rem] border border-white/5 flex items-center justify-center text-gray-600 font-mono text-xs">
              [ Initializing Video Triage Environment... ]
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">
                Active Diagnostics
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "Select a factory or an expert from the sidebar to begin the
                encrypted session."
              </p>

              <div className="p-6 bg-white/[0.025] border border-white/10 rounded-2xl">
                <h4 className="text-xs font-bold text-[#93c5fd] uppercase mb-2">
                  Safety Note
                </h4>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  By starting, you agree to our Terms of Service. Valcrons is
                  not responsible for physical machine operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const RequestDetailsPage = () => {
    if (!selectedRequest) return null;

    return (
      <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
        <Header />

        <section className="max-w-5xl mx-auto">
          <BackButton to="requests" />

          <div className="mb-10">
            <span className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#93c5fd] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              Diagnostic Request
            </span>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {selectedRequest.issue_type || "Industrial Request"}
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
              {selectedRequest.problem_description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`${cardClass} p-7`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                Facility Type
              </p>

              <h3 className="text-xl font-bold">
                {selectedRequest.facility_type || "Industrial Facility"}
              </h3>
            </div>

            <div className={`${cardClass} p-7`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                Urgency
              </p>

              <h3 className="text-xl font-bold text-amber-200/80">
                {selectedRequest.urgency || "Pending Review"}
              </h3>
            </div>

            <div className={`${cardClass} p-7`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                Location
              </p>

              <h3 className="text-xl font-bold">
                {selectedRequest.location || "Unknown"}
              </h3>
            </div>

            <div className={`${cardClass} p-7`}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-3">
                Status
              </p>

              <h3 className="text-xl font-bold text-emerald-300/80">
                {selectedRequest.status || "Pending"}
              </h3>
            </div>
          </div>

          <div className={`mt-10 ${cardClass} p-8`}>
            <h2 className="text-2xl font-bold mb-5">Technical Summary</h2>

            <p className="text-gray-400 leading-relaxed text-[15px]">
              This request has been submitted to the Valcrons industrial queue
              and is awaiting expert review. Respond only if your expertise
              directly matches the operational issue and facility environment.
            </p>

          {selectedRequest.status === "pending" || !selectedRequest.status ? (
  <div className="flex flex-col sm:flex-row gap-4 mt-8">
    <button
      onClick={() => updateRequestStatus("accepted")}
      className={`${primaryButton} px-7 py-4 rounded-2xl font-bold text-sm`}
    >
      Accept Diagnostic Case
    </button>

    <button
      onClick={() => updateRequestStatus("saved")}
      className={`${secondaryButton} px-7 py-4 rounded-2xl font-bold text-sm`}
    >
      Save for Later
    </button>
  </div>
) : (
  <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
    <p className="text-sm font-bold text-white">
      {selectedRequest.status === "accepted"
        ? "This diagnostic case has been accepted."
        : "This diagnostic case has been saved for later."}
    </p>

    <p className="mt-2 text-sm text-gray-500">
      It is no longer available for public action in the request queue.
    </p>
  </div>
)}
          </div>
        </section>

        <div className="mt-32">
          <Footer />
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="sync">
      {view === "login" && (
  <motion.div
    key="login"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <LoginPage />
  </motion.div>
)}

      {view === "signupChoice" && (
  <motion.div
    key="signupChoice"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <SignupChoicePage />
  </motion.div>
)}

{view === "signupFacility" && (
  <motion.div
    key="signupFacility"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <SignupFacilityPage />
  </motion.div>
)}
      
      {view === "landing" && (
        <motion.div
          key="landing"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage />
        </motion.div>
      )}

      {view === "plants" && (
        <motion.div
          key="plants"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlantsPage />
        </motion.div>
      )}

      {view === "experts" && (
        <motion.div
          key="experts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExpertsPage />
        </motion.div>
      )}

      {view === "plantForm" && (
        <motion.div
          key="plantForm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PlantFormPage />
        </motion.div>
      )}

      {view === "expertForm" && (
        <motion.div
          key="expertForm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ExpertFormPage />
        </motion.div>
      )}

      {view === "requests" && (
        <motion.div
          key="requests"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <RequestsPage />
        </motion.div>
      )}

      {view === "requestDetails" && (
        <motion.div
          key="requestDetails"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <RequestDetailsPage />
        </motion.div>
      )}

      {view === "platform" && (
        <motion.div
          key="platform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PlatformView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
