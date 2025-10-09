import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER!,
    pass: process.env.NODEMAILER_PASSWORD!,
  },
});

export function mailOptions(
  from: string,
  to: string,
  subject: string,
  text: string
) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error from nodemailer:", error);
      return NextResponse.json(
        {error: "Failed to send otp"},
        {status: 500}
      )
    } else {
      console.log("Email sent:", info.response);
      // return NextResponse.json(
      //   {message: "otp send successfully"},
      //   {status: 200}
      // )
    }
  });
}