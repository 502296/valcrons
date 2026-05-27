// src/app/dashboard/triage/page.tsx
'use client';
import { useState } from 'react';

export default function VideoTriage() {
return (
<div className="min-h-screen bg-industrial-charcoal p-8 text-white">
<h1 className="text-2xl font-bold mb-6">Live Industrial Triage</h1>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
{/* شاشة الفيديو الرئيسية */}
<div className="lg:col-span-2 aspect-video bg-black rounded-xl border-2 border-industrial-blue relative">
<div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded">
Live Stream: PLC_Unit_01
</div>
{/* هنا سنقوم بدمج مكون الفيديو لاحقاً */}
</div>

{/* أدوات التشخيص */}
<div className="bg-industrial-slate p-6 rounded-xl border border-gray-700">
<h2 className="text-xl font-bold mb-4">Annotation Tools</h2>
<div className="flex flex-col gap-3">
<button className="bg-industrial-blue p-3 rounded">Draw Circle</button>
<button className="bg-industrial-blue p-3 rounded">Measure Distance</button>
<button className="bg-industrial-orange p-3 rounded">Emergency Alert</button>
</div>
</div>
</div>
</div>
);
}
