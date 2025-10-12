import { videoDataTypes } from "@/app/components/VideoComponent";
import { Ivideo } from "@/models/video.model";
import {create} from "zustand";

interface videoState {
    videos: videoDataTypes[] | [],
    setVideo: (video: videoDataTypes[]) => void,
    clearVideo: () => void
}

export const useVideoStore = create<videoState>((set) => ({
    videos: [],
    setVideo: (videos: videoDataTypes[]) => set({ videos }),
    clearVideo: () => set({ videos: [] })
}));