"use client"

import { useRouter } from "next/navigation";
import React from "react";
import { videoDataTypes } from "./VideoSection";
import { useSession } from "next-auth/react";

function VideoComponent({ src }: { src: videoDataTypes }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = async (id: string) => {
    router.push(`/play?id=${id}`);
  };
  

  return (
    <div className="border-2 border-blue-600 text-[#472A98] rounded-2xl flex justify-center items-center">
      <div className="flex flex-col gap-3 p-3">
        <div
          onClick={() => handleClick(src._id)}
          className="overflow-hidden rounded-2xl cursor-pointer aspect-video">
          <img
            className="block w-full h-full object-cover object-center"
            src={src.thumbnailUrl}
            alt="video"
            draggable={false}
          />
        </div>
        {src.title && (
          <>
            <div className="flex justify-between text-2xl">
              <h4 className="text-white">{src.title}</h4>
              <div className="flex justify-center items-center gap-2 text-sm">
                <span>views</span>
                <div className="bg-[#472A98] h-2 w-2 rounded-full"></div>
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#472A98] h-8 w-8"></div>
              <p>{session?.user.name}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VideoComponent;
