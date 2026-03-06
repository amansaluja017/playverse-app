import { Video } from "@/models/video.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  try {
    await connectToDatabase();

    const myVideos = await Video.find({ _id: session.user.id });

    return NextResponse.json(myVideos);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to get videos" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "you are not authenticated" },
      { status: 401 },
    );
  }

  const { id, title, description } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "unidentified video" }, { status: 400 });
  }

  if (!title && !description) {
    return NextResponse.json(
      { error: "provide title or description to update" },
      { status: 404 },
    );
  }

  try {
    await connectToDatabase();

    const video = await Video.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
      },
      {
        new: true,
      },
    );

    if (!video) {
      return NextResponse.json({ error: "video not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "video update successfully", video },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "failed to update video" },
      { status: 500 },
    );
  }
}
