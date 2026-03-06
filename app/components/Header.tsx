"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useId, useRef, useState } from "react";
import Button from "./Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { videoDataTypes } from "./VideoSection";
import { useVideoStore } from "@/store/videoStore";
import MicSection from "./MicSection";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Suggestion from "./Suggestion";
import { img } from "framer-motion/m";

function Header() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<Array<videoDataTypes>>([]);
  const [searchVideo, setSearchVideo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [micSectionPanel, setMicSectionPanel] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [suggestionPanel, setSuggestionPanel] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();
  const searchId = useId();

  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    interimTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const pathname = usePathname();

  const setVideo = useVideoStore((state) => state.setVideo);
  const { clearVideo } = useVideoStore();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("your browser does not spport speech recognition");
      return;
    }

    if (!isListening) {
      SpeechRecognition.stopListening();
      return;
    }

    if (isListening) {
      SpeechRecognition.startListening();
    }

    let lastTranscript = transcript;

    const interval = setTimeout(() => {
      if (lastTranscript === transcript && transcript.length > 0) {
        SpeechRecognition.stopListening();
        setIsListening(false);
        setMicSectionPanel(false);
        clearInterval(interval);
      }

      lastTranscript = transcript;
    }, 2000);

    return () => clearInterval(interval);
  }, [isListening, transcript]);

  useEffect(() => {
    if (searchVideo.trim() === "") {
      clearVideo();
      return;
    }
  }, [searchVideo]);

  const handleEnter = async () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("query", searchVideo);
    router.push(`/search?${newParams.toString()}`);
    resetTranscript();
  };

  useEffect(() => {
    if (!listening && transcript) {
      setSearchVideo(transcript);
      setMicSectionPanel(false);
      resetTranscript();
    }
  }, [transcript, listening, resetTranscript]);

  useEffect(() => {
    if (!listening && searchVideo.length > 0 && transcript) {
      setMicSectionPanel(false);
      setIsListening(false);
      handleEnter();
    }
  }, [searchVideo]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchVideo.length < 1) return;

      handleEnter();
    }
  };

  return (
    <header className="max-w-full bg-[#0B031C]">
      {micSectionPanel && (
        <div>
          <MicSection
            isListening={isListening}
            setIsListening={setIsListening}
            transcript={transcript}
            setMicSectionPanel={setMicSectionPanel}
          />
        </div>
      )}

      <div className="flex items-center justify-between p-3 px-15">
        <div className="w-20 cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>

        {(pathname.endsWith("/") || pathname.startsWith("/search")) && (
          <div className="relative">
            <div className="flex justify-center items-center flex-1">
              <i className="fa-solid fa-magnifying-glass relative left-8 text-[#014C9A]"></i>
              <input
                autoComplete="off"
                id={searchId}
                type="search"
                placeholder="search"
                value={searchVideo}
                onChange={(e) => setSearchVideo(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={() => setSuggestionPanel(true)}
                className="relative rounded-full border-2 border-[#014C9A] p-1 px-10"
                size={50}
              />
              <i
                onClick={() => {
                  setIsListening(true);
                  setMicSectionPanel(true);
                }}
                className="fa-solid fa-microphone relative right-8 text-[#014C9A] cursor-pointer"></i>
            </div>
            {suggestionPanel && (
              <div className="absolute w-full flex justify-center items-center px-10">
                <Suggestion
                  searchVideo={searchVideo}
                  setSearchVideo={setSearchVideo}
                  setSuggestionPanel={setSuggestionPanel}
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-10 items-center">
          <i className="fa-solid fa-bell text-2xl text-[#014C9A] cursor-pointer"></i>
          {session ? (
            <Popover>
              <PopoverTrigger>
                <div className="rounded-full h-10 w-10 bg-blue-400 cursor-pointer">
                  {session.user.image && (
                    <img src={session?.user.image} alt="avatar" className="rounded-full" />
                   )}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div>
                  <div className="flex gap-2 items-center">
                    <div className="rounded-full h-12 w-12 bg-blue-400">
                      {session.user.image && (
                        <img src={session?.user.image} alt="avatar" className="rounded-full" />
                      )}
                    </div>
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
