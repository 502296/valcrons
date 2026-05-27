export default function Home() {
return (
<main className="min-h-screen bg-[#0a0c10] text-white font-sans selection:bg-[#d0a36f]/30">
{/* Dynamic Background */}
<div className="fixed inset-0 overflow-hidden pointer-events-none">
<div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#d0a36f]/5 blur-[120px]" />
<div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[#14b8ff]/5 blur-[120px]" />
</div>

<div className="relative z-10 max-w-7xl mx-auto px-6">
{/* Header */}
<nav className="flex items-center justify-between py-8 border-b border-white/5">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-[#d0a36f] rounded flex items-center justify-center font-bold text-black shadow-lg shadow-[#d0a36f]/20">V</div>
<h1 className="text-xl font-bold tracking-[0.2em] text-[#d0a36f]">VALCRONS</h1>
</div>
<div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-white/40">
<a href="#" className="hover:text-white transition-colors">Network</a>
<a href="#" className="hover:text-white transition-colors">Security</a>
<a href="#" className="hover:text-white transition-colors">Support</a>
</div>
<button className="px-6 py-2 rounded-full border border-white/10 text-xs font-bold hover:bg-white hover:text-black transition-all">
Contact
</button>
</nav>

{/* Hero Section - Calm & Centered */}
<div className="py-20 text-center">
<h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
INDUSTRIAL EXPERTISE. <br/>
<span className="text-white/30 italic">INSTANTLY CONNECTED.</span>
</h2>
<p className="max-w-2xl mx-auto text-white/50 text-lg leading-relaxed">
The precision platform for critical repairs and certified expert dispatch.
Select your portal to begin.
</p>
</div>

{/* Main Split Selection - The Core Change */}
<div className="grid md:grid-cols-2 gap-8 mb-20">
{/* Factory Side */}
<div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all hover:border-[#d0a36f]/40 hover:bg-white/[0.04]">
<div className="relative z-10">
<span className="text-[#d0a36f] text-xs font-bold uppercase tracking-widest">For Facilities</span>
<h3 className="text-3xl font-bold mt-4 mb-4">Factory Owner</h3>
<p className="text-white/40 mb-8 leading-relaxed">
Reduce downtime with instant video triage and on-site technician dispatch.
Secure, verified, and ready 24/7.
</p>
<button className="w-full py-4 bg-[#d0a36f] text-black font-bold rounded-xl shadow-xl shadow-[#d0a36f]/10 group-hover:scale-[1.02] transition-transform">
Post a Request
</button>
</div>
{/* Subtle Industrial Pattern Overlay */}
<div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
<svg viewBox="0 0 100 100"><path d="M0 0h100v100H0z" fill="currentColor"/></svg>
</div>
</div>

{/* Technician Side */}
<div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all hover:border-[#14b8ff]/40 hover:bg-white/[0.04]">
<div className="relative z-10">
<span className="text-[#14b8ff] text-xs font-bold uppercase tracking-widest">For Experts</span>
<h3 className="text-3xl font-bold mt-4 mb-4">Industrial Expert</h3>
<p className="text-white/40 mb-8 leading-relaxed">
Join the elite network of verified field engineers.
Manage cases, provide remote support, and grow your expertise.
</p>
<button className="w-full py-4 border border-[#14b8ff] text-[#14b8ff] font-bold rounded-xl backdrop-blur-sm group-hover:bg-[#14b8ff] group-hover:text-black transition-all">
Technician Dashboard
</button>
</div>
</div>
</div>

{/* Live Network Status - Glassy & Minimal */}
<div className="rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-12 backdrop-blur-xl">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
<span className="text-xs font-bold uppercase tracking-tighter text-green-400">Live Network Status</span>
</div>
<h4 className="text-4xl font-bold tracking-tighter">26,300+</h4>
<p className="text-white/30 text-sm">Verified Experts across Silicon Valley & US</p>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
<div>
<p className="text-xs font-bold text-white/30 uppercase mb-1">Response Time</p>
<p className="text-xl font-bold">18 mins</p>
</div>
<div>
<p className="text-xs font-bold text-white/30 uppercase mb-1">Success Rate</p>
<p className="text-xl font-bold">99.2%</p>
</div>
<div className="hidden sm:block">
<p className="text-xs font-bold text-white/30 uppercase mb-1">Security</p>
<p className="text-xl font-bold tracking-widest text-[#d0a36f]">AES-256</p>
</div>
</div>
</div>
</div>

{/* Footer */}
<footer className="py-20 text-center border-t border-white/5 mt-20">
<p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Valcrons Industrial Systems © 2026</p>
</footer>
</div>
</main>
);
}
