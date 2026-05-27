import {
Settings,
Search,
ShieldCheck,
Users,
LockKeyhole,
Radio,
Wrench,
ArrowRight,
} from "lucide-react";

export default function ValcronsLandingPage() {
return (
<main className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-200 antialiased selection:bg-blue-500/30">
{/* الخلفية الاحترافية المتدرجة مع بقع الضوء النيون الرائعة */}
<div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.1),transparent_40%),radial-gradient(circle_at_50%_-10%,rgba(245,158,11,0.05),transparent_30%)]" />
<div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

{/* الهيدر أو شريط التنقل الزجاجي */}
<nav className="sticky top-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
<div className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.02] px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
<div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-transparent shadow-lg shadow-amber-500/5">
<Settings className="h-5 w-5 text-amber-400 animate-pulse" />
</div>
<div>
<h1 className="text-xl font-black tracking-wider text-white bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
VALCRONS
</h1>
<p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
Industrial Maintenance Network
</p>
</div>
</div>

<div className="hidden items-center gap-8 text-sm font-medium text-slate-400 lg:flex">
<a className="transition-all duration-300 hover:text-white hover:scale-105" href="#">Live Triage</a>
<a className="transition-all duration-300 hover:text-white hover:scale-105" href="/experts">Experts</a>
<a className="transition-all duration-300 hover:text-white hover:scale-105" href="#">Case Studies</a>
<a className="transition-all duration-300 hover:text-white hover:scale-105" href="#">Resources</a>
</div>

<div className="flex items-center gap-3">
<button className="hidden rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-white/[0.08] hover:text-white backdrop-blur-md md:block">
Log in
</button>
<a
href="/request"
className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:opacity-95 hover:shadow-blue-600/30"
>
<span className="relative z-10 flex items-center gap-1.5">
Post a Request <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</span>
</a>
</div>
</div>
</nav>

{/* القسم الرئيسي وقسم الكارتات الزجاجية */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-4">
{/* الكارت الزجاجي العملاق الرئيسي */}
<div className="relative overflow-hidden rounded-[38px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent shadow-2xl shadow-black/80 backdrop-blur-3xl">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_50%)]" />

<div className="relative mx-auto flex min-h-[580px] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
<span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
<span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
Industrial Maintenance Network
</span>

<h2 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl">
Industrial expertise.
<span className="block mt-2 bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
Instantly connected.
</span>
</h2>

<p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base md:text-lg">
Connect with verified industrial experts for critical repairs, remote diagnosis, asset support, and technician dispatch.
</p>

{/* الأزرار التفاعلية */}
<div className="mt-8 flex flex-col gap-4 sm:flex-row w-full sm:w-auto px-4">
<a
href="/live"
className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-white/10 transition-all duration-300 hover:bg-slate-100 hover:scale-[1.02]"
>
Start Live Diagnosis
</a>
<a
href="/request"
className="rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.2] hover:scale-[1.02]"
>
Post a Request
</a>
</div>

{/* شريط البحث المطور */}
<div className="mt-12 flex w-full max-w-2xl items-center gap-3 rounded-xl border border-white/[0.08] bg-black/40 px-4 py-2.5 shadow-2xl focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 backdrop-blur-2xl transition-all duration-300">
<Search className="h-4 w-4 text-slate-400 shrink-0" />
<input
type="text"
placeholder="What equipment or issue do you need help with?"
className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
/>
<button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/10 transition-all hover:bg-blue-500 shrink-0">
Search
</button>
</div>

{/* كارتات الموثوقية الزجاجية */}
<div className="mt-16 grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3 text-right">
<TrustCard
icon={<ShieldCheck className="h-5 w-5" />}
title="Verified Experts"
text="Credentialed and experienced industrial professionals."
/>
<TrustCard
icon={<Radio className="h-5 w-5" />}
title="Real-time Matching"
text="Smart routing connects you with the right expert fast."
/>
<TrustCard
icon={<LockKeyhole className="h-5 w-5" />}
title="Secure & Direct"
text="You connect directly with experts. We stay out of it."
/>
</div>
</div>
</div>

{/* كارت خطوات العمل السفلي الزجاجي */}
<div className="mx-auto mt-8 grid max-w-5xl gap-4 rounded-[28px] border border-white/[0.05] bg-gradient-to-r from-white/[0.02] to-white/[0.01] p-4 shadow-xl backdrop-blur-3xl sm:grid-cols-2 md:grid-cols-4">
<Step number="01" title="Post Your Issue" text="Describe your equipment and problem in minutes." />
<Step number="02" title="Get Matched" text="We connect you with the best available experts." />
<Step number="03" title="Connect Instantly" text="Start a live video session and get expert help." />
<Step number="04" title="Solve & Continue" text="You and the expert handle the solution together." />
</div>
</section>
</main>
);
}

{/* مكون كارت الثقة المطور بالزجاج الحديث */}
function TrustCard({
icon,
title,
text,
}: {
icon: React.ReactNode;
title: string;
text: string;
}) {
return (
<div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-6 shadow-xl backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-blue-500/5 hover:-translate-y-1">
<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_40%)]" />
<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-blue-400 shadow-inner group-hover:bg-blue-500/10 group-hover:text-blue-300 transition-colors duration-300">
{icon}
</div>
<h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
<p className="mt-2 text-xs leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{text}</p>
</div>
);
}

{/* مكون الخطوات الزجاجي المطور */}
function Step({
number,
title,
text,
}: {
number: string;
title: string;
text: string;
}) {
return (
<div className="group relative rounded-xl border border-white/[0.03] bg-white/[0.01] p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.03] hover:border-white/[0.08]">
<div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/5 text-[11px] font-black text-cyan-400 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-300">
{number}
</div>
<h3 className="text-xs font-bold text-white tracking-wide">{title}</h3>
<p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{text}</p>
</div>
);
}
