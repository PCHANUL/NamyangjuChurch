import React, { useEffect } from 'react';

import { useAppStore } from '../../state/appContext';

// component
import PhotoContent from './PhotoContent';

export default function PhotoList(props) {
  const appStore = useAppStore();
  const { dataList, countLoading } = props;

  useEffect(() => {
    return () => {
      document.querySelector(`#photo-loading`).className = '';
      document.querySelector(`#photoListDiv`).className = 'hidden-list';
    };
  }, [appStore.page])

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