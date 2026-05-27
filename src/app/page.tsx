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
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-200 antialiased selection:bg-blue-500/30">
      <div className="fixed inset-0 -z-20 bg-[url('/industrial-bg.jpg')] bg-cover bg-center opacity-35" />
      <div className="fixed inset-0 -z-10 bg-[#030712]/70" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_38%),radial-gradient(circle_at_70%_55%,rgba(6,182,212,0.10),transparent_38%),radial-gradient(circle_at_50%_-10%,rgba(245,158,11,0.06),transparent_30%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000_60%,transparent_100%)]" />

      <nav className="sticky top-0 z-50 mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-6 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-500/10">
              <Settings className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <h1 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-xl font-black tracking-wider text-transparent">
                VALCRONS
              </h1>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
                Industrial Maintenance Network
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 lg:flex">
            <a className="transition hover:text-white" href="/live">
              Live Triage
            </a>
            <a className="transition hover:text-white" href="/experts">
              Experts
            </a>
            <a className="transition hover:text-white" href="#">
              Case Studies
            </a>
            <a className="transition hover:text-white" href="#">
              Resources
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-sm font-semibold text-slate-300 backdrop-blur-md transition hover:bg-white/[0.08] hover:text-white md:block">
              Log in
            </button>

            <a
              href="/request"
              className="group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:shadow-blue-600/30"
            >
              <span className="flex items-center gap-1.5">
                Post a Request
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-[1500px] px-4 pb-14 pt-3 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] border border-white/[0.07] bg-white/[0.025] shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-[28px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(59,130,246,0.18),transparent_48%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-black/20" />

          <div className="relative mx-auto flex min-h-[690px] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Industrial Maintenance Network
            </span>

            <h2 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white sm:text-6xl md:text-8xl">
              Industrial expertise.
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Instantly connected.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Connect with verified industrial experts for critical repairs,
              remote diagnosis, asset support, and technician dispatch.
            </p>

            <div className="mt-8 flex w-full flex-col gap-4 px-4 sm:w-auto sm:flex-row">
              <a
                href="/live"
                className="rounded-xl bg-white px-7 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-white/10 transition hover:scale-[1.02] hover:bg-slate-100"
              >
                Start Live Diagnosis
              </a>

              <a
                href="/request"
                className="rounded-xl border border-white/[0.14] bg-white/[0.035] px-7 py-3.5 text-sm font-black text-white shadow-lg backdrop-blur-xl transition hover:scale-[1.02] hover:bg-white/[0.08]"
              >
                Post a Request
              </a>
            </div>

            <div className="mt-12 flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/[0.09] bg-black/35 px-4 py-3 shadow-2xl backdrop-blur-2xl transition focus-within:border-blue-500/50">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="What equipment or issue do you need help with?"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              <button className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white transition hover:bg-blue-500">
                Search
              </button>
            </div>

            <div className="mt-14 grid w-full gap-5 sm:grid-cols-2 md:grid-cols-3">
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
        </div>

        <div className="mx-auto -mt-8 grid max-w-6xl gap-4 rounded-[32px] border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/40 backdrop-blur-[28px] sm:grid-cols-2 md:grid-cols-4">
          <Step
            number="01"
            title="Post Your Issue"
            text="Describe your equipment and problem in minutes."
          />
          <Step
            number="02"
            title="Get Matched"
            text="We connect you with the best available experts."
          />
          <Step
            number="03"
            title="Connect Instantly"
            text="Start a live video session and get expert help."
          />
          <Step
            number="04"
            title="Solve & Continue"
            text="You and the expert handle the solution together."
          />
        </div>
      </section>
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.035] p-6 text-left shadow-xl backdrop-blur-2xl transition duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.055]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_42%)]" />
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.045] text-blue-300 shadow-inner transition group-hover:bg-blue-500/10">
        {icon}
      </div>
      <h3 className="text-sm font-black tracking-wide text-white">{title}</h3>
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
    <div className="group rounded-2xl border border-white/[0.045] bg-white/[0.02] p-5 backdrop-blur-md transition hover:border-white/[0.10] hover:bg-white/[0.04]">
      <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/15 bg-cyan-500/10 text-[11px] font-black text-cyan-300">
        {number}
      </div>
      <h3 className="text-sm font-black tracking-wide text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}
