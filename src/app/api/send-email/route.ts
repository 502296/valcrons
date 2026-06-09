import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function previewText(value: string, maxLength = 360) {
  const clean = value.trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength)}...`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();

    const {
      to,
      subject = "VALCRONS | New Expert Contact Request",
      message,
      expertName = "Industrial Expert",
      expertSpecialty = "Not provided",
      expertLocation = "Not provided",
      requestTitle = "Industrial Support Request",
      requestLocation = "Not provided",
      attachmentCount = "No files submitted",
      reviewUrl = "https://valcrons-udmm.vercel.app/my-requests",
    } = body;

    if (!to || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: to, message",
        },
        { status: 400 }
      );
    }

    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(previewText(message));
    const safeExpertName = escapeHtml(expertName);
    const safeExpertSpecialty = escapeHtml(expertSpecialty);
    const safeExpertLocation = escapeHtml(expertLocation);
    const safeRequestTitle = escapeHtml(requestTitle);
    const safeRequestLocation = escapeHtml(requestLocation);
    const safeAttachmentCount = escapeHtml(attachmentCount);
    const safeReviewUrl = escapeHtml(reviewUrl);

    const html = `
      <div style="margin:0;padding:0;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:680px;margin:0 auto;padding:34px 20px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:26px;overflow:hidden;box-shadow:0 20px 60px rgba(17,24,39,0.10);">
            
            <div style="padding:30px 34px;border-bottom:1px solid #e5e7eb;background:#ffffff;">
              <p style="margin:0;font-size:12px;letter-spacing:4px;font-weight:800;color:#9a7a3f;">
                VALCRONS
              </p>

              <h1 style="margin:12px 0 0;font-size:28px;line-height:1.22;color:#111827;font-weight:800;">
                New Industrial Expert Available for Review
              </h1>

              <p style="margin:14px 0 0;font-size:15px;line-height:1.7;color:#4b5563;">
                A qualified industrial expert has submitted a contact request for your facility support request.
              </p>
            </div>

            <div style="padding:30px 34px;">
              <div style="background:#f8f6f1;border:1px solid #e5e7eb;border-radius:20px;padding:22px;">
                <p style="margin:0 0 16px;font-size:12px;letter-spacing:3px;font-weight:800;color:#6b7280;">
                  EXPERT SUMMARY
                </p>

                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;width:38%;">Name</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeExpertName}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;">Specialty</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeExpertSpecialty}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;">Location</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeExpertLocation}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;">Attachments</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeAttachmentCount}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top:20px;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;padding:22px;">
                <p style="margin:0 0 16px;font-size:12px;letter-spacing:3px;font-weight:800;color:#6b7280;">
                  REQUEST CONTEXT
                </p>

                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;width:38%;">Request</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeRequestTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0;font-size:13px;color:#6b7280;">Facility Location</td>
                    <td style="padding:9px 0;font-size:14px;font-weight:800;color:#111827;">${safeRequestLocation}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top:22px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:3px;font-weight:800;color:#6b7280;">
                  MESSAGE PREVIEW
                </p>

                <p style="margin:0;background:#f8f6f1;border:1px solid #e5e7eb;border-radius:18px;padding:18px;font-size:14px;line-height:1.75;color:#374151;">
                  ${safeMessage}
                </p>
              </div>

              <div style="margin-top:30px;text-align:center;">
                <a href="${safeReviewUrl}"
                  style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:800;font-size:14px;padding:15px 26px;border-radius:15px;">
                  Review Expert Profile →
                </a>
              </div>

              <p style="margin:22px 0 0;text-align:center;font-size:12px;line-height:1.6;color:#6b7280;">
                You can approve, decline, email, call, or print the expert summary inside VALCRONS.
              </p>
            </div>

            <div style="padding:24px 34px;background:#111827;color:#d1d5db;">
              <p style="margin:0;font-size:13px;line-height:1.6;font-weight:700;">
                VALCRONS Industrial Expertise Network
              </p>

              <p style="margin:7px 0 0;font-size:12px;line-height:1.6;color:#9ca3af;">
                Connecting industrial facilities with trusted experts for operational support.
              </p>
            </div>
          </div>

          <p style="margin:18px 0 0;text-align:center;font-size:11px;line-height:1.6;color:#9ca3af;">
            This notification was sent because your facility has an active support request on VALCRONS.
          </p>
        </div>
      </div>
    `;

    const text = `
VALCRONS | New Industrial Expert Available for Review

A qualified industrial expert has submitted a contact request for your facility support request.

Expert:
${expertName}

Specialty:
${expertSpecialty}

Location:
${expertLocation}

Request:
${requestTitle}

Facility Location:
${requestLocation}

Message Preview:
${previewText(message)}

Attachments:
${attachmentCount}

Review:
${reviewUrl}

VALCRONS Industrial Expertise Network
`;

    const { data, error } = await resend.emails.send({
      from: "VALCRONS <onboarding@resend.dev>",
      to,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("EMAIL SERVER ERROR:", error);

    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
