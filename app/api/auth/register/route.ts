import { User } from "@/models/user.model";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {name, email, password} = await request.json();

        console.log(name, email, password);

        if (!name || !email || !password) {
            return NextResponse.json(
                {error: "All feild are required"},
                {status: 400}
            )
        }

        await connectToDatabase();

        const existedUser = await User.findOne({email});
        
        console.log(existedUser)

        if (existedUser) {
            return NextResponse.json(
                {error: "user already exists"},
                {status: 400}
            )
        }

        const user = await User.create(
            {
                name,
                email,
                password
            }
        )
        console.log(user)

        return NextResponse.json(
            {message: "user created successfully", user},
            {status: 201}
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error: "falied to register"},
            {status: 500}
        )
    }
}