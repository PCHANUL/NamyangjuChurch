import React, { useState, useEffect } from 'react';

import './admin.css';
import AdminDataList from './AdminDataList'

import { getDataList, postLiveUrl, isSignin, signout } from '../axiosRequest';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';

// component
import AdminTab from './AdminTab';
import AdminAddBtn from './AdminAddBtn';

const Admin = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const appStore = useAppStore();

  useObserver(() => {
    useEffect(() => {
      window.scroll(0,0);  // 스크롤

      getDataList(appStore.selectedCategory, appStore.selectedDetail, async(getData) => {
        console.log('getData: ', getData);
        await setData(getData);
        setTimeout(setLoading(true), 2000);
      });

      (async() => {
        if (!(await isSignin())) {
          alert('접근권한이 없습니다.');
          window.location = '/';
        }
      })();
      
    }, [appStore.selectedCategory, appStore.selectedDetail])
  });


  return useObserver (() => (
    <div id='admin'>
      <div id='addBox'>
        <h2>관리자 페이지</h2> 
        <button onClick={() => {
          props.history.push('/');
        }}>나가기</button>
      </div>

      {/* <span>생방송 url입력</span>
      <input id='liveUrl' style={{height:'30px'}}></input>
      <button onClick={() => {
        postLiveUrl(document.querySelector('#liveUrl').value, (result) => {
          console.log('result: ', result);
        })
      }}>입력</button> */}

      <AdminTab />
      <AdminAddBtn />
      {
        loading &&
        <AdminDataList data={data} loading={loading}/>
      }
    </div>
  ))
}

export default Admin;