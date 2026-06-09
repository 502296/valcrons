import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Link from "next/link";

const expertiseAreas = [
  "Mechanical Systems",
  "Electrical Troubleshooting",
  "Automation & Controls",
  "Reliability Engineering",
  "Process Optimization",
  "Industrial Maintenance",
  "Safety & Compliance",
  "Emergency Support Review",
];

const benefits = [
  "Access real industrial requests",
  "Connect with facilities that need urgent support",
  "Build a professional expert profile",
  "Respond only to projects that match your skills",
];

export default function ExpertsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <BackButton />

          <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-black/10 bg-white shadow-sm">
            <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                  Expert Network
                </p>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Industrial expertise for critical operational moments.
                </h1>

                <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                  VALCRONS connects industrial facilities with independent
                  technicians, engineers, and service professionals who can
                  review requests, provide technical direction, and support
                  urgent operational challenges.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/requests"
                    className="rounded-full bg-[#111827] px-7 py-3 text-center text-sm font-semibold text-white transition hover:bg-black"
                  >
                    Browse Requests
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-full border border-black/15 px-7 py-3 text-center text-sm font-semibold text-[#111827] transition hover:bg-black/5"
                  >
                    Join as Expert
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-[#f4f1ea] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                  Built For
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Maintenance specialists",
                    "Controls technicians",
                    "Mechanical engineers",
                    "Electrical experts",
                    "Reliability professionals",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-medium text-gray-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 bg-[#fbfaf7] p-8 md:p-14">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                    Featured Expertise
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    Skills facilities search for.
                  </h2>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {expertiseAreas.map((area) => (
                      <div
                        key={area}
                        className="rounded-2xl border border-black/10 bg-white p-5 text-sm font-semibold text-gray-700"
                      >
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                    Why Join
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                    A professional way to receive industrial opportunities.
                  </h2>

                  <div className="mt-8 space-y-4">
                    {benefits.map((benefit) => (
                      <div
                        key={benefit}
                        className="rounded-2xl border border-black/10 bg-white p-5 text-sm leading-6 text-gray-700"
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-[2rem] border border-[#9a7a3f]/20 bg-[#f4f1ea] p-6 text-sm leading-7 text-gray-700">
                <strong className="text-[#111827]">Important:</strong>{" "}
                VALCRONS is a connection platform only. Experts operate
                independently and are responsible for their own qualifications,
                advice, work, safety practices, tools, insurance, and compliance
                with applicable laws and workplace requirements.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
