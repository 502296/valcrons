import BackButton from "@/components/layout/BackButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function DataProtectionPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#111827]">
      <Header />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <BackButton />

          <div className="mt-10 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Security
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Data Protection
            </h1>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Last updated: June 2026
            </p>

            <div className="mt-10 space-y-8 text-sm leading-7 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  1. Our Approach
                </h2>
                <p className="mt-3">
                  VALCRONS is designed to protect industrial platform data
                  through reasonable technical, organizational, and access
                  control measures. Our goal is to limit unnecessary exposure of
                  sensitive account, request, and contact information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  2. Account-Based Access
                </h2>
                <p className="mt-3">
                  VALCRONS uses account-based access. Facilities and experts
                  must sign in before using protected platform features such as
                  submitting requests, browsing requests, managing profiles, or
                  requesting contact.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  3. Limited Contact Visibility
                </h2>
                <p className="mt-3">
                  Facility contact details may be restricted until an approved
                  contact process occurs. This helps reduce unwanted exposure of
                  company contacts and supports controlled communication between
                  users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  4. User Responsibilities
                </h2>
                <p className="mt-3">
                  Users are responsible for protecting their own login
                  credentials, using strong passwords, signing out of shared
                  devices, and only submitting information they are authorized to
                  share.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  5. Industrial Confidentiality
                </h2>
                <p className="mt-3">
                  Users should not upload or submit confidential trade secrets,
                  classified information, plant security details, proprietary
                  drawings, regulated information, or sensitive operational data
                  unless they are authorized to do so and understand the risks.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  6. Storage and Attachments
                </h2>
                <p className="mt-3">
                  Files, messages, and request information may be stored by the
                  platform to support communication, review, dispute handling,
                  security, and operational history. Users should avoid
                  uploading unnecessary sensitive files.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  7. No Absolute Security
                </h2>
                <p className="mt-3">
                  While VALCRONS uses reasonable safeguards, no online platform,
                  database, email system, storage provider, or internet
                  transmission can be guaranteed to be completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  8. Access Review
                </h2>
                <p className="mt-3">
                  VALCRONS may review, restrict, suspend, or remove access when
                  necessary to protect users, prevent abuse, investigate
                  suspicious activity, comply with legal obligations, or enforce
                  platform rules.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-[#111827]">
                  9. Reporting Concerns
                </h2>
                <p className="mt-3">
                  Users may report privacy, security, or data protection
                  concerns by contacting support@valcrons.com.
                </p>
              </section>

              <div className="rounded-2xl border border-[#9a7a3f]/20 bg-[#f4f1ea] p-5 text-xs leading-6 text-gray-600">
                VALCRONS is continuously evolving. Data protection practices may
                be updated as the platform grows, adds verification systems,
                improves access controls, and expands operational safeguards.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
