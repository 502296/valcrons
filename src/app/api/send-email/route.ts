import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  return NextResponse.json({
    status: "send-email route is working",
  });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: "VALCRONS <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111827;">
          <h2 style="margin-bottom: 12px;">${subject}</h2>
          <p style="font-size: 15px; line-height: 1.6;">${message}</p>
          <hr style="margin: 24px 0;" />
          <p style="font-size: 12px; color: #6b7280;">
            VALCRONS Industrial Expertise Network
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email", details: String(error) },
      { status: 500 }
    );
  }
}
