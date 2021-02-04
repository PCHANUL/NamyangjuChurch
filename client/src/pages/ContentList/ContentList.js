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
  const [noData, setNoData] = useState(false);

  let loadingCount = 0;
  const countLoading = (targetString) => {
    loadingCount ++;
    if (loadingCount === dataList.length) {
      document.querySelector(`#${targetString}-loading`).className = 'hidden-list';
      document.querySelector(`#${targetString}ListDiv`).className = '';
    }
  }

  useObserver(() => {
    useEffect(() => {
      // noData 초기화
      setNoData(false);

      appStore.getContentList((result) => {
        if (result.length === 0) {
          setNoData(true);
        } else {
          setData(result);
        }
      });

      return () => {
        let targetString = appStore.selectedCategory === 0 ? 'video' : 'photo';
        document.querySelector(`#${targetString}-loading`).className = '';
        document.querySelector(`#${targetString}ListDiv`).className = 'hidden-list';
      };

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

  // 데이터가 없는 경우
  if (noData) {
    return <NoDataList />
  }
  
  // 데이터가 있는 경우
  if (appStore.selectedCategory === 0) {  // videoList 
    return <VideoList dataList={dataList} countLoading={countLoading}/>
  } else {  // photoList
    return <PhotoList dataList={dataList} countLoading={countLoading}/>
  }
}

const NoDataList = () => {
  return (
    <div id='noDataDiv'>
      <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/file.png' />
      <h1>아직 게시물이 없습니다.</h1>
    </div>
  )
}

const VideoList = (props) => {
  const { dataList, countLoading } = props;

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


const PhotoList = (props) => {
  const { dataList, countLoading } = props;
  return ( 
    <>
      <LoadingPhotoList />
      <div id='photoListDiv' className='hidden-list'>
        { dataList.map((data, i) => <PhotoContent data={data} key={i} countLoading={countLoading} />) }
      </div>
    </>
  )
}

const LoadingPhotoList = () => {
  return (
    <div id='photo-loading'>
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
