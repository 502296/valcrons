export default function Home() {
return (
<main className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center p-8">
<h1 className="text-6xl font-bold mb-6 tracking-tight">VALCRONS</h1>
<p className="text-gray-400 text-xl mb-12 max-w-xl text-center leading-relaxed">
Industrial service connection platform for factories, technicians, and urgent maintenance requests.
</p>

<div className="flex gap-4">
<a href="/dashboard/client" className="bg-[#007AFF] px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition shadow-lg">
Post a Request
</a>
<a href="/dashboard/technician" className="border border-[#2A2A2A] px-8 py-4 rounded-lg font-semibold hover:bg-[#2A2A2A] transition">
Technician Dashboard
</a>
</div>
</main>
);
}
