"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/layout/BackButton";
import { supabase } from "@/lib/supabase";

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
problem_description: string | null;
status: string | null;
};

type ActionType = "saved" | "accepted" | "contacted";

type ExpertActions = {
saved: number[];
accepted: number[];
contacted: number[];
};

type AttachmentInfo = {
file: File;
name: string;
size: number;
type: string;
};

export default function RequestsPage() {
const [requests, setRequests] = useState<FacilityRequest[]>([]);
const [loading, setLoading] = useState(true);
const [expandedId, setExpandedId] = useState<number | null>(null);
const [loggedIn, setLoggedIn] = useState(false);
const [checkingAuth, setCheckingAuth] = useState(true);
const [expertId, setExpertId] = useState<string | null>(null);

const [actions, setActions] = useState({
saved: [],
accepted: [],
contacted: [],
});

const [message, setMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [updatingAction, setUpdatingAction] = useState<string | null>(null);

const [contactRequest, setContactRequest] =
useState<FacilityRequest | null>(null);
const [contactMessage, setContactMessage] = useState("");
const [attachments, setAttachments] = useState<AttachmentInfo[]>([]);

useEffect(() => {
async function init() {
const {
data: { session },
} = await supabase.auth.getSession();

  if (!session?.user) {
    setLoggedIn(false);
    setCheckingAuth(false);
    setLoading(false);
    return;
  }

  setLoggedIn(true);
  setExpertId(session.user.id);
  setCheckingAuth(false);

  await loadRequests();
  await loadExpertActions(session.user.id);
}

init();
}, []);
async function loadRequests() {
setLoading(true);

const { data, error } = await supabase
  .from("facility_requests")
  .select("*")
  .order("created_at", { ascending: false });

if (error) {
  setErrorMessage("Requests could not be loaded. Please try again.");
  setLoading(false);
  return;
}

setRequests((data || []).filter((request) => request.status !== "closed"));
setLoading(false);
}
async function loadExpertActions(userId: string) {
const { data, error } = await supabase
.from("technician_project_actions")
.select("project_id, action_type")
.eq("technician_id", userId);

if (error) return;

const nextActions: ExpertActions = {
  saved: [],
  accepted: [],
  contacted: [],
};

(data || []).forEach((item) => {
  const actionType = item.action_type as ActionType;
  const projectId = Number(item.project_id);

  if (
    actionType === "saved" ||
    actionType === "accepted" ||
    actionType === "contacted"
  ) {
    nextActions[actionType].push(projectId);
  }
});

setActions(nextActions);
}
function hasAction(requestId: number, actionType: ActionType) {
return actions[actionType].includes(requestId);
}

async function addExpertAction(requestId: number, actionType: ActionType) {
if (!expertId) return;

setMessage("");
setErrorMessage("");
setUpdatingAction(`${requestId}-${actionType}`);

if (hasAction(requestId, actionType)) {
  setUpdatingAction(null);
  return;
}

const { error } = await supabase.from("technician_project_actions").insert({
  technician_id: expertId,
  project_id: requestId,
  action_type: actionType,
});

setUpdatingAction(null);

if (error) {
  setErrorMessage("Action could not be saved. Please check permissions.");
  return;
}

setActions((prev) => ({
  ...prev,
  [actionType]: [...prev[actionType], requestId],
}));

if (actionType === "saved") setMessage("Project saved successfully.");
if (actionType === "accepted") setMessage("Project accepted successfully.");
}
function openContactModal(request: FacilityRequest) {
setMessage("");
setErrorMessage("");
setContactRequest(request);
setContactMessage("");
setAttachments([]);
}

function closeContactModal() {
setContactRequest(null);
setContactMessage("");
setAttachments([]);
}

function handleAttachments(files: FileList | null) {
if (!files) return;

const selectedFiles = Array.from(files)
  .slice(0, 4)
  .map((file) => ({
    file,
    name: file.name,
    size: file.size,
    type: file.type || "unknown",
  }));

setAttachments(selectedFiles);
}
async function submitContactRequest() {
if (!expertId || !contactRequest) return;

const requestId = contactRequest.id;
const cleanMessage = contactMessage.trim();

if (cleanMessage.length < 20) {
  setErrorMessage("Please write a short professional message first.");
  return;
}

if (hasAction(requestId, "contacted")) {
  setErrorMessage("You already submitted a contact request for this project.");
  return;
}

setMessage("");
setErrorMessage("");
setUpdatingAction(`${requestId}-contacted`);

const attachmentData = [];

for (const file of attachments) {
  const filePath = `${expertId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("contact-attachments")
    .upload(filePath, file.file);

  if (!uploadError) {
    attachmentData.push({
      name: file.name,
      path: filePath,
      type: file.type,
      size: file.size,
    });
  }
}

const { error: actionError } = await supabase
  .from("technician_project_actions")
  .insert({
    technician_id: expertId,
    project_id: requestId,
    action_type: "contacted",
  });

if (actionError) {
  setUpdatingAction(null);
  setErrorMessage("Contact request could not be sent. Please check permissions.");
  return;
}

const { error: contactError } = await supabase
  .from("expert_contact_requests")
  .insert({
    request_id: requestId,
    expert_id: expertId,
    expert_message: cleanMessage,
    attachment_names: attachmentData,
    status: "pending",
  });

if (contactError) {
  setUpdatingAction(null);
  setErrorMessage("Contact request could not be saved.");
  return;
}

if (contactRequest.work_email) {
  const { data: companyProfile } = await supabase
    .from("profiles")
    .select("id, uid")
    .eq("email", contactRequest.work_email)
    .maybeSingle();

  const companyUserId = companyProfile?.uid || companyProfile?.id;

  if (companyUserId) {
    await supabase.from("notifications").insert({
      user_id: companyUserId,
      title: "New Expert Contact Request",
      message:
        "An expert has requested contact regarding your industrial support request.",
      type: "contact_request",
      related_request_id: requestId,
      is_read: false,
    });
  }

  await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: contactRequest.work_email,
      subject: "New Expert Contact Request",
      message:
        "An expert has submitted a contact request for your industrial support request. Please log in to VALCRONS to review the expert profile and respond.",
    }),
  });
}

setActions((prev) => ({
  ...prev,
  contacted: [...prev.contacted, requestId],
}));

setUpdatingAction(null);
setMessage("Contact request sent to the facility.");
closeContactModal();
}
function getRequestTitle(request: FacilityRequest) {
const description = request.problem_description || "";

if (description.length > 8) {
  return description.length > 72
    ? `${description.slice(0, 72)}...`
    : description;
}

return request.issue_type || "Industrial support request";
}
function priorityLabel(value: string | null) {
const text = (value || "").toLowerCase();

if (text.includes("urgent")) return "URGENT — NEEDS IMMEDIATE REVIEW";
if (text.includes("high")) return "HIGH PRIORITY — NEEDS EXPERT REVIEW SOON";
if (text.includes("normal")) return "NORMAL PRIORITY";
return "PENDING REVIEW";
}
const urgentCount = requests.filter((request) =>
(request.urgency || "").toLowerCase().includes("urgent")
).length;

if (checkingAuth) {
  return null;
}

if (!loggedIn) {
return (


    <section className="px-6 py-32">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-black/10 bg-white p-10 text-center shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a7a3f]">
          Secure Industrial Access
        </p>

        <h1 className="mt-4 text-4xl font-bold text-[#111827]">
          Industrial Access Required
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-[#4b5563]">
          To view industrial requests, you must create an account or log in
          first. VALCRONS protects facilities, experts, and operational
          information through verified account-based access.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/login"
            className="rounded-xl border border-black/10 bg-white px-6 py-3 font-semibold text-[#111827] hover:bg-[#f4f1ea]"
          >
            Log In
          </a>

          <a
            href="/signup"
            className="rounded-xl bg-[#111827] px-6 py-3 font-semibold text-white hover:bg-black"
          >
            Create Account
          </a>
        </div>
      </div>
    </section>
  </main>
);
}
return (
  <>


    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <BackButton />

        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#111827]">
            Expert Operations Dashboard
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] text-[#111827] md:text-7xl">
            Active industrial support requests.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#374151]">
            Review verified operational requests, save opportunities, accept
            projects, and request facility contact through VALCRONS.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard title="Available Requests" value={requests.length} />
          <StatCard title="Urgent Requests" value={urgentCount} />
          <StatCard title="Saved Projects" value={actions.saved.length} />
          <StatCard title="Accepted Projects" value={actions.accepted.length} />
          <StatCard title="Contact Requests" value={actions.contacted.length} />
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

        <div className="mt-8 grid gap-6">
          {loading && (
            <p className="text-sm text-[#374151]">Loading requests...</p>
          )}

          {!loading && requests.length === 0 && (
            <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-sm">
              <p className="text-[#374151]">No requests available yet.</p>
            </div>
          )}

          {requests.map((request) => {
            const isExpanded = expandedId === request.id;
            const saved = hasAction(request.id, "saved");
            const accepted = hasAction(request.id, "accepted");
            const contactRequested = hasAction(request.id, "contacted");

            return (
              <article
                key={request.id}
                className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md md:p-10"
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                      {priorityLabel(request.urgency)}
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
                      {getRequestTitle(request)}
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-[#374151]">
                      {request.issue_type || "General industrial support"}
                    </p>

                    <div className="mt-7 grid gap-4 text-sm text-[#374151] sm:grid-cols-4">
                      <Info label="Industry" value={request.facility_type} />
                      <Info label="Location" value={request.location} />
                      <Info label="Support Type" value={request.issue_type} />
                      <Info label="Status" value={request.status || "pending"} />
                    </div>

                    {isExpanded && (
                      <div className="mt-8 rounded-3xl border border-black/10 bg-[#f8f6f1] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#111827]">
                          Request Details
                        </p>

                        <p className="mt-4 text-sm leading-7 text-[#374151]">
                          {request.problem_description ||
                            "No additional details provided."}
                        </p>

                        <div className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                          <Info
                            label="Company"
                            value={
                              contactRequested
                                ? request.company_name || "Not provided"
                                : "Hidden until contact request"
                            }
                          />

                          <Info
                            label="Contact"
                            value={
                              contactRequested
                                ? request.contact_person || "Not provided"
                                : "Protected"
                            }
                          />

                          <Info
                            label="Email"
                            value={
                              contactRequested
                                ? request.work_email || "Not provided"
                                : "Protected"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 md:min-w-[210px]">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : request.id)
                      }
                      className="rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-white"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </button>

                    <button
                      type="button"
                      onClick={() => openContactModal(request)}
                      disabled={contactRequested}
                      className="rounded-2xl bg-[#07111f] px-5 py-4 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {contactRequested ? "Contact Requested ✓" : "Request Contact →"}
                    </button>

                    <button
                      type="button"
                      onClick={() => addExpertAction(request.id, "accepted")}
                      disabled={
                        accepted ||
                        updatingAction === `${request.id}-accepted`
                      }
                      className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-[#f8f6f1] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {accepted
                        ? "Accepted ✓"
                        : updatingAction === `${request.id}-accepted`
                        ? "Accepting..."
                        : "Accept Project"}
                    </button>

                    <button
                      type="button"
                      onClick={() => addExpertAction(request.id, "saved")}
                      disabled={
                        saved || updatingAction === `${request.id}-saved`
                      }
                      className="rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm font-semibold text-[#111827] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saved
                        ? "Saved ✓"
                        : updatingAction === `${request.id}-saved`
                        ? "Saving..."
                        : "Save Project"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  </main>

  {contactRequest && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[2rem] border border-black/10 bg-white p-8 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a7a3f]">
          Contact Request
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111827]">
          Explain why you are a strong fit.
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#4b5563]">
          Write a short professional message for the facility. This improves
          your chance of being approved for direct contact.
        </p>

        <textarea
          rows={6}
          maxLength={700}
          value={contactMessage}
          onChange={(e) => setContactMessage(e.target.value)}
          placeholder="Example: I have 12 years of experience with PLC troubleshooting, conveyor systems, and urgent plant support. I am available for remote review today and can support on-site if needed."
          className="mt-6 w-full resize-none rounded-2xl border border-black/10 bg-[#f8f6f1] px-5 py-4 text-sm leading-7 text-[#111827] outline-none focus:border-[#111827]"
        />

        <div className="mt-4 rounded-2xl border border-dashed border-black/15 bg-[#f8f6f1] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#111827]">
            Attachments Optional
          </p>

          <p className="mt-2 text-sm leading-6 text-[#6b7280]">
            Add resume, certifications, safety training, or portfolio files.
            File upload storage will be upgraded later; this version records
            selected file names for the facility review.
          </p>

          <label className="mt-5 flex cursor-pointer items-center justify-center rounded-2xl border border-[#2563eb]/20 bg-[#2563eb] px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]">
            Upload Resume / Certifications

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={(e) => handleAttachments(e.target.files)}
              className="hidden"
            />
          </label>

          <p className="mt-3 text-xs text-[#6b7280]">
            Supported files: PDF, DOC, DOCX, JPG, PNG
          </p>

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              {attachments.map((file) => (
                <p
                  key={file.name}
                  className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#111827]"
                >
                  {file.name}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={closeContactModal}
            className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[#111827] hover:bg-[#f4f1ea]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={submitContactRequest}
            disabled={
              !contactMessage.trim() ||
              updatingAction === `${contactRequest.id}-contacted`
            }
            className="rounded-xl bg-[#111827] px-5 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updatingAction === `${contactRequest.id}-contacted`
              ? "Sending..."
              : "Send Contact Request"}
          </button>
        </div>
      </div>
    </div>
  )}

  <Footer />
</>
);
}
function StatCard({ title, value }: { title: string; value: number }) {
return (


{title}

  <p className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#111827]">
    {value}
  </p>

  <p className="mt-3 text-xs font-medium text-[#6b7280]">
    Expert activity metric
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


{label}

  <p className="mt-2 font-medium text-[#111827]">
    {value || "Not specified"}
  </p>
</div>
);
}
