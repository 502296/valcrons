import Image from 'next/image';
import { Search, MapPin, Target, Settings, Briefcase, Phone, Users, CheckCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import './globals.css'; // تأكد من إنشاء هذا الملف

export default function ValcronsLandingPage() {
return (
<main className="min-h-screen bg-[#050509] text-[#AAB5CB] font-inter">
{/* --- 1. Global Navigation (من القسم الأوسط-الأعلى في الصورة) --- */}
<nav className="fixed top-0 left-0 right-0 bg-[#0A0A12]/80 backdrop-blur-md border-b border-[#1F223B] z-50">
<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
<div className="flex items-center gap-10">
<div className="text-white text-3xl font-bold flex items-center gap-2">
{/* <Image src="/valcrons_logo.png" alt="Valcrons Logo" width={30} height={30} /> */}
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

{/* --- 2. Side Panel Area (من القسم الأوسط في الصورة) --- */}
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
<a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-[#1F223B]/30 text-white"><Settings/> Settings</a>
<a href="#" className="flex items-center gap-3 p-3 rounded-xl text-AAB5CB hover:text-white"><Briefcase/> Projects</a>
<a href="#" className="flex items-center gap-3 p-3 rounded-xl text-AAB5CB hover:text-white"><Users/> Experts</a>
<a href="#" className="flex items-center gap-3 p-3 rounded-xl text-AAB5CB hover:text-white"><Phone/> Remote Support</a>
</div>
</aside>

{/* --- 3. Main Content Area --- */}
<section className="md:col-span-9 space-y-8">

{/* --- A. Global Map Section (من القسم الأوسط في الصورة) --- */}
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<div className="flex items-center justify-between mb-6">
<h2 className="text-white text-2xl font-bold">Industrial Expertise Network</h2>
<div className="flex items-center gap-2">
<MapPin className="text-[#4E6DF0]" />
<span className="text-white">Search by location or asset ID...</span>
<Search className="text-[#AAB5CB]" />
</div>
</div>
{/* Map Placeholder */}
<div className="aspect-[2/1] bg-[#111221] rounded-2xl border-2 border-dashed border-[#1F223B] flex items-center justify-center relative">
<Image src="/placeholder_map.svg" alt="Map View" fill className="object-cover opacity-50" />
<Target className="w-10 h-10 text-[#4E6DF0]" />
<div className="absolute top-10 left-20 bg-[#4E6DF0] text-white p-2 rounded-lg text-xs">Live Request - LA Plant</div>
<div className="absolute bottom-10 right-20 bg-[#4E6DF0] text-white p-2 rounded-lg text-xs">Expert - NYC Hub</div>
</div>
</div>

{/* --- B. Post a Request (من القسم الأيمن-الأعلى في الصورة) --- */}
<div className="grid md:grid-cols-2 gap-8">
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<h3 className="text-white text-lg font-bold mb-4">Post a Request</h3>
<form className="space-y-4">
<input type="text" placeholder="Title for your request..." className="w-full bg-[#111221] border border-[#1F223B] p-3.5 rounded-xl placeholder-[#50577D]" />
<textarea placeholder="Describe the issue..." rows={4} className="w-full bg-[#111221] border border-[#1F223B] p-3.5 rounded-xl placeholder-[#50577D]"></textarea>
<div className="grid grid-cols-2 gap-4">
<input type="date" className="bg-[#111221] border border-[#1F223B] p-3 rounded-xl text-white" />
<input type="text" placeholder="Location/Asset ID" className="w-full bg-[#111221] border border-[#1F223B] p-3 rounded-xl placeholder-[#50577D]" />
</div>
<button type="submit" className="w-full bg-[#4E6DF0] text-white p-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">Post Request</button>
</form>
</div>
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<div className='flex items-center justify-between mb-4'>
<h3 className="text-white text-lg font-bold">Verified Experts</h3>
<button className="text-sm font-semibold text-[#4E6DF0]">See All</button>
</div>
<div className="space-y-4">
<ExpertItem name="Mark Jackson" title="Industrial Machinery Specialist" active/>
<ExpertItem name="Sarah Williams" title="SCADA & PLC Systems" active/>
<ExpertItem name="David Chen" title="Hydraulics Expert" active/>
<ExpertItem name="Jessica Kim" title="HVAC Engineering" active/>
</div>
</div>
</div>

{/* --- C. Dynamic Dashboard Feed (من القسم الأيسر في الصورة) --- */}
<div className="bg-[#0A0A12] p-6 rounded-2xl border border-[#1F223B]">
<h3 className="text-white text-lg font-bold mb-6">Real-Time Industrial Status</h3>
<div className="space-y-6">
<StatusCard status="active" title="Remote Service: #6742 Hydraulic Pressure Drop" expert="David Chen" time="Active for: 1hr 12min" />
<StatusCard status="pending" title="Scheduled Maintenance: #3210 Cooling System Check" expert="Sarah Williams" time="Starts: 2hrs" />
<StatusCard status="completed" title="Completed: #1105 Electrical Panel Inspection" expert="Mark Jackson" time="Closed: 1hr ago" />
<StatusCard status="active" title="Remote Service: #4192 Bearing Temperature High" expert="David Chen" time="Active for: 1hr 12min" />
</div>
</div>

{/* --- D. Live Trip Support (من القسم الأيسر-الأعلى في الصورة) --- */}
<div className="bg-[#0A0A12] p-8 rounded-2xl border border-[#1F223B]">
<div className="max-w-xl text-center mx-auto space-y-6">
<AlertCircle className="w-16 h-16 text-[#4E6DF0] mx-auto opacity-70"/>
<h1 className="text-white text-5xl font-extrabold tracking-tighter">INDUSTRIAL EXPERTISE.<br/>INSTANTLY CONNECTED.</h1>
<p className="text-xl text-[#AAB5CB] leading-relaxed">Instantly connect with remote industrial experts for real-time video diagnosis, on-site support, and technical expertise.</p>
<div className="flex items-center gap-4 justify-center">
<button className="bg-[#4E6DF0] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-600 transition-colors">Start Live Service</button>
<button className="border border-[#1F223B] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1F223B] transition-colors">Learn More &rarr;</button>
</div>
</div>
</div>

</section>
</div>
</main>
);
}

// --- Component Props Interfaces ---
interface StatCardProps { label: string; value: string; active?: boolean; }
interface ExpertItemProps { name: string; title: string; active?: boolean; }
interface StatusCardProps { status: 'active' | 'pending' | 'completed'; title: string; expert: string; time: string; }

// --- Sub-components (يمكنك فصلها إلى ملفات لاحقاً) ---

const StatCard = ({ label, value, active }: StatCardProps) => (
<div className={`p-4 rounded-xl border border-[#1F223B] flex flex-col justify-between h-28 ${active ? 'bg-[#1F223B]' : 'bg-[#111221]'}`}>
<span className={`${active ? 'text-white' : 'text-[#AAB5CB]'} text-2xl font-bold`}>{value}</span>
<span className="text-xs text-[#AAB5CB] leading-tight">{label}</span>
</div>
);

const ExpertItem = ({ name, title, active }: ExpertItemProps) => (
<div className='flex items-center gap-3.5 p-3 rounded-xl bg-[#111221] border border-[#1F223B]'>
<div className='w-12 h-12 rounded-full bg-[#1F223B] border-2 border-[#1F223B]'></div>
<div className='flex-1'>
<div className='text-sm text-white font-semibold'>{name}</div>
<div className='text-xs text-[#AAB5CB]'>{title}</div>
</div>
{active && <CheckCircle className="w-5 h-5 text-[#4E6DF0]" />}
</div>
);

const StatusCard = ({ status, title, expert, time }: StatusCardProps) => {
const statusConfig = {
active: { color: 'text-emerald-400', label: 'Active Service', icon: Clock },
pending: { color: 'text-amber-400', label: 'Pending Maintenance', icon: Briefcase },
completed: { color: 'text-[#4E6DF0]', label: 'Closed Request', icon: FileText },
};

const current = statusConfig[status];
const StatusIcon = current.icon;

return (
<div className="bg-[#111221] p-5 rounded-xl border border-[#1F223B] flex gap-4 items-start">
<div className={`p-3 rounded-xl bg-[#1F223B] ${current.color}`}>
<StatusIcon className="w-6 h-6" />
</div>
<div className="flex-1 space-y-1.5">
<div className="flex items-center justify-between">
<h4 className="text-white text-md font-semibold tracking-tight">{title}</h4>
<span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-[#1F223B] border border-[#1F223B] ${current.color}`}>
{current.label}
</div>
</div>
<p className="text-sm text-[#AAB5CB]">Expert assigned: <span className="text-white">{expert}</span> • {time}</p>
</div>
</div>
);
};
