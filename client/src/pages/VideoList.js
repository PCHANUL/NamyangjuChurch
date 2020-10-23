import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getData } from './axiosRequest';


const VideoList = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    people: []
  })
  
  useEffect(() => {
    getData((getData) => {
      console.log(getData)
      // setData(data.data.data);
      // setLoading(true);
    });
  }, [])


  return (
    <div id='videoList'>
      {
        loading &&
        data.people.map((data, i) => {
          return (
          <div className='video' key={data.id}>
            <div className='title'>
              <h1>{data.name}</h1>
              <h5>{data.age}</h5>
            </div>
            <div className='content'>
              <div>{data.gender}</div>
              <Link className='videoButton' to={`/message/${data.id}`}>영상보기</Link>
            </div>
          </div>)
        })
      }
    </div>
  )
}

export default VideoList;