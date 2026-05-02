import nodemailer from "nodemailer";
import env from "./../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: false,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },    
});

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Giveaway Tracker" <${env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
};
