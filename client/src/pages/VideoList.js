import React from 'react';
import { withRouter } from 'react-router-dom';

const videoData = [
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. <br/ >지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. <br/ >지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. <br/ >지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
  {
    title: '메시지 제목',
    date: '201006',
    desc: '여기에 메시지의 요약내용이 들어갑니다. <br/ >지금 생각하기로는 두줄이나 세줄이 적당한 것 같습니다.',
    url: 'youtube/url'
  },
]

function VideoList (props) {
  return (
    <div>
      {
        videoData.map((data, i) => {
          return (
          <div class='msgList' key={i} >
            <h1>{data.title}</h1>
            <h5>{data.date}</h5>
            <h5>{data.desc}</h5>
            <button onClick={() => props.history.push('/video')}>영상보기</button>
          </div>)
        })
      }
    </div>
  )
}

export default withRouter(VideoList);