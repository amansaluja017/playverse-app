"use client";

import { apiClient } from "@/utils/api-client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { videoDataTypes } from "../components/VideoSection";
import Container from "../components/Container";
import VideoPlayer from "../components/VideoPlayer";

function page() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    (async () => {
      if (!id) {
        throw new Error("invalid video");
      }

      const response = await apiClient.getSelectedVideo(id);
      console.log(response);

      if (!response) return;

      const video = response as videoDataTypes;

      if (!video) {
        alert("video does not exists");
        return;
      }

      setVideoUrl(video.videoUrl);
      setThumbnailUrl(video.thumbnailUrl);
    })();
  }, []);



  return (
    <Container>
      <div className="w-screen h-screen bg-[#0B031C]">
        <VideoPlayer videoUrl={videoUrl} thumbnailUrl={thumbnailUrl}  />
      </div>
    </Container>
  );
}

export default page;
