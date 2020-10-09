import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

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


  return (
    <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">아이디:</label>
        <input type="text" id="fname" name="fname" value={userId} onChange={handleChangeId} />
        <br />
        <label htmlFor="lname">비밀번호:</label>
        <input type="password" id="lname" name="lname" value={userPw} onChange={handleChangePw}/>
        <br />
        <input type="submit" value="로그인" onClick={() => props.history.push('/admin')}>
        </input>
      </form>
      <Link to='/admin/signin'>
          관리자 가입
      </Link>
      <br />
      <Link to='/admin'>
          권한없이 둘러보기
      </Link>
      <br />
      <Link to='/'>
          나가기
      </Link>
    </div>
  )
}

export default (Login);