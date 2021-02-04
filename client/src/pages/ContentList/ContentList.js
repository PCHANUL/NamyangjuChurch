import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './contentListLoading.css';

// component
import PhotoList from './PhotoList';
import VideoList from './VideoList';

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