import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import './admin.css';
import addFile from '../images/add-file.png';

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

  useEffect(() => {
    window.scroll(0,0);

  }, [])

  

  return (
    <div id='admin'>
      <h1>관리자 페이지</h1> 
      <div id='addBox'>
        <button id='addBtn' onClick={() => props.history.push('/admin/edit')}>
          <img id='addFileIcon' src={addFile} />
        </button> 
      </div>
      <div id='adminTabBox'>
        <div class='adminTab' onClick={() => setTab(0)}>message</div>
        <div class='adminTab' onClick={() => setTab(1)}>community</div>
      </div>
      <>
        {
          listData[tab].data.map((data) => {
            return (
              <div style={{height: '10vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}}>
                <h1 style={{float:'left'}}>{`${data.messageTitle} / ${data.messageDate}`}</h1>
                <button style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => props.history.push('/admin/edit')} >수정하기</button>
                <button style={{width: '10vw', height: '3vw', border: '2px solid #000', fontSize:'2vw', float: 'left'}} onClick={() => window.confirm('삭제하시겠습니까?')}>삭제하기</button>
              </div>
            )
          })
        }
      </>
    </div>
  )
}

export default Admin;