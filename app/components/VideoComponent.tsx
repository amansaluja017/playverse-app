import { apiClient } from "@/utils/api-client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type videoDataTypes = {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

function VideoComponent({ allVideos }: { allVideos: Array<videoDataTypes> }) {
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();
  console.log(allVideos);
  const router = useRouter();

  const handleClick = async (id: string) => {

    const response = await apiClient.getSelectedVideo(id);
    console.log(response);

    router.push("/play")
  }

  return (
    <>
      {allVideos.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {allVideos.length > 0 &&
            allVideos.map((src, i) => (
              <div
                key={i}
                className="h-[320px] w-[350px] border-2 border-blue-600 text-[#472A98] rounded-2xl flex justify-center items-center">
                <div className="flex flex-col gap-3">
                  <div onClick={() => handleClick(src.videoUrl)} className="h-[200px] w-[320px] overflow-hidden rounded-2xl">
                    <img
                      className="object-cover object-center h-full w-full"
                      src={src.thumbnailUrl}
                      alt="video"
                    />
                  </div>
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
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <h1>no videos found!</h1>
        </div>
      )}
    </>
  );
}

export default VideoComponent;
