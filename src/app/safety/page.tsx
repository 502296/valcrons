import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function SafetyDisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <BackButton />

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Safety
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Safety Disclaimer
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Last updated: June 2026
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  1. Connection Platform Only
                </h2>
                <p className="mt-3">
                  VALCRONS is a connection platform only. We help industrial
                  facilities and independent experts communicate, but we do not
                  operate, repair, inspect, supervise, maintain, or control any
                  industrial equipment, facility, process, or worksite.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  2. Facility Responsibility
                </h2>
                <p className="mt-3">
                  Each facility is solely responsible for workplace safety,
                  equipment operation, engineering decisions, maintenance work,
                  shutdown procedures, lockout/tagout, permits, compliance,
                  emergency response, and all on-site activity.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  3. Expert Responsibility
                </h2>
                <p className="mt-3">
                  Experts, technicians, engineers, contractors, and service
                  providers are independent users. They are solely responsible
                  for their own advice, work, qualifications, certifications,
                  methods, tools, and compliance with applicable laws and safety
                  standards.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  4. No Emergency Service
                </h2>
                <p className="mt-3">
                  VALCRONS is not an emergency response service. For immediate
                  danger, injury, fire, chemical release, equipment failure,
                  environmental incident, or life-safety emergency, users must
                  contact appropriate emergency services, internal safety teams,
                  plant leadership, or qualified on-site professionals.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  5. No Safety Guarantee
                </h2>
                <p className="mt-3">
                  VALCRONS does not guarantee that information exchanged through
                  the platform is complete, accurate, safe, compliant, or
                  suitable for a specific facility, machine, process, or
                  operating condition.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  6. Industrial Risk
                </h2>
                <p className="mt-3">
                  Industrial environments may involve serious risks, including
                  hazardous energy, pressure systems, chemicals, moving
                  machinery, electrical systems, confined spaces, heat, fire,
                  environmental hazards, injury, property damage, downtime, and
                  regulatory exposure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  7. Required Professional Judgment
                </h2>
                <p className="mt-3">
                  Users must rely on qualified personnel, approved procedures,
                  manufacturer documentation, engineering review, safety
                  protocols, and applicable laws before taking any action.
                </p>
              </section>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-xs font-semibold leading-6 text-red-900">
                VALCRONS does not assume responsibility for industrial
                operations, repairs, inspections, safety decisions, expert
                recommendations, equipment outcomes, injuries, downtime,
                regulatory consequences, or property damage.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
