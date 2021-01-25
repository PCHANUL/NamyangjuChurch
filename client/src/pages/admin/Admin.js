import React, { useState, useEffect } from 'react';

import './admin.css';
import AdminDataList from './AdminDataList'

import { getDataList, postLiveUrl, getLiveUrl, isSignin, signout } from '../axiosRequest';
import { transDate } from '../Methods';

import { useObserver } from 'mobx-react-lite';
import { useAppStore } from '../../state/appContext';

// component
import AdminTab from './AdminTab';
import AdminAddBtn from './AdminAddBtn';

const Admin = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState({ status: false });

  const appStore = useAppStore();
  
  useObserver(() => {
    useEffect(() => {
      window.scroll(0,0);  // 스크롤

      getLiveUrl((result) => {
        setLiveData(result)
      });
      getDataList(appStore.selectedCategory, appStore.selectedDetail, async(getData) => {
        await setData(getData);
        setTimeout(setLoading(true), 2000);
      });

      // (async() => {
      //   if (!(await isSignin())) {
      //     alert('접근권한이 없습니다.');
      //     window.location = '/';
      //   }
      // })();
      
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

      <div id='live'>
        <p>생방송 관리</p>
        <p>{liveData ? liveData.title : '생방송 중이 아닙니다.'}</p>
        <p>{liveData ? liveData.time : '생방송 중이 아닙니다.'}</p>
        <input id='liveUrl' style={{height:'30px'}} placeholder='유튜브 라이브 URL을 입력하세요'></input>
        <button onClick={() => {
          postLiveUrl(document.querySelector('#liveUrl').value, (result) => {
            console.log('result: ', result);
          })
        }}>입력</button>
      </div>

      <div id='data'>
        <AdminAddBtn />
        <AdminTab />
        {
          loading &&
          <AdminDataList data={data} loading={loading}/>
        }
      </div>
    </div>
  ))
}

export default Admin;