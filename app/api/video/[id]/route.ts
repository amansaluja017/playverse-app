import { Iuser, User } from "@/models/user.model";
import { Video } from "@/models/video.model";
import { authOptions } from "@/utils/auth";
import { connectToDatabase } from "@/utils/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!id) {
      return NextResponse.json({ error: "missing video id" }, { status: 404 });
    }

    await connectToDatabase();

    const video = await Video.findOne({ _id: id });

    if (!video) {
      return NextResponse.json({ error: "video not found" }, { status: 404 });
    }

    if (!session) {
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    }

    const user: Iuser | null = await User.findOne({
      email: session.user.email,
    });

    if (!user?.watchHistory?.includes(video._id)) {
      await User.findOneAndUpdate(
        { email: session.user.email },
        {
          $push: { watchHistory: video._id },
        },
      );
    }

    return NextResponse.json(video);
  } catch (error) {
    console.log("failed to load video");
    console.error(error);
  }
}
