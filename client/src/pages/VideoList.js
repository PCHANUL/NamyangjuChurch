import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  {
    people {
      id
      name
      age
      gender
    }
  }
`

const videoData = [
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: `여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.`,
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: `여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.`,
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: `여기에 메시지의 요약내용이 들어갑니다. 지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.`,
    url: 'youtube/url'
  },
] 

const getData = async() => {
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

  return data.data.data;
}

const VideoList = async(props) => {
  // const { loading, error, data } = useQuery(GET_USERS);
  // console.log(loading, error, data);

  const data = await getData();

  return (
    <div id='videoList'>
      {
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