// src/app/dashboard/client/page.tsx
'use client';
import { useState } from 'react';

// هذا هو كود لوحة البيانات الاحترافي (Dashboard)
export default function ClientDashboard() {
const [specialization, setSpecialization] = useState('');

// نموذج لطلبات الصيانة (سيتم استبداله ببيانات حقيقية لاحقاً)
const requests = [
{ title: "PLC Failure", location: "Detroit", type: "CRITICAL", status: "Safety Orange", border: "border-l-4 border-l-[#ff8800]" },
{ title: "Maintenance", location: "Texas", type: "CRITUAL", status: "Blue", border: "border-l-4 border-l-[#0070f3]" },
{ title: "Consultation", location: "Texas, California", type: "CONSULTATION", status: "Blue", border: "border-l-4 border-l-[#0070f3]" },
];

return (
<div className="min-h-screen bg-[#111111] text-[#e5e7eb]">
{/* 1. الشريط العلوي (Header) */}
<nav className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#1a1a1a]">
<h1 className="text-2xl font-bold text-[#ff8800] tracking-tighter">VALCRONS</h1>
<div className="flex items-center space-x-6 text-sm">
<a href="#" className="text-gray-300 hover:text-white">Live Triage</a>
<a href="#" className="text-gray-300 hover:text-white">Experts</a>
<a href="#" className="text-gray-300 hover:text-white">Case Studies</a>
<a href="#" className="text-gray-300 hover:text-white">Resources</a>
<button className="bg-[#0070f3] text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600">Contact</button>
</div>
</nav>

{/* 2. منطقة العمل الرئيسية (Main Content Area) */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
{/* -- العمود الأول: قائمة طلبات الصيانة الحية -- */}
<div className="md:col-span-2 space-y-6">
<div className="p-4 bg-[#1a1a1a] rounded-xl flex gap-3 border border-gray-800">
<input
type="text"
placeholder="Search Experts..."
className="bg-[#111111] p-3 rounded-lg border border-gray-700 w-full focus:border-blue-500 outline-none"
value={specialization}
onChange={(e) => setSpecialization(e.target.value)}
/>
</div>

{/* عرض الطلبات كـ Cards */}
{requests.map((req, idx) => (
<div key={idx} className={`p-6 bg-[#1a1a1a] rounded-xl border border-gray-800 ${req.border}`}>
<div className="flex justify-between items-start mb-2">
<div>
<p className="text-xs text-gray-500 uppercase tracking-wider">{req.type} REQUEST:</p>
<h3 className="text-2xl font-bold text-white">{req.title}</h3>
<p className="text-sm text-gray-400">Factory in {req.location}</p>
</div>
<span className="text-xs bg-[#0070f3] text-white px-3 py-1 rounded-full">{req.status === "Blue" ? "Electric Blue" : "Safety Orange"}</span>
</div>
<div className="border-t border-gray-800 mt-4 pt-4 text-sm text-gray-500">
Status: {req.status}
</div>
</div>
))}
</div>

{/* -- العمود الثاني: الأنظمة الجانبية -- */}
<div className="space-y-6">
{/* محرك التطابق الذكي (Smart Matching Engine) */}
<div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
<h4 className="text-sm uppercase text-gray-500 tracking-wider mb-6">SMART MATCHING ENGINE</h4>
<div className="space-y-4">
<div className="flex items-center gap-3">
<img src="/expert-1.jpg" alt="Profio Photo" className="w-12 h-12 rounded-full bg-gray-700" />
<div>
<p className="font-semibold text-white flex items-center">Profio Photo <span className="ml-1 text-blue-500">✔</span></p>
<p className="text-xs text-gray-400">Verified expert, Detroit</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-[#ff8800]">⚙</div>
<div>
<p className="font-semibold text-white flex items-center">Hanlis Expert <span className="ml-1 text-blue-500">✔</span></p>
<p className="text-xs text-gray-400">Verified expert, Detroit</p>
</div>
</div>
</div>
<button className="mt-6 w-full text-center text-sm border border-gray-700 p-2 rounded-lg hover:bg-[#2d2d2d]">Learn More ›</button>
</div>

{/* قسم التشخيص عن بعد (Remote Triage) */}
<div className="p-6 bg-[#1a1a1a] rounded-xl border border-gray-800">
<h4 className="text-sm uppercase text-gray-500 tracking-wider mb-6">REMOTE TRIAGE</h4>
<div className="bg-[#111111] p-4 rounded-xl relative h-64 border border-gray-700 flex items-center justify-center">
<img src="/engineer-placeholder.jpg" alt="Engineer" className="w-full h-full object-cover rounded-lg" />
{/* أدوات التحكم الافتراضية */}
<div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 bg-[#1a1a1a]/80 p-2 rounded-full">
<button className="p-2 hover:bg-gray-700 rounded-full text-xs">🎤</button>
<button className="p-2 hover:bg-gray-700 rounded-full text-xs">📹</button>
<button className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-xs">📞</button>
</div>
</div>
</div>
</div>
</div>
</div>
);
}
