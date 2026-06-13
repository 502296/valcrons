import { Factory, Zap, Bot, PackageCheck, Truck, Cog } from "lucide-react";

const industries = [
  {
    title: "Manufacturing",
    text: "Production facilities",
    icon: <Factory size={22} />,
  },
  {
    title: "Energy",
    text: "Power, utilities, and critical systems",
    icon: <Zap size={22} />,
  },
  {
    title: "Automation",
    text: "Controls, robotics, and PLC environments",
    icon: <Bot size={22} />,
  },
  {
    title: "Food Processing",
    text: "Processing lines and regulated facilities",
    icon: <PackageCheck size={22} />,
  },
  {
    title: "Logistics",
    text: "Warehousing and distribution operations",
    icon: <Truck size={22} />,
  },
  {
    title: "Heavy Equipment",
    text: "Industrial machines and field assets",
    icon: <Cog size={22} />,
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-[#f7f7f4] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            Industries
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#c8a96b]" />

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#111827] md:text-4xl">
            Supporting the sectors that keep operations moving.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="group rounded-[1.5rem] border border-[#c8a96b]/20 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111827] text-[#c8a96b] shadow-lg transition group-hover:scale-105">
                {industry.icon}
              </div>

              <h3 className="text-lg font-semibold text-[#111827]">
                {industry.title}
              </h3>

              <p className="mt-2 text-sm leading-5 text-[#6b7280]">
                {industry.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-[#111827] via-[#0f172a] to-[#111827] p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.20)] md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96b]">
            Request Support
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#c8a96b]" />

          <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
            Need industrial expertise now?
          </h3>

          <p className="mt-3 max-w-2xl text-white/70">
            Submit a request and connect with qualified industrial experts
            prepared for high-stakes operational problems.
          </p>

          <a
            href="/requests"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:bg-[#f2f2f2]"
          >
            Request Expert Support →
          </a>
        </div>
      </div>
    </section>
  );
}
