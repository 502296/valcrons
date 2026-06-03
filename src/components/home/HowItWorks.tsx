const steps = [
  {
    title: "Facility submits request",
    text: "The facility describes the issue, urgency, location, and operational impact.",
  },
  {
    title: "Valcrons matches expert",
    text: "The request is routed toward the right industrial specialist based on capability.",
  },
  {
    title: "Expert responds",
    text: "A qualified expert reviews the case and begins the response process.",
  },
  {
    title: "Problem resolved",
    text: "The facility moves from downtime risk toward operational recovery.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            Industrial Response Process
          </p>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#c8a96b]" />

          <h2 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-[#111827]">
            From critical downtime to operational recovery.
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 top-8 hidden h-px w-full bg-gradient-to-r from-transparent via-[#c8a96b]/40 to-transparent md:block" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[2rem] border border-[#c8a96b]/20 bg-[#f7f7f4] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(0,0,0,0.10)]"
            >
              <div className="relative z-10 mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#111827] text-base font-bold text-[#c8a96b] shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-[#111827]">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#6b7280]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
