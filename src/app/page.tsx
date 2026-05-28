"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Video, ShieldCheck, Globe, ArrowRight, Search } from 'lucide-react';

export default function ValcronsLanding() {
return (
<div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
{/* Navigation */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2 group cursor-pointer">
<div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
<Zap size={20} fill="white" />
</div>
<span className="text-xl font-bold tracking-tighter uppercase">Valcrons</span>
</div>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
<a href="#" className="hover:text-white transition-colors">Platform</a>
<a href="#" className="hover:text-white transition-colors">Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>

<button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform">
Join as Expert
</button>
</div>
</nav>

{/* Hero Section */}
<main className="pt-48 pb-20 px-6">
<div className="max-w-5xl mx-auto text-center">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="text-6xl md:text-8xl font-bold tracking-tight mb-8"
>
Industrial Expertise, <br />
<span className="text-gray-500">Instantly Connected.</span>
</motion.h1>

<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.2 }}
className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
>
The global engine for mechanical diagnostics. Connect with verified industrial experts in 3 seconds via encrypted video triage.
</p>

{/* Search Bar - Apple Style */}
<div className="relative max-w-2xl mx-auto mb-32 group">
<div className="absolute inset-y-0 left-6 flex items-center text-gray-500">
<Search size={20} />
</div>
<input
type="text"
placeholder="What machine needs repair? (e.g. CNC, Hydraulic Press)"
className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-16 pr-40 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all text-lg backdrop-blur-sm"
/>
<button className="absolute right-3 top-3 bottom-3 bg-blue-600 px-8 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors">
Match <ArrowRight size={16} />
</button>
</div>

{/* Features Grid */}
<div className="grid md:grid-cols-3 gap-8 text-left">
<FeatureCard
icon={<Video className="text-blue-500" size={28} />}
title="Live Video Triage"
desc="Zero-latency WebRTC connection. Draw on screen and guide maintenance teams in real-time."
/>
<FeatureCard
icon={<ShieldCheck className="text-emerald-500" size={28} />}
title="Verified Engineers"
desc="Every expert undergoes multi-step skill verification. Certified PLC and Automation pros only."
/>
<FeatureCard
icon={<Globe className="text-amber-500" size={28} />}
title="Global Scalability"
desc="Built for lightning-fast performance across continents. Ready for the future of industry 4.0."
/>
</div>
</div>
</main>

<footer className="py-20 border-t border-white/5 text-center text-[10px] text-gray-600 tracking-[0.3em] uppercase">
Valcrons System © 2026 — The Industrial Intelligence Network
</footer>
</div>
);
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
return (
<motion.div
whileHover={{ y: -10 }}
className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500"
>
<div className="mb-8 w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
{icon}
</div>
<h3 className="text-xl font-bold mb-4">{title}</h3>
<p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
</motion.div>
);
}
