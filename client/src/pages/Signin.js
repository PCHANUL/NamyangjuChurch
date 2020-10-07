import React from 'react';

function Signin() {
  return (
    <div style={{width: '80vw', height: '40vw', border: '2px solid #000'}}>
      <form>
        <label htmlFor="fname">아이디:</label>
        <input type="text" id="fname" name="fname" />
        <br />
        <label htmlFor="lname">비밀번호:</label>
        <input type="password" id="lname" name="lname" />
        <br />
        <input type="submit" value="관리자 가입" />
      </form>
    </div>
  )
}

export default Signin;