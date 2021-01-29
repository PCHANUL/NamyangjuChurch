import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';
import './responsibleCSS/mobileFooter.css';

function Footer(props) {
  const { setIsOpen } = props;

  return (
    <footer id='footer'>
      <div id='logo'>
        <img src='https://nsarang.s3.ap-northeast-2.amazonaws.com/images/mainPage/assembly+logo.png'></img>
        <div>
          <p>대한예수교</p>
          <p>장로회</p>
        </div>
        <h3>남양주 사랑교회</h3>
      </div>

      <div id='info'>
        <div id='phone'>
          <p>H.P 010-2386-0815</p>
          <p>담임목사 박종수</p>
          <p>교회(팩스겸용) 031-573-0815</p>
        </div>
        <p>경기도 남양주시 진건읍 진건오남로 98 (3층), 한신그린상가</p>
        <a onClick={() => setIsOpen(true)}>관리자 페이지</a>
      </div>

    </footer>
  )
}

export default Footer;