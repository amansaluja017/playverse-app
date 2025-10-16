import { Iuser, User } from "@/models/user.model";
import { Video } from "@/models/video.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!id) {
        return NextResponse.json(
            { error: "missing video id" },
            { status: 404 }
        )
    }

    await connectToDatabase();

    const video = await Video.findOne({ _id: id });

    if (!video) {
        return NextResponse.json(
            { error: "video not found" },
            { status: 404 }
        )
    }

    const user: Iuser | null = await User.findOne({ _id: session?.user.id });

    if (!user?.watchHistory?.includes(video._id)) {
        await User.findOneAndUpdate({ _id: session?.user.id }, {
            $push: { watchHistory: video._id }
        })
    }

    return NextResponse.json(
        video
    )
};