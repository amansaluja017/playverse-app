"use client";

import React, { useEffect, useRef, useState } from "react";
import { Video } from "@imagekit/next";
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

function VideoPlayer({
  videoUrl,
  thumbnailUrl,
}: {
  videoUrl: string;
  thumbnailUrl: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [lastVolume, setLastVolume] = useState<number>(100);
  const [volume, setVolume] = useState<number>(100);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showThumbnail, setShowThumbnail] = useState<boolean>(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setShowThumbnail(false);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) videoRef.current.volume = vol / 100;
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    setLastVolume(volume);
    console.log(lastVolume)
    if (isMuted) setVolume(0);
    else setVolume(lastVolume);
  }, [isMuted]);

  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  };

  return (
    <>
      <div
        className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden bg-black group"
        onMouseLeave={() => setTimeout(() => {
          setShowControls(false)
        }, 3000)}
        onMouseEnter={() => setShowControls(true)}
        onClick={() => setShowControls(true)}
        >
        {/* Video */}
        <Video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video"
          urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT}
          playsInline
          muted={isMuted}
          preload="metadata"
        />

        {/* Thumbnail Overlay */}
        {showThumbnail && (
          <motion.img
            src={thumbnailUrl}
            alt="Thumbnail"
            initial={{ opacity: 1 }}
            animate={{ opacity: showThumbnail ? 1 : 0 }}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
          />
        )}

        {/* Controls */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent px-4 py-3 flex flex-col gap-2">
            {/* Progress Bar */}
            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full accent-blue-500 cursor-pointer"
            />

            <div className="flex justify-between items-center text-white">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <input
                  id="volume"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={volume}
                  onChange={handleVolume}
                  className="w-24 accent-blue-500"
                />
                <label htmlFor="volume">{volume}</label>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <Maximize size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

export default VideoPlayer;