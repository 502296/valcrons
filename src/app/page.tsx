"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, PenTool, Mic, CameraOff,
PhoneOff, Search, Building2, UserCircle2, Briefcase,
MapPin, Clock, ArrowRight
} from 'lucide-react';

export default function ValcronsPlatform() {
const [activeTab, setActiveTab] = useState('factory'); // 'factory' or 'expert'
const [isCalling, setIsCalling] = useState(false);

return (
<div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">

{/* Navigation - Apple Style */}
<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2 group cursor-pointer">
<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-blue-600/20">
<Zap size={22} fill="white" />
</div>
<span className="text-2xl font-bold tracking-tighter uppercase italic">Valcrons</span>
</div>

<div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/10">
<button
onClick={() => setActiveTab('factory')}
className={`text-sm font-medium transition-colors ${activeTab === 'factory' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
>
Factory Portal
</button>
<div className="w-[1px] h-4 bg-white/10" />
<button
onClick={() => setActiveTab('expert')}
className={`text-sm font-medium transition-colors ${activeTab === 'expert' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
>
Expert Network
</button>
</div>

<button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-xl">
Log In
</button>
</div>
</nav>

<main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

{/* Header Section */}
<div className="text-center mb-16">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
>
{activeTab === 'factory' ? "Stop Downtime." : "Monetize Expertise."}
<br />
<span className="text-gray-500">In 3 Seconds.</span>
</motion.h1>
</div>

<div className="grid lg:grid-cols-12 gap-8">

{/* Left Side: The "Smart" Video Card (The Golden Feature) */}
<div className="lg:col-span-5">
<div className="sticky top-32">
<div className="bg-[#0f0f0f] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
{/* Video Header */}
<div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
<div className="flex items-center gap-3">
<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
<span className="text-xs font-bold tracking-widest uppercase text-gray-400">Live AR Triage</span>
</div>
<span className="text-[10px] text-blue-500 font-mono bg-blue-500/10 px-2 py-1 rounded">ROOM_OH_CA_99</span>
</div>

{/* Video Content - The Small Card Design */}
<div className="aspect-[4/3] bg-black relative group">
<img
src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
className="w-full h-full object-cover opacity-60"
alt="Industrial Diagnostics"
/>

{/* Digital Stylus Overlay Simulation */}
<svg className="absolute inset-0 w-full h-full pointer-events-none">
<motion.circle
initial={{ pathLength: 0 }}
animate={{ pathLength: 1 }}
cx="60%" cy="40%" r="30" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="5 5"
/>
<text x="52%" y="30%" fill="#3b82f6" className="text-[10px] font-bold">CHECK VALVE 02</text>
</svg>

{/* Controls Card */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-xl p-3 rounded-2xl border border-white/10">
<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10"><Mic size={18}/></button>
<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10"><CameraOff size={18}/></button>
<button className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600 text-white"><PenTool size={18}/></button>
<button
onClick={() => setIsCalling(!isCalling)}
className={`h-10 px-6 rounded-xl font-bold text-xs transition-all ${isCalling ? 'bg-red-600' : 'bg-green-600'}`}
>
{isCalling ? 'END' : 'START'}
</button>
</div>
</div>

<div className="p-6 bg-white/[0.01]">
<p className="text-xs text-gray-500 text-center italic">"The AR Digital Pen allows experts to draw instructions in real-time."</p>
</div>
</div>
</div>
</div>

{/* Right Side: The Job Board / Experts List */}
<div className="lg:col-span-7">
<div className="flex items-center justify-between mb-8">
<h2 className="text-2xl font-bold">{activeTab === 'factory' ? "Available Verified Experts" : "Open Factory Requests"}</h2>
<div className="flex gap-2">
<div className="bg-white/5 p-2 rounded-lg"><Search size={18} className="text-gray-400"/></div>
</div>
</div>

<div className="space-y-4">
{/* Sample Data Items */}
{[1, 2, 3, 4].map((item) => (
<motion.div
key={item}
whileHover={{ x: 10 }}
className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex items-center justify-between hover:bg-white/[0.04] transition-all cursor-pointer group"
>
<div className="flex items-center gap-5">
<div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-white/10">
{activeTab === 'factory' ? <UserCircle2 className="text-blue-500"/> : <Building2 className="text-emerald-500"/>}
</div>
<div>
<h4 className="font-bold text-lg">
{activeTab === 'factory' ? "Eng. Michael Scott" : "CNC Production Failure #882"}
</h4>
<div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
<span className="flex items-center gap-1"><MapPin size={14}/> {activeTab === 'factory' ? "California, US" : "Ohio, US"}</span>
<span className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-500"/> Verified Expert</span>
</div>
</div>
</div>

<div className="text-right flex items-center gap-4">
<div className="hidden md:block">
<span className="text-xs text-gray-600 block uppercase tracking-widest mb-1">Response Time</span>
<span className="text-sm font-bold text-white">~3 Seconds</span>
</div>
<div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
<ArrowRight size={18} />
</div>
</div>
</motion.div>
))}
</div>

<button className="w-full mt-8 py-4 border border-dashed border-white/10 rounded-3xl text-gray-500 hover:text-white hover:border-white/20 transition-all text-sm font-medium">
View All Global {activeTab === 'factory' ? "Experts" : "Requests"}
</button>
</div>

</div>
</main>

{/* Footer Footer */}
<footer className="border-t border-white/5 py-12 mt-20">
<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
<span className="text-[10px] tracking-[0.4em] text-gray-600 uppercase">Valcrons Industrial Grid © 2026</span>
<div className="flex gap-8 text-[10px] tracking-[0.2em] text-gray-500 uppercase font-bold">
<a href="#" className="hover:text-white transition-colors">Privacy</a>
<a href="#" className="hover:text-white transition-colors">Terms of Service</a>
<a href="#" className="hover:text-white transition-colors">Support</a>
</div>
</div>
</footer>
</div>
);
}
