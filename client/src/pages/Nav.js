import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const style = {
  nav: {
    width: '80vw', 
    height: '3vw', 
    border: '2px solid #000',
    padding: '1vw', 
    position: 'fixed', 
    top: '0%', 
    backgroundColor: '#fff',
    zIndex: 1
  },
  font: {
    textDecoration: 'none',
    color: '#000',
    fontSize: '3vw', 
    marginRight: '2vw'
  }
}

function Nav() {
  return (
    <nav id='nav'>
      <Link to="/" class='home'>
        남양주<br/> 사랑교회
      </Link>
      <Link to="/community" class='button'>
        교회소식
      </Link>
      <Link to="/message" class='button'>
        말씀보기
      </Link>
    </nav>
  )
}

export default Nav;