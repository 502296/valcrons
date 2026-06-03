import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-black/5">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-[#c8a96b] font-bold">
            V
          </div>

          <div>
            <div className="text-xl font-bold tracking-[0.18em] text-[#111827]">
              VALCRONS
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#9a7a3f] font-semibold">
              Industrial Expertise Network
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#374151]">
          <Link href="#how-it-works" className="hover:text-black">How It Works</Link>
          <Link href="#experts" className="hover:text-black">Experts</Link>
          <Link href="#industries" className="hover:text-black">Industries</Link>
          <Link href="#safety" className="hover:text-black">Safety</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-medium text-[#374151] hover:text-black">
            Log In
          </Link>

          <Link href="/signup" className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black">
            Request Access
          </Link>
        </div>
      </div>
    </header>
  );
}
