import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// component
import VideoContent from './VideoContent';
import PhotoContent from './PhotoContent';

export default function ContentList() {
  const appStore = useAppStore();
  const [dataList, setData] = useState([]);

  useObserver(() => {
    useEffect(() => {
      appStore.getContentList((result) => setData(result));
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
  if (dataList.length === 0) {
    return (
      <div id='noDataDiv'>
        <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/file.png' />
        <h1>아직 게시물이 없습니다.</h1>
      </div>
    )
  }

  if (appStore.selectedCategory === 0) {
    return dataList.map((data, i) => <VideoContent data={data} key={i} />)
  } else {
    return (
      <div id='pictureListDiv'>
        { dataList.map((data, i) => <PhotoContent data={data} key={i} />) }
      </div>
    )
  }
}
