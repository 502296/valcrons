import {
  ArrowRight,
  Search,
  ShieldCheck,
  Radio,
  LockKeyhole,
  Settings,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#05070b] text-white overflow-hidden">
      <div className="fixed inset-0 -z-30 bg-[url('/industrial-bg.jpg')] bg-cover bg-center opacity-55" />
      <div className="fixed inset-0 -z-20 bg-[#05070b]/55" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(0,122,255,0.18),transparent_38%)]" />

      <div className="mx-auto max-w-[1120px] px-5 py-5">
        <nav className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-3 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FF9500]/30 bg-[#FF9500]/10">
              <Settings className="h-4 w-4 text-[#FF9500]" />
            </div>

            <div>
              <h1 className="text-base font-black tracking-wide">VALCRONS</h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-slate-500">
                Industrial Maintenance Network
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-xs font-semibold text-slate-400 md:flex">
            <a href="/live" className="hover:text-white">Live Triage</a>
            <a href="/experts" className="hover:text-white">Experts</a>
            <a href="#" className="hover:text-white">Case Studies</a>
            <a href="#" className="hover:text-white">Resources</a>
          </div>

          <a
            href="/request"
            className="flex items-center gap-1 rounded-lg bg-[#007AFF] px-4 py-2 text-xs font-bold text-white hover:bg-blue-500"
          >
            Post a Request <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        <section className="relative overflow-hidden rounded-[30px] border border-white/10 bg-black/25 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

          <div className="relative mx-auto flex min-h-[520px] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
            <p className="mb-5 text-[10px] font-black uppercase tracking-[0.32em] text-[#FF9500]">
              Industrial Maintenance Network
            </p>

            <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-[58px]">
              Industrial expertise.
              <span className="block text-[#007AFF]">
                Instantly connected.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Connect factories with verified industrial experts for critical
              repairs, remote diagnosis, asset support, and technician dispatch.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/live"
                className="rounded-xl bg-[#007AFF] px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
              >
                Start Live Diagnosis
              </a>

              <a
                href="/request"
                className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white backdrop-blur-xl hover:bg-white/10"
              >
                Post a Request
              </a>
            </div>

            <div className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-2xl">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                placeholder="What equipment or issue do you need help with?"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="rounded-xl bg-[#007AFF] px-4 py-2 text-xs font-bold text-white hover:bg-blue-500">
                Search
              </button>
            </div>

            <div className="mt-8 grid w-full gap-3 md:grid-cols-3">
              <InfoCard
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Verified Experts"
                text="Credentialed industrial professionals."
              />
              <InfoCard
                icon={<Radio className="h-4 w-4" />}
                title="Real-time Matching"
                text="Smart routing to the right expert."
              />
              <InfoCard
                icon={<LockKeyhole className="h-4 w-4" />}
                title="Secure & Direct"
                text="Connect directly and privately."
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left backdrop-blur-2xl">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#007AFF]">
        {icon}
      </div>
      <h3 className="text-sm font-black">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-slate-400">{text}</p>
    </div>
  );
}
