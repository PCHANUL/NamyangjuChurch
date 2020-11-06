import React, { useEffect, useState, useContext } from 'react';
import { uselocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getDataList } from '../axiosRequest';
import { transDate } from '../Methods';

import { useAppStore } from '../../state/appContext';
import { useObserver } from 'mobx-react';

import './videoList.css';

const ContentList = () => {
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
          return (
            <div className='video' key={i} >
              <div className='videoTitle'>
                <Link to={`/contentlist/${data.id}`}>{data.title}</Link>
                <p>{transDate(data.createdAt)}</p>
              </div>
              <div className='videoContent'>
                <div>{data.gender}</div>
                {/* <Link className='videoButton' to={`/contentlist/${data.id}`}>영상보기</Link> */}
              </div>
            </div>
          );
        })
      }
    </div>
  ))
}

export default ContentList;
