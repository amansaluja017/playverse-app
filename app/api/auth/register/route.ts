import { Iuser, User } from "@/models/user.model";
import { mailOptions } from "@/nodemailer/nodemailer.config";
import { connectToDatabase } from "@/utils/db";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, req: NextApiRequest) {
    try {
        const { name, email, password, isVerified } = await request.json();

        console.log(name, email, password);

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "All feild are required" },
                { status: 400 }
            )
        }

        await connectToDatabase();

        const existedUser = await User.findOne({ email });

        console.log(existedUser)

        if (existedUser) {
            return NextResponse.json(
                { error: "user already exists" },
                { status: 400 }
            )
        }

        const user = await User.create(
            {
                name,
                email,
                password,
                isVerified,
            }
        )
        console.log(user)

        if (user) {
            mailOptions(process.env.NODEMAILER_USER!, email, "Welcome to Playverse", "Your account has been created successfully");
        }

        return NextResponse.json(
            { message: "user created successfully", user },
            { status: 201 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "falied to register" },
            { status: 500 }
        )
    }
}