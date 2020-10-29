import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

import { useAppStore } from '../state/appContext';
import { useObserver } from 'mobx-react';

function Nav() {
  const appStore = useAppStore();

  return (
    <nav id='nav'>
      <Link to="/" className='home'>
        남양주 사랑교회{appStore.notes[0]}
      </Link>
      <Link to="/community" className='button'>
        교회소식
      </Link>
      <Link to="/message" className='button'>
        말씀보기
      </Link>
    </nav>
  );
}

export default Nav;