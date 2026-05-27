export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-white">
      <section className="relative min-h-screen px-6 py-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(20,184,255,0.15),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(208,163,111,0.14),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <nav className="glass-nav mb-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="logo-mark">V</div>
              <h1 className="text-2xl font-semibold tracking-[0.22em] text-[#d0a36f]">
                VALCRONS
              </h1>
            </div>

            <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#triage" className="nav-link">Live Triage</a>
              <a href="#experts" className="nav-link">Experts</a>
              <a href="#network" className="nav-link">Platform</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>

            <a href="/dashboard/client" className="primary-pill">
              Technician Dashboard
            </a>
          </nav>

          <section className="text-center">
            <div className="eyebrow">Industrial Maintenance Network</div>

            <h2 className="mx-auto mt-6 max-w-5xl text-5xl font-bold leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              INDUSTRIAL EXPERTISE.
              <br />
              <span className="text-gradient">INSTANTLY CONNECTED.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/62">
              VALCRONS connects factories with verified industrial experts for
              critical repairs, remote diagnosis, asset support, and technician
              dispatch across modern manufacturing operations.
            </p>

            <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center gap-4 sm:flex-row">
              <a href="/diagnosis" className="primary-button">
                Start Video Diagnosis
              </a>
              <a href="#network" className="secondary-button">
                Explore Platform
              </a>
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
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
          </section>

          <section className="mt-16 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="glass-panel p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="section-label">Active Requests</p>
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

            <div className="grid gap-6">
              <div id="experts" className="glass-panel p-6">
                <p className="section-label">Smart Matching Engine</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                  Verified experts matched by urgency, skill, and industry.
                </h3>
                <p className="mt-4 leading-7 text-white/58">
                  VALCRONS routes each request to the right industrial specialist
                  based on equipment type, location, availability, and technical
                  category.
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

              <div id="triage" className="glass-panel p-6">
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
            </div>
          </section>

          <section id="network" className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="feature-card">
              <span>01</span>
              <h3>Asset Tracking</h3>
              <p>
                Keep every repair request connected to the right machine, site,
                service history, and technical context.
              </p>
            </div>

            <div className="feature-card">
              <span>02</span>
              <h3>Verified Badging</h3>
              <p>
                Help factories identify credentialed experts through structured
                profiles, categories, and verification status.
              </p>
            </div>

            <div className="feature-card">
              <span>03</span>
              <h3>Direct Coordination</h3>
              <p>
                VALCRONS connects both sides. Service pricing and payment are
                handled directly between the company and the technician.
              </p>
            </div>
          </section>

          <section id="contact" className="mt-6 glass-panel p-8 text-center">
            <p className="section-label">Built for Industrial Response</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              A modern operating layer for factories, technicians, and urgent maintenance teams.
            </h3>
          </section>
        </div>
      </section>
    </main>
  );
}
