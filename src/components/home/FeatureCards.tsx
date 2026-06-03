const features = [
  ["Emergency Response", "Get connected with qualified experts fast."],
  ["Verified Experts", "Every expert is vetted and verified."],
  ["National Coverage", "Growing network across the United States."],
  ["Downtime Reduction", "Reduce costly operational interruptions."],
];

export default function FeatureCards() {
  return (
    <section className="bg-[#f7f7f4] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        {features.map(([title, text]) => (
          <div key={title} className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
            <p className="mt-4 text-sm leading-6 text-[#6b7280]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
