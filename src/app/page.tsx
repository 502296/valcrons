export default function Home() {
return (
<main className="min-h-screen overflow-hidden bg-[#05070a] text-white selection:bg-[#d0a36f]/30">
{/* Background Orbs for Depth */}
<div className="fixed inset-0 z-0">
<div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#14b8ff]/10 blur-[120px]" />
<div className="absolute bottom-[10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-[#d0a36f]/10 blur-[150px]" />
</div>

<section className="relative z-10 min-h-screen px-6 py-6 sm:px-10 lg:px-16">
<div className="relative mx-auto max-w-7xl">

{/* Modern Glass Nav */}
<nav className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl mb-16">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#d0a36f] to-[#b88a55] font-bold text-black shadow-[0_0_20px_rgba(208,163,111,0.3)]">
V
</div>
<h1 className="text-xl font-bold tracking-[0.3em] text-[#d0a36f]">
VALCRONS
</h1>
</div>

<div className="hidden items-center gap-10 text-[13px] font-medium uppercase tracking-widest text-white/50 md:flex">
<a href="#triage" className="transition-colors hover:text-[#d0a36f]">Live Triage</a>
<a href="#experts" className="transition-colors hover:text-[#d0a36f]">Experts</a>
<a href="#cases" className="transition-colors hover:text-[#d0a36f]">Case Studies</a>
</div>

<a href="/dashboard/client" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-black transition-transform hover:scale-105 active:scale-95">
Technician Dashboard
</a>
</nav>

{/* Hero Section */}
<section className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
<div>
<div className="inline-block rounded-full border border-[#d0a36f]/30 bg-[#d0a36f]/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d0a36f]">
Industrial Maintenance Network
</div>

<h2 className="mt-8 text-5xl font-bold leading-[1.1] tracking-[-0.04em] sm:text-7xl">
INDUSTRIAL <span className="text-white/40">EXPERTISE.</span>
<br />
<span className="bg-gradient-to-r from-white via-white to-[#14b8ff] bg-clip-text text-transparent">
INSTANTLY CONNECTED.
</span>
</h2>

<p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
Connecting global manufacturing with verified experts for critical repairs, remote diagnosis, and real-time asset support.
</p>

<div className="mt-10 flex flex-wrap gap-5">
<a href="/diagnosis" className="flex items-center gap-3 rounded-xl bg-[#14b8ff] px-8 py-4 font-bold text-black shadow-[0_0_30px_rgba(20,184,255,0.3)] transition-all hover:brightness-110">
<span className="h-2 w-2 rounded-full bg-white animate-pulse" />
Start Video Diagnosis
</a>
<a href="#network" className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-bold backdrop-blur-md transition-colors hover:bg-white/10">
Explore Platform
</a>
</div>

{/* Minimal Metrics */}
<div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
{[
{ label: "Critical support", val: "24/7" },
{ label: "Verified experts", val: "1.2k+" },
{ label: "Global response", val: "Fast" }
].map((m, i) => (
<div key={i}>
<p className="text-2xl font-bold">{m.val}</p>
<p className="text-xs uppercase tracking-widest text-white/40 mt-1">{m.label}</p>
</div>
))}
</div>
</div>

{/* Glass Live Feed Panel */}
<div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-8 backdrop-blur-2xl shadow-2xl">
<div className="mb-8 flex items-center justify-between">
<p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">Active Requests</p>
<div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-green-400 border border-green-500/20">
<span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
Live
</div>
</div>

<div className="space-y-4">
{/* Critical Request Card */}
<div className="group relative overflow-hidden rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 transition-all hover:bg-orange-500/10">
<div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
<div className="h-12 w-12 rounded-full bg-orange-500/20 blur-xl" />
</div>
<span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Critical Request</span>
<h3 className="mt-1 text-xl font-bold">PLC Failure</h3>
<p className="text-sm text-white/40">Automated line stopped · Detroit, MI</p>
</div>

{/* Priority Request */}
<div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/20">
<span className="text-[10px] font-bold uppercase tracking-widest text-[#14b8ff]">Priority Maintenance</span>
<h3 className="mt-1 text-xl font-bold">Hydraulic System</h3>
<p className="text-sm text-white/40">Pressure drop on packaging line · Texas</p>
</div>

<div className="rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/20 opacity-60">
<span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Remote Consultation</span>
<h3 className="mt-1 text-xl font-bold text-white/80">Motor Vibration</h3>
<p className="text-sm text-white/30">High vibration under load · California</p>
</div>
</div>
</div>
</section>

{/* Video Diagnosis Feature */}
<section id="triage" className="mt-32">
<div className="rounded-[3rem] border border-white/10 bg-white/[0.02] p-12 backdrop-blur-md">
<div className="grid gap-16 lg:grid-cols-2 items-center">
<div className="relative aspect-video rounded-3xl bg-black overflow-hidden border border-white/10 shadow-2xl group">
<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-40 transition-transform duration-700 group-hover:scale-110" />
<div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
<div className="absolute bottom-6 left-6 flex gap-2">
{[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20" />)}
</div>
<div className="absolute top-6 right-6 px-3 py-1 rounded-md bg-red-500 text-[10px] font-bold uppercase tracking-widest">Rec 00:42</div>
</div>
<div>
<h3 className="text-4xl font-bold tracking-tight">1-Click Video Connect</h3>
<p className="mt-6 text-lg text-white/50 leading-relaxed">
Launch a secure remote triage session instantly. Our platform overlays asset context and technical schematics directly on the live feed.
</p>
<button className="mt-10 rounded-xl border border-[#d0a36f]/50 px-8 py-3 font-bold text-[#d0a36f] transition-all hover:bg-[#d0a36f] hover:text-black">
View Demo Workflow
</button>
</div>
</div>
</div>
</section>
</div>
</section>
</main>
);
}
