import React, { ReactNode } from "react";
import {
ArrowRight,
LockKeyhole,
Radio,
Search,
Settings,
ShieldCheck,
Cpu,
Zap,
Globe,
ChevronRight
} from "lucide-react";

/**
* VALCRONS - ULTIMATE EDITION
* Professional Industrial Maintenance Network
*/

export default function ValcronsUltimateLanding() {
return (
<div className="min-h-screen bg-[#030508] font-sans selection:bg-blue-500/30 text-slate-200 antialiased overflow-x-hidden">

{/* --- BACKGROUND ARCHITECTURE --- */}
<div className="fixed inset-0 -z-50 bg-[#030508]" />

{/* Industrial Overlay with Gradient Mask */}
<div
className="fixed inset-0 -z-40 opacity-[0.15] grayscale mix-blend-overlay"
style={{
backgroundImage: `url('https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
/>

{/* Global Glowing Mesh */}
<div className="fixed inset-0 -z-30">
<div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
<div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[120px]" />
</div>

<div className="mx-auto max-w-[1400px] px-6">

{/* --- NAVIGATION BAR --- */}
<nav className="relative z-50 flex items-center justify-between py-10">
<div className="flex items-center gap-4">
<div className="relative group">
<div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-25 blur transition duration-1000 group-hover:opacity-50"></div>
<div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#030508] transition-transform group-hover:scale-105">
<Settings className="h-5 w-5 text-blue-400 group-hover:rotate-90 transition-transform duration-500" />
</div>
</div>
<div>
<h1 className="text-2xl font-black tracking-tighter text-white">VALCRONS</h1>
<p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500/70">Industrial Intelligence</p>
</div>
</div>

<div className="hidden items-center gap-12 text-[13px] font-semibold uppercase tracking-widest text-slate-500 md:flex">
{["Network", "Experts", "Intelligence", "Support"].map((item) => (
<a key={item} href="#" className="transition-all hover:text-white hover:tracking-[0.5em]">{item}</a>
))}
</div>

<div className="flex items-center gap-8">
<button className="text-sm font-bold text-slate-400 hover:text-white transition-all">Sign In</button>
<button className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none shadow-[0_0_20px_rgba(37,99,235,0.3)]">
Request Expert
<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</button>
</div>
</nav>

{/* --- HERO SECTION --- */}
<section className="relative pt-24 pb-20">
<div className="flex flex-col items-center text-center">

{/* Status Badge */}
<div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-5 py-2 mb-10 backdrop-blur-md">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
</span>
<span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Global Diagnostic Network Active</span>
</div>

<h2 className="mx-auto max-w-5xl text-6xl font-black tracking-tight text-white md:text-8xl lg:text-9xl leading-[0.9]">
Industrial expertise. <br />
<span className="relative inline-block mt-4">
<span className="bg-gradient-to-r from-blue-400 via-white to-cyan-400 bg-clip-text text-transparent italic">
Instantly connected.
</span>
</span>
</h2>

<p className="mx-auto mt-12 max-w-2xl text-xl leading-relaxed text-slate-400/80">
The elite digital layer for global manufacturing. Connect with certified
SME engineers for mission-critical asset repair and remote triage.
</p>

{/* --- SEARCH ARCHITECTURE --- */}
<div className="relative mt-16 w-full max-w-3xl group">
<div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-xl transition group-focus-within:opacity-100 opacity-50"></div>
<div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-2xl focus-within:border-blue-500/50 transition-all">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
<Search className="h-5 w-5 text-blue-400" />
</div>
<input
placeholder="Enter equipment model or technical fault code..."
className="w-full bg-transparent text-lg text-white outline-none placeholder:text-slate-600"
/>
<button className="hidden sm:block rounded-xl bg-white px-8 py-3.5 text-sm font-black text-black transition-all hover:bg-blue-400 hover:text-white active:scale-95">
ANALYZE
</button>
</div>
</div>

{/* Quick Stats */}
<div className="mt-12 flex gap-10 text-[11px] font-bold uppercase tracking-widest text-slate-500">
<div className="flex items-center gap-2"><Globe className="h-3 w-3 text-blue-500"/> 140+ Countries</div>
<div className="flex items-center gap-2"><Zap className="h-3 w-3 text-blue-500"/> 60s Response</div>
<div className="flex items-center gap-2"><Cpu className="h-3 w-3 text-blue-500"/> AI matching</div>
</div>
</div>
</section>

{/* --- FEATURE GRID --- */}
<section className="grid gap-6 pb-32 md:grid-cols-3">
<FeatureCard
icon={<ShieldCheck className="h-6 w-6" />}
title="ISO-Certified Experts"
description="Every engineer is vetted against strict industrial safety and technical standards."
badge="Security"
/>
<FeatureCard
icon={<Radio className="h-6 w-6" />}
title="Live Triage Protocol"
description="Real-time augmented reality support for immediate on-site equipment diagnosis."
badge="Real-time"
/>
<FeatureCard
icon={<LockKeyhole className="h-6 w-6" />}
title="Quantum Encryption"
description="Proprietary data tunnels ensuring your industrial blueprints remain confidential."
badge="Military Grade"
/>
</section>

{/* --- PROCESS STEPS --- */}
<section className="border-t border-white/5 pt-20 pb-40">
<div className="mb-16 text-center">
<h3 className="text-sm font-black uppercase tracking-[0.5em] text-blue-500">Execution Flow</h3>
</div>
<div className="grid gap-4 md:grid-cols-4">
<ProcessStep step="01" title="Post Incident" desc="Log equipment failure" />
<ProcessStep step="02" title="Match SME" desc="AI-driven routing" />
<ProcessStep step="03" title="Live Support" desc="Fix via AR/Video" />
<ProcessStep step="04" title="Resumption" desc="Back to production" isLast />
</div>
</section>

</div>
</div>
);
}

// --- SUB-COMPONENTS ---

function FeatureCard({ icon, title, description, badge }: {
icon: ReactNode;
title: string;
description: string;
badge: string;
}) {
return (
<div className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-10 transition-all hover:border-blue-500/40 hover:bg-white/[0.05]">
<div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400 transition-all group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]">
{icon}
</div>
<span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-widest text-blue-500/60">{badge}</span>
<h4 className="text-2xl font-bold text-white">{title}</h4>
<p className="mt-4 text-sm leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors">{description}</p>

{/* Decorative arrow */}
<div className="mt-8 flex items-center gap-2 text-xs font-bold text-white opacity-0 transition-all group-hover:opacity-100">
LEARN MORE <ChevronRight className="h-3 w-3" />
</div>
</div>
);
}

function ProcessStep({ step, title, desc, isLast = false }: {
step: string;
title: string;
desc: string;
isLast?: boolean
}) {
return (
<div className="relative flex flex-col items-center p-8 rounded-3xl transition-all hover:bg-white/[0.02]">
<div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-black text-blue-400">
{step}
</div>
<h5 className="text-sm font-black text-white">{title}</h5>
<p className="mt-2 text-[12px] text-slate-500">{desc}</p>
{!isLast && (
<div className="hidden md:block absolute top-14 left-[70%] w-full h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent" />
)}
</div>
);
}
