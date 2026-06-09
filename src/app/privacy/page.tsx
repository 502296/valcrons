import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Last updated: June 2026
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  1. Overview
                </h2>
                <p className="mt-3">
                  VALCRONS is an industrial expertise connection platform. We
                  help industrial facilities submit operational support requests
                  and connect with independent experts, technicians, engineers,
                  and service professionals.
                </p>
                <p className="mt-3">
                  This Privacy Policy explains how VALCRONS may collect, use,
                  store, and protect information provided through the platform.
                  By using VALCRONS, you agree to the practices described in
                  this policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  2. Information We Collect
                </h2>
                <p className="mt-3">
                  We may collect account information, contact details, company
                  information, facility request details, expert profile
                  information, uploaded files, messages, technical logs, and
                  usage data needed to operate the platform.
                </p>
                <p className="mt-3">
                  Facility requests may include operational descriptions,
                  urgency level, industry type, location, support category, and
                  other information voluntarily submitted by the user.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  3. How We Use Information
                </h2>
                <p className="mt-3">
                  We use information to create and manage accounts, display
                  requests, connect facilities with relevant experts, send
                  notifications, improve platform reliability, prevent misuse,
                  support security, and communicate with users.
                </p>
                <p className="mt-3">
                  VALCRONS does not sell user information as part of its core
                  platform operation.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  4. Industrial Information
                </h2>
                <p className="mt-3">
                  Users should avoid submitting confidential trade secrets,
                  classified information, sensitive plant security details, or
                  information that they are not authorized to share.
                </p>
                <p className="mt-3">
                  VALCRONS is not responsible for the accuracy, completeness, or
                  legality of information submitted by users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  5. Sharing Information
                </h2>
                <p className="mt-3">
                  Certain request details may be visible to experts for the
                  purpose of evaluating whether they can assist. Contact
                  information may be limited or protected until a facility
                  approves communication or until platform rules permit
                  disclosure.
                </p>
                <p className="mt-3">
                  We may also share information when required by law, to protect
                  platform security, prevent fraud, enforce our terms, or comply
                  with legal obligations.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  6. Data Security
                </h2>
                <p className="mt-3">
                  We use reasonable technical and organizational safeguards to
                  protect platform data. However, no online platform can
                  guarantee absolute security.
                </p>
                <p className="mt-3">
                  Users are responsible for protecting their login credentials
                  and for ensuring that submitted information is appropriate for
                  platform use.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  7. Data Retention
                </h2>
                <p className="mt-3">
                  We may retain account information, request history, messages,
                  logs, and related records as long as necessary to operate the
                  platform, comply with legal obligations, resolve disputes, and
                  enforce platform rules.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  8. User Choices
                </h2>
                <p className="mt-3">
                  Users may update certain account information through their
                  profile or settings page. Users may also request account
                  deletion, subject to legal, security, operational, and record
                  retention requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  9. No Professional or Safety Guarantee
                </h2>
                <p className="mt-3">
                  VALCRONS is a connection platform only. We do not verify every
                  technical statement, guarantee expert performance, supervise
                  repairs, operate equipment, or assume responsibility for
                  industrial decisions made by users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  10. Contact
                </h2>
                <p className="mt-3">
                  For privacy questions, contact us at support@valcrons.com.
                </p>
              </section>

              <div className="rounded-2xl border border-[#9a7a3f]/20 bg-[#f4f1ea] p-5 text-xs leading-6 text-gray-600">
                This policy is provided for platform transparency and does not
                replace advice from a licensed attorney. VALCRONS may update
                this policy as the platform evolves.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
