export default function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#f7f7f4] pt-24 md:min-h-screen md:pt-28">
      <div className="absolute inset-x-0 top-20 h-[76vh] overflow-hidden md:h-[78vh]">
        <img
          src="/industrial-hero.jpg"
          alt="Industrial facility"
          className="h-full w-full object-cover object-[68%_center] md:object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f7f4] via-[#f7f7f4]/55 to-[#f7f7f4]/10 md:via-[#f7f7f4]/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f7f4]/15 via-transparent to-[#f7f7f4]/30" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 pt-8 md:min-h-[82vh] md:px-6 md:pt-0">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8b6a2b] md:mb-5 md:text-xs md:tracking-[0.28em]">
            The Industry&apos;s Most Trusted Network
          </p>

          <h1 className="mb-5 max-w-[340px] text-[44px] font-semibold leading-[0.95] tracking-[-0.055em] text-[#111827] md:mb-6 md:max-w-2xl md:text-7xl">
            When Operations Can&apos;t Stop.
          </h1>

          <p className="mb-8 max-w-[350px] text-[17px] font-medium leading-7 text-[#111827] md:mb-10 md:max-w-xl md:text-lg md:leading-8">
            Connect with verified industrial experts when critical operations are at risk.
            Find the right engineer or technician, review qualifications, and establish
            direct contact to solve complex industrial challenges quickly and confidently.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
            <a
              href="/request-support"
              className="rounded-xl bg-[#111827] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-black"
            >
              Request Expert Support →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-black/10 bg-white/85 px-7 py-4 text-center text-sm font-semibold text-[#111827] backdrop-blur transition hover:bg-white"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
