"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import InputFile from "../components/inputFile";

export interface FileUploadProps {
  onSuccess: (response: any) => void;
  onProgress: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please select a valid video file.");
        return false;
      }
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size exceeds the 100MB limit.");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(true);
    setVideoUrl(e.target.value);

    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setFilePreview(URL.createObjectURL(file));

    setUploading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/imagekit-auth");
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to get upload credentials");
      }

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: data.authenticationParameters.signature,
        expire: data.authenticationParameters.expire,
        token: data.authenticationParameters.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percentage = (event.loaded / event.total) * 100;
            onProgress(Math.round(percentage));
          }
        },
      });
      console.log(res);
      onSuccess(res);
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof ImageKitAbortError) {
        setError("Upload aborted. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const dragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    console.log("working");

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log(file);
      setFilePreview(URL.createObjectURL(file));
      console.log(file.name);

      if (fileRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <label htmlFor="file" onDrop={dragOver} onDragOver={handleDragOver}>
        File{" "}
        {!filePreview ? (
          <InputFile />
        ) : (
          <div className="flex justify-center">
            <div className="rounded-2xl h-[8rem] w-[8rem] overflow-hidden">
              <img
                className="w-full h-full object-fill object-center"
                src={filePreview}
                alt="uploadedFile"
              />
            </div>
          </div>
        )}
      </label>
      <input
        ref={fileRef}
        className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid hidden"
        id="file"
        type="file"
        value={videoUrl}
        onChange={handleFileChange}
      />

      {uploading && <div>Uploading...</div>}
    </>
  );
};

export default FileUpload;