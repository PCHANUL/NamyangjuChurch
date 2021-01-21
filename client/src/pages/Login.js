import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { signin, signup, signout } from './axiosRequest';

import './login.css';
import './responsibleCSS/mobileLogin.css';

export default function Login(props) {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [isJoinPage, setJoinPage] = useState(false);

  const handleChangeId = (e) => {
    setUserId(e.target.value)
  }
  const handleChangePw = (e) => {
    setUserPw(e.target.value)
  }
  const handleSubmit = (e) => {
    console.log(e)
  }

  const adminLogin = async() => {
    if (await signin(userId, userPw)) {
      setIsOpen(false);
      window.location = '/admin';
    } else {
      alert('로그인 정보가 틀렸습니다.');
    }
  }
  

  const { isOpen, setIsOpen } = props;

  return (
    <>
      {
        isOpen && (
          <div id='adminLogin'>
            <div id='login' onKeyDown={(e) => e.keyCode === 13 && adminLogin()}>
              <h1>관리자 <br /> 로그인</h1>
              <button className='btn' onClick={() => setIsOpen(false)}>
                <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/icons/close-button.png' className='closeIcon' />
              </button>
              <input type="text" id="fname" name="fname" placeholder='아이디' value={userId} onChange={handleChangeId} />
              <br />
              <input type="password" id="lname" name="lname" placeholder='비밀번호' value={userPw} onChange={handleChangePw}/>
              <br />
              <button id="loginBtn" onClick={adminLogin}>
                로그인
              </button>
              {/* <a id='joinBtn' onClick={() => {
                setJoinPage(true)
              }}>
                관리자 가입
              </a> */}
            </div>
            <div className='background' onClick={() => setIsOpen(false)}></div>
          </div>
        )
      }
    </>
  )
}