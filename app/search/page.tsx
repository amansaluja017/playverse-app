"use client";

import React, { useEffect, useState } from "react";
import VideoSection, { videoDataTypes } from "../components/VideoSection";
import Container from "../components/Container";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/utils/api-client";
import { sitka } from "../layout";
import { Search } from "lucide-react";

function page() {
  const searchParams = useSearchParams();
  const [searchedVideos, setSearchedVideos] = useState<Array<videoDataTypes>>(
    []
  );

  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      try {
        const handleQuery = async () => {
          const response = await apiClient.searchVideo(
            query ? (query as string) : ""
          );

          if (!response) {
            alert("faild to search videos");
            return;
          }

          setSearchedVideos(
            Array.isArray(response) ? (response as videoDataTypes[]) : []
          );
        };

        handleQuery();
      } catch (error) {
        console.log(error);
        alert("internal server error: failed to search videos");
      }
    }
  }, [query]);

  return (
    <Container>
      <div className="p-15 w-screen h-screen bg-[#0B031C]">
        <div className="py-4 flex gap-3 items-center">
          <Search className="h-8 w-8 text-[#014C9A]" />
          <h4 className={`${sitka.className} text-4xl`}>Search results</h4>
        </div>
        <VideoSection allVideos={searchedVideos} />
      </div>
    </Container>
  );
}

export default page;
