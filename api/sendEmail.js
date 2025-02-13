import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const filePath = path.join(process.cwd(), "id.json");

async function getNextId() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const json = JSON.parse(data);
    json.id += 1;
    await fs.writeFile(filePath, JSON.stringify(json));
    return json.id;
  } catch {
    await fs.writeFile(filePath, JSON.stringify({ id: 1 }));
    return 1;
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, message } = req.body;
    const id = await getNextId();

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
      subject: `Contact form submission #${id} from ${email}.`,
      text: `ID: ${id}\nFrom: ${email}\nMessage:\n${message}`,
    });

    res.status(200).json({ success: true, id });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
