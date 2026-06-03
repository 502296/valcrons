const industries = [
  "Manufacturing",
  "Energy",
  "Automation",
  "Food Processing",
  "Logistics",
  "Heavy Equipment",
];

export default function Industries() {
  return (
    <section id="industries" className="bg-[#f7f7f4] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            Industries
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#111827]">
            Supporting the sectors that keep operations moving.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-2xl border border-black/10 bg-white px-7 py-6 text-lg font-semibold text-[#111827] shadow-sm"
            >
              {industry}
            </div>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-[2rem] bg-[#111827] p-10 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)] md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c8a96b]">
            Request Support
          </p>

          <h3 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
            Need industrial expertise now?
          </h3>

          <p className="mt-4 max-w-2xl text-white/70">
            Submit a request and connect with qualified industrial experts
            prepared for high-stakes operational problems.
          </p>

          <a
            href="/requests"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#111827] transition hover:bg-[#f2f2f2]"
          >
            Request Expert Support →
          </a>
        </div>
      </div>
    </section>
  );
}
