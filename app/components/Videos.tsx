"use client";

import React, { useEffect, useState } from "react";
import VideoSection, { videoDataTypes } from "./VideoSection";
import { apiClient } from "@/utils/api-client";

function Videos() {
  const [allVideos, setAllVideos] = useState<Array<videoDataTypes>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient.getVideos();
        console.log(response);
        console.log("true");

        if (!response) {
          throw new Error("Failed to fetch the videos");
        } else
          setAllVideos(
            Array.isArray(response) ? (response as videoDataTypes[]) : []
          );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <VideoSection allVideos={allVideos} />;
}

export default Videos;
