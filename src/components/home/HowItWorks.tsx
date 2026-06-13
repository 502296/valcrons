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
    <section id="how-it-works" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            Industrial Response Process
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[#c8a96b]" />

          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[#111827] md:text-4xl">
            From critical downtime to operational recovery.
          </h2>
        </div>

        <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-transparent via-[#c8a96b]/40 to-transparent md:block" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[1.5rem] border border-[#c8a96b]/20 bg-[#f7f7f4] p-4 shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-[#c8a96b] shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
                {index + 1}
              </div>

              <h3 className="text-base font-semibold leading-snug text-[#111827]">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6b7280]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
