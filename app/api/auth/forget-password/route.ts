import { User } from "@/models/user.model";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const email = body.email;
    console.log(email);

    if (!email) {
        return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({email});

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User found", user }, { status: 200 });
}

export async function PATCH(request: NextRequest) {
    const body = await request.json();

    const email = body.email;
    const newPassword = body.newPassword;
    const confirmNewPassword = body.confirmNewPassword;

    if (!email || !newPassword || !confirmNewPassword) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmNewPassword) {
        return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({email});

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
}