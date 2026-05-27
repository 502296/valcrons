import type { ReactNode } from "react";

import {
  Settings,
  Search,
  ShieldCheck,
  LockKeyhole,
  Radio,
  ArrowRight,
} from "lucide-react";

export default function ValcronsLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] px-4 py-5 text-slate-200 antialiased">
      <div className="fixed inset-0 -z-20 bg-[url('/industrial-bg.jpg')] bg-cover bg-center opacity-45" />
      <div className="fixed inset-0 -z-10 bg-[#020617]/70" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(37,99,235,0.22),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.85))]" />

      <div className="mx-auto max-w-[1320px]">
        <nav className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-5 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10">
              <Settings className="h-4 w-4 text-amber-300" />
            </div>

            <div>
              <h1 className="text-base font-black tracking-wider text-white">
                VALCRONS
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-slate-500">
                Industrial Maintenance Network
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-xs font-semibold text-slate-400 md:flex">
            <a href="/live" className="hover:text-white">Live Triage</a>
            <a href="/experts" className="hover:text-white">Experts</a>
            <a href="#" className="hover:text-white">Case Studies</a>
            <a href="#" className="hover:text-white">Resources</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden text-xs font-semibold text-slate-300 hover:text-white sm:block">
              Log in
            </button>

            <a
              href="/request"
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500"
            >
              Post a Request <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </nav>

        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-[url('/industrial-bg.jpg')] bg-cover bg-center opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/35 via-[#020617]/70 to-[#020617]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_42%)]" />

          <div className="relative mx-auto flex min-h-[520px] max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-5 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-amber-300">
              Industrial Maintenance Network
            </div>

            <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white md:text-7xl">
              Industrial expertise.
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Instantly connected.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Connect with verified industrial experts for critical repairs,
              remote diagnosis, asset support, and technician dispatch.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/live"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500"
              >
                Start Live Diagnosis
              </a>

              <a
                href="/request"
                className="rounded-xl border border-white/15 bg-black/25 px-6 py-3 text-sm font-black text-white backdrop-blur-xl hover:bg-white/10"
              >
                Post a Request
              </a>
            </div>

            <div className="mt-8 flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 shadow-2xl backdrop-blur-2xl">
              <Search className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                placeholder="What equipment or issue do you need help with?"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-black text-white hover:bg-blue-500">
                Search
              </button>
            </div>

            <div className="mt-9 grid w-full gap-4 md:grid-cols-3">
              <TrustCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Verified Experts"
                text="Credentialed and experienced industrial professionals."
              />
              <TrustCard
                icon={<Radio className="h-5 w-5" />}
                title="Real-time Matching"
                text="Smart routing connects you with the right expert fast."
              />
              <TrustCard
                icon={<LockKeyhole className="h-5 w-5" />}
                title="Secure & Direct"
                text="You connect directly with experts. We stay out of it."
              />
            </div>
          </div>

          <div className="relative border-t border-white/10 bg-black/25 px-6 py-7 backdrop-blur-2xl">
            <p className="mb-5 text-center text-[10px] font-black uppercase tracking-[0.28em] text-slate-500">
              How it works
            </p>

            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
              <Step number="01" title="Post Your Issue" text="Describe your equipment and problem in minutes." />
              <Step number="02" title="Get Matched" text="We connect you with the best available experts." />
              <Step number="03" title="Connect Instantly" text="Start a live video session and get expert help." />
              <Step number="04" title="Solve & Continue" text="You and the expert handle the solution together." />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function TrustCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-left shadow-xl shadow-black/20 backdrop-blur-2xl">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-blue-300">
        {icon}
      </div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
        {number}
      </div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}
