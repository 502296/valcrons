"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, UserCircle2,
ArrowRight, Menu, LayoutDashboard,
Settings, Building2, Plus, X, Search,
Cpu, Activity, Globe, PenTool
} from 'lucide-react';

export default function ValcronsProfessional() {
const [view, setView] = useState<'landing' | 'platform'>('landing');
const [activeTab, setActiveTab] = useState('factories');
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);

// --- مكونات واجهة الهبوط الاحترافية ---
const Header = () => (
<nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
<div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
<div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
<Zap size={22} fill="white" />
</div>
<span className="text-xl font-bold tracking-tighter uppercase italic">Valcrons</span>
</div>
<div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
<a href="#" className="hover:text-white transition-colors">Platform</a>
<a href="#" className="hover:text-white transition-colors">Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>
<div className="flex items-center gap-4">
<button className="text-[12px] text-gray-400 hover:text-white font-medium">Log in</button>
<button onClick={() => setView('platform')} className="bg-white text-black px-5 py-2 rounded-full text-[12px] font-bold hover:scale-105 transition-all">Get Started</button>
</div>
</div>
</nav>
);

// --- واجهة المنصة المتطورة (Platform View) ---
const PlatformView = () => (
<div className="flex h-screen bg-[#050505] text-white overflow-hidden font-sans">
{/* Sidebar - Apple Style */}
<aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} border-r border-white/5 bg-[#080808] flex flex-col transition-all duration-500 ease-in-out`}>
<div className="p-8 h-24 flex items-center justify-between">
{isSidebarOpen && <span className="font-black text-[14px] uppercase tracking-[0.4em] text-blue-500">Valcrons Hub</span>}
<button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 transition-colors"><Menu size={18}/></button>
</div>

<div className="flex-1 px-4 space-y-2 mt-4">
{[
{ id: 'factories', label: 'Factory Portal', icon: <LayoutDashboard size={20}/> },
{ id: 'experts', label: 'Expert Network', icon: <UserCircle2 size={20}/> },
{ id: 'triage', label: 'Live AR Triage', icon: <Activity size={20}/> },
{ id: 'settings', label: 'System Settings', icon: <Settings size={20}/> },
].map((item) => (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={`w-full flex items-center gap-4 p-4 rounded-2xl text-[13px] font-bold transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20 scale-[1.02]' : 'text-gray-500 hover:bg-white/5 hover:translate-x-1'}`}
>
{item.icon}
{isSidebarOpen && item.label}
</button>
))}
</div>

<div className="p-8 border-t border-white/5">
<button onClick={() => setView('landing')} className="text-[11px] text-gray-500 hover:text-white transition-all flex items-center gap-3 uppercase tracking-widest font-bold">
<ArrowRight size={14} className="rotate-180" /> Exit System
</button>
</div>
</aside>

{/* Main Panel */}
<main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/5 via-transparent to-transparent">
<header className="h-24 border-b border-white/5 flex items-center justify-between px-12 bg-[#050505]/40 backdrop-blur-2xl sticky top-0 z-50">
<div className="flex flex-col">
<h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-1">{activeTab}</h2>
<p className="text-lg font-bold">Industrial Intelligence Terminal</p>
</div>

<div className="flex items-center gap-6">
{activeTab === 'factories' && (
<button
onClick={() => setIsModalOpen(true)}
className="bg-white text-black text-[12px] font-black px-6 py-3 rounded-2xl transition-all hover:scale-105 flex items-center gap-2 shadow-xl"
>
<Plus size={16} strokeWidth={3} /> POST REQUEST
</button>
)}
<div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10 px-4">
<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
<span className="text-[10px] font-bold uppercase tracking-widest">Live Node: Kentucky</span>
</div>
</div>
</header>

<div className="p-12 max-w-6xl mx-auto">
{activeTab === 'triage' ? (
/* نسخة الـ AR Triage التي أحببتها */
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
<div className="lg:col-span-2 relative group">
<div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
<div className="relative bg-black rounded-[2.5rem] overflow-hidden border border-white/10 aspect-video">
<img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60" alt="Industrial" />
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
<div className="absolute top-6 left-6 flex items-center gap-3">
<div className="px-3 py-1 bg-red-600 rounded-full text-[10px] font-bold animate-pulse">LIVE AR TRIAGE</div>
<div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold border border-white/10 uppercase tracking-widest">ROOM_OH_CA_99</div>
</div>
<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
<button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><PenTool size={20}/></button>
<button className="px-8 bg-green-600 rounded-full font-bold text-sm hover:bg-green-500 shadow-xl shadow-green-600/20">START DIAGNOSIS</button>
<button className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><Video size={20}/></button>
</div>
</div>
</div>
<div className="space-y-6">
<h3 className="text-sm font-black uppercase tracking-widest text-gray-500">Verified Experts</h3>
{[1, 2, 3].map((i) => (
<div key={i} className="bg-[#080808] border border-white/5 p-5 rounded-[1.8rem] flex items-center justify-between hover:border-blue-500/50 transition-all cursor-pointer group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center font-bold">MS</div>
<div>
<p className="text-sm font-bold">Eng. Michael Scott</p>
<p className="text-[10px] text-gray-500 uppercase tracking-tighter">Response: ~3 Seconds</p>
</div>
</div>
<ArrowRight size={16} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
</div>
))}
</div>
</div>
) : (
/* واجهة الطلبات بلمسة احترافية */
<div className="grid gap-8">
<div className="flex items-center justify-between">
<h3 className="text-2xl font-bold tracking-tight italic">Marketplace Feed</h3>
<div className="relative w-72">
<Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
<input type="text" placeholder="Search requests..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-xs focus:outline-none focus:border-blue-500 transition-all" />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{[1, 2, 3, 4].map((i) => (
<motion.div
key={i}
whileHover={{ y: -5 }}
className="bg-[#080808] border border-white/5 p-8 rounded-[2.5rem] hover:border-blue-500/20 transition-all group relative overflow-hidden"
>
<div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[50px] -z-10 group-hover:bg-blue-600/10 transition-all" />
<div className="flex justify-between items-start mb-6">
<div className="w-14 h-14 bg-white/5 rounded-[1.2rem] flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500"><Building2 size={28} /></div>
<span className="text-[9px] font-black bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">Active Request</span>
</div>
<h4 className="text-lg font-bold mb-2">CNC Machine Failure</h4>
<p className="text-sm text-gray-500 leading-relaxed mb-6">High-precision axis calibration required for aerospace manufacturing unit. Urgent triage needed.</p>
<div className="flex items-center justify-between pt-6 border-t border-white/5">
<div className="text-[11px] font-bold text-gray-400">Budget: <span className="text-white">$2,500</span></div>
<button className="bg-white text-black px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg">Apply Now</button>
</div>
</motion.div>
))}
</div>
</div>
)}
</div>

{/* Modal - The Professional Way */}
<AnimatePresence>
{isModalOpen && (
<div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
<motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-xl rounded-[3rem] p-10 shadow-[0_0_100px_rgba(37,99,235,0.1)] overflow-hidden">
<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
<div className="flex justify-between items-center mb-10">
<div>
<h2 className="text-2xl font-bold tracking-tighter italic">Create Request</h2>
<p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">Global Expert Broadcast</p>
</div>
<button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-500 hover:text-white transition-colors"><X size={20}/></button>
</div>
<div className="space-y-6">
<div className="space-y-2">
<label className="text-[10px] text-blue-500 uppercase font-black tracking-[0.2em] ml-2">Problem Statement</label>
<textarea placeholder="Describe the mechanical failure in detail..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-sm focus:outline-none focus:border-blue-600 transition-all min-h-[120px]" />
</div>
<div className="grid grid-cols-2 gap-6">
<div className="space-y-2">
<label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] ml-2">Machine Unit</label>
<input type="text" placeholder="e.g. KUKA Robot" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600" />
</div>
<div className="space-y-2">
<label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] ml-2">Priority</label>
<select className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-600 appearance-none text-gray-400 font-bold uppercase tracking-widest">
<option>Standard</option><option>High Priority</option><option>Emergency</option>
</select>
</div>
</div>
<button onClick={() => setIsModalOpen(false)} className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.3em] mt-6 hover:bg-blue-500 shadow-2xl shadow-blue-600/40 transition-all">
Initiate Global Broadcast
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
<div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
<AnimatePresence mode="wait">
{view === 'landing' ? (
<motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative">
<Header />
<div className="pt-52 pb-40 px-6 max-w-[1400px] mx-auto text-center relative">
<div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[150px] -z-10" />
<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
<span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8 inline-block">Silicon Valley Standard</span>
<h1 className="text-7xl md:text-[120px] font-black tracking-tighter leading-[0.9] mb-8 italic">VALCRONS<span className="text-blue-600">.</span></h1>
<p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">The global engine for mechanical diagnostics. Connect with experts in <span className="text-white border-b-2 border-blue-600">3 seconds</span>.</p>
<div className="flex flex-col md:flex-row items-center justify-center gap-6">
<button onClick={() => setView('platform')} className="bg-blue-600 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-500 shadow-[0_20px_50px_rgba(37,99,235,0.3)] transition-all hover:scale-105">Launch Dashboard</button>
<button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-white/10 transition-all backdrop-blur-md">Contact Engineering</button>
</div>
</motion.div>
</div>
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
