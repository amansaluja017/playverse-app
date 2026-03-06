"use client"

import React, { useEffect, useState } from "react";
import WatchVideoSection from "./WatchVideoSection";
import { apiClient } from "@/utils/api-client";
import { videoDataTypes } from "./VideoSection";

function ProfileVideoSection() {
  const [historyVideos, SetAllHistoryVideos] = useState<Array<videoDataTypes>>([]);

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

        SetAllHistoryVideos(data);

      } catch (error) {
        console.log(error);
      }
    };

    toggleWatchHistory()
  }, []);

  return (
    <div className="p-10 flex flex-col gap-10 w-full">
      <div>
        <WatchVideoSection historyVideos={historyVideos} />
      </div>
      <div>
         <WatchVideoSection historyVideos={historyVideos} />
      </div>
      <div>
         <WatchVideoSection historyVideos={historyVideos} />
      </div>
    </div>
  );
}

export default ProfileVideoSection;
