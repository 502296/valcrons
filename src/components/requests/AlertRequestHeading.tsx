import Link from "next/link";

export function BackToNotifications() {
  return (
    <Link href="/notifications" className="mb-2 inline-flex min-h-11 items-center rounded text-sm font-semibold text-[#234fb8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">
      ← Back to notifications
    </Link>
  );
}

export function storedStatus(value: string | null) {
  if (!value?.trim()) return "Not recorded";
  return value.replace(/[_-]+/g, " ").replace(/^./, letter => letter.toUpperCase());
}

export function contactDecision(value: string | null) {
  if (value === "approved") return "Contact approved";
  if (value === "declined") return "Contact declined";
  if (value === "pending") return "Contact pending";
  return storedStatus(value);
}

export function requestTitle(description: string | null, issueType: string | null) {
  const text = description?.trim() ?? "";
  if (text.length > 72) return `${text.slice(0, 72)}…`;
  return text.length > 8 ? text : issueType || "Industrial support request";
}

export default function AlertRequestHeading({ title, priority, status }: {
  title: string; priority: string | null; status: string | null;
}) {
  return (
    <div>
      <h1 className="break-words text-2xl font-bold tracking-tight text-[#111a29] sm:text-4xl">{title}</h1>
      <dl className="mt-3 flex flex-wrap gap-2 text-sm">
        <div className="rounded-lg bg-[#f7f6f2] px-3 py-2">
          <dt className="text-xs text-[#485364]">Priority</dt>
          <dd className="font-semibold">{storedStatus(priority)}</dd>
        </div>
        <div className="rounded-lg bg-[#edf2fc] px-3 py-2">
          <dt className="text-xs text-[#485364]">Support request status</dt>
          <dd className="font-semibold">{storedStatus(status)}</dd>
        </div>
      </dl>
    </div>
  );
}
