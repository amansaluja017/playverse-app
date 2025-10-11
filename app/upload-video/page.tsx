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

  const handlePostVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!videoData?.url) {
      throw new Error("Upload a video");
    } else if (!videoData?.thumbnailUrl) {
      throw new Error("upload a thumbnail");
    }

    try {
      setLoading(true);
      const response = await apiClient.createVideo({
        title,
        description,
        videoUrl: videoData?.url,
        thumbnailUrl: videoData?.thumbnailUrl,
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
          <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C] flex flex-col justify-center">
            <div className="items-center justify-center p-5 pl-[5rem] pr-[5rem] pt-10 pb-20">
              <form autoComplete="true" className="flex flex-col">
                <div className="flex flex-col">
                  <label className="" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="title"
                    autoComplete="true"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="description">Description</label>

                  <textarea
                    className="w-full mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <FileUpload
                    onSuccess={(res: UploadResponse) => {
                      setVideoData(res);
                    }}
                    onProgress={() => 0}
                  />
                </div>

                <div className="relative flex justify-between">
                  <div className="mt-5">
                    <Button
                      buttonName="Post"
                      className="py-2 px-4"
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
