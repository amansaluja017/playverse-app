import { Video } from "@/models/video.model";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    const id = params;

    if (!id) {
        return NextResponse.json(
            {error: "missing video id"},
            {status: 404}
        )
    }

    await connectToDatabase();

    const video = await Video.findOne({_id: id});

    if (!video) {
        return NextResponse.json(
            {error: "video not found"},
            {status: 404}
        )
    }

    return NextResponse.json(
        {video}
    )
}