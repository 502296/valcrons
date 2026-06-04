import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";

export default function RequestSupportPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <BackButton />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
              Request Expert Support
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
              Submit an industrial support request.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
              Provide the essential operational details so VALCRONS can prepare
              your request for qualified industrial experts.
            </p>

            <form className="mt-14 rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Example: BlueRiver Manufacturing"
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Work Email
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (502) 000-0000"
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Facility Location
                  </label>
                  <input
                    type="text"
                    placeholder="City, State"
                    className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Industry
                  </label>
                  <select className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]">
                    <option>Select industry</option>
                    <option>Manufacturing</option>
                    <option>Energy</option>
                    <option>Automation</option>
                    <option>Food Processing</option>
                    <option>Logistics</option>
                    <option>Heavy Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Priority Level
                  </label>
                  <select className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]">
                    <option>Select priority</option>
                    <option>Urgent — Operations affected now</option>
                    <option>High Priority — Needs expert review soon</option>
                    <option>Review — Planning or evaluation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                    Support Type
                  </label>
                  <select className="mt-3 w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#9a7a3f]">
                    <option>Select support type</option>
                    <option>Remote expert review</option>
                    <option>On-site expert support</option>
                    <option>Emergency response coordination</option>
                    <option>General industrial consultation</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
                  Operational Issue Description
                </label>
                <textarea
                  rows={7}
                  placeholder="Describe the issue, affected equipment, urgency, symptoms, downtime impact, and what support is needed."
                  className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm leading-7 text-[#111827] placeholder:text-[#374151] outline-none focus:border-[#9a7a3f]"
                />
              </div>

              <div className="mt-8 rounded-3xl border border-black/10 bg-[#f8f6f1] p-5">
                <p className="text-sm leading-7 text-[#374151]">
                  VALCRONS is a connection platform. Submitting this request
                  does not guarantee repair service or equipment operation.
                  Qualified experts may review the request and coordinate next
                  steps.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-[#374151]">
                  By submitting, you confirm that the information provided is
                  accurate and authorized by your facility.
                </p>

                <button
                  type="button"
                  className="rounded-2xl bg-[#07111f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Submit Request →
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
