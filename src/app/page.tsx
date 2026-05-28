"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, UserCircle2,
ArrowRight, Globe, Mail, Menu, LayoutDashboard,
Settings, HelpCircle, Lock, Shield, FileText
} from 'lucide-react';

export default function ValcronsFinal() {
const [view, setView] = useState<'landing' | 'platform' | 'legal'>('landing');
const [activeTab, setActiveTab] = useState('factories');
const [isSidebarOpen, setSidebarOpen] = useState(true);

// المكون العلوي: الهيدر
const Header = () => (
<nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
<div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
<Zap size={18} fill="white" />
</div>
<span className="text-lg font-bold tracking-tighter uppercase italic">Valcrons</span>
</div>
<div className="hidden md:flex items-center gap-6 text-[12px] text-gray-400 font-medium">
<button onClick={() => setView('platform')} className="hover:text-white transition-colors">Platform</button>
<button className="hover:text-white transition-colors">Experts</button>
<button onClick={() => setView('legal')} className="hover:text-white transition-colors">Safety & Legal</button>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-[12px] text-gray-400 hover:text-white font-medium">Log in</button>
<button className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-gray-200 transition-all">
Get Started
</button>
</div>
</div>
</nav>
);

// المكون السفلي: الفوتر مع الإيميل والسياسات
const Footer = () => (
<footer className="border-t border-white/5 bg-[#050505] py-16 px-6">
<div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[12px]">
<div className="col-span-1">
<div className="flex items-center gap-2 mb-4">
<Zap size={16} className="text-blue-600" />
<span className="font-bold uppercase tracking-tighter">Valcrons</span>
</div>
<p className="text-gray-500 leading-relaxed">
The global intelligence network connecting industry leaders with technical mastery.
</p>
</div>
<div>
<h4 className="font-bold text-white mb-4 italic underline decoration-blue-600 underline-offset-4">Legal Framework</h4>
<ul className="space-y-3 text-gray-500">
<li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"><Shield size={14}/> Privacy Policy</li>
<li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"><FileText size={14}/> Terms of Service</li>
<li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"><Lock size={14}/> Service Level Agreement</li>
</ul>
</div>
<div>
<h4 className="font-bold text-white mb-4 italic underline decoration-blue-600 underline-offset-4">Contact Engineering</h4>
<ul className="space-y-3 text-gray-500">
<li className="flex items-center gap-2 text-blue-400 font-mono">
<Mail size={14} /> contact@valcrons.com
</li>
<li className="hover:text-white cursor-pointer transition-colors">Global Support Center</li>
</ul>
</div>
<div>
<h4 className="font-bold text-white mb-4 italic underline decoration-blue-600 underline-offset-4">Platform Status</h4>
<p className="text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
Valcrons is a B2B connection engine. We do not facilitate direct payments or mechanical liability.
</p>
</div>
</div>
<div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-gray-700 tracking-[0.3em] uppercase">
© 2026 Valcrons System — All Rights Reserved.
</div>
</footer>
);

return (
<div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
<AnimatePresence mode="wait">
{view === 'landing' && (
<motion.div
key="landing"
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
className="pt-32 pb-20 px-6"
>
<Header />
<div className="max-w-4xl mx-auto text-center relative">
<div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
<motion.span
initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
className="inline-block px-3 py-1 rounded-full border border-white/5 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-10"
>
Silicon Valley Standard • Industrial Diagnostics
</motion.span>

<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05]">
Industrial Expertise, <br />
<span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">Instantly Connected.</span>
</h1>

<p className="text-base text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
The global engine for high-precision mechanical triage. Connect with verified industrial experts in 3 seconds.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center mb-32">
<button
onClick={() => setView('platform')}
className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-[13px] hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20"
>
Launch Dashboard <ArrowRight size={16} />
</button>
<button className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-2xl font-bold text-[13px] hover:bg-white/10 transition-all">
Contact Engineering
</button>
</div>

{/* Feature Section */}
<div className="grid md:grid-cols-3 gap-12 text-left border-t border-white/5 pt-20">
<div className="space-y-4">
<div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500"><Video size={18}/></div>
<h3 className="font-bold text-sm tracking-tight">Encrypted Triage</h3>
<p className="text-[12px] text-gray-500 leading-relaxed">Secure, zero-latency WebRTC infrastructure for real-time visual guidance.</p>
</div>
<div className="space-y-4">
<div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500"><ShieldCheck size={18}/></div>
<h3 className="font-bold text-sm tracking-tight">Verified Engineers</h3>
<p className="text-[12px] text-gray-500 leading-relaxed">Rigorous multi-step certification for PLC, Hydraulic, and Robotic experts.</p>
</div>
<div className="space-y-4">
<div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500"><Globe size={18}/></div>
<h3 className="font-bold text-sm tracking-tight">Global Grid</h3>
<p className="text-[12px] text-gray-500 leading-relaxed">Distributed network ensuring connectivity across continents for Industry 4.0.</p>
</div>
</div>
</div>
<div className="mt-40"><Footer /></div>
</motion.div>
)}

{view === 'platform' && (
<motion.div
key="platform"
initial={{ opacity: 0 }} animate={{ opacity: 1 }}
className="flex h-screen bg-[#050505]"
>
{/* Sidebar */}
<aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r border-white/5 bg-[#080808] flex flex-col transition-all duration-300`}>
<div className="p-6 h-20 flex items-center justify-between">
{isSidebarOpen && <span className="font-bold text-[11px] uppercase tracking-widest text-blue-500">Valcrons Hub</span>}
<button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-gray-500"><Menu size={16}/></button>
</div>
<div className="flex-1 px-4 space-y-2 mt-4">
{[
{ id: 'factories', label: 'Factories', icon: <LayoutDashboard size={18}/> },
{ id: 'experts', label: 'Expert Network', icon: <UserCircle2 size={18}/> },
{ id: 'settings', label: 'Settings', icon: <Settings size={18}/> },
{ id: 'help', label: 'Support', icon: <HelpCircle size={18}/> },
].map((item) => (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={`w-full flex items-center gap-3 p-3 rounded-xl text-[12px] font-semibold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/10' : 'text-gray-500 hover:bg-white/5'}`}
>
{item.icon}
{isSidebarOpen && item.label}
</button>
))}
</div>
<div className="p-6">
<button onClick={() => setView('landing')} className="text-[10px] text-gray-600 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
<ArrowRight size={12} className="rotate-180" /> Exit Platform
</button>
</div>
</aside>

{/* Platform Content */}
<main className="flex-1 overflow-y-auto">
<header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
<h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">{activeTab}</h2>
<div className="flex items-center gap-4">
<div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-bold border border-emerald-500/20 flex items-center gap-2 tracking-widest">
<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE SERVER: US-EAST-01
</div>
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
</div>
</header>
<div className="p-12 max-w-6xl">
<div className="grid lg:grid-cols-2 gap-12 items-start">
<div className="aspect-video bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 flex items-center justify-center text-gray-700 font-mono text-[10px] shadow-inner">
[ Waiting for expert connection... ]
</div>
<div className="space-y-8">
<h1 className="text-3xl font-bold tracking-tight">Active Diagnostics</h1>
<p className="text-sm text-gray-500 leading-relaxed italic">"Initialize your session by selecting a verified expert from the global network."</p>
<div className="p-8 bg-blue-600/[0.03] border border-blue-500/10 rounded-[2rem]">
<h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Safety Protocol</h4>
<p className="text-[12px] text-gray-500 leading-relaxed mb-6">
By initializing, you confirm that physical power-lockout (LOTO) is in place. Valcrons is a diagnostic tool, not an operator.
</p>
<button className="w-full bg-white text-black py-3 rounded-xl text-[12px] font-bold hover:bg-gray-200 transition-all">
Accept & Initialize
</button>
</div>
</div>
</div>
</div>
</main>
</motion.div>
)}
</AnimatePresence>
</div>
);
}
