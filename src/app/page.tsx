"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, UserCircle2,
ArrowRight, Globe, Mail, Menu, LayoutDashboard,
Settings, HelpCircle, Lock, Shield, FileText,
Building2, Plus, X
} from 'lucide-react';

export default function ValcronsFinal() {
const [view, setView] = useState<'landing' | 'platform'>('landing');
const [activeTab, setActiveTab] = useState('factories');
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);

// --- مكونات واجهة الهبوط (Landing Page Components) ---
const Header = () => (
<nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
<div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
<div className="flex items-center gap-8">
<div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Zap size={18} fill="white" /></div>
<span className="text-lg font-bold tracking-tighter uppercase italic">Valcrons</span>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-[12px] text-gray-400 hover:text-white font-medium">Log in</button>
<button onClick={() => setView('platform')} className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-bold hover:bg-gray-200 transition-all">Get Started</button>
</div>
</div>
</nav>
);

const Footer = () => (
<footer className="border-t border-white/5 bg-[#050505] py-16 px-6">
<div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[12px]">
<div className="col-span-1">
<div className="flex items-center gap-2 mb-4">
<Zap size={16} className="text-blue-600" />
<span className="font-bold uppercase tracking-tighter">Valcrons</span>
</div>
<p className="text-gray-500 leading-relaxed">The global intelligence network connecting industry leaders.</p>
</div>
<div>
<h4 className="font-bold text-white mb-4 italic underline decoration-blue-600 underline-offset-4 text-[11px]">Contact</h4>
<p className="text-blue-400 font-mono">contact@valcrons.com</p>
</div>
<div className="col-span-2 text-right">
<p className="text-[10px] text-gray-600 uppercase tracking-widest leading-loose">
Valcrons is a B2B connection engine. We do not facilitate direct payments or mechanical liability.
</p>
</div>
</div>
</footer>
);

// --- واجهة المنصة (The Platform View) ---
const PlatformView = () => (
<div className="flex h-screen bg-[#050505] text-white overflow-hidden">
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

{/* Main Content */}
<main className="flex-1 overflow-y-auto">
<header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
<h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500">{activeTab}</h2>
<div className="flex items-center gap-4">
{activeTab === 'factories' && (
<button
onClick={() => setIsModalOpen(true)}
className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2"
>
<Plus size={14} /> Post New Request
</button>
)}
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10" />
</div>
</header>

<div className="p-10 max-w-5xl mx-auto">
<div className="grid gap-6">
<h3 className="text-xl font-bold mb-4">{activeTab === 'factories' ? "Marketplace Requests" : "Your Assigned Tasks"}</h3>

{[1, 2, 3].map((i) => (
<motion.div
key={i}
initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
className="group bg-[#080808] border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all flex items-center justify-between"
>
<div className="flex items-center gap-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500"><Building2 size={24} /></div>
<div>
<h4 className="font-bold text-sm">CNC Machine Failure - Axis Calibration</h4>
<p className="text-[12px] text-gray-500 mt-1">Location: Ohio, US • Budget: $200 - $500</p>
<div className="flex gap-2 mt-3">
<span className="text-[9px] bg-white/5 px-2 py-1 rounded text-gray-400">Siemens PLC</span>
<span className="text-[9px] bg-white/5 px-2 py-1 rounded text-gray-400 font-bold text-red-400">Critical</span>
</div>
</div>
</div>
<button className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-2 rounded-xl text-[11px] font-bold transition-all transform translate-x-4 group-hover:translate-x-0 shadow-xl">
Apply Now
</button>
</motion.div>
))}
</div>
</div>

{/* Modal for Post Request */}
<AnimatePresence>
{isModalOpen && (
<div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl">
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-bold italic">Post Mechanical Request</h2>
<button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
</div>
<div className="space-y-4">
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest">Failure Description</label>
<input type="text" placeholder="e.g. Hydraulic leak in main press" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-all" />
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest">Machine Type</label>
<input type="text" placeholder="PLC / CNC" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500" />
</div>
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest">Urgency</label>
<select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 appearance-none text-gray-400">
<option>Low</option><option>Medium</option><option>Critical</option>
</select>
</div>
</div>
<button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm mt-4 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all">
Broadcast to Network
</button>
</div>
</motion.div>
</div>
)}
</AnimatePresence>
</main>
</div>
);

return (
<div className="min-h-screen bg-[#050505] text-white">
<AnimatePresence mode="wait">
{view === 'landing' ? (
<motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
<Header />
<div className="pt-40 pb-20 px-6 max-w-4xl mx-auto text-center">
<h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">Valcrons Grid.</h1>
<p className="text-gray-500 text-lg mb-12 max-w-xl mx-auto font-medium">The world's first encrypted neural network for industrial diagnostics.</p>
<button onClick={() => setView('platform')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-[13px] hover:bg-blue-500 shadow-2xl shadow-blue-600/20">Launch Platform</button>
</div>
<Footer />
</motion.div>
) : (
<motion.div key="platform" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
<PlatformView />
</motion.div>
)}
</AnimatePresence>
</div>
);
}
