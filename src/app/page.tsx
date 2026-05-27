import React, { ReactNode } from "react";
import {
Search,
Settings,
ShieldCheck,
Radio,
LockKeyhole,
ChevronRight
} from "lucide-react";

/**
* VALCRONS - EXACT IMAGE REPLICA EDITION
* Focus: Dark UI, Clear Buttons, Wide Layout
*/

export default function ValcronsLandingPage() {
return (
<div className="min-h-screen bg-[#05070a] font-sans text-slate-300 antialiased selection:bg-blue-500/30">

{/* Background - Exact as Image */}
<div className="fixed inset-0 -z-50">
<div
className="absolute inset-0 opacity-40 grayscale"
style={{
backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')`,
backgroundSize: 'cover',
backgroundPosition: 'center',
}}
/>
<div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a] to-[#05070a]" />
</div>

<div className="mx-auto max-w-screen-2xl px-6 md:px-12">

{/* --- Header / Navigation --- */}
<nav className="flex items-center justify-between py-8">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
<Settings className="h-5 w-5 text-amber-500" />
</div>
<h1 className="text-xl font-bold tracking-wider text-white">VALCRONS</h1>
</div>

<div className="hidden items-center gap-10 text-sm font-medium text-slate-400 md:flex">
{["Live Triage", "Experts", "Case Studies", "Resources"].map((link) => (
<a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
))}
</div>

<div className="flex items-center gap-4">
<button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
Post a Request
</button>
<button className="rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-all">
Log in
</button>
</div>
</nav>

{/* --- Hero Section --- */}
<section className="relative flex flex-col items-center pt-24 pb-16 text-center">
<p className="mb-6 text-xs font-bold uppercase tracking-[0.4em] text-amber-500/80">
Industrial Maintenance Network
</p>

<h2 className="max-w-5xl text-5xl font-extrabold tracking-tight text-white md:text-8xl leading-[1.1]">
INDUSTRIAL EXPERTISE. <br />
<span className="text-blue-500">INSTANTLY CONNECTED.</span>
</h2>

<p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
Connect with verified industrial experts for critical repairs, remote diagnosis,
asset support, and technician dispatch.
</p>

{/* Hero Buttons - Like Image */}
<div className="mt-10 flex flex-wrap justify-center gap-4">
<button className="rounded-xl bg-blue-600 px-10 py-4 text-sm font-black text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20">
Start Live Diagnosis
</button>
<button className="rounded-xl border border-white/10 bg-white/5 px-10 py-4 text-sm font-black text-white hover:bg-white/10 backdrop-blur-md">
Post a Request
</button>
</div>

{/* Search Bar - Precise Style */}
<div className="mt-16 w-full max-w-4xl">
<div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#12151c]/80 p-2 backdrop-blur-xl focus-within:border-blue-500/50 transition-all">
<Search className="ml-4 h-5 w-5 text-slate-500" />
<input
placeholder="What equipment or issue do you need help with?"
className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600"
/>
<button className="rounded-xl bg-blue-600 px-10 py-3 text-sm font-bold text-white hover:bg-blue-500">
Search
</button>
</div>
</div>
</section>

{/* --- Feature Grid --- */}
<section className="grid gap-8 py-16 md:grid-cols-3">
<TrustBadge
icon={<ShieldCheck className="h-5 w-5 text-amber-500" />}
title="Verified Experts"
desc="Credentialed & experienced industrial professionals."
/>
<TrustBadge
icon={<Radio className="h-5 w-5 text-amber-500" />}
title="Real-time Matching"
desc="Smart algorithm connects you with the right expert."
/>
<TrustBadge
icon={<LockKeyhole className="h-5 w-5 text-amber-500" />}
title="Secure & Direct"
desc="You connect directly with experts. We stay out of it."
/>
</section>

{/* --- How It Works --- */}
<section className="border-t border-white/5 py-20 text-center">
<p className="mb-12 text-xs font-bold uppercase tracking-[0.4em] text-slate-500">How it works</p>
<div className="grid gap-6 md:grid-cols-4">
<Step number="01" title="Post Your Issue" desc="Describe your problem in minutes." />
<Step number="02" title="Get Matched" desc="We connect you with the best available experts." />
<Step number="03" title="Connect Instantly" desc="Start a live video session and get expert help." />
<Step number="04" title="Solve & Continue" desc="You and the expert handle the solution together." />
</div>
</section>

</div>
</div>
);
}

// --- Components ---

function TrustBadge({ icon, title, desc }: { icon: ReactNode; title: string; desc: string }) {
return (
<div className="flex items-start gap-4 p-4">
<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10">
{icon}
</div>
<div className="text-left">
<h4 className="text-sm font-bold text-white">{title}</h4>
<p className="mt-1 text-xs leading-relaxed text-slate-500">{desc}</p>
</div>
</div>
);
}

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
return (
<div className="relative group text-center px-4">
<div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xs font-black text-slate-400 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all">
{number}
</div>
<h5 className="text-sm font-bold text-white">{title}</h5>
<p className="mt-3 text-xs leading-relaxed text-slate-500">{desc}</p>
</div>
);
}
