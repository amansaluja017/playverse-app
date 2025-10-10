"use client";

import React, { useRef, useState } from "react";
import InputFile from "../components/inputFile";
import { sitka } from "../layout";
import FileUpload from "../components/FileUpload";

function uploadVideo() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string>("");

  // const dragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  //   e.preventDefault();
  //   console.log("working");

  //   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
  //     const file = e.dataTransfer.files[0];
  //     console.log(file)
  //     setFilePreview(URL.createObjectURL(file));
  //     console.log(file.name)

  //     if(fileRef.current) {
  //       const dataTransfer = new DataTransfer();
  //       dataTransfer.items.add(file);
  //       fileRef.current.files = dataTransfer.files;
  //     }
  //   }
  // }

  // const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
  //   e.preventDefault();
  // };

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
              <form
                // onSubmit={handleSubmit}
                autoComplete="true"
                className="flex flex-col">
                <div className="flex flex-col">
                  <label className="" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="title"
                    autoComplete="true"
                    type="text"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="description">Description</label>

                  <textarea
                    className="w-full mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="description"
                    //   value={email}
                    //   onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <FileUpload onSuccess={() => {}} onProgress={() => 0} />

                  {/* <label htmlFor="file" onDrop={dragOver}
                    onDragOver={handleDragOver}>
                    File{" "}
                    {!filePreview ? (
                      <InputFile />
                    ) : (
                      <div className="flex justify-center">
                        <div className="rounded-2xl h-[8rem] w-[8rem] overflow-hidden">
                            <img className="w-full h-full object-fill object-center" src={filePreview} alt="uploadedFile" />
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
                    onChange={(e) => {
                        setValue(true)
                        setVideoUrl(e.target.value)
                        setFilePreview(URL.createObjectURL(e.target.files![0]))
                    }}
                  ></input> */}
                </div>

                <div className="relative flex justify-between">
                  <div className="absolute right-3 p-[2px] rounded-xl overflow-hidden border-animate bg-gradient-to-br from-[#0b2f68] to-[#982822] mt-8">
                    <button
                      type="submit"
                      className={`py-2 px-4 rounded-xl bg-[#0B031C] cursor-pointer flex items-center justify-center text-[#edf4e3] font-medium ${sitka.className}`}>
                      Post
                    </button>
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
