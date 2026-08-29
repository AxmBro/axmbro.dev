"use server";

import nodemailer from "nodemailer";

type SendEmailResult =
  | { success: true }
  | { success: false; reason: "unavailable" | "send_failed" };

export async function sendEmailAction(
  email: string,
  discord: string,
  message: string,
  honeypot = "",
): Promise<SendEmailResult> {
  if (honeypot.trim()) {
    return { success: true };
  }

  if (!email || !message) {
    return { success: false, reason: "send_failed" };
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return { success: false, reason: "unavailable" };
  }

  const discordLine = discord.trim()
    ? `Discord: ${discord.trim()}`
    : "Discord: Not provided";

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
      text: `From: ${email}\n${discordLine}\n\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, reason: "send_failed" };
  }
}
