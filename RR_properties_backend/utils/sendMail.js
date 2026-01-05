import nodemailer from "nodemailer";

export const sendOtpMail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "RR Properties <no-reply@rrproperties.com>",
    to,
    subject: "Admin Password Reset OTP",
    html: `
      <h2>Password Reset OTP</h2>
      <p>Your OTP is <strong>${otp}</strong></p>
      <p>Valid for 5 minutes</p>
    `,
  });
};
