import Image from 'next/image';
import { Search, MapPin, Target, Settings, Briefcase, Phone, Users, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';

export default function ValcronsLandingPage() {
return (
<main className="min-h-screen bg-[#050509] text-[#AAB5CB] font-sans">
{/* Navigation */}
<nav className="fixed top-0 left-0 right-0 bg-[#0A0A12]/80 backdrop-blur-md border-b border-[#1F223B] z-50">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
<div className="flex items-center gap-10">
<div className="text-white text-3xl font-bold flex items-center gap-2">
<Settings className="w-8 h-8 text-[#4E6DF0]" />
Valcrons
</div>
<div className="hidden md:flex items-center gap-6 text-sm font-medium">
<a href="#" className="hover:text-white">Live Trips</a>
<a href="#" className="hover:text-white">Assets</a>
<a href="#" className="hover:text-white">Experts</a>
<a href="#" className="hover:text-white">Live Stations</a>
<a href="#" className="hover:text-white">Resources</a>
</div>
</div>
<div className="flex items-center gap-4">
<button className="text-[#4E6DF0] text-sm font-semibold">Track a Shipment</button>
<button className="bg-[#4E6DF0] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">Post a Request</button>
</div>
</div>
</nav>

<div className="pt-24 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">

{/* Sidebar */}
<aside className="md:col-span-3 space-y-6">
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<h3 className="text-white text-lg font-bold mb-4">Quick Insights</h3>
<div className="grid grid-cols-2 gap-4">
<StatCard label="Live Services" value="12" active />
<StatCard label="On-Premise" value="5" />
<StatCard label="Completed" value="28" />
<StatCard label="Total Projects" value="156" />
</div>
</div>
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B] space-y-4">
<div className="flex items-center gap-3 p-3 rounded-xl bg-[#1F223B]/30 text-white cursor-pointer"><Settings className="w-5 h-5"/> Settings</div>
<div className="flex items-center gap-3 p-3 rounded-xl text-[#AAB5CB] hover:text-white cursor-pointer"><Briefcase className="w-5 h-5"/> Projects</div>
<div className="flex items-center gap-3 p-3 rounded-xl text-[#AAB5CB] hover:text-white cursor-pointer"><Users className="w-5 h-5"/> Experts</div>
<div className="flex items-center gap-3 p-3 rounded-xl text-[#AAB5CB] hover:text-white cursor-pointer"><Phone className="w-5 h-5"/> Remote Support</div>
</div>
</aside>

{/* Main Content */}
<section className="md:col-span-9 space-y-8">

<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<div className="flex items-center justify-between mb-6">
<h2 className="text-white text-2xl font-bold">Industrial Expertise Network</h2>
<div className="flex items-center gap-4">
<div className="flex items-center gap-2 bg-[#111221] px-4 py-2 rounded-xl border border-[#1F223B]">
<Search className="w-4 h-4 text-[#AAB5CB]" />
<input type="text" placeholder="Search assets..." className="bg-transparent border-none outline-none text-sm text-white w-40" />
</div>
</div>
</div>
<div className="aspect-[2/1] bg-[#111221] rounded-2xl border border-[#1F223B] flex items-center justify-center relative overflow-hidden">
{/* نستخدم أيقونة كمؤشر مكاني بدل الصورة المفقودة */}
<MapPin className="w-12 h-12 text-[#4E6DF0] animate-pulse" />
<div className="absolute top-10 left-1/4 bg-[#4E6DF0] text-white px-3 py-1 rounded-full text-[10px] font-bold">Live Request</div>
</div>
</div>

<div className="grid md:grid-cols-2 gap-8">
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<h3 className="text-white text-lg font-bold mb-4">Post a Request</h3>
<div className="space-y-4">
<input type="text" placeholder="Title for your request..." className="w-full bg-[#111221] border border-[#1F223B] p-3.5 rounded-xl text-white outline-none" />
<textarea placeholder="Describe the issue..." rows={3} className="w-full bg-[#111221] border border-[#1F223B] p-3.5 rounded-xl text-white outline-none"></textarea>
<button className="w-full bg-[#4E6DF0] text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition-all">Post Request</button>
</div>
</div>
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<div className='flex items-center justify-between mb-4'>
<h3 className="text-white text-lg font-bold">Verified Experts</h3>
<span className="text-xs text-[#4E6DF0] cursor-pointer">See All</span>
</div>
<div className="space-y-3">
<ExpertItem name="Mark Jackson" title="Machinery Specialist" />
<ExpertItem name="Sarah Williams" title="SCADA Systems" />
<ExpertItem name="David Chen" title="Hydraulics Expert" />
</div>
</div>
</div>

<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<h3 className="text-white text-lg font-bold mb-6">Real-Time Industrial Status</h3>
<div className="space-y-4">
<StatusCard status="active" title="Remote Service: #6742 Hydraulic Pressure" expert="David Chen" time="1hr 12min" />
<StatusCard status="pending" title="Scheduled Maintenance: #3210 Cooling" expert="Sarah Williams" time="Starts: 2hrs" />
<StatusCard status="completed" title="Completed: #1105 Electrical Panel" expert="Mark Jackson" time="Closed: 1hr ago" />
</div>
</div>
</section>
</div>
</main>
);
}

// --- Components ---

function StatCard({ label, value, active }: { label: string; value: string; active?: boolean }) {
return (
<div className={`p-4 rounded-xl border border-[#1F223B] flex flex-col justify-between h-24 ${active ? 'bg-[#4E6DF0] text-white' : 'bg-[#111221] text-[#AAB5CB]'}`}>
<span className="text-2xl font-bold">{value}</span>
<span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
</div>
);
}

function ExpertItem({ name, title }: { name: string; title: string }) {
return (
<div className='flex items-center gap-3 p-3 rounded-xl bg-[#111221] border border-[#1F223B]'>
<div className='w-10 h-10 rounded-full bg-[#1F223B] flex items-center justify-center text-white text-xs font-bold'>
{name.charAt(0)}
</div>
<div className='flex-1'>
<div className='text-sm text-white font-medium'>{name}</div>
<div className='text-[11px] text-[#AAB5CB]'>{title}</div>
</div>
<CheckCircle className="w-4 h-4 text-[#4E6DF0]" />
</div>
);
}

function StatusCard({ status, title, expert, time }: { status: 'active' | 'pending' | 'completed'; title: string; expert: string; time: string }) {
const colors = {
active: 'text-emerald-400',
pending: 'text-amber-400',
completed: 'text-[#4E6DF0]'
};

return (
<div className="bg-[#111221] p-5 rounded-xl border border-[#1F223B] flex gap-4 items-center">
<div className={`p-3 rounded-lg bg-[#1F223B] ${colors[status]}`}>
{status === 'active' ? <Clock className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
</div>
<div className="flex-1">
<div className="flex items-center justify-between">
<h4 className="text-white text-sm font-semibold">{title}</h4>
<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#050509] border border-[#1F223B] ${colors[status]}`}>
{status.toUpperCase()}
</span>
</div>
<p className="text-xs text-[#AAB5CB] mt-1">Expert: <span className="text-white">{expert}</span> • {time}</p>
</div>
</div>
);
}
