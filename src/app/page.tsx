import {
  Settings,
  Search,
  ShieldCheck,
  Users,
  LockKeyhole,
  Radio,
  Wrench,
  ArrowRight,
} from "lucide-react";

export default function ValcronsLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.30),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.12),transparent_28%),linear-gradient(180deg,#05070b_0%,#07111d_55%,#05070b_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:46px_46px]" />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 backdrop-blur-xl">
            <Settings className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide text-white">
              VALCRONS
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
              Industrial Maintenance Network
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-400 lg:flex">
          <a className="hover:text-white" href="#">Live Triage</a>
          <a className="hover:text-white" href="/experts">Experts</a>
          <a className="hover:text-white" href="#">Case Studies</a>
          <a className="hover:text-white" href="#">Resources</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/request"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
          >
            Post a Request
          </a>
          <button className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-xl hover:bg-white/[0.07] md:block">
            Log in
          </button>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 pb-10">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.24),transparent_42%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/30" />

          <div className="relative mx-auto flex min-h-[620px] max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-amber-300/80">
              Industrial Maintenance Network
            </p>

            <h2 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] text-white md:text-7xl">
              Industrial expertise.
              <span className="block text-blue-500">
                Instantly connected.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              Connect with verified industrial experts for critical repairs,
              remote diagnosis, asset support, and technician dispatch.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/live"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:bg-blue-500"
              >
                Start Live Diagnosis
              </a>
              <a
                href="/request"
                className="rounded-xl border border-white/14 bg-white/[0.045] px-6 py-3 text-sm font-black text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
              >
                Post a Request
              </a>
            </div>

            <div className="mt-9 flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-white/10 bg-[#07101a]/75 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <Search className="h-4 w-4 text-slate-500" />
              <span className="flex-1 text-left text-sm text-slate-500">
                What equipment or issue do you need help with?
              </span>
              <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-black text-white">
                Search
              </button>
            </div>

            <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
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

        <div className="mx-auto mt-6 grid max-w-5xl gap-4 rounded-[28px] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-2xl md:grid-cols-4">
          <Step number="01" title="Post Your Issue" text="Describe your equipment and problem in minutes." />
          <Step number="02" title="Get Matched" text="We connect you with the best available experts." />
          <Step number="03" title="Connect Instantly" text="Start a live video session and get expert help." />
          <Step number="04" title="Solve & Continue" text="You and the expert handle the solution together." />
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
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-left shadow-lg shadow-black/20 backdrop-blur-2xl">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-amber-300">
        {icon}
      </div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
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
    <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5 text-center backdrop-blur-xl">
      <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xs font-black text-blue-300">
        {number}
      </div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}
