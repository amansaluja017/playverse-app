"use client";

import React, { useEffect, useState } from "react";
import VideoComponent, { videoDataTypes } from "./VideoComponent";
import { apiClient, videoFormData } from "@/utils/api-client";
import { responseType } from "./Header";
import { useVideoStore } from "@/store/videoStore";

function Tranding() {
  const [allVideos, setAllVideos] = useState<Array<videoDataTypes>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {videos} = useVideoStore()

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await apiClient.getVideos();

        if (!response) {
          throw new Error("Failed to fetch the videos");
        } else {
          const data = response as responseType;
          if(videos.length > 0) {
            setAllVideos(videos)
          } else if (videos.length <= 0) {
            setAllVideos(data.videos)
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllVideos();
  }, [videos]);

  return (
    <div>
      <VideoComponent allVideos={allVideos} />
    </div>
  );
}

export default Tranding;
