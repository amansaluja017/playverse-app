import React, { useState } from "react";
import VideoComponent from "./VideoComponent";

export type videoDataTypes = {
  _id: string;
  title?: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl: string;
  user?: {
    name: string
  },
  controls?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

function VideoSection({ allVideos }: { allVideos: Array<videoDataTypes> }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {allVideos.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {allVideos.length > 0 &&
            allVideos.map((src, i) => (
              <div key={i}>
                <VideoComponent src={src}  />
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

export default VideoSection;
