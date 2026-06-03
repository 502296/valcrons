export default function TrustBar() {
  return (
    <section className="bg-[#f7f7f4] px-6 pb-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 rounded-3xl border border-black/10 bg-white shadow-sm md:grid-cols-4">
        <div className="p-8">
          <p className="text-3xl font-semibold text-[#111827]">2,500+</p>
          <p className="mt-2 text-sm text-[#6b7280]">Verified Experts</p>
        </div>

        <div className="border-t border-black/10 p-8 md:border-l md:border-t-0">
          <p className="text-3xl font-semibold text-[#111827]">1,200+</p>
          <p className="mt-2 text-sm text-[#6b7280]">Industrial Facilities</p>
        </div>

        <div className="border-t border-black/10 p-8 md:border-l md:border-t-0">
          <p className="text-3xl font-semibold text-[#111827]">18 min</p>
          <p className="mt-2 text-sm text-[#6b7280]">Average Response Time</p>
        </div>

        <div className="border-t border-black/10 p-8 md:border-l md:border-t-0">
          <p className="text-3xl font-semibold text-[#111827]">48</p>
          <p className="mt-2 text-sm text-[#6b7280]">States Covered</p>
        </div>
      </div>
    </section>
  );
}
