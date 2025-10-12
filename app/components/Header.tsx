"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useId, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiClient } from "@/utils/api-client";
import { videoDataTypes } from "./VideoComponent";
import { useVideoStore } from "@/store/videoStore";

export interface responseType {
  videos: Array<videoDataTypes>;
  videoWithTitleAndName: Array<videoDataTypes>;
}

function Header() {
  const { data: session, status } = useSession();
  const [videos, setVideos] = useState<Array<videoDataTypes>>([]);
  const [searchVideo, setSearchVideo] = useState<string>("");
  const router = useRouter();
  const searchId = useId();

  const setVideo = useVideoStore((state) => state.setVideo);
  const { clearVideo } = useVideoStore();

  useEffect(() => {
    (async () => {
      const response = await apiClient.getVideos();
      if (!response) return;

      const data = response as responseType;
      if (!data.videoWithTitleAndName) return;

      console.log(data.videoWithTitleAndName[0]);
      const filterData = data.videoWithTitleAndName;

      setVideos(filterData);
    })();
  }, []);

  useEffect(() => {
    if (searchVideo.trim() === "") {
      clearVideo();
      return;
    }
  }, [searchVideo]);

  const handleEnter = () => {
    const term = searchVideo.toLowerCase();

    const filterVideosTitle = videos.filter((video) =>
      (video.title ?? "").toLowerCase().includes(term)
    );

    const filtervideosName = videos.filter((video) =>
      (video?.user?.name ?? "").toLowerCase().includes(term)
    );

    if (filterVideosTitle.length > 0 && searchVideo.length > 0) {
      setVideo(filterVideosTitle);
    } else if (filtervideosName.length > 0 && searchVideo.length > 0) {
      setVideo(filtervideosName);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  return (
    <header className="max-w-full bg-[#0B031C]">
      <div className="flex items-center justify-between p-3 px-15">
        <div className="w-20 cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>

        <div>
          <i className="fa-solid fa-magnifying-glass relative left-[2rem] text-[#014C9A]"></i>
          <input
            id={searchId}
            type="search"
            placeholder="search"
            onChange={(e) => setSearchVideo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="relative rounded-full border-2 border-[#014C9A] p-1 pl-10 pr-10"
            size={50}
          />
          <i className="fa-solid fa-microphone relative right-[2rem] text-[#014C9A] cursor-pointer"></i>
        </div>

        <div className="flex gap-10 items-center">
          <i className="fa-solid fa-bell text-2xl text-[#014C9A] cursor-pointer"></i>
          {session ? (
            <Popover>
              <PopoverTrigger>
                <div className="rounded-full h-10 w-10 bg-blue-400 cursor-pointer">
                  {/* <img src="" alt="avatar" /> */}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full h-12 w-12 bg-blue-400"></div>
                    <div className="flex flex-col">
                      <span className="text-xl">{session.user.name}</span>
                      <span className="text-xs opacity-80">
                        {session.user.email}
                      </span>
                      <span
                        onClick={() => router.push("/profile")}
                        className="text-blue-600 hover:underline cursor-pointer text-sm">
                        view profile
                      </span>
                    </div>
                  </div>
                  <i
                    onClick={() => signOut()}
                    className="fa-solid fa-arrow-right-from-bracket absolute right-5 bottom-5 text-red-500 cursor-pointer"></i>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div>
              <Button
                buttonName="login"
                className="py-2 px-5"
                onClick={() => router.push("/login")}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
