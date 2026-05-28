"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Video, ShieldCheck, Globe, ArrowRight, Search } from 'lucide-react';

export default function ValcronsLanding() {
// إضافة حالة البحث التفاعلية
const [isSearching, setIsSearching] = useState(false);

const handleSearch = () => {
setIsSearching(true);
// محاكاة عملية البحث لمدة 3 ثوانٍ ثم العودة للحالة الطبيعية
setTimeout(() => setIsSearching(false), 3000);
};

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
<div className="w-9 h-9 bg-[#007AFF] rounded-xl flex items-center justify-center">
<Zap size={20} fill="white" />
</div>
<span className="text-xl font-bold tracking-tighter uppercase">Valcrons</span>
</div>

<div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
<a href="#" className="hover:text-white transition-colors">Platform</a>
<a href="#" className="hover:text-white transition-colors">Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>

<button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all">
Join as Expert
</button>
</div>
</nav>

{/* Hero Section */}
<main className="pt-48 pb-24 px-6">
<div className="max-w-5xl mx-auto text-center">
<motion.div {...fadeIn}>
<h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
Industrial Expertise, <br />
<span className="text-gray-500">Instantly Connected.</span>
</h1>
<p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
The global engine for mechanical diagnostics. Connect with verified industrial experts in 3 seconds via encrypted video triage.
</p>

{/* Search Bar - التحديث هنا ليصبح تفاعلياً */}
<div className="relative max-w-2xl mx-auto mb-32 group">
<div className="absolute inset-y-0 left-6 flex items-center text-gray-500 group-focus-within:text-[#007AFF] transition-colors">
<Search size={20} />
</div>
<input
type="text"
placeholder="What machine needs repair? (e.g. CNC, Hydraulic Press)"
className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-16 pr-44 focus:outline-none focus:ring-2 focus:ring-[#007AFF]/50 transition-all text-lg backdrop-blur-sm"
disabled={isSearching}
/>
<button
onClick={handleSearch}
disabled={isSearching}
className="absolute right-3 top-3 bottom-3 bg-[#007AFF] px-8 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#0066EE] transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
>
{isSearching ? (
<div className="flex items-center gap-2">
<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
<span>Searching...</span>
</div>
) : (
<>Match <ArrowRight size={18} /></>
)}
</button>
</div>
</motion.div>

{/* Features Grid */}
<div className="grid md:grid-cols-3 gap-8">
<FeatureCard
icon={<Video className="text-[#007AFF]" size={28} />}
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

<footer className="py-16 border-t border-white/5 text-center">
<p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
Valcrons System © 2026 — The Industrial Intelligence Network
</p>
</footer>
</div>
);
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
return (
<motion.div
whileHover={{ y: -10 }}
className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.04] transition-all duration-500"
>
<div className="mb-8 w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
{icon}
</div>
<h3 className="text-xl font-bold mb-4">{title}</h3>
<p className="text-gray-500 leading-relaxed text-sm font-medium">{desc}</p>
</motion.div>
);
}
