export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
      <section className="relative min-h-screen px-6 py-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,255,0.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(201,139,74,0.14),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <nav className="glass-nav mb-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="logo-mark">V</div>
              <h1 className="text-2xl font-semibold tracking-[0.22em] text-[#d0a36f]">
                VALCRONS
              </h1>
            </div>

            <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#triage" className="nav-link">Live Triage</a>
              <a href="#experts" className="nav-link">Experts</a>
              <a href="#cases" className="nav-link">Case Studies</a>
              <a href="#resources" className="nav-link">Resources</a>
            </div>

            <a href="/dashboard/client" className="primary-pill">
              Technician Dashboard
            </a>
          </nav>

          <section className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="eyebrow">Industrial Maintenance Network</div>

              <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                INDUSTRIAL EXPERTISE.
                <br />
                <span className="text-gradient">INSTANTLY CONNECTED.</span>
              </h2>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                VALCRONS connects factories with verified industrial experts for
                critical repairs, remote diagnosis, asset support, and technician
                dispatch across modern manufacturing operations.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="/diagnosis" className="primary-button">
                  Start Video Diagnosis
                </a>
                <a href="#network" className="secondary-button">
                  Explore Platform
                </a>
              </div>

              <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="metric-card">
                  <strong>24/7</strong>
                  <span>Critical support</span>
                </div>
                <div className="metric-card">
                  <strong>Verified</strong>
                  <span>Industrial experts</span>
                </div>
                <div className="metric-card">
                  <strong>Secure</strong>
                  <span>Case workflow</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Active Requests
                </p>
                <span className="status-dot">Live</span>
              </div>

              <div className="space-y-4">
                <div className="request-card critical">
                  <span>Critical Request</span>
                  <h3>PLC Failure</h3>
                  <p>Automated line stopped · Detroit, MI</p>
                  <small>Safety Orange</small>
                </div>

                <div className="request-card blue">
                  <span>Priority Maintenance</span>
                  <h3>Hydraulic System</h3>
                  <p>Pressure drop on packaging line · Texas</p>
                  <small>Electric Blue</small>
                </div>

                <div className="request-card blue">
                  <span>Remote Consultation</span>
                  <h3>Motor Vibration</h3>
                  <p>High vibration under load · California</p>
                  <small>Electric Blue</small>
                </div>
              </div>
            </div>
          </section>

          <section
            id="triage"
            className="mt-16 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="glass-panel p-6">
              <p className="section-label">Remote Diagnosis</p>
              <div className="mt-5 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                <div className="video-tile">
                  <div className="video-face" />
                  <div className="video-controls">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-3xl font-semibold tracking-[-0.03em]">
                    1-Click Video Connect
                  </h3>
                  <p className="mt-4 leading-7 text-white/58">
                    Launch a secure remote triage session with annotated video,
                    asset context, and expert-guided repair workflow.
                  </p>
                  <a href="/diagnosis" className="mt-7 w-fit secondary-button">
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div id="experts" className="glass-panel p-6">
              <p className="section-label">Smart Matching Engine</p>
              <p className="mt-4 text-white/58">
                Match each factory request with verified specialists based on
                skill, location, urgency, and industrial category.
              </p>

              <div className="mt-6 space-y-4">
                <div className="expert-row">
                  <div className="avatar">EX</div>
                  <div>
                    <strong>Verified Controls Expert</strong>
                    <span>PLC · Automation · Robotics</span>
                  </div>
                </div>

                <div className="expert-row">
                  <div className="avatar bronze">MX</div>
                  <div>
                    <strong>Mechanical Systems Specialist</strong>
                    <span>Hydraulics · Motors · Conveyors</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="network" className="mt-5 grid gap-5 md:grid-cols-3">
            <div className="feature-card">
              <span>01</span>
              <h3>Asset Tracking</h3>
              <p>Keep every repair request connected to the right machine, site, and service record.</p>
            </div>

            <div className="feature-card">
              <span>02</span>
              <h3>Verified Badging</h3>
              <p>Give factories confidence with credentialed experts and structured technician profiles.</p>
            </div>

            <div className="feature-card">
              <span>03</span>
              <h3>Secure Payments</h3>
              <p>Support trusted service transactions with a professional workflow for both sides.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
