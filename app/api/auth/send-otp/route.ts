import { NextRequest, NextResponse } from "next/server";
import { TOTP } from "totp-generator";
import { mailOptions } from "@/nodemailer/nodemailer.config";


export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log(email);

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { otp, expires } = await TOTP.generate("JBSWY3DPEHPK3PXP", {
      digits: 6,
      algorithm: "SHA-512",
    })

    console.table({ otp, expires });

    mailOptions(process.env.NODEMAILER_USER as string, email, "Your OTP Code", `Your OTP code is ${otp}. It will expire in 5 minutes.`);

    return NextResponse.json({
      message: "OTP sent successfully",
      otp,
      expires,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
};