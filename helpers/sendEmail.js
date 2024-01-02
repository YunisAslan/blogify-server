const nodemailer = require("nodemailer");

async function sendVerifyEmail(type, email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailData = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // list of receivers
    subject: "Verify your account (Blogify)",
    text: "That was easy!",
    html: `Click here to verify your account: <a href="http://localhost:6001/api/${type}/verify/${token}" style="text-decoration-line: underline; color: blue;">click</a>`,
  };

  await transporter.sendMail(mailData, (err, info) => {
    // console.log("err", err);
    // console.log("info", info);
  });
}

module.exports = sendVerifyEmail;
