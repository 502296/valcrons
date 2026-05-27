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
Globe
} from "lucide-react";

export default function ValcronsUltimateLanding() {
return (
<div className="min-h-screen bg-[#02040a] font-sans selection:bg-blue-500/30 text-slate-200 antialiased overflow-x-hidden">

{/* --- Dynamic Background Architecture --- */}
<div className="fixed inset-0 -z-50 bg-[#02040a]" />

{/* Quiet High-Tech Workshop Image */}
<div
className="fixed inset-0 -z-40 opacity-[0.25] mix-blend-luminosity shadow-inner"
style={{
backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
/>

{/* Glass Orbs for Depth */}
<div className="fixed inset-0 -z-30">
<div className="absolute top-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
<div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
</div>

{/* Main Container - Widened to 1536px for better reach */}
<div className="mx-auto max-w-screen-2xl px-8">

{/* --- Ultra-Glass Navigation --- */}
<nav className="relative z-50 flex items-center justify-between py-5 mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-8 backdrop-blur-2xl shadow-2xl">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-600/20">
<Settings className="h-5 w-5 text-white" />
</div>
<h1 className="text-xl font-black tracking-tighter text-white uppercase">VALCRONS</h1>
</div>

<div className="hidden items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 md:flex">
{["Network", "Experts", "Intelligence", "Support"].map((item) => (
<a key={item} href="#" className="transition-all hover:text-blue-400 hover:tracking-[0.35em]">{item}</a>
))}
</div>

<div className="flex items-center gap-6">
<button className="text-xs font-bold text-slate-400 hover:text-white transition-all">Sign In</button>
<button className="group relative flex items-center justify-center px-6 py-2.5 text-xs font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20">
Request Expert
<ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
</button>
</div>
</nav>

{/* --- Hero Section - Adjusted Scale --- */}
<section className="relative pt-28 pb-20">
<div className="flex flex-col items-center text-center">

<div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-5 py-2 mb-10 backdrop-blur-md">
<div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
<span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">System Live: 2,400+ Engineers Online</span>
</div>

<h2 className="mx-auto max-w-5xl text-6xl font-black tracking-tight text-white md:text-8xl leading-[0.95]">
Industrial expertise. <br />
<span className="bg-gradient-to-r from-blue-400 via-white to-blue-200 bg-clip-text text-transparent italic">
Instantly connected.
</span>
</h2>

<p className="mx-auto mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-slate-400 font-medium opacity-80">
The world's premier digital layer for high-precision manufacturing.
Bridging the gap between critical asset failure and expert resolution.
</p>

{/* --- Advanced Glass Search --- */}
<div className="relative mt-14 w-full max-w-3xl group">
<div className="absolute -inset-1 rounded-2xl bg-blue-500/20 opacity-0 blur-xl transition group-focus-within:opacity-100" />
<div className="relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-3xl transition-all shadow-2xl">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5">
<Search className="h-5 w-5 text-blue-400" />
</div>
<input
placeholder="Identify equipment or enter technical fault code..."
className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-600 font-medium"
/>
<button className="rounded-xl bg-white px-8 py-3.5 text-xs font-black text-black hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest shadow-lg">
Analyze
</button>
</div>
</div>

<div className="mt-12 flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
<div className="flex items-center gap-2 transition-colors hover:text-blue-400"><Globe className="h-3.5 w-3.5 text-blue-500"/> Global Reach</div>
<div className="flex items-center gap-2 transition-colors hover:text-blue-400"><Zap className="h-3.5 w-3.5 text-blue-500"/> Instant Triage</div>
<div className="flex items-center gap-2 transition-colors hover:text-blue-400"><Cpu className="h-3.5 w-3.5 text-blue-500"/> AI Matching</div>
</div>
</div>
</section>

{/* --- Feature Grid - Responsive & Wide --- */}
<section className="grid gap-6 pb-32 md:grid-cols-3">
<FeatureCard
icon={<ShieldCheck className="h-6 w-6" />}
title="ISO-Certified"
desc="Every expert is vetted against strict industrial safety standards."
/>
<FeatureCard
icon={<Radio className="h-6 w-6" />}
title="Live Protocol"
desc="Proprietary AR technology for real-time remote diagnosis."
/>
<FeatureCard
icon={<LockKeyhole className="h-6 w-6" />}
title="Secure Vault"
desc="End-to-end encrypted communication for sensitive blueprints."
/>
</section>

</div>
</div>
);
}

function FeatureCard({ icon, title, desc }: {
icon: ReactNode;
title: string;
desc: string;
}) {
return (
<div className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.01] p-8 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-white/[0.04]">
<div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
{icon}
</div>
<h4 className="text-base font-black text-white uppercase tracking-tight">{title}</h4>
<p className="mt-3 text-sm leading-relaxed text-slate-500 group-hover:text-slate-300 transition-colors font-medium">{desc}</p>
</div>
);
}
