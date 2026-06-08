import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const result = await resend.emails.send({
      from: "VALCRONS <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111827;">
          <h2>${subject}</h2>
          <p>${message}</p>
          <hr />
          <p style="font-size:12px;color:#6b7280;">
            VALCRONS Industrial Expertise Network
          </p>
        </div>
      `,
    });

    console.log("VALCRONS EMAIL SENT:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("VALCRONS EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
