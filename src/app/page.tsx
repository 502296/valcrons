"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, PenTool, Mic, CameraOff,
PhoneOff, Search, Building2, UserCircle2, Briefcase,
MapPin, Clock, ArrowRight, Play, Globe, Shield
} from 'lucide-react';

export default function ValcronsProject() {
// الحالة التي تحدد هل نحن في الصفحة الرئيسية أم داخل المنصة
const [view, setView] = useState<'landing' | 'platform'>('landing');
const [activeTab, setActiveTab] = useState('factory');
const [isCalling, setIsCalling] = useState(false);

// 1. واجهة الصفحة الرئيسية (The Big Marketing Page)
const LandingPage = () => (
<div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 text-center">
<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
className="max-w-4xl"
>
<div className="flex justify-center mb-8">
<div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
<Zap size={32} fill="white" />
</div>
</div>
<h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
Industrial Expertise. <br /> Instantly Connected.
</h1>
<p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
The global engine for mechanical diagnostics. Connect with verified industrial experts in 3 seconds via encrypted video triage.
</p>

<div className="flex flex-col md:flex-row gap-4 justify-center">
<button
onClick={() => setView('platform')}
className="group relative bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all flex items-center gap-3 overflow-hidden"
>
<Play size={20} fill="white" />
Launch Dashboard
<div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
</button>

<button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
Contact Sales
</button>
</div>

{/* Feature Preview Cells */}
<div className="grid md:grid-cols-3 gap-6 mt-24 text-left">
<div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
<Video className="text-blue-500 mb-4" />
<h3 className="font-bold mb-2">Live AR Triage</h3>
<p className="text-sm text-gray-500">Draw on screen and guide teams in real-time from anywhere.</p>
</div>
<div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
<Shield className="text-emerald-500 mb-4" />
<h3 className="font-bold mb-2">Verified Engineers</h3>
<p className="text-sm text-gray-500">Every expert undergoes multi-step industrial skill verification.</p>
</div>
<div className="p-8 bg-white/[0.02] border border-white/5 rounded-[2rem]">
<Globe className="text-orange-500 mb-4" />
<h3 className="font-bold mb-2">Global Grid</h3>
<p className="text-sm text-gray-500">Built on Next.js 15 for lightning-fast performance across continents.</p>
</div>
</div>
</motion.div>
</div>
);

// 2. واجهة المنصة (The Dashboard - التي رأيتها في صورك)
const PlatformView = () => (
<div className="min-h-screen bg-[#050505] text-white">
{/* Navigation */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
<Zap size={22} className="text-blue-600" />
<span className="text-xl font-bold tracking-tighter uppercase">Valcrons</span>
</div>
<div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 flex gap-4">
<button onClick={() => setActiveTab('factory')} className={`text-xs font-bold ${activeTab === 'factory' ? 'text-blue-400' : 'text-gray-500'}`}>Factory Portal</button>
<button onClick={() => setActiveTab('expert')} className={`text-xs font-bold ${activeTab === 'expert' ? 'text-blue-400' : 'text-gray-500'}`}>Expert Network</button>
</div>
<button onClick={() => setView('landing')} className="text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-4">Exit to Home</button>
</div>
</nav>

<main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
<div className="grid lg:grid-cols-12 gap-10">
{/* Video Card */}
<div className="lg:col-span-5">
<div className="bg-[#0f0f0f] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl sticky top-32">
<div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
<span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Live Video Diagnostics</span>
<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
</div>
<div className="aspect-square bg-black relative">
<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-50" />
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
<button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Mic size={18}/></button>
<button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"><PenTool size={18}/></button>
<button onClick={() => setIsCalling(!isCalling)} className={`px-6 py-2 rounded-xl font-bold text-xs ${isCalling ? 'bg-red-600' : 'bg-green-600'}`}>
{isCalling ? 'END' : 'START'}
</button>
</div>
</div>
</div>
</div>
{/* List Section */}
<div className="lg:col-span-7">
<h2 className="text-3xl font-bold mb-8">Active {activeTab === 'factory' ? 'Experts' : 'Jobs'}</h2>
<div className="space-y-4">
{[1,2,3,4].map(i => (
<div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between hover:border-blue-500/30 transition-all">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><UserCircle2 size={24} className="text-blue-500" /></div>
<div>
<p className="font-bold">Eng. Specialist #{i}09</p>
<p className="text-xs text-gray-500">Verified • Response: ~3s</p>
</div>
</div>
<ArrowRight className="text-gray-700" />
</div>
))}
</div>
</div>
</div>
</main>
</div>
);

return (
<AnimatePresence mode="wait">
{view === 'landing' ? (
<motion.div key="landing" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
<LandingPage />
</motion.div>
) : (
<motion.div key="platform" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
<PlatformView />
</motion.div>
)}
</AnimatePresence>
);
}
