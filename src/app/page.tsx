// src/app/page.tsx
import React from 'react';

export default function LandingPage() {
return (
<main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6">
{/* Hero Section */}
<div className="text-center space-y-6 max-w-3xl">
<h1 className="text-6xl font-extrabold tracking-tighter">
VALCRONS<span className="text-blue-600">.</span>
</h1>
<p className="text-xl text-slate-400">
Industrial expertise connected instantly. Secure, professional, and built for global facilities.
</p>

{/* Call to Action */}
<div className="flex gap-4 justify-center pt-8">
<button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-slate-200 transition">
Request Expert Diagnosis
</button>
<button className="border border-slate-700 font-bold px-8 py-4 rounded-full hover:bg-slate-800 transition">
Join as Technician
</button>
</div>
</div>
</main>
);
}
