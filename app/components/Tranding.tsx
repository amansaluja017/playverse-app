"use client";

import React, { useEffect, useState } from "react";
import { videoDataTypes } from "./VideoSection";
import { apiClient, videoFormData } from "@/utils/api-client";
import { responseType } from "./Header";
import { useVideoStore } from "@/store/videoStore";
import VideoSection from "./VideoSection";

function Tranding() {
  const [allVideos, setAllVideos] = useState<Array<videoDataTypes>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.getVideos();

        if (!response) {
          throw new Error("Failed to fetch the videos");
        } else setAllVideos(Array.isArray(response) ? response as videoDataTypes[] : [])
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <VideoSection allVideos={allVideos} />
    </div>
  );
}

export default Tranding;
