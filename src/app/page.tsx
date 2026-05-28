"use client"; // ضروري جداً لتشغيل الحركات

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Video, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export default function ValcronsLanding() {
return (
<div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
{/* Navigation */}
<nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
<div className="flex items-center gap-2">
<Zap className="text-blue-500" fill="currentColor" />
<span className="font-bold text-xl tracking-tighter uppercase">Valcrons</span>
</div>
<button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">Join as Expert</button>
</nav>

{/* Hero Section */}
<main className="max-w-4xl mx-auto text-center pt-20 px-6">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
>
Industrial Expertise, <br/>
<span className="text-gray-500">Instantly Connected.</span>
</motion.h1>

<p className="text-gray-400 text-lg mb-10">The global engine for mechanical diagnostics.</p>

{/* Search Bar */}
<div className="relative max-w-xl mx-auto mb-20">
<input
className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="What machine needs repair?"
/>
<button className="absolute right-2 top-2 bg-blue-600 px-4 py-2 rounded-xl text-sm font-bold">Match -></button>
</div>

{/* Features Grid - هذا الجزء سيصلح المربعات الظاهرة في صورتك */}
<div className="grid md:grid-cols-3 gap-6">
<div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all">
<Video className="text-blue-500 mb-4" />
<h3 className="font-bold mb-2">Live Video Triage</h3>
<p className="text-sm text-gray-500">Zero-latency WebRTC connection.</p>
</div>

<div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all">
<ShieldCheck className="text-green-500 mb-4" />
<h3 className="font-bold mb-2">Verified Engineers</h3>
<p className="text-sm text-gray-500">Multi-step skill verification.</p>
</div>

<div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 text-left hover:bg-white/[0.05] transition-all">
<Globe className="text-purple-500 mb-4" />
<h3 className="font-bold mb-2">Global Scalability</h3>
<p className="text-sm text-gray-500">Built for industry 4.0.</p>
</div>
</div>
</main>
</div>
);
}
