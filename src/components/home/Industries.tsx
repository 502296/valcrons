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
    <section id="industries" className="bg-[#f7f7f4] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
          Industries
        </p>

        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#111827]">
          Built for critical industrial sectors.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <div key={industry} className="rounded-2xl border border-black/10 bg-white p-6 text-lg font-semibold text-[#111827]">
              {industry}
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-[#111827] p-10 text-white">
          <h3 className="text-3xl font-semibold">Need industrial support?</h3>
          <p className="mt-3 text-white/70">
            Submit a request and connect with qualified industrial experts.
          </p>
          <a
            href="/requests"
            className="mt-8 inline-block rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#111827]"
          >
            Request Expert Support →
          </a>
        </div>
      </div>
    </section>
  );
}
