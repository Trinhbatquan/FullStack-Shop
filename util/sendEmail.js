const nodemailer = require("nodemailer");
require("dotenv/config");

module.exports = async (email, subject, html) => {
  console.log(
    `${process.env.USER_NAME}${process.env.USER_SUB}`,
    process.env.PASS
  );
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: `${process.env.USER_NAME}${process.env.USER_SUB}`,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: `From Admin of shop <${process.env.USER_NAME}${process.env.USER_SUB}>`,
    to: email,
    subject: subject,
    html,
  });
  console.log("email sent successfully");
};
