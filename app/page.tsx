export default function Home() {
return (
<main className="flex min-h-screen flex-col items-center justify-center p-24">
<h1 className="text-5xl font-bold mb-6">VALCRONS</h1>
<p className="text-gray-400 mb-10">Industrial service connection platform.</p>

<div className="flex gap-4">
<button className="bg-[var(--accent-color)] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
Post a Request
</button>
<button className="border border-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
Technician Dashboard
</button>
</div>
</main>
);
}
