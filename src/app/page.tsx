export default function Home() {
return (
<main className="flex min-h-screen flex-col items-center justify-center bg-industrial-charcoal p-12">
{/* Title */}
<h1 className="text-6xl font-bold text-white mb-6 tracking-tight">VALCRONS</h1>

{/* Description */}
<p className="text-gray-400 text-xl mb-12 max-w-lg text-center">
Industrial service connection platform for factories, technicians, and urgent maintenance requests.
</p>

{/* Buttons */}
<div className="flex gap-4">
<button className="bg-industrial-blue text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg">
Post a Request
</button>
<button className="border border-industrial-slate text-white px-8 py-3 rounded-lg font-semibold hover:bg-industrial-slate transition">
Technician Dashboard
</button>
</div>
</main>
);
}
