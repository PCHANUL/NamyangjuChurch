import React from 'react';
import { withRouter } from 'react-router-dom';

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
  return (
    <div id='videoList'>
      {
        videoData.map((data, i) => {
          return (
          <div class='video' key={i}>
            <div class='title'>
              <h1>{data.title}</h1>
              <h5>{data.date}</h5>
            </div>
            <div class='content'>
              <div>{data.desc}</div>
              <button class='videoButton' onClick={() => props.history.push('/video')}>영상보기</button>
            </div>
          </div>)
        })
      }
    </div>
  )
}

export default withRouter(VideoList);