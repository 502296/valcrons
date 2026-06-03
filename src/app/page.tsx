import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import FeatureCards from "@/components/home/FeatureCards";
import HowItWorks from "@/components/home/HowItWorks";
import Industries from "@/components/home/Industries";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <Industries />
    </main>
  );
}
