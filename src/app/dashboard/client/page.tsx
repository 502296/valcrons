'use client';
import { useState } from 'react';

export default function ProDashboard() {
return (
<div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500/30">
{/* هيدر عصري شفاف */}
<header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0A]/80 border-b border-white/10 p-6 flex justify-between items-center">
<div className="text-xl font-black tracking-tighter flex items-center gap-2">
<div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20"></div>
VALCRONS
</div>
<div className="flex gap-4">
<button className="px-5 py-2 text-sm font-medium hover:text-blue-400 transition">Analytics</button>
<button className="px-5 py-2 text-sm font-medium bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition">Dashboard</button>
</div>
</header>

{/* محتوى الصفحة بتنسيق Grid احترافي */}
<main className="max-w-7xl mx-auto p-8 grid grid-cols-12 gap-6">
{/* اللوحة الرئيسية */}
<section className="col-span-12 lg:col-span-8 space-y-6">
<div className="flex justify-between items-end">
<div>
<h2 className="text-4xl font-extrabold tracking-tight">Active Operations</h2>
<p className="text-gray-400 mt-2">Real-time factory maintenance telemetry.</p>
</div>
<button className="bg-blue-600 hover:bg-blue-500 text-sm font-bold px-6 py-3 rounded-xl transition shadow-[0_0_20px_-5px_rgba(37,99,235,0.6)]">
+ New Request
</button>
</div>

{/* كرت حالة احترافي */}
<div className="group bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-xl">
<div className="flex justify-between items-start">
<div>
<span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-400/10 px-2 py-1 rounded">PLC Failure</span>
<h3 className="text-2xl font-bold mt-3">Precision Servo Calibration</h3>
</div>
<div className="text-right">
<p className="text-3xl font-black">94%</p>
<p className="text-xs text-gray-500">Efficiency Index</p>
</div>
</div>
</div>
</section>

{/* لوحة جانبية ذكية */}
<aside className="col-span-12 lg:col-span-4 bg-[#111111] rounded-3xl border border-white/5 p-6 h-fit">
<h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Neural Matching</h4>
<div className="space-y-3">
{[1, 2, 3].map((i) => (
<div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition cursor-pointer">
<div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
<div>
<p className="text-sm font-bold">Expert {i}</p>
<p className="text-[10px] text-gray-500">Certified by Valcrons</p>
</div>
</div>
))}
</div>
</aside>

</main>
</div>
);
}
