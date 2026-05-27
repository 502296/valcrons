import type { ReactNode } from "react";

import {
  Settings,
  Search,
  MapPin,
  ShieldCheck,
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
  Phone,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function ValcronsLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-slate-300">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.22),transparent_34%),radial-gradient(circle_at_85%_35%,rgba(245,158,11,0.10),transparent_30%),linear-gradient(180deg,#05070b_0%,#07101a_55%,#05070b_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 shadow-[0_0_35px_rgba(245,158,11,0.12)]">
              <Settings className="h-5 w-5 text-amber-300" />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-wide text-white">
                VALCRONS
              </h1>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-500">
                Industrial Response Network
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 lg:flex">
            <a className="text-white" href="#">Live Triage</a>
            <a className="hover:text-white" href="#">Experts</a>
            <a className="hover:text-white" href="#">Assets</a>
            <a className="hover:text-white" href="#">Case Studies</a>
            <a className="hover:text-white" href="#">Resources</a>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
            Post a Request
          </button>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-6 lg:grid-cols-[1.08fr_0.92fr]">
        <HeroCommandCenter />
        <PostRequestCard />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-10 lg:grid-cols-[0.95fr_1.05fr]">
        <LiveSessionCard />
        <ExpertsCard />
      </section>
    </main>
  );
}

function HeroCommandCenter() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <p className="mb-3 text-sm font-semibold text-blue-400">
            Welcome back, Acme Manufacturing
          </p>

          <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white md:text-6xl">
            Industrial expertise.
            <span className="block text-blue-500">Instantly connected.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
            Connect with verified industrial experts for urgent repairs, remote
            diagnosis, asset support, and technician dispatch.
          </p>
        </div>

        <button className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-500 transition hover:text-white md:block">
          <Bell className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
          Start Live Diagnosis
        </button>
        <button className="rounded-xl border border-white/12 bg-white/[0.035] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/[0.07]">
          Post a Request
        </button>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#070c14]/80 px-4 py-3">
        <Search className="h-4 w-4 text-slate-500" />
        <span className="flex-1 text-sm text-slate-500">
          What equipment or issue do you need help with?
        </span>
        <button className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white">
          Search
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Metric title="Active Requests" value="12" note="+2 from yesterday" />
        <Metric title="In Progress" value="5" note="Live sessions now" />
        <Metric title="Completed" value="28" note="This month" />
        <Metric title="Available Experts" value="156" note="Online now" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <RecentRequests />
        <LiveMap />
      </div>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-lg shadow-black/20">
      <p className="text-xs font-medium text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-black tracking-tight text-white">{value}</h3>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function RecentRequests() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#080d15]/85 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-white">Recent Requests</h3>
        <span className="flex items-center gap-1 text-xs font-semibold text-blue-400">
          View all <ChevronRight className="h-3 w-3" />
        </span>
      </div>

      <div className="space-y-3">
        <RequestItem title="PLC Failure on Line 3" city="Detroit, MI" level="Critical" />
        <RequestItem title="Hydraulic Pressure Drop" city="Houston, TX" level="High" />
        <RequestItem title="Conveyor Motor Overheating" city="Chicago, IL" level="Medium" />
        <RequestItem title="Robotic Arm Calibration Issue" city="Atlanta, GA" level="Low" />
      </div>
    </div>
  );
}

function RequestItem({ title, city, level }: { title: string; city: string; level: string }) {
  const color =
    level === "Critical"
      ? "text-red-300 bg-red-500/12 border-red-500/25"
      : level === "High"
      ? "text-amber-300 bg-amber-500/12 border-amber-500/25"
      : level === "Medium"
      ? "text-blue-300 bg-blue-500/12 border-blue-500/25"
      : "text-emerald-300 bg-emerald-500/12 border-emerald-500/25";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3 transition hover:bg-white/[0.06]">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
          <FileText className="h-4 w-4 text-blue-300" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-slate-500">{city}</p>
        </div>
      </div>

      <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${color}`}>
        {level}
      </span>
    </div>
  );
}

function LiveMap() {
  return (
    <div className="relative min-h-[310px] overflow-hidden rounded-2xl border border-white/10 bg-[#07111d] p-5">
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <h3 className="font-bold text-white">Live Industrial Map</h3>
        <span className="text-xs font-semibold text-blue-400">View all</span>
      </div>

      <div className="absolute inset-5 top-16 rounded-2xl border border-blue-500/15 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.33),transparent_50%)]" />
      <div className="absolute inset-5 top-16 rounded-2xl bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <MapPin className="absolute left-[24%] top-[43%] h-7 w-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.65)]" />
      <MapPin className="absolute left-[55%] top-[55%] h-8 w-8 text-amber-300 drop-shadow-[0_0_16px_rgba(245,158,11,0.7)]" />
      <MapPin className="absolute left-[78%] top-[34%] h-6 w-6 text-cyan-300" />
      <MapPin className="absolute left-[38%] top-[66%] h-6 w-6 text-cyan-300" />
    </div>
  );
}

function PostRequestCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                  step === 1
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-white/10 text-slate-500"
                }`}
              >
                {step}
              </div>
              {step !== 4 && <div className="hidden h-px w-10 bg-white/10 sm:block" />}
            </div>
          ))}
        </div>

        <p className="text-xs font-semibold text-slate-500">
          Issue Details → Equipment → Location → Review
        </p>
      </div>

      <h3 className="text-2xl font-black tracking-tight text-white">Post a Request</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        Tell us about the issue so we can match you with the right expert.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <InputLabel label="What type of issue are you experiencing?" />
          <select className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d15] px-4 py-3 text-sm text-slate-400 outline-none transition focus:border-blue-500/50">
            <option>Select issue type</option>
            <option>Hydraulics</option>
            <option>Electrical</option>
            <option>SCADA / Controls</option>
            <option>Mechanical</option>
          </select>
        </div>

        <div>
          <InputLabel label="Describe the issue" />
          <textarea
            rows={5}
            placeholder="Provide as much detail as possible..."
            className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#080d15] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500/50"
          />
        </div>

        <div>
          <InputLabel label="How urgent is this?" />
          <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Urgency icon={<AlertTriangle className="h-4 w-4" />} text="Critical" tone="red" />
            <Urgency icon={<Radio className="h-4 w-4" />} text="High" tone="amber" />
            <Urgency icon={<Activity className="h-4 w-4" />} text="Medium" tone="blue" />
            <Urgency icon={<CheckCircle className="h-4 w-4" />} text="Low" tone="green" />
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-white/15 bg-[#080d15] p-8 text-center transition hover:border-blue-500/35">
          <Upload className="mx-auto mb-3 h-6 w-6 text-slate-500" />
          <p className="text-sm font-semibold text-slate-400">Click to upload or drag and drop</p>
          <p className="mt-1 text-xs text-slate-600">PNG, JPG, MP4 up to 300MB</p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-black text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500">
          Next Step <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function InputLabel({ label }: { label: string }) {
  return <label className="block text-sm font-bold text-slate-300">{label}</label>;
}

function Urgency({
  icon,
  text,
  tone,
}: {
  icon: ReactNode;
  text: string;
  tone: "red" | "amber" | "blue" | "green";
}) {
  const tones = {
    red: "hover:border-red-500/40 hover:bg-red-500/10",
    amber: "hover:border-amber-500/40 hover:bg-amber-500/10",
    blue: "hover:border-blue-500/40 hover:bg-blue-500/10",
    green: "hover:border-emerald-500/40 hover:bg-emerald-500/10",
  };

  return (
    <button className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm font-bold text-slate-300 transition ${tones[tone]}`}>
      {icon}
      {text}
    </button>
  );
}

function LiveSessionCard() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-white">Live Diagnosis Session</h3>
          <p className="mt-1 text-xs text-slate-500">Session ID: 8LQ-9481</p>
        </div>
        <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">
          ● LIVE
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_0.55fr]">
        <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#07111d]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_45%)]" />
          <Wrench className="relative h-20 w-20 text-blue-400/80" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#080d15] p-4">
          <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-white/[0.045]">
            <Users className="h-8 w-8 text-slate-500" />
          </div>

          <div className="space-y-3 text-sm">
            <p className="rounded-xl bg-white/[0.055] p-3 leading-6 text-slate-300">
              I see the hydraulic leak here. Please check the pressure at this point.
            </p>
            <p className="ml-auto rounded-xl bg-blue-600 p-3 leading-6 text-white">
              Will do, checking now.
            </p>
            <p className="rounded-xl bg-white/[0.055] p-3 leading-6 text-slate-300">
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

function SessionButton({
  icon,
  text,
  danger,
}: {
  icon: ReactNode;
  text: string;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-2 rounded-xl border border-white/10 py-3 transition ${
        danger
          ? "bg-red-500/10 text-red-300 hover:bg-red-500/15"
          : "bg-white/[0.035] hover:bg-white/[0.065]"
      }`}
    >
      <span className="h-4 w-4">{icon}</span>
      {text}
    </button>
  );
}

function ExpertsCard() {
  const experts = [
    ["Michael Anderson", "PLC & Automation Expert", "Detroit, MI", "8 years"],
    ["Sarah Johnson", "Hydraulic Systems Expert", "Houston, TX", "10 years"],
    ["David Chen", "Robotics Specialist", "Chicago, IL", "7 years"],
    ["James Wilson", "Mechanical Engineer", "Atlanta, GA", "12 years"],
  ];

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-black text-white">Verified Industrial Experts</h3>
          <p className="mt-1 text-sm text-slate-500">
            Find the right expert for your equipment and issue.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#080d15] px-4 py-2">
          <Search className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-500">Search experts...</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {experts.map(([name, role, city, exp]) => (
          <div
            key={name}
            className="rounded-2xl border border-white/10 bg-[#080d15] p-4 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-[#0b1320]"
          >
            <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700/40 to-slate-950">
              <Users className="h-9 w-9 text-slate-500" />
            </div>

            <h4 className="font-black text-white">{name}</h4>
            <p className="mt-1 text-xs font-medium text-slate-400">{role}</p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" /> {city}
              </p>
              <p className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" /> {exp} experience
              </p>
              <p className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </p>
            </div>

            <button className="mt-4 w-full rounded-xl border border-white/10 py-2.5 text-sm font-bold text-white transition hover:bg-white/5">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
