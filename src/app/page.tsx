export default function Home() {
return (
<main className="min-h-screen bg-industrial-charcoal text-industrial-text p-12">
{/* الهيدر الاحترافي */}
<nav className="flex justify-between items-center mb-24">
<h1 className="text-3xl font-bold tracking-tighter text-white">VALCRONS</h1>
<div className="space-x-8">
<a href="#" className="hover:text-industrial-blue transition">Live Triage</a>
<a href="#" className="hover:text-industrial-blue transition">Experts</a>
<a href="/dashboard/client" className="bg-industrial-blue px-6 py-2 rounded-full font-bold hover:bg-blue-600 transition">
Technician Dashboard
</a>
</div>
</nav>

{/* القسم الرئيسي */}
<section className="max-w-4xl">
<h2 className="text-7xl font-extrabold mb-8 leading-tight">
INDUSTRIAL EXPERTISE.<br/>
<span className="text-industrial-blue">INSTANTLY CONNECTED.</span>
</h2>
<p className="text-xl text-gray-400 mb-12 max-w-2xl">
Silicon Valley's precision platform for critical factory repairs, remote diagnosis, and certified technician dispatch.
</p>

{/* الأزرار الاحترافية */}
<div className="flex gap-6">
<a href="/diagnosis" className="bg-industrial-blue text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-900/20">
Start Video Diagnosis
</a>
<button className="border border-gray-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-industrial-slate transition">
Learn More
</button>
</div>
</section>
</main>
);
}
