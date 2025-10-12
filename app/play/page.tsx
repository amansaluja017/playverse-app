"use client";

import { useVideoStore } from "@/store/videoStore";
import { apiClient } from "@/utils/api-client";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { videoDataTypes } from "../components/VideoComponent";
import { Video } from "@imagekit/next";
import Container from "../components/Container";

function page() {
  const [video, setVideo] = useState<videoDataTypes>();
  const pathName = usePathname();
  const params = useSearchParams();
  const id = params.get("id");
  console.log(id);

  console.log(pathName);

  useEffect(() => {
    (async () => {
      if (!id) {
        throw new Error("invalid video");
      }

      const response = await apiClient.getSelectedVideo(id);
      console.log(response);

      if (!response) return;

      const video = response as videoDataTypes;
      setVideo(video);
    })();
  }, []);

  return (
   <Container>
     <div className="p-15 bg-[#0B031C]">
      <Video
      className="rounded-2xl"
        controls
        urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
        height={1920}
        width={1080}
        src="https://ik.imagekit.io/aman001/sample-video.mp4?updatedAt=1741427783313"></Video>
    </div>
   </Container>
  );
}

export default page;
