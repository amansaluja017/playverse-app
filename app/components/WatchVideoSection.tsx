import React from 'react'
import VideoSection, { videoDataTypes } from './VideoSection'
import WatchHistoryContainer from './WatchHistoryContainer';

function WatchVideoSection({historyVideos}: {historyVideos: videoDataTypes[]}) {
  return (
    <div className='flex flex-col gap-4'>
        <h4 className='text-3xl font-bold'>
            Watch history
        </h4>

        <div className=''>
            <WatchHistoryContainer historyVideos={historyVideos} />
        </div>
    </div>
  )
}

export default WatchVideoSection;