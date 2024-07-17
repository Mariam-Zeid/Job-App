import nodemailer from "nodemailer";

export const sendEmail = async (email = "", subj = "", msg = "") => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mariam.a.zead@gmail.com",
      pass: "bspetlmjcptedlqw",
    },
  });

  await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: email,
    subject: subj,
    html: msg,
  });
};
