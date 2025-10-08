import { NextRequest, NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import nodemailer from "nodemailer";

// Keys provided must be base32 strings, ie. only containing characters matching (A-Z, 2-7, =).
const { otp, expires } = await TOTP.generate("JBSWY3DPEHPK3PXP", {
	digits: 6,
	algorithm: "SHA-512",
})

console.table({ otp, expires });


export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if(!email) {
        return NextResponse.json(
            {error: "Email is required"},
            {status: 400}
        );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amansaluja017@gmail.com",
        pass: "pglhdmuazvdkzpvl", 
      },
    });

    const mailOptions = {
      from: "amansaluja017@gmail.com",
      to: email,
      subject: `New message from ${name}`,
      text: otp,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    return NextResponse.json({
        message: "OTP sent successfully",
        otp,
        expires,
        status: 200
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
        {error: "Failed to send OTP"},
        {status: 500}
    );
  }
}