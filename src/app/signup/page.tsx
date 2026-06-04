import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SignupPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f4f1eb] px-6 pt-32 pb-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              VALCRONS ACCESS
            </p>

            <h1 className="mt-4 text-5xl font-bold text-[#111827]">
              Choose Your Account Type
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#4b5563]">
              VALCRONS is a professional industrial network.
              All facilities and experts must maintain verified accounts
              before accessing projects and operational information.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border border-black/10 bg-white p-10 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7a3f]">
                Facilities & Companies
              </p>

              <h2 className="mt-4 text-3xl font-bold text-[#111827]">
                Company Account
              </h2>

              <ul className="mt-6 space-y-3 text-[#4b5563]">
                <li>• Post industrial support requests</li>
                <li>• Manage facility projects</li>
                <li>• Connect with verified experts</li>
                <li>• Maintain secure communications</li>
              </ul>

              <Link
                href="/signup/company"
                className="mt-8 inline-block rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white"
              >
                Create Company Account
              </Link>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-10 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#9a7a3f]">
                Experts & Technicians
              </p>

              <h2 className="mt-4 text-3xl font-bold text-[#111827]">
                Expert Account
              </h2>

              <ul className="mt-6 space-y-3 text-[#4b5563]">
                <li>• Browse industrial requests</li>
                <li>• Save opportunities</li>
                <li>• Build professional profile</li>
                <li>• Connect with facilities securely</li>
              </ul>

              <Link
                href="/signup/expert"
                className="mt-8 inline-block rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white"
              >
                Create Expert Account
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
