import { Video } from "@/models/video.model";
import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);

    const query = searchParams.get("query");

    if (!query) return;

    try {
        await connectToDatabase();

        const searchVideos = await Video.find({
            $text: {$search: query},
            score: {$meta: "textScore"}
        }).sort({score: {$meta: "textScore"}}).limit(20);


        return NextResponse.json(
            searchVideos
        )
        
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {error: "server error: failed to search"},
            {status: 500}
        )
    }
};