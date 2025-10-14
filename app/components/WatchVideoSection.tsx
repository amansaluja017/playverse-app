import React from 'react'
import VideoSection, { videoDataTypes } from './VideoSection'
import WatchHistoryContainer from './WatchHistoryContainer';

function WatchVideoSection({allVideos}: {allVideos: videoDataTypes[]}) {
  return (
    <div className='flex flex-col gap-4'>
        <h4 className='text-3xl font-bold'>
            Watch history
        </h4>

        <div className=''>
            <WatchHistoryContainer allVideos={allVideos} />
        </div>
    </div>
  )
}

export default WatchVideoSection;