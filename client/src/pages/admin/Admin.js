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
import { Button } from '../ContentList/Button';

const Admin = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState({ status: false });

  const appStore = useAppStore();

  useEffect(() => {
    getLiveUrl((result) => setLiveData(result));
  }, []);
  
  useObserver(() => {
    useEffect(() => {
      window.scroll(0,0);  // 스크롤

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
        <div id='onAirIcon'>
          <Button className={liveData.live === 'live' ? 'isLive' : ''}>onAir</Button>
        </div>
        <div id='liveInfo'>
          <span>{liveData.status ? liveData.title : '잘못된 영상 ID로 설정되어있습니다.'}</span>
        </div>
        <div id='liveInput'>
          <input id='liveUrl' placeholder='유튜브 영상 ID를 입력하세요'></input>
          <Button className='liveInputBtn' onClick={() => {
            let value = document.querySelector('#liveUrl').value;
            document.querySelector('#liveUrl').value = '';
            if (value.length > 0) {
              postLiveUrl(value, () => {
                getLiveUrl((result) => {
                  setLiveData(result)
                }, true);
              })
            }
          }}>입력</Button>
        </div>
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