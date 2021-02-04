import React, { useEffect } from 'react';

// component
import VideoContent from './VideoContent';

export default function VideoList(props) {
  const { dataList, countLoading } = props;

  // useEffect(() => {

  //   return () => {
  //     document.querySelector(`#video-loading`).className = '';
  //     document.querySelector(`#videoListDiv`).className = 'hidden-list';
  //   };
  // })



  return (
    <>
      <LoadingVideoList />
      {
        <div id='videoListDiv' className='hidden-list'>
          { dataList.map((data, i) => <VideoContent data={data} key={i} countLoading={countLoading} />) }
        </div>
      }
    </>
  )
}
const LoadingVideoList = () => {
  return (
    <div id='video-loading'>
      {
        [0,0,0,0,0,0,0,0,0,0].map(() => {
          return (
            <div className='videoDiv-loading'>
              <div className='videoInfo-loading'>
                <div className='videoTitle-loading loadingEffect'></div>
                <div className='videoDate-loading loadingEffect'></div>
              </div>
              <div className='bibleVerse-loading loadingEffect'></div>
            </div>
          )}
        )
      }
    </div>
  )
}