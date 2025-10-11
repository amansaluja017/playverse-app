import { Ivideo, Video } from "@/models/video.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase()

        const videos = await Video.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length === 0) {
            return NextResponse.json({}, {status: 200})
        }

        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json(
            {error: "Faild to load videos"},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        console.log(session);

        if (!session) {
            return NextResponse.json(
                {error: "unauthorized"},
                {status: 401}
            )
        }

        await connectToDatabase();

        const body: Ivideo = await request.json();
        console.log(body)

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json(
                {error: "Missing data"},
                {status: 400}
            )
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformations: {
                height: 1920,
                width: 1080,
                quality: body.transformations?.quality ?? 100
            },
            user: session.user.id
        };
        console.log(videoData);

        const newVideo = await Video.create(videoData);
        console.log(newVideo)

        return NextResponse.json(newVideo);

    } catch (error) {
        console.error(error)
        return NextResponse.json(
                {error: "Failed to upload video"},
                {status: 500}
            )
    }
}