import nodemailer from "nodemailer";

let lastSentTime = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, message } = req.body;
    const now = Date.now();
    const cooldown = 10 * 1000;

    if (lastSentTime[email] && now - lastSentTime[email] < cooldown) {
      res.setHeader("Retry-After", "10");
      return res
        .status(429)
        .json({ error: "Poczekaj 10 sekund przed wysłaniem kolejnej wiadomości." });
    }

    lastSentTime[email] = now;
    const date = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: "axmbro@gmail.com",
      subject: `Contact submission - ${email}, ${date}`,
      text: `Date: ${date}\nFrom: ${email}\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
