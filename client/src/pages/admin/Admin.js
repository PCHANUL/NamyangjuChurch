import React, { useState, useEffect, useContext } from 'react';

import './admin.css';
import DataList from './DataList'

import { getDataList, postLiveUrl } from '../axiosRequest';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';



const Admin = (props) => {
  const [tab, setTab] = useState([0, 0]);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const appStore = useAppStore();
  
  
  useEffect(() => {
    window.scroll(0,0);
    getDataList(async (getData) => {
      await setData(getData);
      setTimeout(setLoading(true), 2000);
    })
  }, [tab])


  return useObserver (() => (
    <div id='admin'>
      <div id='addBox'>
        <h2>관리자 페이지</h2> 
        <button onClick={() => {
          props.history.push('/');
        }}>나가기</button>
      </div>

      <span>생방송 url입력</span>
      <input id='liveUrl' style={{height:'30px'}}></input>
      <button onClick={() => {
        postLiveUrl(document.querySelector('#liveUrl').value, (result) => {
          console.log('result: ', result);
        })
      }}>입력</button>


      <Tab tab={tab} setTab={setTab} />

      <button id='addBtn' onClick={() => {
        appStore.setEditState(false);
        props.history.push('/admin/edit');
      }}>
        <img id='addFileIcon' src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/add-file.png' />
      </button> 
      <DataList data={data} loading={loading} tab={tab}/>
    </div>
  ))
}

// Components
function Tab({ tab, setTab }) {
  return (
    <div id='tabContainer'>
      <div id='adminTabBox'>
        {
          ['말씀', '소식'].map((ele, idx) => {
            return idx === tab[0]
          ? <div key={`tab_${idx}`} className='adminTab selected' onClick={() => setTab([idx, tab[1]])}>{ele}</div>
          : <div key={`tab_${idx}`} className='adminTab' onClick={() => {
              if (idx === 1) setTab([idx, 0])
              else setTab([idx, tab[1]])
            }}>{ele}</div>
          })
        }
      </div>
      { tab[0] === 0 ? (
        <div id='subTabBox'>
          {
            ['주일', '수요', '금요', '새벽', '기도수첩'].map((ele, idx) => {
              return idx === tab[1] 
              ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
              : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            })
          }
        </div>
        ) : (
          ['교회 사진'].map((ele, idx) => {
            return idx === tab[1] 
            ? <div key={`subTab_${idx}`} className='subTab selected' onClick={() => setTab([tab[0], idx])}>{ele}</div>
            : <div key={`subTab_${idx}`} className='subTab' onClick={() => setTab([tab[0], idx])}>{ele}</div>
          })
        )
      }
      <div className='extraDiv left'/>
      <div className='extraDiv right'/>
    </div>
  )
}

export default Admin;