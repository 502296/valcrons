"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "ali.kathem.edu@gmail.com";

type Profile = {
id: string | null;
email: string | null;
full_name: string | null;
role: string | null;
company_name: string | null;
location: string | null;
phone: string | null;
specialty: string | null;
account_status: string | null;
is_admin: boolean | null;
};

type FacilityRequest = {
id: number;
created_at: string;
company_name: string | null;
contact_person: string | null;
work_email: string | null;
facility_type: string | null;
urgency: string | null;
issue_type: string | null;
location: string | null;
status: string | null;
};

type ContactRequest = {
id: number;
created_at: string;
request_id: number | null;
expert_id: string | null;
status: string | null;
};

type AdminActivityLog = {
id: number;
created_at: string;
admin_email: string | null;
action: string | null;
target: string | null;
};

type UserFilter = "all" | "experts" | "companies" | "suspended" | "admins";
type RequestFilter = "all" | "active" | "closed" | "urgent";
type RequestStatus = "pending" | "saved" | "accepted" | "closed";

export default function AdminPage() {
const [checkingAuth, setCheckingAuth] = useState(true);
const [authorized, setAuthorized] = useState(false);

const [profiles, setProfiles] = useState<Profile[]>([]);
const [requests, setRequests] = useState<FacilityRequest[]>([]);
const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
const [adminActivity, setAdminActivity] = useState<string[]>([]);

const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [updating, setUpdating] = useState<string | null>(null);

const [userSearch, setUserSearch] = useState("");
const [userFilter, setUserFilter] = useState<UserFilter>("all");
const [requestFilter, setRequestFilter] = useState<RequestFilter>("all");
const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

async function addActivity(action: string, target: string) {
const { error } = await supabase.from("admin_activity_logs").insert({
admin_email: ADMIN_EMAIL,
action,
target,
});

if (!error) {
setAdminActivity((prev) => [`${action} → ${target}`, ...prev]);
}
}

useEffect(() => {
async function init() {
const {
data: { session },
} = await supabase.auth.getSession();

const userEmail = session?.user?.email || "";
const isAdminByEmail = userEmail === ADMIN_EMAIL;

if (!session?.user || !isAdminByEmail) {
setAuthorized(false);
setCheckingAuth(false);
setLoading(false);
return;
}

setAuthorized(true);
setCheckingAuth(false);
await loadAdminData();
}

init();
}, []);

async function loadAdminData() {
setLoading(true);
setMessage("");
setErrorMessage("");

const [profilesResult, requestsResult, contactResult, activityResult] =
await Promise.all([
supabase
.from("profiles")
.select(
"id, email, full_name, role, company_name, location, phone, specialty, account_status, is_admin"
)
.order("email", { ascending: true }),

supabase
.from("facility_requests")
.select(
"id, created_at, company_name, contact_person, work_email, facility_type, urgency, issue_type, location, status"
)
.order("created_at", { ascending: false }),

supabase
.from("expert_contact_requests")
.select("id, created_at, request_id, expert_id, status")
.order("created_at", { ascending: false }),

supabase
.from("admin_activity_logs")
.select("*")
.order("created_at", { ascending: false })
.limit(25),
]);

if (profilesResult.error) {
console.error("Profiles load error:", profilesResult.error);
setErrorMessage(
`Users could not be loaded: ${profilesResult.error.message}`
);
setProfiles([]);
} else {
setProfiles((profilesResult.data || []) as Profile[]);
}

if (requestsResult.error) {
console.error("Requests load error:", requestsResult.error);
setErrorMessage(
`Requests could not be loaded: ${requestsResult.error.message}`
);
setRequests([]);
} else {
setRequests((requestsResult.data || []) as FacilityRequest[]);
}

if (contactResult.error) {
console.error("Contact requests load error:", contactResult.error);
setErrorMessage(
`Contact requests could not be loaded: ${contactResult.error.message}`
);
setContactRequests([]);
} else {
setContactRequests((contactResult.data || []) as ContactRequest[]);
}

if (activityResult.error) {
console.error("Activity load error:", activityResult.error);
} else {
const activityData = (activityResult.data || []) as AdminActivityLog[];

setAdminActivity(
activityData.map(
(item) =>
`${item.created_at} | ${item.action || "Unknown action"} | ${
item.target || "Unknown target"
}`
)
);
}

setLoading(false);
}

async function updateUserStatus(
profile: Profile,
status: "active" | "suspended"
) {
if (!profile.id || profile.is_admin) {
setErrorMessage("This user is protected.");
return;
}

setUpdating(profile.id);
setMessage("");
setErrorMessage("");

const { error } = await supabase
.from("profiles")
.update({ account_status: status })
.eq("id", profile.id);

setUpdating(null);

if (error) {
console.error("Update user status error:", error);
setErrorMessage("User status could not be updated.");
return;
}

setProfiles((prev) =>
prev.map((item) =>
item.id === profile.id ? { ...item, account_status: status } : item
)
);

await addActivity(
status === "suspended" ? "User Suspended" : "User Reactivated",
profile.email || "Unknown user"
);

setMessage(
status === "suspended"
? "User suspended successfully."
: "User reactivated successfully."
);
}

async function deleteUser(profile: Profile) {
if (!profile.id || profile.is_admin) {
setErrorMessage("This user is protected.");
return;
}

const confirmed = window.confirm(
`Delete ${
profile.email || profile.full_name || "this user"
} permanently? This action cannot be undone.`
);

if (!confirmed) return;

setDeletingUserId(profile.id);
setMessage("");
setErrorMessage("");

const {
data: { session },
} = await supabase.auth.getSession();

const response = await fetch("/api/admin/delete-user", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${session?.access_token}`,
},
body: JSON.stringify({ userId: profile.id }),
});

const result = await response.json();
setDeletingUserId(null);

if (!response.ok) {
setErrorMessage(result.error || "User could not be deleted.");
return;
}

setProfiles((prev) => prev.filter((item) => item.id !== profile.id));

await addActivity("User Deleted", profile.email || "Unknown user");

setMessage("User deleted successfully.");
}

async function updateRequestStatus(requestId: number, status: RequestStatus) {
setUpdating(`request-${requestId}`);
setMessage("");
setErrorMessage("");

const { error } = await supabase
.from("facility_requests")
.update({ status })
.eq("id", requestId);

setUpdating(null);

if (error) {
console.error("Update request status error:", error);
setErrorMessage("Request status could not be updated.");
return;
}

setRequests((prev) =>
prev.map((request) =>
request.id === requestId ? { ...request, status } : request
)
);

await addActivity(
status === "closed" ? "Request Closed" : "Request Status Updated",
`Request #${requestId}`
);

setMessage(`Request #${requestId} updated to ${status}.`);
}

const filteredProfiles = useMemo(() => {
const search = userSearch.trim().toLowerCase();

return profiles.filter((profile) => {
const matchesSearch =
!search ||
profile.full_name?.toLowerCase().includes(search) ||
profile.email?.toLowerCase().includes(search) ||
profile.company_name?.toLowerCase().includes(search) ||
profile.location?.toLowerCase().includes(search) ||
profile.specialty?.toLowerCase().includes(search);

const matchesFilter =
userFilter === "all" ||
(userFilter === "experts" && profile.role === "expert") ||
(userFilter === "companies" &&
(profile.role === "company" || profile.role === "facility")) ||
(userFilter === "suspended" &&
profile.account_status === "suspended") ||
(userFilter === "admins" && profile.is_admin === true);

return matchesSearch && matchesFilter;
});
}, [profiles, userSearch, userFilter]);

const filteredRequests = useMemo(() => {
return requests.filter((request) => {
if (requestFilter === "active") return request.status !== "closed";
if (requestFilter === "closed") return request.status === "closed";
if (requestFilter === "urgent") {
return (request.urgency || "").toLowerCase().includes("urgent");
}
return true;
});
}, [requests, requestFilter]);

const stats = useMemo(() => {
const experts = profiles.filter((p) => p.role === "expert").length;
const companies = profiles.filter(
(p) => p.role === "company" || p.role === "facility"
).length;
const admins = profiles.filter((p) => p.is_admin === true).length;
const suspended = profiles.filter(
(p) => p.account_status === "suspended"
).length;
const activeRequests = requests.filter((r) => r.status !== "closed").length;
const closedRequests = requests.filter((r) => r.status === "closed").length;
const urgentRequests = requests.filter((r) =>
(r.urgency || "").toLowerCase().includes("urgent")
).length;
const pendingContacts = contactRequests.filter(
(r) => r.status === "pending"
).length;

return {
users: profiles.length,
experts,
companies,
admins,
suspended,
activeRequests,
closedRequests,
urgentRequests,
pendingContacts,
allContacts: contactRequests.length,
};
}, [profiles, requests, contactRequests]);

if (checkingAuth) {
return (
<main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
<Header />
<section className="flex min-h-screen items-center justify-center px-6">
<p className="text-sm font-semibold text-[#6b7280]">
Checking admin access...
</p>
</section>
</main>
);
}

if (!authorized) {
return (
<main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
<Header />
<section className="px-6 pb-28 pt-36">
<div className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-white p-10 text-center shadow-sm">
<p className="text-xs font-semibold uppercase tracking-[0.28em] text-red-600">
Access Denied
</p>
<h1 className="mt-4 text-4xl font-bold tracking-[-0.04em]">
Admin access only.
</h1>
<p className="mt-4 text-sm leading-7 text-[#4b5563]">
This area is protected and available only to authorized VALCRONS
administrators.
</p>
</div>
</section>
<Footer />
</main>
);
}

return (
<main className="min-h-screen bg-[#f8f6f1] text-[#111827]">
<Header />

<section className="px-6 pb-28 pt-36">
<div className="mx-auto max-w-7xl">
<BackButton />

<div className="mt-8 rounded-[2.5rem] border border-black/10 bg-white p-8 shadow-sm md:p-12">
<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
VALCRONS Super Admin
</p>
<h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
Admin Dashboard.
</h1>
<p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
Control users, facility requests, contact requests, and core
platform safety from one protected command center.
</p>
</div>

<button
type="button"
onClick={loadAdminData}
className="rounded-2xl border border-black/10 bg-[#111827] px-6 py-4 text-sm font-semibold text-white transition hover:bg-black"
>
Refresh Admin Data
</button>
</div>

<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
<StatCard title="Total Users" value={stats.users} />
<StatCard title="Experts" value={stats.experts} />
<StatCard title="Companies" value={stats.companies} />
<StatCard title="Admins" value={stats.admins} />
<StatCard title="Suspended" value={stats.suspended} />
<StatCard title="Active Requests" value={stats.activeRequests} />
<StatCard title="Urgent Requests" value={stats.urgentRequests} />
<StatCard title="Closed Requests" value={stats.closedRequests} />
<StatCard title="Pending Contacts" value={stats.pendingContacts} />
<StatCard title="All Contacts" value={stats.allContacts} />
</div>
</div>

{(message || errorMessage) && (
<div
className={`mt-8 rounded-2xl border px-5 py-4 text-sm font-semibold ${
errorMessage
? "border-red-200 bg-red-50 text-red-700"
: "border-emerald-200 bg-emerald-50 text-emerald-700"
}`}
>
{errorMessage || message}
</div>
)}

{loading ? (
<div className="mt-8 rounded-[2rem] border border-black/10 bg-white p-10">
<p className="text-sm font-semibold text-[#6b7280]">
Loading admin data...
</p>
</div>
) : (
<>
<AdminSection
title="Users Management"
subtitle="Search, filter, view, suspend, and reactivate VALCRONS users."
>
<div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
<input
value={userSearch}
onChange={(e) => setUserSearch(e.target.value)}
placeholder="Search by name, email, company, location, or specialty..."
className="w-full rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm outline-none transition focus:border-[#9a7a3f] focus:ring-4 focus:ring-[#9a7a3f]/10 lg:max-w-xl"
/>

<div className="flex flex-wrap gap-2">
{[
["all", "All"],
["experts", "Experts"],
["companies", "Companies"],
["suspended", "Suspended"],
["admins", "Admins"],
].map(([value, label]) => (
<button
key={value}
type="button"
onClick={() => setUserFilter(value as UserFilter)}
className={`rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
userFilter === value
? "border-[#111827] bg-[#111827] text-white"
: "border-black/10 bg-white text-[#374151] hover:bg-[#f4f1ea]"
}`}
>
{label}
</button>
))}
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full min-w-[980px] text-left text-sm">
<thead>
<tr className="border-b border-black/10 text-xs uppercase tracking-[0.18em] text-[#6b7280]">
<th className="py-4">Name</th>
<th>Email</th>
<th>Role</th>
<th>Company</th>
<th>Location</th>
<th>Status</th>
<th>Admin</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{filteredProfiles.map((profile) => {
const userId = profile.id || profile.email || "";
const isSuspended =
profile.account_status === "suspended";

return (
<tr
key={userId}
className="border-b border-black/5 align-top"
>
<td className="py-4 font-semibold">
{profile.full_name || "No name"}
</td>
<td>{profile.email || "No email"}</td>
<td>{profile.role || "Not set"}</td>
<td>{profile.company_name || "—"}</td>
<td>{profile.location || "—"}</td>
<td>
<Badge
label={profile.account_status || "active"}
tone={isSuspended ? "red" : "green"}
/>
</td>
<td>{profile.is_admin ? "Yes" : "No"}</td>
<td>
<div className="flex flex-wrap gap-2">
<button
type="button"
onClick={() => setSelectedProfile(profile)}
className="rounded-xl border border-black/10 bg-white px-4 py-2 text-xs font-semibold transition hover:bg-[#f4f1ea]"
>
View
</button>

{profile.is_admin ? (
<span className="rounded-xl border border-[#9a7a3f]/30 bg-[#f8f1df] px-4 py-2 text-xs font-semibold text-[#7a5c1f]">
Protected
</span>
) : (
<>
<button
type="button"
disabled={updating === profile.id}
onClick={() =>
updateUserStatus(
profile,
isSuspended ? "active" : "suspended"
)
}
className="rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-2 text-xs font-semibold transition hover:bg-white disabled:opacity-50"
>
{isSuspended ? "Reactivate" : "Suspend"}
</button>

<button
type="button"
disabled={deletingUserId === profile.id}
onClick={() => deleteUser(profile)}
className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
>
Delete
</button>
</>
)}
</div>
</td>
</tr>
);
})}

{filteredProfiles.length === 0 && (
<tr>
<td
colSpan={8}
className="py-8 text-center text-sm font-semibold text-[#6b7280]"
>
No users match this search.
</td>
</tr>
)}
</tbody>
</table>
</div>
</AdminSection>

<AdminSection
title="Facility Requests"
subtitle="Review facility requests and change request status directly."
>
<div className="mb-6 flex flex-wrap gap-2">
{[
["all", "All"],
["active", "Active"],
["urgent", "Urgent"],
["closed", "Closed"],
].map(([value, label]) => (
<button
key={value}
type="button"
onClick={() => setRequestFilter(value as RequestFilter)}
className={`rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
requestFilter === value
? "border-[#111827] bg-[#111827] text-white"
: "border-black/10 bg-white text-[#374151] hover:bg-[#f4f1ea]"
}`}
>
{label}
</button>
))}
</div>

<div className="grid gap-4">
{filteredRequests.map((request) => {
const isClosed = request.status === "closed";

return (
<div
key={request.id}
className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5"
>
<div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a3f]">
Request #{request.id}
</p>
<h3 className="mt-2 text-xl font-semibold">
{request.issue_type ||
request.facility_type ||
"Industrial request"}
</h3>
<p className="mt-2 text-sm text-[#4b5563]">
{request.company_name || "Unknown company"} ·{" "}
{request.location || "No location"} ·{" "}
{request.urgency || "No urgency"}
</p>
<p className="mt-2 text-sm text-[#6b7280]">
{request.work_email || "No email"}
</p>
</div>

<div className="flex flex-col gap-3 sm:min-w-[220px]">
<Badge
label={request.status || "pending"}
tone={isClosed ? "red" : "green"}
/>

<select
value={
(request.status || "pending") as RequestStatus
}
disabled={updating === `request-${request.id}`}
onChange={(e) =>
updateRequestStatus(
request.id,
e.target.value as RequestStatus
)
}
className="rounded-xl border border-black/10 bg-white px-4 py-3 text-xs font-semibold outline-none transition focus:border-[#9a7a3f] focus:ring-4 focus:ring-[#9a7a3f]/10 disabled:opacity-50"
>
<option value="pending">Pending</option>
<option value="saved">Saved</option>
<option value="accepted">Accepted</option>
<option value="closed">Closed</option>
</select>
</div>
</div>
</div>
);
})}
</div>
</AdminSection>

<AdminSection
title="Expert Contact Requests"
subtitle="Monitor expert interest and pending facility contact requests."
>
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{contactRequests.map((item) => (
<div
key={item.id}
className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5"
>
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a3f]">
Contact Request #{item.id}
</p>
<p className="mt-2 text-sm text-[#374151]">
Related request: {item.request_id || "Unknown"}
</p>
<p className="mt-1 break-all text-sm text-[#374151]">
Expert ID: {item.expert_id || "Unknown"}
</p>
<div className="mt-3">
<Badge label={item.status || "pending"} tone="blue" />
</div>
</div>
))}
</div>
</AdminSection>

<AdminSection
title="Admin Activity Log"
subtitle="Permanent admin activity loaded from the database."
>
<div className="grid gap-3">
{adminActivity.length === 0 ? (
<p className="text-sm font-semibold text-[#6b7280]">
No admin activity recorded yet.
</p>
) : (
adminActivity.map((item, index) => (
<div
key={`${item}-${index}`}
className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-4 text-sm font-medium text-[#374151]"
>
{item}
</div>
))
)}
</div>
</AdminSection>

<AdminSection
title="Reports"
subtitle="Future moderation center for user reports, abuse, spam, and disputes."
>
<div className="rounded-2xl border border-dashed border-black/15 bg-[#f8f6f1] p-6">
<p className="text-sm font-semibold text-[#111827]">
Reports system placeholder
</p>
<p className="mt-2 text-sm leading-7 text-[#6b7280]">
This section is ready for the next database table:
platform_reports. After we create it, reports will appear
here with Review, Dismiss, Suspend User, and Close Report
actions.
</p>
</div>
</AdminSection>
</>
)}
</div>
</section>

{selectedProfile && (
<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm">
<div className="w-full max-w-2xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl">
<div className="flex items-start justify-between gap-6">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7a3f]">
User Profile
</p>
<h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
{selectedProfile.full_name || "No name"}
</h2>
<p className="mt-2 text-sm text-[#6b7280]">
{selectedProfile.email || "No email"}
</p>
</div>

<button
type="button"
onClick={() => setSelectedProfile(null)}
className="rounded-xl border border-black/10 bg-[#f8f6f1] px-4 py-2 text-xs font-semibold transition hover:bg-white"
>
Close
</button>
</div>

<div className="mt-8 grid gap-4 sm:grid-cols-2">
<Info label="Role" value={selectedProfile.role} />
<Info label="Company" value={selectedProfile.company_name} />
<Info label="Location" value={selectedProfile.location} />
<Info label="Phone" value={selectedProfile.phone} />
<Info label="Specialty" value={selectedProfile.specialty} />
<Info
label="Account Status"
value={selectedProfile.account_status || "active"}
/>
<Info
label="Admin"
value={selectedProfile.is_admin ? "Yes" : "No"}
/>
<Info label="User ID" value={selectedProfile.id} />
</div>
</div>
</div>
)}

<Footer />
</main>
);
}

function AdminSection({
title,
subtitle,
children,
}: {
title: string;
subtitle?: string;
children: ReactNode;
}) {
return (
<section className="mt-8 rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
<div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
<div>
<h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
{subtitle && (
<p className="mt-2 text-sm leading-6 text-[#6b7280]">{subtitle}</p>
)}
</div>
</div>
<div className="mt-6">{children}</div>
</section>
);
}

function StatCard({ title, value }: { title: string; value: number }) {
return (
<div className="rounded-[2rem] border border-black/10 bg-[#f8f6f1] p-6 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
{title}
</p>
<p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
{value}
</p>
<p className="mt-3 text-xs font-medium text-[#6b7280]">
Admin control metric
</p>
</div>
);
}

function Info({
label,
value,
}: {
label: string;
value: string | number | null | undefined;
}) {
return (
<div className="rounded-2xl border border-black/10 bg-[#f8f6f1] p-5">
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7280]">
{label}
</p>
<p className="mt-2 break-words text-sm font-semibold text-[#111827]">
{value || "Not provided"}
</p>
</div>
);
}

function Badge({
label,
tone,
}: {
label: string;
tone: "green" | "red" | "blue";
}) {
const styles =
tone === "green"
? "border-emerald-200 bg-emerald-50 text-emerald-700"
: tone === "red"
? "border-red-200 bg-red-50 text-red-700"
: "border-blue-200 bg-blue-50 text-blue-700";

return (
<span
className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${styles}`}
>
{label}
</span>
);
}
