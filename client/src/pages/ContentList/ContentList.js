import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './contentListLoading.css';

// component
import VideoContent from './VideoContent';
import PhotoContent from './PhotoContent';

export default function ContentList() {
  const appStore = useAppStore();
  const [dataList, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useObserver(() => {
    useEffect(() => {
      appStore.getContentList((result) => {
        setData(result);
        setTimeout(() => setLoading(false), 1000);
      });
    }, [
      appStore.page, 
      appStore.verse, 
      appStore.search, 
      appStore.createdAt, 
      appStore.rowsPerPage,
      appStore.selectedDetail, 
      appStore.selectedCategory, 
    ])
  });

  if (loading) {  // loading ui
    if (appStore.selectedCategory === 0) {  // videoList 
      return (
        <>
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
        </>
      )
    } else {  // photoList
      return (
        <div id='pictureListDiv'>
          {
            [0,0,0,0,0,0,0,0,0].map(() => {
              return (
                <div className='pictureDiv'>
                  <div className='photoDiv-loading loadingEffect'></div>
                  <div className='photoInfo-loading'>
                    <div className='photoTitle-loading loadingEffect'></div>
                    <div className='photoDate-loading loadingEffect'></div>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }


  // 데이터가 없는 경우
  if (dataList.length === 0) {
    return (
      <div id='noDataDiv'>
        <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/file.png' />
        <h1>아직 게시물이 없습니다.</h1>
      </div>
    )
  }

  // 데이터가 있는 경우
  if (appStore.selectedCategory === 0) {
    return dataList.map((data, i) => <VideoContent data={data} key={i} />)
  } else {
    return (
      <div id='pictureListDiv'>
        { dataList.map((data, i) => <PhotoContent data={data} key={i} />) }
      </div>
    );
  }

}
