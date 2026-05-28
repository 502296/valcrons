"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Video, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export default function ValcronsLanding() {
const fadeIn = {
initial: { opacity: 0, y: 20 },
animate: { opacity: 1, y: 0 },
transition: { duration: 0.6 }
};

return (
<div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#007AFF]/30">
{/* Navigation */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
<Zap size={18} className="text-white" />
</div>
<span className="text-xl font-bold tracking-tighter uppercase">Valcrons</span>
</div>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
<a href="#" className="hover:text-white transition-colors">Platform</a>
<a href="#" className="hover:text-white transition-colors">Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>

<button className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all">
Join as Expert
</button>
</div>
</nav>

{/* Hero Section */}
<main className="pt-44 pb-24 px-6">
<div className="max-w-4xl mx-auto text-center">
<motion.div
initial="initial"
animate="animate"
variants={fadeIn}
>
<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
Industrial Expertise, <br />
<span className="text-gray-500">Instantly Connected.</span>
</h1>
<p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
The global engine for mechanical diagnostics. Connect with verified industrial experts in 3 seconds via encrypted video triage.
</p>

{/* Search Bar - Apple Style */}
<div className="relative max-w-xl mx-auto mb-24">
<div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
<div className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" />
</div>
<input
type="text"
placeholder="What machine needs repair? (e.g. CNC, Hydraulic Press)"
className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 transition-all text-sm backdrop-blur-sm"
/>
<button className="absolute right-2 top-2 bottom-2 bg-[#007AFF] px-6 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-[#0066EE] transition-colors">
Match <ArrowRight size={14} />
</button>
</div>
</motion.div>

{/* Features Grid */}
<div className="grid md:grid-cols-3 gap-6">
<FeatureCard
icon={<Video className="text-[#007AFF]" size={24} />}
title="Live Video Triage"
desc="Zero-latency WebRTC connection. Draw on screen and guide maintenance teams in real-time."
/>
<FeatureCard
icon={<ShieldCheck className="text-amber-500" size={24} />}
title="Verified Engineers"
desc="Every expert undergoes multi-step skill verification. Certified PLC and Automation pros only."
/>
<FeatureCard
icon={<Globe className="text-emerald-500" size={24} />}
title="Global Scalability"
desc="Built for lightning-fast performance across continents. Ready for the future of industry 4.0."
/>
</div>
</div>
</main>

<footer className="py-12 border-t border-white/5 text-center">
<p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">
Valcrons System © 2026 — The Industrial Intelligence Network
</p>
</footer>
</div>
);
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
return (
<motion.div
whileHover={{ y: -8, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-left transition-all duration-300"
>
<div className="mb-6 w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
{icon}
</div>
<h3 className="text-lg font-bold mb-3">{title}</h3>
<p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
</motion.div>
);
}
