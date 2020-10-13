import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css'

function Footer() {
  return (
    <footer id='footer'>
      <h1>남양주 교회</h1>
      <Link to="/admin/login">admin</Link>
    </footer>
  )
}

export default Footer;