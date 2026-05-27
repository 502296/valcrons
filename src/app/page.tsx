import Link from "next/link";

export default function Home() {
return (
<main className="min-h-screen bg-industrial-charcoal text-white flex flex-col items-center justify-center p-8">
{/* Navbar MOCK (as in image_11.png) */}
<nav className="w-full max-w-7xl flex items-center justify-between p-6 absolute top-0">
<div className="text-3xl font-bold tracking-tight">VALCRONS</div>
<div className="flex gap-6 text-gray-400">
<Link href="#" className="hover:text-white">Live Triage</Link>
<Link href="#" className="hover:text-white">Experts</Link>
<Link href="#" className="hover:text-white">Resources</Link>
</div>
<button className="bg-industrial-blue px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition">
Contact
</button>
</nav>

{/* Hero Section */}
<h1 className="text-7xl font-bold mb-6 tracking-tight text-center leading-tight">
INDUSTRIAL EXPERTISE.
<br />
<span className="text-industrial-blue">INSTANTLY CONNECTED.</span>
</h1>

<p className="text-gray-400 text-xl mb-12 max-w-3xl text-center leading-relaxed">
Valcrons is Silicon Valley's precision platform for critical factory repairs, remote diagnosis, and certified technician dispatch.
</p>

<div className="flex gap-4 mb-16">
<Link href="/dashboard/client" className="bg-industrial-copper px-10 py-4 rounded-xl font-bold hover:opacity-90 transition shadow-lg">
Post a Request
</Link>
<Link href="/dashboard/technician" className="border border-industrial-slate px-10 py-4 rounded-xl font-bold hover:bg-industrial-slate transition">
Technician Dashboard
</Link>
</div>

{/* منطقة "Live Diagnosis" (Placeholder) */}
<div className="w-full max-w-7xl bg-industrial-slate p-8 rounded-3xl border border-gray-700 flex gap-8 items-center">
<div className="w-1/2 aspect-video bg-black rounded-xl overflow-hidden border border-industrial-blue flex items-center justify-center">
{/* هنا سنضع كود الـ WebRTC لاحقاً */}
<span className="text-gray-700">Video feed preview</span>
</div>
<div className="w-1/2">
<h3 className="text-4xl font-semibold mb-4">1-Click Video Connect</h3>
<p className="text-gray-400 text-lg">Engineer video triage, assessment by engineer wide-intent, and using pen annotation tools.</p>
</div>
</div>
</main>
);
}
