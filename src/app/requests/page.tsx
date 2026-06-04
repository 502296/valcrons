import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RequestsPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
              Industrial Requests
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
              Active industrial support requests.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
              Review critical facility requests submitted by industrial
              operations seeking qualified expert support.
            </p>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                  Urgent
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  Production line shutdown
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                  Facility needs expert review for a critical production
                  interruption affecting operational output.
                </p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                  High Priority
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  Automation control fault
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                  Controls environment requires qualified industrial automation
                  expertise for diagnosis and recovery planning.
                </p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                  Review
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  Equipment performance issue
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                  Heavy equipment requires specialist evaluation due to reduced
                  performance and operational instability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
