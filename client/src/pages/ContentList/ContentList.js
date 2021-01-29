import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

// component
import BibleVerseViewer from './BibleVerseViewer';

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

  if (appStore.selectedCategory === 0) {
    return (
      dataList.map((data, i) => {
        return (
          <div className='videoDiv' key={i} >
            <div className='videoTitle'>
              <Link to={`/content/${data.id}`}>{data.title}</Link>
              <p>{(data.createdAt).replace(/-/g, '. ')}</p>
            </div>
            <BibleVerseViewer verse={data.verse} />
          </div>
        );
      })
    )
  } else {
    return (
      <div id='pictureListDiv'>
        {dataList.map((data, i) => {
          return (
            <div className='pictureDiv' key={i}>
              <div className='imgDiv'>
                <img className='pictureImg' src={data.thumbnail} />
              </div>
              <div className='pictureTitle'>
                <Link to={`/content/${data.id}`}>{data.title}</Link>
                <p>{(data.createdAt).replace(/-/g, '. ')}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}