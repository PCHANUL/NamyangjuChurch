import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import './admin.css';
import addFile from '../images/add-file.png';

import { gql } from 'apollo-boost'
import { useQuery } from "@apollo/react-hooks";

import updateIcon from '../images/wrench.png';
import deleteIcon from '../images/delete.png';

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
  const { loading, error, data } = useQuery(GET_USERS);
  console.log('data: ', data);

  useEffect(() => {
    window.scroll(0,0);

  }, [])

  

  return (
    <div id='admin'>
      <div id='addBox'>
        <h1>관리자 페이지</h1> 
      </div>
      <div id='adminTabBox'>
        <div class='adminTab' onClick={() => setTab(0)}>message</div>
        <div class='adminTab' onClick={() => setTab(1)}>community</div>
      </div>
      <button id='addBtn' onClick={() => props.history.push('/admin/edit')}>
        <img id='addFileIcon' src={addFile} />
      </button> 
      <>
        {
          !loading &&
          data.people.map((data) => {
            return (
              <div id={data.id} className='dataBox'>
                <h3 className='dataTitle' >{`${data.name} / ${data.age}`}</h3>
                <button className='dataButton' onClick={() => window.confirm('삭제하시겠습니까?')}>
                  <img className='deleteIcon' src={deleteIcon}></img>
                </button>
                <button className='dataButton' onClick={() => props.history.push('/admin/edit')} >
                  <img className='updateIcon' src={updateIcon}></img>
                </button>
              </div>
            )
          })
        }
      </>
    </div>
  )
}

export default Admin;