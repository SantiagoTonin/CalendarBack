import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

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

export const sendMail = async (user) => {
  try {
    const transporter = createTransport();
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `${user.email}`,
      subject: `Hello ${user.name} ${user.lastName}`,
      html: "<h1>There your registration has been successfully received.</h1>",
    });

    console.log(info);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
