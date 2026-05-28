"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
Zap, Video, ShieldCheck, PenTool, Mic, UserCircle2,
ArrowRight, Play, Globe, Shield, Lock, Info,
Menu, X, LayoutDashboard, Settings, HelpCircle, Mail, Plus, Briefcase
} from 'lucide-react';

export default function ValcronsPro() {
const [view, setView] = useState<'landing' | 'platform'>('landing');
const [activeTab, setActiveTab] = useState('factories');
const [isSidebarOpen, setSidebarOpen] = useState(true);
const [isPostModalOpen, setIsPostModalOpen] = useState(false); // لإضافة طلب شركة

// 1. المكون الفرعي: الهيدر الاحترافي (Header)
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

{/* روابط سريعة */}
<div className="hidden md:flex items-center gap-6 text-[13px] text-gray-400 font-medium">
<a href="#" className="hover:text-white transition-colors">Platform</a>
<a href="#" className="hover:text-white transition-colors">Experts</a>
<a href="#" className="hover:text-white transition-colors">Safety</a>
</div>
</div>

<div className="flex items-center gap-4">
<button className="text-[13px] text-gray-400 hover:text-white font-medium">Log in</button>
<button className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-gray-200 transition-all">
Get Started
</button>
</div>
</div>
</nav>
);

// 2. المكون الفرعي: الفوتر القانوني (Footer)
const Footer = () => (
<footer className="border-t border-white/5 bg-[#050505] py-12 px-6">
<div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-[13px]">
<div className="col-span-1">
<div className="flex items-center gap-2 mb-4">
<Zap size={16} className="text-blue-600" />
<span className="font-bold uppercase tracking-tighter">Valcrons</span>
</div>
<p className="text-gray-500 leading-relaxed">
The global intelligence network connecting manufacturing with top-tier technical expertise.
</p>
</div>
<div>
<h4 className="font-bold text-white mb-4">Legal</h4>
<ul className="space-y-2 text-gray-500">
<li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
<li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
<li className="hover:text-blue-400 cursor-pointer">Compliance</li>
</ul>
</div>
<div>
<h4 className="font-bold text-white mb-4">Support</h4>
<ul className="space-y-2 text-gray-500 flex flex-col">
<li className="flex items-center gap-2">
<Mail size={14} />
<span className="text-blue-400">support@valcrons.com</span>
</li>
<li className="hover:text-blue-400 cursor-pointer">Help Center</li>
</ul>
</div>
<div>
<h4 className="font-bold text-white mb-4">Statement</h4>
<p className="text-[11px] text-gray-600 uppercase tracking-widest leading-tight">
Valcrons is a connection platform. We do not process payments or operate machinery directly.
</p>
</div>
</div>
</footer>
);

// 3. واجهة الهبوط (Landing Page) بتصاميم Silicon Valley
const LandingPage = () => (
<div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 overflow-hidden">
<Header />
<div className="max-w-5xl mx-auto text-center relative">
{/* Glow effect */}
<div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

<motion.span
initial={{ opacity: 0 }} animate={{ opacity: 1 }}
className="inline-block px-4 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
>
Silicon Valley Standard Diagnostics
</motion.span>

<h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
Industrial Expertise, <br />
<span className="text-gray-500">Instantly Connected.</span>
</h1>

<p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
The global engine for mechanical diagnostics. Connect with verified experts in 3 seconds via encrypted video triage.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center mb-32">
<button
onClick={() => setView('platform')}
className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20"
>
Launch Dashboard <ArrowRight size={18} />
</button>
<button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
Contact Engineering
</button>
</div>

{/* Feature Grid */}
<div className="grid md:grid-cols-3 gap-8 text-left border-t border-white/5 pt-20">
<div className="space-y-4">
<div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Video size={20}/></div>
<h3 className="font-bold">Live AR Triage</h3>
<p className="text-sm text-gray-500 leading-relaxed">Draw on screen and guide maintenance teams in real-time with zero latency.</p>
</div>
<div className="space-y-4">
<div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><ShieldCheck size={20}/></div>
<h3 className="font-bold">Verified Pros</h3>
<p className="text-sm text-gray-500 leading-relaxed">Every expert undergoes multi-step skill verification. Certified PLC & Automation pros only.</p>
</div>
<div className="space-y-4">
<div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500"><Globe size={20}/></div>
<h3 className="font-bold">Global Scalability</h3>
<p className="text-sm text-gray-500 leading-relaxed">Built on Next.js 15 for lightning-fast performance across continents.</p>
</div>
</div>
</div>
<div className="mt-40"><Footer /></div>
</div>
);

// 4. واجهة المنصة مع الشريط الجانبي (Platform with Sidebar)
const PlatformView = () => (
<div className="flex h-screen bg-[#050505] text-white overflow-hidden">
{/* Sidebar */}
<motion.aside
initial={{ x: -200 }} animate={{ x: 0 }}
className={`${isSidebarOpen ? 'w-64' : 'w-20'} border-r border-white/5 bg-[#080808] flex flex-col transition-all duration-300 z-50`}
>
<div className="p-6 h-20 flex items-center justify-between">
{isSidebarOpen && <span className="font-bold text-sm uppercase tracking-tighter text-blue-500">Valcrons Hub</span>}
<button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-gray-500"><Menu size={18}/></button>
</div>

<div className="flex-1 px-4 space-y-2">
{[
{ id: 'factories', label: 'Factories (Jobs)', icon: <LayoutDashboard size={18}/> },
{ id: 'experts', label: 'Expert Network', icon: <UserCircle2 size={18}/> },
{ id: 'settings', label: 'Settings', icon: <Settings size={18}/> },
{ id: 'help', label: 'Help', icon: <HelpCircle size={18}/> },
].map((item) => (
<button
key={item.id}
onClick={() => setActiveTab(item.id)}
className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'text-gray-500 hover:bg-white/5'}`}
>
{item.icon}
{isSidebarOpen && item.label}
</button>
))}
</div>

<div className="p-6 border-t border-white/5">
<button onClick={() => setView('landing')} className="w-full text-xs text-gray-600 hover:text-white transition-colors flex items-center gap-2">
<ArrowRight size={12} className="rotate-180" /> Exit Platform
</button>
</div>
</motion.aside>

{/* Main Content Area */}
<main className="flex-1 overflow-y-auto relative">
<header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-40">
<h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">{activeTab}</h2>

<div className="flex items-center gap-4">
{/* زر الشركات: لرفع طلب جديد */}
{activeTab === 'factories' && (
<button
onClick={() => setIsPostModalOpen(true)}
className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
>
<Plus size={14} /> Post New Job
</button>
)}

<div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/20 flex items-center gap-2">
<div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Server 01
</div>
<div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
</div>
</header>

<div className="p-10 max-w-6xl mx-auto">
{activeTab === 'factories' ? (
/* عرض فرص العمل للفنيين */
<div className="space-y-6">
<div className="flex justify-between items-center mb-8">
<div>
<h1 className="text-2xl font-bold tracking-tight">Marketplace Requests</h1>
<p className="text-sm text-gray-500 mt-1">Real-time mechanical failure reports from global factories.</p>
</div>
</div>

{[1, 2, 3].map((i) => (
<motion.div
key={i}
initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
className="group bg-[#080808] border border-white/5 p-6 rounded-[2rem] hover:border-blue-500/30 transition-all flex items-center justify-between"
>
<div className="flex items-center gap-6">
<div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
<Briefcase size={22} />
</div>
<div>
<h4 className="font-bold text-sm">Industrial Robot Calibration - Unit #82</h4>
<p className="text-[12px] text-gray-500 mt-1 italic">Louisville, KY • Posted 2h ago</p>
</div>
</div>
{/* زر التقديم للفني */}
<button className="bg-white text-black px-6 py-2 rounded-xl text-[11px] font-bold hover:bg-blue-500 hover:text-white transition-all shadow-xl">
Apply to Diagnose
</button>
</motion.div>
))}
</div>
) : (
/* واجهة التشخيص الأصلية التي تحبها */
<div className="grid md:grid-cols-2 gap-10">
<div className="aspect-video bg-[#111] rounded-[2rem] border border-white/5 flex items-center justify-center text-gray-600 font-mono text-xs">
[ Initializing Video Triage Environment... ]
</div>
<div className="space-y-6">
<h1 className="text-2xl font-bold tracking-tight">Active Diagnostics</h1>
<p className="text-sm text-gray-500 leading-relaxed italic">"Select a factory or an expert from the sidebar to begin the encrypted session."</p>
<div className="p-6 bg-blue-600/5 border border-blue-500/10 rounded-2xl">
<h4 className="text-xs font-bold text-blue-400 uppercase mb-2">Safety Note</h4>
<p className="text-[12px] text-gray-400 leading-relaxed">
By starting, you agree to our Terms of Service. Valcrons is not responsible for physical machine operation.
</p>
</div>
</div>
</div>
)}
</div>

{/* Modal الخاص بالشركات لرفع طلب جديد */}
<AnimatePresence>
{isPostModalOpen && (
<div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
<motion.div
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
onClick={() => setIsPostModalOpen(false)}
className="absolute inset-0 bg-black/80 backdrop-blur-sm"
/>
<motion.div
initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
className="relative bg-[#0f0f0f] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl"
>
<div className="flex justify-between items-center mb-6">
<h2 className="text-xl font-bold italic">Post Mechanical Request</h2>
<button onClick={() => setIsPostModalOpen(false)} className="text-gray-500 hover:text-white transition-colors"><X size={20}/></button>
</div>
<div className="space-y-4">
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest italic">Machine Description</label>
<input type="text" placeholder="e.g. Hydraulic leak in main press unit" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500" />
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest italic">Urgency</label>
<select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 appearance-none text-gray-400">
<option>Low</option>
<option>Medium</option>
<option>Critical</option>
</select>
</div>
<div>
<label className="text-[10px] text-gray-500 uppercase font-bold mb-2 block tracking-widest italic">Est. Budget</label>
<input type="text" placeholder="$0.00" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500" />
</div>
</div>
<button onClick={() => setIsPostModalOpen(false)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm mt-4 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all">
Broadcast to Experts
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
<AnimatePresence mode="wait">
{view === 'landing' ? (
<motion.div key="landing" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
<LandingPage />
</motion.div>
) : (
<motion.div key="platform" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
<PlatformView />
</motion.div>
)}
</AnimatePresence>
);
}
