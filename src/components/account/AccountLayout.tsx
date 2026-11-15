import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const accountAction = "inline-flex min-h-12 items-center justify-center rounded-xl bg-[#234fb8] px-5 py-3 text-center font-semibold text-white hover:bg-[#1b3e92] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#234fb8] disabled:opacity-60";
export const accountLink = "inline-flex min-h-11 items-center rounded-sm font-semibold text-[#234fb8] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4";

export default function AccountLayout({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-[#f7f6f2] px-4 pb-12 pt-24 text-[#111a29] sm:px-6 sm:pt-28">
        <div className={wide ? "mx-auto max-w-3xl" : "mx-auto max-w-xl"}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
