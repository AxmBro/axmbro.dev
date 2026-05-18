import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, message, honeypot } = await request.json();

    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `axmbro.dev - Message from ${email}`,
      text: `From: ${email}\n\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
