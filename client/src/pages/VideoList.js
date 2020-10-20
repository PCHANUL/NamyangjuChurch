import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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

function VideoList (props) {
  const { loading, error, data } = useQuery(GET_USERS);
  console.log(loading, error, data)



  return (
    <div id='videoList'>
      {
        !loading &&
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