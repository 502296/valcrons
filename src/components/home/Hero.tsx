export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f7f4] pt-28">
      <div className="absolute inset-x-0 top-20 h-[78vh] overflow-hidden">
        <img
          src="/industrial-hero.jpg"
          alt="Industrial facility"
          className="h-full w-full object-cover object-center"
        />

      <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f4] via-[#f7f7f4]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f7f7f4]/10" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            The Industry&apos;s Most Trusted Network
          </p>

          <h1 className="mb-6 text-6xl font-semibold tracking-[-0.05em] text-[#111827] md:text-7xl">
            When Operations Can&apos;t Stop.
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-8 text-[#4b5563]">
            Valcrons connects industrial facilities with verified experts to
            solve critical problems and reduce costly downtime.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/request-support"
              className="rounded-xl bg-[#111827] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-black"
            >
              Request Expert Support →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-black/10 bg-white/80 px-7 py-4 text-center text-sm font-semibold text-[#111827] backdrop-blur transition hover:bg-white"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
