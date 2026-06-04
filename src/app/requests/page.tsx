import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const requests = [
  {
    priority: "Urgent",
    title: "Production line shutdown",
    industry: "Manufacturing",
    location: "Louisville, Kentucky",
    posted: "2 hours ago",
    description:
      "Facility needs expert review for a critical production interruption affecting operational output.",
  },
  {
    priority: "High Priority",
    title: "Automation control fault",
    industry: "Automation",
    location: "Nashville, Tennessee",
    posted: "Today",
    description:
      "Controls environment requires qualified industrial automation expertise for diagnosis and recovery planning.",
  },
  {
    priority: "Review",
    title: "Equipment performance issue",
    industry: "Heavy Equipment",
    location: "Indianapolis, Indiana",
    posted: "Yesterday",
    description:
      "Heavy equipment requires specialist evaluation due to reduced performance and operational instability.",
  },
];

export default function RequestsPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f4f1ea]">
        <Header />

        <section className="px-6 py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
                Industrial Requests
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
                Active industrial support requests.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
                Review critical facility requests submitted by industrial
                operations seeking qualified expert support.
              </p>
            </div>

            <div className="mt-14 grid gap-6">
              {requests.map((request) => (
                <article
                  key={request.title}
                  className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-10"
                >
                  <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-3xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7a3f]">
                        {request.priority}
                      </p>

                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
                        {request.title}
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-[#6b7280]">
                        {request.description}
                      </p>

                      <div className="mt-7 grid gap-4 text-sm text-[#4b5563] sm:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#9a7a3f]">
                            Industry
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.industry}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#9a7a3f]">
                            Location
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.location}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#9a7a3f]">
                            Posted
                          </p>
                          <p className="mt-2 font-medium text-[#111827]">
                            {request.posted}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:min-w-[180px]">
                      <button className="w-full rounded-2xl bg-[#07111f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-black">
                        Review Request →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
