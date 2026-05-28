"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
ShieldCheck,
Video,
Cpu,
Zap,
ArrowRight,
Globe,
Search
} from 'lucide-react';

export default function ValcronsLanding() {
// أنيميشن بسيط للعناصر عند الظهور
const fadeIn = {
initial: { opacity: 0, y: 20 },
animate: { opacity: 1, y: 0 },
transition: { duration: 0.6 }
};

return (
<div className="bg-[#0A0A0A] min-h-screen text-white font-sans selection:bg-[#007AFF] selection:text-white">

{/* Navigation - Ultra Minimalist */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0A0A0A]/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 bg-[#007AFF] rounded-lg flex items-center justify-center">
<Zap size={18} fill="white" />
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

{/* Hero Section - The "Focus" Area */}
<section className="pt-44 pb-24 px-6">
<div className="max-w-4xl mx-auto text-center">
<motion.div
{...fadeIn}
className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-xs font-bold mb-8"
>
<ShieldCheck size={14} />
SILICON VALLEY STANDARD DIAGNOSTICS
</motion.div>

<motion.h1
{...fadeIn}
transition={{ delay: 0.1 }}
className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]"
>
Industrial Expertise. <br />
<span className="text-gray-500">Instantly Connected.</span>
</motion.h1>

<motion.p
{...fadeIn}
transition={{ delay: 0.2 }}
className="text-gray-400 text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
>
The global engine for mechanical diagnostics. Connect with verified industrial experts in 3 seconds via encrypted video triage.
</motion.p>

{/* The Smart Search Box - Hero Feature */}
<motion.div
{...fadeIn}
transition={{ delay: 0.3 }}
className="relative max-w-2xl mx-auto group"
>
<div className="absolute -inset-1 bg-gradient-to-r from-[#007AFF] to-[#5856D6] rounded-[22px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
<div className="relative bg-[#121212] border border-white/10 rounded-2xl p-2 flex items-center">
<div className="pl-4 text-gray-500">
<Search size={20} />
</div>
<input
type="text"
placeholder="What machine needs repair? (e.g. CNC, Hydraulic Press)"
className="w-full bg-transparent border-none focus:ring-0 text-white px-4 py-3 placeholder:text-gray-600"
/>
<button className="bg-[#007AFF] hover:bg-[#005bbd] text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
Match <ArrowRight size={18} />
</button>
</div>
</motion.div>
</div>
</section>

{/* Trust Grid - Minimalist Cards */}
<section className="py-24 px-6 border-t border-white/5">
<div className="max-w-7xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

{/* Card 1 */}
<div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-[#007AFF]/30 transition-all">
<div className="w-12 h-12 bg-[#007AFF]/10 rounded-xl flex items-center justify-center text-[#007AFF] mb-6">
<Video size={24} />
</div>
<h3 className="text-xl font-bold mb-3">Live Video Triage</h3>
<p className="text-gray-400 leading-relaxed">
Zero-latency WebRTC connection. Draw on screen and guide maintenance teams in real-time from anywhere.
</p>
</div>

{/* Card 2 */}
<div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-[#007AFF]/30 transition-all">
<div className="w-12 h-12 bg-[#FF9500]/10 rounded-xl flex items-center justify-center text-[#FF9500] mb-6">
<Cpu size={24} />
</div>
<h3 className="text-xl font-bold mb-3">Verified Engineers</h3>
<p className="text-gray-400 leading-relaxed">
Every expert undergoes multi-step skill verification. Certified PLC, Hydraulic, and Automation pros only.
</p>
</div>

{/* Card 3 */}
<div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-[#007AFF]/30 transition-all">
<div className="w-12 h-12 bg-[#34C759]/10 rounded-xl flex items-center justify-center text-[#34C759] mb-6">
<Globe size={24} />
</div>
<h3 className="text-xl font-bold mb-3">Global Scalability</h3>
<p className="text-gray-400 leading-relaxed">
Built on Next.js 15 for lightning-fast performance across continents. Ready for the future of industry 4.0.
</p>
</div>

</div>
</div>
</section>

{/* Footer - Professional */}
<footer className="py-12 px-6 border-t border-white/5 text-center">
<p className="text-gray-600 text-sm tracking-widest uppercase">
Valcrons System © 2026 — The Industrial Intelligence Network
</p>
</footer>

</div>
);
}
