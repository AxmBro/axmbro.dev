"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL_REGEX, CONTACT_FORM_LIMITS } from "@/shared/constants/contact-form-limits";

type SendEmailResult =
  | { success: true }
  | { success: false; reason: "unavailable" | "send_failed" | "invalid" | "rate_limited" };

const RATE_LIMIT_MAX_SENDS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_TRACKED_IPS = 5000;

// Best-effort per-instance throttle: serverless isolates share no memory, so this only
// blunts naive repeat submits. CONTACT_FORM_LIMITS is the real bound on work per call.
const recentSendsByIp = new Map<string, number[]>();

const getClientIp = async () => {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();

  if (recentSendsByIp.size > RATE_LIMIT_MAX_TRACKED_IPS) {
    for (const [trackedIp, timestamps] of recentSendsByIp) {
      if (!timestamps.some((time) => now - time < RATE_LIMIT_WINDOW_MS)) {
        recentSendsByIp.delete(trackedIp);
      }
    }
  }

  const recent = (recentSendsByIp.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  recentSendsByIp.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX_SENDS) return true;

  recent.push(now);
  return false;
};

const isValidSubmission = (email: string, discord: string, message: string) => {
  const cleanEmail = email.trim();
  return (
    cleanEmail.length > 0 &&
    cleanEmail.length <= CONTACT_FORM_LIMITS.email &&
    CONTACT_EMAIL_REGEX.test(cleanEmail) &&
    discord.length <= CONTACT_FORM_LIMITS.discord &&
    message.trim().length > 0 &&
    message.length <= CONTACT_FORM_LIMITS.message
  );
};

export async function sendEmailAction(
  email: string,
  discord: string,
  message: string,
  honeypot = "",
): Promise<SendEmailResult> {
  if (honeypot.trim()) {
    return { success: true };
  }

  if (isRateLimited(await getClientIp())) {
    return { success: false, reason: "rate_limited" };
  }

  if (!isValidSubmission(email, discord, message)) {
    return { success: false, reason: "invalid" };
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
      disableFileAccess: true,
      disableUrlAccess: true,
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `axmbro.dev - Message from ${email.trim()}`,
      text: `From: ${email.trim()}\n${discordLine}\n\n${message}`,
      replyTo: email.trim(),
    });

    return { success: true };
  } catch (error) {
    // Log code and message only: full nodemailer errors embed raw SMTP response bodies.
    const smtpError = error as { code?: string; message?: string };
    console.error(
      "Email send failed:",
      smtpError.code ?? "unknown",
      smtpError.message ?? "",
    );
    return { success: false, reason: "send_failed" };
  }
}