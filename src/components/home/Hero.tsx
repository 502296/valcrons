export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f7f4] pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div className="z-10 max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            The Industry&apos;s Most Trusted Network
          </p>

          <h1 className="mb-6 text-6xl font-semibold tracking-[-0.05em] text-[#111827] md:text-7xl">
            When Operations Can&apos;t Stop.
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-8 text-[#4b5563]">
            Valcrons connects industrial facilities with verified experts to solve
            critical problems and reduce costly downtime.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/requests"
              className="rounded-xl bg-[#111827] px-7 py-4 text-center text-sm font-semibold text-white hover:bg-black"
            >
              Request Expert Support →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-black/10 bg-white px-7 py-4 text-center text-sm font-semibold text-[#111827] hover:bg-gray-50"
            >
              How It Works
            </a>
          </div>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[2rem] bg-[#e5e7eb] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />

          <img
            src="/industrial-hero.jpg"
            alt="Industrial facility"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
