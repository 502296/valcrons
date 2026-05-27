import React, { ReactNode } from "react";
import {
Search,
Settings,
ShieldCheck,
Radio,
LockKeyhole
} from "lucide-react";

export default function ValcronsProfessionalLanding() {
return (
<div className="min-h-screen bg-[#05070a] font-sans text-slate-300 antialiased selection:bg-blue-500/30">

{/* Background Layer */}
<div className="fixed inset-0 -z-50">
<div
className="absolute inset-0 opacity-20 grayscale"
style={{
backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
/>
<div className="absolute inset-0 bg-[#05070a]/90" />
</div>

<div className="mx-auto max-w-7xl px-6">

{/* --- Navigation --- */}
<nav className="flex items-center justify-between py-6">
<div className="flex items-center gap-3">
<div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
<Settings className="h-4 w-4 text-amber-500" />
</div>
<h1 className="text-lg font-bold tracking-tight text-white">VALCRONS</h1>
</div>

<div className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-widest text-slate-500 md:flex">
{["Live Triage", "Experts", "Case Studies", "Resources"].map((link) => (
<a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
))}
</div>

<div className="flex items-center gap-3">
<button className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all">
Post a Request
</button>
<button className="hidden sm:block rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-xs font-bold text-white hover:bg-white/10 transition-all">
Log in
</button>
</div>
</nav>

{/* --- Hero Section --- */}
<section className="flex flex-col items-center pt-16 pb-12 text-center">
<p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/80">
Industrial Maintenance Network
</p>

<h2 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
INDUSTRIAL EXPERTISE. <br />
<span className="text-blue-500">INSTANTLY CONNECTED.</span>
</h2>

<p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">
Connect with verified industrial experts for critical repairs, remote diagnosis,
asset support, and technician dispatch.
</p>

<div className="mt-8 flex flex-wrap justify-center gap-4">
<button className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20">
Start Live Diagnosis
</button>
<button className="rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white hover:bg-white/10">
Post a Request
</button>
</div>

{/* Search Bar - Fixed Width & Padding */}
<div className="mt-12 w-full max-w-2xl px-4">
<div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#12151c] p-1.5 focus-within:border-blue-500/50 transition-all">
<Search className="ml-3 h-4 w-4 text-slate-500" />
<input
placeholder="What equipment do you need help with?"
className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-slate-600"
/>
<button className="rounded-lg bg-blue-600 px-6 py-2 text-xs font-bold text-white hover:bg-blue-500 transition-all">
Search
</button>
</div>
</div>
</section>

{/* --- Trust Features --- */}
<section className="grid gap-4 py-12 md:grid-cols-3">
<Feature icon={<ShieldCheck className="text-amber-500" />} title="Verified Experts" desc="Credentialed professionals." />
<Feature icon={<Radio className="text-amber-500" />} title="Real-time Matching" desc="Smart algorithm matching." />
<Feature icon={<LockKeyhole className="text-amber-500" />} title="Secure & Direct" desc="Private direct connection." />
</section>

{/* --- How It Works - Clean Layout --- */}
<section className="border-t border-white/5 pt-16 pb-24">
<p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">How it works</p>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<Step num="01" title="Post Your Issue" desc="Describe the problem." />
<Step num="02" title="Get Matched" desc="Connect with experts." />
<Step num="03" title="Connect Instantly" desc="Start video session." />
<Step num="04" title="Solve & Continue" desc="Handle the solution." />
</div>
</section>

</div>
</div>
);
}

// Reusable Components to keep code clean and sizes consistent
function Feature({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
return (
<div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.04]">
<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
{React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
</div>
<div>
<h4 className="text-xs font-bold text-white">{title}</h4>
<p className="text-[11px] text-slate-500">{desc}</p>
</div>
</div>
);
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
return (
<div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 text-center transition-all hover:border-blue-500/20">
<div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-[10px] font-black text-blue-400 border border-blue-500/20">
{num}
</div>
<h5 className="text-xs font-bold text-white">{title}</h5>
<p className="mt-2 text-[11px] text-slate-500">{desc}</p>
</div>
);
}
