import {
  Settings,
  Search,
  MapPin,
  ShieldCheck,
  Clock,
  FileText,
  Users,
  Radio,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Activity,
  Video,
  Upload,
  ArrowRight,
  Bell,
  phone,
} from "lucide-react";

export default function ValcronsLandingPage() {
  return (
    <main className="min-h-screen bg-[#05070b] text-slate-300">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.09),transparent_30%)]" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10">
              <Settings className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-white">VALCRONS</h1>
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                Industrial Response Network
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
            <a className="text-white" href="#">Live Triage</a>
            <a className="hover:text-white" href="#">Experts</a>
            <a className="hover:text-white" href="#">Assets</a>
            <a className="hover:text-white" href="#">Case Studies</a>
            <a className="hover:text-white" href="#">Resources</a>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500">
            Post a Request
          </button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-400">Welcome back, Acme Manufacturing</p>
              <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
                Find verified industrial experts before downtime becomes expensive.
              </h2>
            </div>
            <Bell className="hidden h-5 w-5 text-slate-500 md:block" />
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <Metric title="Active Requests" value="12" note="+2 from yesterday" />
            <Metric title="In Progress" value="5" note="Live sessions now" />
            <Metric title="Completed" value="28" note="This month" />
            <Metric title="Available Experts" value="156" note="Online now" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-[#0a0f18]/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Recent Requests</h3>
                <span className="text-xs text-blue-400">View all</span>
              </div>

              <div className="space-y-3">
                <RequestItem title="PLC Failure on Line 3" city="Detroit, MI" level="Critical" />
                <RequestItem title="Hydraulic Pressure Drop" city="Houston, TX" level="High" />
                <RequestItem title="Conveyor Motor Overheating" city="Chicago, IL" level="Medium" />
                <RequestItem title="Robotic Arm Calibration Issue" city="Atlanta, GA" level="Low" />
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Live Industrial Map</h3>
                <span className="text-xs text-blue-400">View all</span>
              </div>

              <div className="absolute inset-x-8 bottom-8 top-16 rounded-2xl border border-blue-500/10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_55%)]">
                <MapPin className="absolute left-[20%] top-[35%] h-6 w-6 text-blue-400" />
                <MapPin className="absolute left-[58%] top-[50%] h-7 w-7 text-amber-400" />
                <MapPin className="absolute left-[78%] top-[28%] h-5 w-5 text-blue-400" />
                <MapPin className="absolute left-[40%] top-[66%] h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        <PostRequestCard />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <LiveSessionCard />
        <ExpertsCard />
      </section>
    </main>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function RequestItem({ title, city, level }: { title: string; city: string; level: string }) {
  const color =
    level === "Critical"
      ? "text-red-400 bg-red-500/10 border-red-500/20"
      : level === "High"
      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
      : level === "Medium"
      ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
      : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-3">
        <FileText className="h-4 w-4 text-slate-500" />
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-xs text-slate-500">{city}</p>
        </div>
      </div>
      <span className={`rounded-full border px-2 py-1 text-[10px] ${color}`}>{level}</span>
    </div>
  );
}

function PostRequestCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={`h-8 w-8 rounded-full text-center text-sm leading-8 ${step === 1 ? "bg-blue-600 text-white" : "bg-white/10 text-slate-500"}`}>
              {step}
            </div>
          ))}
        </div>
        <span className="text-xs text-slate-500">Issue Details → Equipment → Location → Review</span>
      </div>

      <h3 className="text-2xl font-bold text-white">Post a Request</h3>
      <p className="mt-2 text-sm text-slate-400">Tell us about the issue so we can match you with the right expert.</p>

      <div className="mt-6 space-y-5">
        <InputLabel label="What type of issue are you experiencing?" />
        <select className="w-full rounded-xl border border-white/10 bg-[#080d15] px-4 py-3 text-sm text-slate-400 outline-none">
          <option>Select issue type</option>
          <option>Hydraulics</option>
          <option>Electrical</option>
          <option>SCADA / Controls</option>
          <option>Mechanical</option>
        </select>

        <InputLabel label="Describe the issue" />
        <textarea
          rows={5}
          placeholder="Provide as much detail as possible..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#080d15] px-4 py-3 text-sm text-white outline-none"
        />

        <InputLabel label="How urgent is this?" />
        <div className="grid grid-cols-4 gap-3">
          <Urgency icon={<AlertTriangle className="h-4 w-4" />} text="Critical" />
          <Urgency icon={<Radio className="h-4 w-4" />} text="High" />
          <Urgency icon={<Activity className="h-4 w-4" />} text="Medium" />
          <Urgency icon={<CheckCircle className="h-4 w-4" />} text="Low" />
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-[#080d15] p-8 text-center">
          <Upload className="mx-auto mb-3 h-6 w-6 text-slate-500" />
          <p className="text-sm text-slate-400">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-slate-600">PNG, JPG, MP4 up to 300MB</p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500">
          Next Step <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function InputLabel({ label }: { label: string }) {
  return <label className="block text-sm font-medium text-slate-300">{label}</label>;
}

function Urgency({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-slate-300 hover:border-blue-500/40 hover:bg-blue-500/10">
      {icon}
      {text}
    </button>
  );
}

function LiveSessionCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Live Diagnosis Session</h3>
          <p className="text-xs text-slate-500">Session ID: 8LQ-9481</p>
        </div>
        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">● LIVE</span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.55fr]">
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-white/10 bg-[#07111d]">
          <Wrench className="h-16 w-16 text-blue-400/70" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#080d15] p-4">
          <div className="mb-4 h-28 rounded-xl bg-white/5" />
          <div className="space-y-3 text-sm">
            <p className="rounded-xl bg-white/5 p-3 text-slate-300">
              I see the hydraulic leak here. Please check the pressure at this point.
            </p>
            <p className="ml-auto rounded-xl bg-blue-600 p-3 text-white">
              Will do, checking now.
            </p>
            <p className="rounded-xl bg-white/5 p-3 text-slate-300">
              The seal looks worn. You may need to replace it.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-3 text-xs text-slate-400">
        <SessionButton icon={<Radio />} text="Mute" />
        <SessionButton icon={<Video />} text="Video" />
        <SessionButton icon={<Users />} text="Share" />
        <SessionButton icon={<FileText />} text="Files" />
        <SessionButton icon={<Phone />} text="End" danger />
      </div>
    </div>
  );
}

function SessionButton({ icon, text, danger }: { icon: React.ReactNode; text: string; danger?: boolean }) {
  return (
    <button className={`flex flex-col items-center gap-2 rounded-xl border border-white/10 py-3 ${danger ? "bg-red-500/10 text-red-400" : "bg-white/[0.03]"}`}>
      <span className="h-4 w-4">{icon}</span>
      {text}
    </button>
  );
}

function ExpertsCard() {
  const experts = [
    ["Michael Anderson", "PLC & Automation Expert", "Detroit, MI"],
    ["Sarah Johnson", "Hydraulic Systems Expert", "Houston, TX"],
    ["David Chen", "Robotics Specialist", "Chicago, IL"],
    ["James Wilson", "Mechanical Engineer", "Atlanta, GA"],
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">Verified Industrial Experts</h3>
          <p className="text-sm text-slate-500">Find the right expert for your equipment and issue.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#080d15] px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-500">Search experts...</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {experts.map(([name, role, city]) => (
          <div key={name} className="rounded-2xl border border-white/10 bg-[#080d15] p-4">
            <div className="mb-4 h-24 rounded-xl bg-gradient-to-br from-slate-700/40 to-slate-900" />
            <h4 className="font-semibold text-white">{name}</h4>
            <p className="mt-1 text-xs text-slate-400">{role}</p>
            <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="h-3 w-3" /> {city}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> Verified
            </p>
            <button className="mt-4 w-full rounded-xl border border-white/10 py-2 text-sm text-white hover:bg-white/5">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
