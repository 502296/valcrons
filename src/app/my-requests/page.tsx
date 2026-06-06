"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

type Request = {
id: number;
facility_type: string | null;
urgency: string | null;
location: string | null;
problem_description: string | null;
created_at: string;
status: string | null;
issue_type?: string | null;
};

type ContactAttachment = {
name: string;
size?: number;
type?: string;
};

type ContactRequest = {
id: number;
request_id: number;
expert_id: string;
expert_message: string | null;
attachment_names: ContactAttachment[] | string | null;
status: string | null;
created_at: string;
};

type ExpertProfile = {
id: string;
full_name: string | null;
email: string | null;
phone: string | null;
location: string | null;
specialty: string | null;
};

export default function MyRequestsPage() {
const [requests, setRequests] = useState<Request[]>([]);
const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
const [expertProfiles, setExpertProfiles] = useState<
Record<string, ExpertProfile>
>({});

const [loading, setLoading] = useState(true);
const [updatingId, setUpdatingId] = useState<number | null>(null);
const [updatingContactId, setUpdatingContactId] = useState<number | null>(
null
);
const [expandedId, setExpandedId] = useState<number | null>(null);
const [editingId, setEditingId] = useState<number | null>(null);
const [message, setMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const activeRequests = requests.filter((r) => r.status !== "closed").length;

const closedRequests = requests.filter((r) => r.status === "closed").length;

const awaitingReview = requests.filter(
(r) => r.status === "pending" || !r.status
).length;

const expertInterest = contactRequests.length;
const totalRequests = requests.length;

const [editForm, setEditForm] = useState({
facility_type: "",
urgency: "",
location: "",
issue_type: "",
problem_description: "",
});

useEffect(() => {
loadRequests();
}, []);

async function loadRequests() {
setLoading(true);

const {
data: { session },
} = await supabase.auth.getSession();

if (!session?.user) {
setLoading(false);
window.location.href = "/login";
return;
}

const user = session.user;

const { data, error } = await supabase
.from("facility_requests")
.select("*")
.eq("work_email", user.email)
.order("created_at", { ascending: false });

if (error) {
setErrorMessage("Requests could not be loaded. Please try again.");
setLoading(false);
return;
}

const companyRequests = data || [];

setRequests(companyRequests);
await loadContactRequests(companyRequests);
setLoading(false);
}

async function loadContactRequests(companyRequests: Request[]) {
const requestIds = companyRequests.map((request) => Number(request.id));

if (requestIds.length === 0) {
setContactRequests([]);
setExpertProfiles({});
return;
}

const { data, error } = await supabase
.from("expert_contact_requests")
.select("*")
.in("request_id", requestIds)
.order("created_at", { ascending: false });

if (error) {
setContactRequests([]);
return;
}

const contactData = (data || []) as ContactRequest[];
setContactRequests(contactData);

const expertIds = Array.from(
  new Set(contactData.map((item) => item.expert_id))
);

if (expertIds.length === 0) {
setExpertProfiles({});
return;
}

const { data: profiles } = await supabase
.from("profiles")
.select("uid, full_name, email, phone, location, specialty")
.in("id", expertIds);

const profileMap: Record<string, ExpertProfile> = {};

(profiles || []).forEach((profile) => {
profileMap[profile.uid] = {
  id: profile.uid,
  full_name: profile.full_name,
  email: profile.email,
  phone: profile.phone,
  location: profile.location,
  specialty: profile.specialty,
};
});

setExpertProfiles(profileMap);
}

function clearMessages() {
setMessage("");
setErrorMessage("");
}

function getContactsForRequest(requestId: number) {
return contactRequests.filter(
(contact) => Number(contact.request_id) === Number(requestId)
);
}

function priorityLabel(value: string | null) {
const text = (value || "").toLowerCase();

if (text.includes("urgent")) return "URGENT";
if (text.includes("high")) return "HIGH PRIORITY";
if (text.includes("normal")) return "NORMAL";
if (text.includes("review")) return "REVIEW";
return "PENDING";
}

function statusLabel(value: string | null) {
if (value === "closed") return "CLOSED";
if (value === "accepted") return "EXPERT ACCEPTED";
if (value === "saved") return "SAVED BY EXPERT";
return "AWAITING EXPERT REVIEW";
}

function contactStatusLabel(value: string | null) {
if (value === "approved") return "APPROVED";
if (value === "declined") return "DECLINED";
return "PENDING REVIEW";
}

function startEdit(request: Request) {
clearMessages();
setEditingId(request.id);
setExpandedId(request.id);

setEditForm({
facility_type: request.facility_type || "",
urgency: request.urgency || "",
location: request.location || "",
issue_type: request.issue_type || "",
problem_description: request.problem_description || "",
});
}

async function saveEdit(id: number) {
clearMessages();
setUpdatingId(id);

const { error } = await supabase
.from("facility_requests")
.update({
facility_type: editForm.facility_type,
urgency: editForm.urgency,
location: editForm.location,
issue_type: editForm.issue_type,
problem_description: editForm.problem_description,
})
.eq("id", id);

setUpdatingId(null);

if (error) {
setErrorMessage("Request could not be updated. Please try again.");
return;
}

setRequests((prev) =>
prev.map((request) =>
request.id === id
? {
...request,
facility_type: editForm.facility_type,
urgency: editForm.urgency,
location: editForm.location,
issue_type: editForm.issue_type,
problem_description: editForm.problem_description,
}
: request
)
);

setEditingId(null);
setMessage("Request updated successfully.");
}

async function updateContactRequestStatus(
contactId: number,
status: "approved" | "declined"
) {
clearMessages();
setUpdatingContactId(contactId);

const { error } = await supabase
.from("expert_contact_requests")
.update({ status })
.eq("id", contactId);

setUpdatingContactId(null);

if (error) {
setErrorMessage("Contact request could not be updated.");
return;
}

setContactRequests((prev) =>
prev.map((contact) =>
contact.id === contactId ? { ...contact, status } : contact
)
);

setMessage(
status === "approved"
? "Expert contact approved."
: "Expert contact declined."
);
}

async function closeRequest(id: number) {
clearMessages();

const confirmed = window.confirm(
"Close this request? It will remain in your history and can be reopened later."
);

if (!confirmed) return;

setUpdatingId(id);

const { error } = await supabase
.from("facility_requests")
.update({ status: "closed" })
.eq("id", id);

setUpdatingId(null);

if (error) {
setErrorMessage("Request could not be closed. Please check permissions.");
return;
}

setRequests((prev) =>
prev.map((request) =>
request.id === id ? { ...request, status: "closed" } : request
)
);

setMessage("Request closed successfully.");
}

async function reopenRequest(id: number) {
clearMessages();
setUpdatingId(id);

const { error } = await supabase
.from("facility_requests")
.update({ status: "pending" })
.eq("id", id);

setUpdatingId(null);

if (error) {
setErrorMessage("Request could not be reopened. Please check permissions.");
return;
}

setRequests((prev) =>
prev.map((request) =>
request.id === id ? { ...request, status: "pending" } : request
)
);

setMessage("Request reopened successfully.");
}

return (
<>
<Header />

<main className="min-h-screen bg-[#f4f1ea] px-6 pt-32 pb-24">
<div className="mx-auto max-w-6xl">
<Link
href="/"
className="mb-8 inline-flex text-sm font-semibold text-[#374151] hover:text-black"
>
← Back
</Link>

<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#111827]">
Facility Command Center
</p>

<h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] text-[#111827]">
My Requests
</h1>

<p className="mt-4 max-w-2xl text-lg leading-8 text-[#374151]">
Review, track, edit, close, reopen, and approve expert contact
requests submitted to your facility.
</p>

<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
<StatCard title="Active Requests" value={activeRequests} />
<StatCard title="Awaiting Review" value={awaitingReview} />
<StatCard title="Closed Requests" value={closedRequests} />
<StatCard title="Expert Interest" value={expertInterest} />
<StatCard title="Total Requests" value={totalRequests} />
</div>
</div>

<Link
href="/request-support"
className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
>
Post New Request →
</Link>
</div>

{(message || errorMessage) && (
<div
className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
errorMessage
? "border-red-200 bg-red-50 text-red-700"
: "border-black/10 bg-white text-[#111827]"
}`}
>
{errorMessage || message}
</div>
)}

{loading ? (
<div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
Loading requests...
</div>
) : requests.length === 0 ? (
<div className="mt-10 rounded-3xl border border-black/10 bg-white p-8 text-[#111827] shadow-sm">
No requests have been submitted yet.
</div>
) : (
<div className="mt-10 grid gap-6">
{requests.map((request) => {
const isExpanded = expandedId === request.id;
const isEditing = editingId === request.id;
const status = request.status || "pending";
const isClosed = status === "closed";
const requestContacts = getContactsForRequest(request.id);


return (
<div
key={request.id}
className={`rounded-[2rem] border p-6 shadow-sm ${
isClosed
? "border-black/10 bg-white/70"
: "border-black/10 bg-white"
}`}
>
<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
<div className="max-w-3xl flex-1">
<div className="flex flex-wrap items-center gap-3">
<h3 className="text-2xl font-bold text-[#111827]">
{request.facility_type || "Industrial Request"}
</h3>

<span className="rounded-full bg-[#111827] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
{statusLabel(status)}
</span>

{requestContacts.length > 0 && (
<span className="rounded-full border border-black/10 bg-[#f8f6f1] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111827]">
{requestContacts.length} Expert Contact
</span>
)}
</div>

<p className="mt-2 text-sm font-medium text-[#6b7280]">
{request.location || "Location not specified"}
</p>

<p className="mt-4 max-w-3xl leading-relaxed text-[#374151]">
{request.problem_description ||
"No problem description provided."}
</p>

{isExpanded && !isEditing && (
<>
<div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5 text-sm text-[#374151] md:grid-cols-2">
<Detail
label="Support Type"
value={request.issue_type || "Not specified"}
/>
<Detail
label="Priority Details"
value={request.urgency || "Pending"}
/>
<Detail
label="Request ID"
value={String(request.id)}
/>
<Detail
label="Created"
value={new Date(
request.created_at
).toLocaleString()}
/>
</div>

<ContactRequestsPanel
contacts={requestContacts}
expertProfiles={expertProfiles}
updatingContactId={updatingContactId}
onApprove={(id) =>
updateContactRequestStatus(id, "approved")
}
onDecline={(id) =>
updateContactRequestStatus(id, "declined")
}
/>
</>
)}

{isEditing && (
<div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-[#f8f6f1] p-5 md:grid-cols-2">
<Field
label="Industry"
value={editForm.facility_type}
onChange={(value) =>
setEditForm({
...editForm,
facility_type: value,
})
}
/>

<Field
label="Location"
value={editForm.location}
onChange={(value) =>
setEditForm({ ...editForm, location: value })
}
/>

<Field
label="Priority"
value={editForm.urgency}
onChange={(value) =>
setEditForm({ ...editForm, urgency: value })
}
/>

<Field
label="Support Type"
value={editForm.issue_type}
onChange={(value) =>
setEditForm({ ...editForm, issue_type: value })
}
/>

<div className="md:col-span-2">
<label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
Problem Description
</label>

<textarea
rows={5}
value={editForm.problem_description}
onChange={(e) =>
setEditForm({
...editForm,
problem_description: e.target.value,
})
}
className="mt-3 w-full resize-none rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm leading-7 text-[#111827] outline-none focus:border-[#111827]"
/>
</div>
</div>
)}
</div>

<div className="flex min-w-[170px] flex-col gap-3 md:items-end">
<span className="rounded-full border border-black/10 bg-[#111827] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
{priorityLabel(request.urgency)}
</span>

{!isEditing && (
<>
<button
onClick={() =>
setExpandedId(isExpanded ? null : request.id)
}
className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
>
{isExpanded ? "Hide Details" : "View Details"}
</button>

{!isClosed && (
<button
onClick={() => startEdit(request)}
className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
>
Edit Request
</button>
)}
</>
)}

{isEditing && (
<>
<button
onClick={() => saveEdit(request.id)}
disabled={updatingId === request.id}
className="w-full rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
>
{updatingId === request.id
? "Saving..."
: "Save Changes"}
</button>

<button
onClick={() => setEditingId(null)}
className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
>
Cancel
</button>
</>
)}

{!isEditing && !isClosed && (
<button
onClick={() => closeRequest(request.id)}
disabled={updatingId === request.id}
className="w-full rounded-xl bg-[#111827] px-4 py-2 text-sm font-semibold text-white hover:bg-black disabled:opacity-60"
>
{updatingId === request.id
? "Closing..."
: "Close Request"}
</button>
)}

{!isEditing && isClosed && (
<button
onClick={() => reopenRequest(request.id)}
disabled={updatingId === request.id}
className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea] disabled:opacity-60"
>
{updatingId === request.id
? "Reopening..."
: "Reopen Request"}
</button>
)}
</div>
</div>
</div>
);
})}
</div>
)}
</div>
</main>

<Footer />
</>
);
}

function ContactRequestsPanel({
contacts,
expertProfiles,
updatingContactId,
onApprove,
onDecline,
}: {
contacts: ContactRequest[];
expertProfiles: Record<string, ExpertProfile>;
updatingContactId: number | null;
onApprove: (id: number) => void;
onDecline: (id: number) => void;
}) {
if (contacts.length === 0) {
return (
<div className="mt-5 rounded-2xl border border-black/10 bg-white p-5">
<p className="text-sm font-semibold text-[#374151]">
No expert contact requests yet.
</p>
</div>
);
}

return (
<div className="mt-5 rounded-2xl border border-black/10 bg-white p-5">
<p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
Expert Contact Requests
</p>

<div className="mt-5 grid gap-4">
{contacts.map((contact) => {
const expert = expertProfiles[contact.expert_id];
const isApproved = contact.status === "approved";
const isDeclined = contact.status === "declined";

return (
<div
key={contact.id}
className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5"
>
<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
<div>
<div className="flex flex-wrap items-center gap-3">
<h4 className="text-lg font-bold text-[#111827]">
{expert?.full_name || "Industrial Expert"}
</h4>

<span className="rounded-full bg-[#111827] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
{contactStatusLabel(contact.status)}
</span>
</div>

<p className="mt-2 text-sm font-medium text-[#6b7280]">
{expert?.specialty || "Specialty not provided"}
{expert?.location ? ` • ${expert.location}` : ""}
</p>

<p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#374151]">
{contact.expert_message || "No message provided."}
</p>

{contact.attachment_names &&
contact.attachment_names.length > 0 && (
<div className="mt-4">
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
Attachments
</p>

<div className="mt-2 flex flex-wrap gap-2">
{(typeof contact.attachment_names === "string"
  ? JSON.parse(contact.attachment_names)
  : contact.attachment_names
).map((file: ContactAttachment) => (
<span
key={file.name}
className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#111827]"
>
{file.name}
</span>
))}
</div>
</div>
)}

{isApproved && (
<div className="mt-4 rounded-xl border border-black/10 bg-white p-4 text-sm text-[#111827]">
<p className="font-semibold">Approved Contact Details</p>
<p className="mt-2">Email: {expert?.email || "Not provided"}</p>
<p>Phone: {expert?.phone || "Not provided"}</p>
</div>
)}
</div>

<div className="flex min-w-[170px] flex-col gap-3">
<button
onClick={() => onApprove(contact.id)}
disabled={
isApproved ||
isDeclined ||
updatingContactId === contact.id
}
className="rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
>
{isApproved
? "Approved ✓"
: updatingContactId === contact.id
? "Updating..."
: "Approve Contact"}
</button>

<button
onClick={() => onDecline(contact.id)}
disabled={
isApproved ||
isDeclined ||
updatingContactId === contact.id
}
className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea] disabled:cursor-not-allowed disabled:opacity-50"
>
{isDeclined ? "Declined" : "Decline"}
</button>
</div>
</div>
</div>
);
})}
</div>
</div>
);
}

function contactStatusLabel(value: string | null) {
if (value === "approved") return "APPROVED";
if (value === "declined") return "DECLINED";
return "PENDING REVIEW";
}

function StatCard({ title, value }: { title: string; value: number }) {
return (
<div className="rounded-[1.6rem] border border-white/50 bg-white/45 p-6 shadow-[0_20px_60px_rgba(17,24,39,0.08)] backdrop-blur-xl">
<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6b7280]">
{title}
</p>

<p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
{value}
</p>

<p className="mt-3 text-xs font-medium text-[#6b7280]">
Live operational metric
</p>
</div>
);
}

function Detail({ label, value }: { label: string; value: string }) {
return (
<div>
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
{label}
</p>

<p className="mt-1 font-semibold text-[#111827]">{value}</p>
</div>
);
}

function Field({
label,
value,
onChange,
}: {
label: string;
value: string;
onChange: (value: string) => void;
}) {
return (
<div>
<label className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
{label}
</label>

<input
value={value}
onChange={(e) => onChange(e.target.value)}
className="mt-3 w-full rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-[#111827] outline-none focus:border-[#111827]"
/>
</div>
);
}
