const steps = [
  "Facility submits request",
  "Valcrons matches expert",
  "Expert responds",
  "Problem resolved",
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#111827]">
            From urgent request to qualified expert.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-[2rem] border border-black/10 bg-[#f7f7f4] p-8"
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white shadow-lg">
                {index + 1}
              </div>

              <h3 className="text-lg font-semibold text-[#111827]">
                {step}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
