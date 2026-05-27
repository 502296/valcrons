export default function Home() {
return (
<main className="min-h-screen bg-industrial-charcoal text-industrial-text p-8">
{/* الهيدر */}
<nav className="flex justify-between items-center mb-20">
<h1 className="text-2xl font-bold tracking-tighter">VALCRONS</h1>
<div className="space-x-6">
<a href="#" className="hover:text-industrial-blue">Live Triage</a>
<a href="#" className="hover:text-industrial-blue">Experts</a>
<a href="/dashboard/client" className="bg-industrial-blue px-4 py-2 rounded">Technician Dashboard</a>
</div>
</nav>

{/* القسم الرئيسي */}
<section className="max-w-4xl">
<h2 className="text-6xl font-bold mb-6">INDUSTRIAL EXPERTISE.<br/>INSTANTLY CONNECTED.</h2>
<p className="text-xl text-gray-400 mb-10">
Precision platform for critical factory repairs, remote diagnosis, and certified technician dispatch.
</p>
<button className="bg-industrial-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition">
Start Video Diagnosis
</button>
</section>
</main>
);
}
