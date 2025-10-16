"use client";

import React, { useState } from "react";
import { sitka } from "../layout";
import FileUpload from "../components/FileUpload";
import Button from "../components/Button";
import { apiClient, videoFormData } from "@/utils/api-client";
import { UploadResponse } from "@imagekit/next";
import { useRouter } from "next/navigation";

function uploadVideo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoData, setVideoData] = useState<UploadResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  console.log(videoData)

  const handlePostVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!videoData?.url) {
      throw new Error("Upload a video");
    }

    try {
      setLoading(true);
      const response = await apiClient.createVideo({
        title,
        description,
        videoUrl: videoData?.url,
        thumbnailUrl: `${videoData?.url}/ik-thumbnail.jpg`,
        controls: true,
      });
      console.log("response", response);
      router.push("/");
    } catch (error) {
      console.error(error);
      setError("server error: Failed to upload image, try again after some time")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-screen h-screen bg-[#0B031C] flex flex-col justify-center items-center">
        <div className="text-start">
          <h1
            className={`font-heading text-[2rem] ${sitka.className} pl-10 mb-4`}>
            Upload Video
          </h1>
        </div>
        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full rounded-xl bg-[#0B031C] flex flex-col justify-center p-[4rem]">
            <div className="items-center justify-center">
              <form autoComplete="true" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="title"
                    autoComplete="true"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size={45}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="description">Description</label>

                  <textarea
                    className="w-full p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <FileUpload
                    onSuccess={(res: UploadResponse) => {
                      setVideoData(res);
                    }}
                    onProgress={() => 0}
                  />
                </div>

                <div className="relative flex justify-between">
                  <div className="mt-1 absolute right-0">
                    <Button
                      buttonName="Post"
                      className="py-2 px-5"
                      type="submit"
                      onClick={handlePostVideo}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default uploadVideo;
