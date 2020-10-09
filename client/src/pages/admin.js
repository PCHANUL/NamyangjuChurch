import React, { useState } from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

const listData = [
  {
    title: 'message',
    data: [
      {
        messageTitle: '메시지 제목',
        messageDate: '생성 날짜',
      },
      {
        messageTitle: '메시지 제목',
        messageDate: '생성 날짜',
      },
      {
        messageTitle: '메시지 제목',
        messageDate: '생성 날짜',
      },
    ]
  },
  {
    title: 'community',
    data: [
      {
        messageTitle: '사진 제목',
        messageDate: '생성 날짜',
      },
      {
        messageTitle: '사진 제목',
        messageDate: '생성 날짜',
      },
      {
        messageTitle: '사진 제목',
        messageDate: '생성 날짜',
      },
    ]
  },

]

function Admin(props) {
  const [tab, setTab] = useState(0);
  

  return (
    <div>
      <h1>admin page</h1> 
      <div style={{width: '80vw', height: '20vw', border: '2px solid #000'}}>
        <button style={{width: '15vw', height: '15vw'}} onClick={() => props.history.push('/admin/edit')}>추가하기</button> 
      </div>
      <div style={{width: '80vw', height: '5vw', border: '2px solid #000'}}>
        <div style={{width: '30vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => setTab(0)}>message</div>
        <div style={{width: '30vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => setTab(1)}>community</div>
      </div>
      <div style={{width: '80vw', height: '70vw', border: '2px solid #000'}}>
        
        <h1>{listData[tab].title}</h1>
        {
          listData[tab].data.map((data) => {
            return (
              <div style={{width: '70vw', height: '10vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>
                <h1 style={{float:'left'}}>{`${data.messageTitle} / ${data.messageDate}`}</h1>
                <button style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => props.history.push('/admin/edit')} >수정하기</button>
                <button style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => window.confirm('삭제하시겠습니까?')}>삭제하기</button>
              </div>
            )
          })
        }
        
      </div>
    </div>
  )
}

export default Admin;