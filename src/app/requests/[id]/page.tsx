import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";

export default function RequestDetailsPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-28">
          <div className="mx-auto max-w-5xl">
            <BackButton />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
              Request Details
            </p>

            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
              Industrial support request.
            </h1>

            <div className="mt-14 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-10">
              <p className="text-sm leading-7 text-[#374151]">
                This page will display the full request details after we connect
                it to Supabase.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
