import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, ContactRound, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "VALCRONS | Industrial Expertise Network",
  description: "Connect with independent industrial engineers and technicians for equipment, automation, and maintenance support.",
};

const steps = [
  {
    title: "Describe the issue",
    detail: "Tell us what equipment is affected, where it is, and how urgently you need help.",
    icon: ClipboardList,
  },
  {
    title: "Find relevant expertise",
    detail: "Your request can be reviewed by specialists whose experience fits the work.",
    icon: Search,
  },
  {
    title: "Connect directly",
    detail: "Review the expert’s background and discuss availability and scope before proceeding.",
    icon: ContactRound,
  },
];

const industries = [
  ["Manufacturing", "Production machinery and plant maintenance"],
  ["Automation & controls", "PLCs, robotics, and control systems"],
  ["Food processing", "Processing and packaging lines"],
  ["Logistics", "Conveyors and distribution equipment"],
  ["Energy & utilities", "Power and utility systems"],
  ["Heavy equipment", "Industrial machinery and field assets"],
];

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-white focus:p-3 focus:text-black">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="valcrons-home bg-[#f7f6f2] text-[#111a29]">
        <Hero />
        <section id="how-it-works" aria-labelledby="process-title" className="scroll-mt-24 border-y border-[#dfddd5] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
            <h2 id="process-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              From support request to direct contact
            </h2>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map(({ title, detail, icon: Icon }) => (
                <li key={title} className="rounded-2xl border border-[#e0e2e6] p-6">
                  <Icon aria-hidden="true" className="mb-5 text-[#785824]" size={24} />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#444d58]">{detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="industries" aria-labelledby="industries-title" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 id="industries-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">Industrial specialties</h2>
              <Link href="/experts" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#234fb8] hover:underline">
                Explore the expert network <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-[#dddcd5] bg-[#dddcd5] sm:grid-cols-2">
              {industries.map(([title, detail]) => (
                <li key={title} className="bg-[#fbfaf7] p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#444d58]">{detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-[#111a29] p-6 text-white sm:p-9">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Need an industrial specialist?</h2>
              <p className="mt-2 text-sm leading-6 text-[#d3d9e4]">Tell us what equipment you need help with.</p>
            </div>
            <Link href="/request-support" className="valcrons-action valcrons-primary">
              Request expert support <ArrowUpRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
