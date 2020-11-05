import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getDataList } from './axiosRequest';
import { transDate } from './Methods';

import { useAppStore } from '../state/appContext';
import { useObserver } from 'mobx-react';

import './videoList.css';

const VideoList = () => {
  const appStore = useAppStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    people: []
  })
  
  useEffect(() => {
    getDataList((getData) => {
      setData(getData);
      setLoading(true);
    });
  }, [])

  return useObserver(() => (
    <div id='videoList'>
      {
        loading &&
        data[appStore.selectedCategory].details[appStore.selectedDetail].posts.map((data, i) => {
          console.log(data)
          return (
          <div className='video' key={i}>
            <div className='title'>
              <h1>{data.title}</h1>
              <h5>{transDate(data.createdAt)}</h5>
            </div>
            <div className='content'>
              <div>{data.gender}</div>
              <Link className='videoButton' to={`/videolist/${data.id}`}>영상보기</Link>
            </div>
          </div>)
        })
      }
    </div>
  ))
}

export default VideoList;
