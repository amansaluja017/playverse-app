import { User } from "@/models/user.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return NextResponse.json(
            {error: "you are not authenticated"},
            {status: 401}
        )
    }

    await connectToDatabase();

    const user = await User.findById(session.user.id).populate("watchHistory");

    if (!user) {
        return NextResponse.json(
            {error: "user not found"},
            {status: 404}
        )
    }

    const watchHistory = user.watchHistory;

    return NextResponse.json(
        watchHistory
    )
};