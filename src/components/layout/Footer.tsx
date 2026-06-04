export default function Footer() {
  return (
    <footer className="bg-[#070b14] px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-[#070b14]">
                V
              </div>
              <div>
                <h3 className="text-lg font-semibold tracking-[0.22em]">
                  VALCRONS
                </h3>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                  Industrial Expertise Network
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Connecting industrial facilities with verified experts for
              critical operational support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Platform
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>How It Works</li>
              <li>Experts</li>
              <li>Industries</li>
              <li>Safety</li>
              <li>Request Access</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>support@valcrons.com</li>
              <li>United States</li>
              <li>Critical requests reviewed promptly</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              Legal
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Safety Disclaimer</li>
              <li>Data Protection</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs leading-6 text-white/45">
            © 2026 VALCRONS. All rights reserved. VALCRONS is a connection
            platform. We do not operate, repair, or control industrial equipment
            directly.
          </p>
        </div>
      </div>
    </footer>
  );
}
