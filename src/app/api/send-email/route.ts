// src/app/api/send-email/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    const { to, subject, message } = body;

    console.log("EMAIL API HIT:", body);

    if (!to || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: to, subject, message",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
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
