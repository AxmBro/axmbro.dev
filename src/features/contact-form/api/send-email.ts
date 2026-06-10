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

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send email." };
  }
}
