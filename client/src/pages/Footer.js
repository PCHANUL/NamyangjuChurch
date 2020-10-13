import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css'

function Footer(props) {
  const { setIsOpen } = props;

  return (
    <footer id='footer'>
      <h1>남양주 교회</h1>
      <button onClick={() => setIsOpen(true)}>admin</button>
    </footer>
  )
}

export default Footer;