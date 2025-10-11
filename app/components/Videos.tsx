"use client";

import React, { useEffect, useState } from "react";
import VideoComponent from "./VideoComponent";
import { apiClient, videoFormData } from "@/utils/api-client";

function Videos() {
  const [allVideos, setAllVideos] = useState<Array<videoFormData>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  console.log(allVideos)

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await apiClient.getVideos();

        if (!response) {
          throw new Error("Failed to fetch the videos");
        } else {
          console.log(response);
          setAllVideos(Array.isArray(response) ? (response as videoFormData[]) : [response as videoFormData]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAllVideos();
  }, []);

  return (
    <div>
      <VideoComponent allVideos={allVideos} />
    </div>
  );
}

export default Videos;
