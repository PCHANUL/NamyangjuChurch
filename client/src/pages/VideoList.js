import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { gql, useQuery } from '@apollo/client';

const getData = async(callback) => {
  const data = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
        { 
          people { 
            id 
            age
            name
            gender
          } 
        }
      `
    }
  })
  callback(data);
}

const VideoList = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    people: []
  })
  
  useEffect(() => {
    getData((data) => {
      setData(data.data.data);
      setLoading(true);
    });
  }, [])

  
  
  console.log('data: ', data);

  return (
    <div id='videoList'>
      {
        loading &&
        data.people.map((data, i) => {
          return (
          <div class='video' key={data.id}>
            <div class='title'>
              <h1>{data.name}</h1>
              <h5>{data.age}</h5>
            </div>
            <div class='content'>
              <div>{data.gender}</div>
              <progress id="file" value="32" max="100"> 32% </progress>
              <Link class='videoButton' to={`/message/${data.id}`}>영상보기</Link>
            </div>
          </div>)
        })
      }
    </div>
  )
}

export default VideoList;