"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 inline-flex items-center rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      ← Back
    </button>
  );
}
