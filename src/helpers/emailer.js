import nodemailer from "nodemailer";
import { config } from "dotenv";
import {templatEmail} from "../template/email.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createTransport = () => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transport;
};

export const sendMail = async (user,token) => {
  try {
    const transporter = createTransport();
    const htmlContent = await templatEmail(user,token);
    const imagePath = path.join(__dirname, '..', 'template', 'asset', 'email.png');
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `${user.email}`,
      subject: `Hello ${user.name} ${user.lastName}`,
      html: htmlContent,
      attachments: [
        {   
            filename: 'email.png',
            path: imagePath,
            cid:"email"
        },
    ]
    });

    console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
