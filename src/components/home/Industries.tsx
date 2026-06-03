const industries = [
  ["Manufacturing", "Production facilities"],
  ["Energy", "Power, utilities, and critical systems"],
  ["Automation", "Controls, robotics, and PLC environments"],
  ["Food Processing", "Processing lines and regulated facilities"],
  ["Logistics", "Warehousing and distribution operations"],
  ["Heavy Equipment", "Industrial machines and field assets"],
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(([title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-xl font-semibold text-[#111827]">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                {text}
              </p>
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
