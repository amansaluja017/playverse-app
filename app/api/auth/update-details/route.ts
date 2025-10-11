import { Iuser, User } from "@/models/user.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface updateFormData {
    name?: string,
    avatar?: string,
    oldPassword?: string
    password?: string,
    confirmPassword?: string
}


export async function PATCH(request: NextRequest) {
    const { name, avatar, password, confirmPassword, oldPassword }: updateFormData = await request.json();

    const session = await getServerSession(authOptions);

    if (!session) {
        throw NextResponse.json(
            { error: "You are not authenticate to update details, please login" },
            { status: 401 }
        )
    }

    if (name) {
        await connectToDatabase();

        const user = await User.findByIdAndUpdate(session.user.id, {
            name
        }, {
            new: true
        })

        if (!user) {
            throw NextResponse.json(
                { error: "user not found" },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { message: "your name has successfully updated" },
            { status: 200 }
        )
    } else if (avatar) {
        await connectToDatabase();

        const user = await User.findByIdAndUpdate(session.user.id, {
            avatar
        }, {
            new: true
        })

        if (!user) {
            throw NextResponse.json(
                { error: "user not found" },
                { status: 401 }
            )
        }

        return NextResponse.json(
            { message: "your name has successfully updated" },
            { status: 200 }
        )
    } else if (password) {
        if (!confirmPassword || !oldPassword) {
            return NextResponse.json(
                {error: "All feilds are required"},
                {status: 400}
            )
        }

        await connectToDatabase();

        const user = await User.findOne({_id: session.user.id});

        const isValid = await bcrypt.compare(oldPassword, user.password)

        if(!isValid) {
            return NextResponse.json(
                {error: "old password is incorrect"},
                {status: 400}
            )
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                {error: "password and confirm password does not match"},
                {status: 400}
            )
        }

        user.password = password;
        user.save();

        return NextResponse.json(
            {message: "password is changed successfully"},
            {status: 200}
        )
    }

    return NextResponse.json(
        { error: "enter details to change" },
        { status: 400 }
    )
}