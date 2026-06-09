import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <BackButton />

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Legal
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Last updated: June 2026
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-gray-700">

              <section>
                <h2 className="text-xl font-semibold">
                  1. Acceptance of Terms
                </h2>

                <p className="mt-3">
                  By accessing or using VALCRONS, you agree to be bound by
                  these Terms of Service. If you do not agree with these terms,
                  you must discontinue use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  2. Platform Purpose
                </h2>

                <p className="mt-3">
                  VALCRONS is an industrial expertise connection platform.
                  VALCRONS facilitates introductions and communication between
                  facilities and independent experts.
                </p>

                <p className="mt-3">
                  VALCRONS does not provide engineering services, maintenance
                  services, repair services, inspections, safety supervision,
                  field work, consulting services, or operational management.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  3. Independent Users
                </h2>

                <p className="mt-3">
                  All experts, technicians, engineers, contractors, and service
                  providers using VALCRONS operate independently.
                </p>

                <p className="mt-3">
                  VALCRONS is not responsible for the qualifications,
                  certifications, experience, conduct, performance, work
                  quality, recommendations, or actions of any user.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  4. User Responsibilities
                </h2>

                <p className="mt-3">
                  Users are solely responsible for the information they submit,
                  the decisions they make, and the actions they take based on
                  information obtained through the platform.
                </p>

                <p className="mt-3">
                  Users must ensure that all activities comply with applicable
                  laws, regulations, workplace rules, safety standards, and
                  contractual obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  5. No Warranty
                </h2>

                <p className="mt-3">
                  The platform is provided on an "as is" and "as available"
                  basis without warranties of any kind, whether express or
                  implied.
                </p>

                <p className="mt-3">
                  VALCRONS does not guarantee uninterrupted operation, platform
                  availability, successful expert matching, problem resolution,
                  accuracy of information, or business outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  6. Limitation of Liability
                </h2>

                <p className="mt-3">
                  To the maximum extent permitted by law, VALCRONS shall not be
                  liable for any direct, indirect, incidental, consequential,
                  special, punitive, or economic damages arising from the use of
                  the platform.
                </p>

                <p className="mt-3">
                  This includes, but is not limited to, equipment damage,
                  operational downtime, production losses, workplace incidents,
                  environmental events, regulatory penalties, business
                  interruption, personal injury, or property damage.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  7. Industrial Safety
                </h2>

                <p className="mt-3">
                  Industrial facilities remain solely responsible for safety
                  procedures, operational decisions, maintenance activities,
                  engineering approvals, lockout/tagout procedures, compliance
                  requirements, and workplace risk management.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  8. Account Termination
                </h2>

                <p className="mt-3">
                  VALCRONS reserves the right to suspend, restrict, or terminate
                  accounts that violate these terms, misuse the platform, engage
                  in fraudulent activity, or create risks for other users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  9. Modifications
                </h2>

                <p className="mt-3">
                  VALCRONS may modify these terms at any time. Continued use of
                  the platform after updates constitutes acceptance of the
                  revised terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold">
                  10. Governing Law
                </h2>

                <p className="mt-3">
                  These terms shall be governed by applicable laws within the
                  United States, without regard to conflict-of-law principles.
                </p>
              </section>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-xs leading-6 text-gray-700">
                IMPORTANT: VALCRONS is a connection platform only. Users are
                solely responsible for all engineering, maintenance,
                operational, safety, technical, and business decisions.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
