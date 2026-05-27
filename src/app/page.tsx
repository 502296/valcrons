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
* VALCRONS - CRYSTAL GLASS EDITION
* Refined, Transparent, and Professional
*/

export default function ValcronsUltimateLanding() {
return (
<div className="min-h-screen bg-[#02040a] font-sans selection:bg-blue-500/30 text-slate-200 antialiased overflow-x-hidden">

{/* --- BACKGROUND ENGINE --- */}
<div className="fixed inset-0 -z-50 bg-[#02040a]" />

{/* Professional Tech Background */}
<div
className="fixed inset-0 -z-40 opacity-[0.2] grayscale mix-blend-screen"
style={{
backgroundImage: `url('https://images.unsplash.com/photo-1558444479-c84851727334?q=80&w=2070&auto=format&fit=crop')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
/>

{/* Animated Light Orbs */}
<div className="fixed inset-0 -z-30 overflow-hidden">
<div className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[120px] animate-pulse" />
<div className="absolute bottom-[-5%] left-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[100px]" />
</div>

<div className="mx-auto max-w-[1280px] px-6">

{/* --- REFINED NAV BAR --- */}
<nav className="relative z-50 flex items-center justify-between py-6 mt-4 rounded-2xl border border-white/5 bg-white/[0.03] px-6 backdrop-blur-xl">
<div className="flex items-center gap-3">
<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
<Settings className="h-4 w-4 text-white" />
</div>
<div>
<h1 className="text-lg font-black tracking-tighter text-white uppercase">VALCRONS</h1>
</div>
</div>

<div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 md:flex">
{["Network", "Experts", "Intelligence"].map((item) => (
<a key={item} href="#" className="transition-all hover:text-blue-400">{item}</a>
))}
</div>

<div className="flex items-center gap-6">
<button className="text-xs font-bold text-slate-400 hover:text-white transition-all">Log In</button>
<button className="group relative flex items-center justify-center px-5 py-2 text-xs font-bold text-white transition-all bg-blue-600 rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-600/20">
Request Expert
<ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
</button>
</div>
</nav>

{/* --- HERO SECTION --- */}
<section className="relative pt-20 pb-16">
<div className="flex flex-col items-center text-center">

{/* Minimal Status Badge */}
<div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 mb-8 backdrop-blur-md">
<div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping" />
<span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-400">Diagnostic Network Active</span>
</div>

<h2 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl leading-[1.1]">
Industrial expertise. <br />
<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">
Instantly connected.
</span>
</h2>

<p className="mx-auto mt-8 max-w-xl text-sm md:text-base leading-relaxed text-slate-400 font-medium">
Elite digital infrastructure for manufacturing. Connect with SME engineers
for mission-critical repairs and high-precision remote triage.
</p>

{/* --- GLASS SEARCH BAR --- */}
<div className="relative mt-12 w-full max-w-2xl">
<div className="relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-2 backdrop-blur-2xl focus-within:border-blue-500/40 transition-all shadow-2xl">
<Search className="ml-3 h-4 w-4 text-slate-500" />
<input
placeholder="Equipment model or technical fault code..."
className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-slate-600 font-medium"
/>
<button className="rounded-lg bg-white px-6 py-2 text-[11px] font-black text-black hover:bg-blue-500 hover:text-white transition-all uppercase tracking-wider">
Analyze
</button>
</div>
</div>

{/* Micro Stats */}
<div className="mt-10 flex gap-8 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
<div className="flex items-center gap-2"><Globe className="h-3 w-3"/> 140+ Nations</div>
<div className="flex items-center gap-2"><Zap className="h-3 w-3"/> Instant Triage</div>
<div className="flex items-center gap-2"><Cpu className="h-3 w-3"/> AI Routing</div>
</div>
</div>
</section>

{/* --- GLASS FEATURE GRID --- */}
<section className="grid gap-4 pb-24 md:grid-cols-3">
<FeatureCard
icon={<ShieldCheck className="h-5 w-5" />}
title="ISO-Certified"
desc="Vetted technical standards."
/>
<FeatureCard
icon={<Radio className="h-5 w-5" />}
title="Live Protocol"
desc="Real-time AR diagnosis."
/>
<FeatureCard
icon={<LockKeyhole className="h-5 w-5" />}
title="Secure Vault"
desc="Encrypted data tunnels."
/>
</section>

</div>
</div>
);
}

// --- SUB-COMPONENTS ---

function FeatureCard({ icon, title, desc }: {
icon: ReactNode;
title: string;
desc: string;
}) {
return (
<div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/[0.05]">
<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
{icon}
</div>
<h4 className="text-sm font-bold text-white uppercase tracking-tight">{title}</h4>
<p className="mt-2 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{desc}</p>
</div>
);
}
