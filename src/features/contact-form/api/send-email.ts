"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(email: string, message: string) {
  if (!email || !message) {
    return { success: false, error: "Email and message are required." };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `axmbro.dev - Message from ${email}`,
      text: `From: ${email}\n\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email." };
  }
}
