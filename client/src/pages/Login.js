import React from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
  return (
    <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
      <form>
        <label htmlFor="fname">아이디:</label>
        <input type="text" id="fname" name="fname" />
        <br />
        <label htmlFor="lname">비밀번호:</label>
        <input type="password" id="lname" name="lname" />
        <br />
        <input type="submit" value="로그인" >
        </input>
      </form>
      {/* <button onClick={props.history.push('/adminSignin')}>
          관리자 가입
      </button> */}
    </div>
  )
}

export default (Login);