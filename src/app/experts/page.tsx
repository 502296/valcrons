import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function ExpertsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-5xl">
          <BackButton />

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Expert Network
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
              Connect with experienced industrial experts.
            </h1>

            <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-600">
              VALCRONS helps industrial facilities reach qualified technicians,
              engineers, and service professionals for critical operational
              support, troubleshooting, and technical review.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                "Maintenance & troubleshooting",
                "Automation and controls support",
                "Mechanical, electrical, and process expertise",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-[#f4f1ea] p-5 text-sm font-medium text-gray-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/requests"
                className="rounded-full bg-[#111827] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-black"
              >
                Browse Requests
              </Link>

              <Link
                href="/signup"
                className="rounded-full border border-black/15 px-6 py-3 text-center text-sm font-semibold text-[#111827] hover:bg-black/5"
              >
                Join as Expert
              </Link>
            </div>

            <div className="mt-10 rounded-2xl border border-[#9a7a3f]/20 bg-[#f4f1ea] p-5 text-xs leading-6 text-gray-600">
              VALCRONS is a connection platform only. Experts operate
              independently and are responsible for their own qualifications,
              advice, work, safety practices, and compliance.
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
