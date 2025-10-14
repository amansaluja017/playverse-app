"use client"

import React, { useEffect, useState } from "react";
import WatchVideoSection from "./WatchVideoSection";
import { apiClient } from "@/utils/api-client";
import { videoDataTypes } from "./VideoSection";

function ProfileVideoSection() {
  const [allVideos, setAllVideos] = useState<Array<videoDataTypes>>([]);

  useEffect(() => {
    const toggleWatchHistory = async () => {
      try {
        const response = await apiClient.watchHistory();
        console.log("fjafja", response)

        const data = Array.isArray(response) ? response.reverse() : [];

        if (!response) {
          alert("failed to fetch the history")
        }
        console.log(data);

        setAllVideos(data);

      } catch (error) {}
    };

    toggleWatchHistory()
  }, []);

  return (
    <div className="p-10 flex flex-col gap-10 w-full">
      <div>
        <WatchVideoSection allVideos={allVideos} />
      </div>
      <div>
         <WatchVideoSection allVideos={allVideos} />
      </div>
      <div>
         <WatchVideoSection allVideos={allVideos} />
      </div>
    </div>
  );
}

export default ProfileVideoSection;
