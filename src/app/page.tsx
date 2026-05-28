"use client";

import React, { useState } from "react";
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
  Building2,
  Wrench,
  Radio,
  Lock,
  BadgeCheck,
  Factory,
} from "lucide-react";

export default function ValcronsPro() {
  const [view, setView] = useState<
    "landing" | "platform" | "plants" | "experts"
  >("landing");

  const [activeTab, setActiveTab] = useState("factories");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const Header = () => (
    <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView("landing")}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap size={18} fill="white" />
            </div>
            <span className="text-lg font-bold tracking-tighter uppercase italic">
              Valcrons
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[13px] text-gray-400 font-medium">
            <button onClick={() => setView("platform")} className="hover:text-white transition-colors">
              Platform
            </button>
            <button onClick={() => setView("experts")} className="hover:text-white transition-colors">
              Experts
            </button>
            <button onClick={() => setView("plants")} className="hover:text-white transition-colors">
              Plants
            </button>
            <a href="#" className="hover:text-white transition-colors">
              Safety
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-[13px] text-gray-400 hover:text-white font-medium">
            Log in
          </button>
          <button
            onClick={() => setView("plants")}
            className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-gray-200 transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );

  const Footer = () => (
    <footer className="border-t border-white/5 bg-[#050505] py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[13px]">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-blue-600" />
            <span className="font-bold uppercase tracking-tighter">Valcrons</span>
          </div>
          <p className="text-gray-500 leading-relaxed">
            The industrial intelligence network connecting facilities with verified technical expertise.
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
              <span className="text-blue-400">support@valcrons.com</span>
            </li>
            <li>Help Center</li>
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
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 overflow-hidden text-white">
      <Header />

      <div className="max-w-5xl mx-auto text-center relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
        >
          Industrial Diagnostics Network
        </motion.span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          Connect Plants With <br />
          <span className="text-gray-500">Elite Industrial Experts.</span>
        </h1>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Secure real-time diagnostics, emergency maintenance coordination, and verified industrial expertise — built for modern facilities and technical teams.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-32">
          <button
            onClick={() => setView("plants")}
            className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
          >
            For Plants & Facilities <ArrowRight size={18} />
          </button>

          <button
            onClick={() => setView("experts")}
            className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
          >
            For Experts & Technicians <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-20">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Video size={20} />
            </div>
            <h3 className="font-bold">Live Diagnostic Sessions</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Connect facility teams with technical specialists for secure real-time video triage.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-bold">Verified Industrial Experts</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Built for PLC, automation, electrical, mechanical, and maintenance professionals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Globe size={20} />
            </div>
            <h3 className="font-bold">Multi-Site Operations</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Designed for facilities, factories, and distributed industrial operations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40">
        <Footer />
      </div>
    </div>
  );

  const PlantsPage = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-32 px-6">
      <Header />

      <section className="max-w-6xl mx-auto">
        <span className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
          For Plants & Facilities
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Keep Production Moving <br />
          <span className="text-gray-500">When Equipment Fails.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Valcrons helps factories, facilities, and maintenance leaders connect with verified industrial experts for urgent diagnostics, remote guidance, and technical escalation.
        </p>

        <button
          onClick={() => setView("platform")}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20"
        >
          Open Facility Dashboard <ArrowRight size={18} />
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
            <div key={item.title} className="border border-white/5 bg-white/[0.03] rounded-3xl p-7">
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
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
        <span className="inline-block px-4 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
          For Experts & Technicians
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
          Join the Network for <br />
          <span className="text-gray-500">Industrial Problem Solvers.</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
          Valcrons is built for experienced technicians, automation specialists, electricians, mechanics, controls engineers, and industrial troubleshooters who solve real production problems.
        </p>

        <button
          onClick={() => setView("platform")}
          className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-xl shadow-emerald-600/20"
        >
          Join Expert Network <ArrowRight size={18} />
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
            <div key={item.title} className="border border-white/5 bg-white/[0.03] rounded-3xl p-7">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
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
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
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
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Server 01
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
          </div>
        </header>

        <div className="p-10 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-video bg-[#111] rounded-[2rem] border border-white/5 flex items-center justify-center text-gray-600 font-mono text-xs">
              [ Initializing Video Triage Environment... ]
            </div>

            <div className="space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">
                Active Diagnostics
              </h1>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                "Select a factory or an expert from the sidebar to begin the encrypted session."
              </p>

              <div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
                <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">
                  Safety Note
                </h4>
                <p className="text-[12px] text-gray-400 leading-relaxed">
                  By starting, you agree to our Terms of Service. Valcrons is not responsible for physical machine operation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {view === "landing" && (
        <motion.div key="landing" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
          <LandingPage />
        </motion.div>
      )}

      {view === "plants" && (
        <motion.div key="plants" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <PlantsPage />
        </motion.div>
      )}

      {view === "experts" && (
        <motion.div key="experts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <ExpertsPage />
        </motion.div>
      )}

      {view === "platform" && (
        <motion.div key="platform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <PlatformView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
