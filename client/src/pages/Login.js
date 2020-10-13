import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import closeIcon from '../images/close-button.png';
import './login.css';

function Login(props) {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');

  const handleChangeId = (e) => {
    setUserId(e.target.value)
  }
  const handleChangePw = (e) => {
    setUserPw(e.target.value)
  }
  const handleSubmit = (e) => {
    console.log(e)
  }

  const { isOpen, setIsOpen } = props;

  console.log(props.history)


  return (
    <>
      {
        isOpen && (
          <>
          <div id='login'>
            <h1>관리자 로그인</h1>
            <button class='btn' onClick={() => setIsOpen(false)}>
              <img src={closeIcon} class='closeIcon' />
            </button>
            <form onSubmit={handleSubmit}>
              <input type="text" id="fname" name="fname" placeholder='아이디' value={userId} onChange={handleChangeId} />
              <br />
              <input type="password" id="lname" name="lname" placeholder='비밀번호' value={userPw} onChange={handleChangePw}/>
              <br />
              <button type="submit" value="로그인" onClick={() => setIsOpen(false)}>
                <Link to='/admin'>
                  로그인
                </Link>
              </button>
            </form>
            <Link to='/admin/signin'>
                관리자 가입
            </Link>
            <br />
            <Link to='/admin'>
                권한없이 둘러보기
            </Link>
            <br />
          </div>
          <div id='background'></div>
          </>
        )
      }
    </>
  )
}

export default (Login);