import { ShieldCheck, Zap, Globe2, TrendingDown } from "lucide-react";

const features = [
  {
    title: "Emergency Response",
    text: "Fast access to qualified industrial experts when critical issues arise.",
    icon: <Zap size={26} />,
  },
  {
    title: "Verified Experts",
    text: "Every expert is reviewed, vetted, and matched by industrial capability.",
    icon: <ShieldCheck size={26} />,
  },
  {
    title: "National Coverage",
    text: "A growing expert network designed for industrial operations across the U.S.",
    icon: <Globe2 size={26} />,
  },
  {
    title: "Downtime Reduction",
    text: "Reduce costly interruptions by connecting with the right expertise faster.",
    icon: <TrendingDown size={26} />,
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-[#f7f7f4] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
            Why Valcrons
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[#111827]">
            Built for high-stakes industrial operations.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(0,0,0,0.12)]"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111827] text-[#c8a96b]">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#111827]">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#6b7280]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
