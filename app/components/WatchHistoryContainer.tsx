import React from "react";
import { videoDataTypes } from "./VideoSection";

function WatchHistoryContainer({
    allVideos,
}: {
    allVideos: Array<videoDataTypes>;
}) {
    console.log(allVideos);
    return (
        <>
            {allVideos.length > 0 ? (
                <div className="flex gap-4 overflow-x-scroll py-2">
                    {allVideos.map((data, i) => (
                        <div
                            key={i}
                            className="flex shrink-0 w-64 sm:w-72 border-2 border-blue-600 p-2 rounded-2xl">
                            <div className="flex flex-col gap-2">
                                <div className="w-full rounded-2xl overflow-hidden aspect-video">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={data.thumbnailUrl}
                                        alt={data.title ?? "thumbnail"}
                                        loading="lazy"
                                    />
                                </div>

                                <span className="text-xs sm:text-sm text-gray-700">
                                    5 hours ago
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-8">no history found</div>
            )}
        </>
    );
}

export default WatchHistoryContainer;
