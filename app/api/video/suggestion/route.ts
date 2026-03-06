import { Video } from "@/models/video.model";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);

    const query = searchParams.get("query");

    if (!query) return;

    try {
        await connectToDatabase();

        const video = await Video.find({
            title: {$regex: query, $options: "i"}
        }).limit(10).select("title _id");

        return NextResponse.json(video);
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {error: "internal server error: failed to get suggestions"},
            {status: 500}
        )
    }
};