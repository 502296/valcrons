import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: "VALCRONS <onboarding@resend.dev>",
      to: "ali.kathem.edu@gmail.com",
      subject: "VALCRONS Test Email",
      html: "<h1>VALCRONS Test Email</h1><p>Email system is working.</p>",
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}
