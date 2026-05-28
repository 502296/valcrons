"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
Zap, Video, ShieldCheck, Cpu, Mic, CameraOff, Power, Search, Building2, UserCircle2
} from 'lucide-react';

export default function ValcronsLanding() {
// حالة الاتصال المرئي
const [isVideoActive, setIsVideoActive] = useState(false);

return (
<div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#007AFF]/30">

{/* Navigation - Minimalist Industry Standard */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2 group cursor-pointer">
<div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
<Zap size={20} fill="white" className="text-white" />
</div>
<span className="text-xl font-bold tracking-tighter uppercase">Valcrons</span>
</div>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
<a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Building2 size={16}/> Factories</a>
<a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><UserCircle2 size={16}/> Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>

<button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-all flex items-center gap-2">
Become Verified Expert
</button>
</div>
</nav>

{/* Main Hero Section */}
<main className="pt-48 pb-24 px-6">
<div className="max-w-6xl mx-auto text-center">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
>
Factories & Experts, <br />
<span className="text-gray-500">Instantly.</span>
</motion.h1>

{/* Section: The Killer Feature - Video Triage */}
<div className="glass-card max-w-5xl mx-auto rounded-[3rem] p-10 mb-24 border border-white/5 bg-white/[0.01]">
<h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3 justify-center">
<div className={`w-3 h-3 rounded-full ${isVideoActive ? 'bg-red-500 animate-pulse' : 'bg-gray-700'}`}/>
Live Diagnostics Camera
</h2>
<p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
Factories: connect with certified engineers for instant triage. Experts: start a room and diagnose the issue directly from your browser.
</p>

{/* Simulation of In-Browser Video Call */}
<div className="bg-[#121212] aspect-video rounded-3xl border border-white/5 mb-8 flex flex-col justify-between p-6">
<div className="flex justify-between items-start">
<span className="text-xs font-bold bg-[#007AFF]/10 text-[#007AFF] px-3 py-1.5 rounded-full">VALCRONS RTC ROOM ALPHA</span>
<div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center font-bold text-lg text-green-500">VC</div>
</div>

<div className="self-center flex flex-col items-center">
<div className="w-24 h-24 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center text-3xl font-bold text-gray-500 mb-4">VC</div>
<span className="text-gray-600 font-medium">Ready to connect...</span>
</div>

{/* Video Controls - Valley Level Design */}
<div className="self-center flex items-center gap-4 bg-gray-900/80 p-2 rounded-full backdrop-blur-sm border border-white/10">
<button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"><Mic size={20}/></button>
<button className="w-12 h-12 rounded-full flex items-center justify-center text-red-400 hover:bg-gray-800 transition-colors"><CameraOff size={20}/></button>
<button onClick={() => setIsVideoActive(!isVideoActive)} className={`w-14 h-14 rounded-full flex items-center justify-center ${isVideoActive ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'} transition-all`}>
<Power size={24} fill="white" className="text-white" />
</button>
</div>
</div>
</div>

{/* Dual Focus Section: Factories & Experts */}
<div className="grid md:grid-cols-2 gap-8 text-left mb-24">
{/* Factory Portal Focus */}
<FeatureCard
icon={<Building2 className="text-blue-500" size={28} />}
title="Factory Asset Management"
desc="Register all machines and history. Submit requests directly to specialized verified engineers."
/>

{/* Expert Portal Focus */}
<FeatureCard
icon={<ShieldCheck className="text-emerald-500" size={28} />}
title="Verified Engineering Network"
desc="Access Certified PLC, Hydraulic, and Automation experts with multi-step verification badge."
/>
</div>
</div>
</main>

{/* Footer */}
<footer className="py-20 border-t border-white/5 text-center text-[10px] text-gray-600 tracking-[0.3em] uppercase">
Valcrons Industrial GRID © 2026 — Secure & Connected Diagnostics
</footer>
</div>
);
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
return (
<motion.div
whileHover={{ y: -8 }}
className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500"
>
<div className="mb-8 w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
{icon}
</div>
<h3 className="text-xl font-bold mb-4">{title}</h3>
<p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
</motion.div>
);
}
