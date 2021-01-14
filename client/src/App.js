import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useLocation, Redirect } from 'react-router-dom';

import Nav from './pages/Nav/Nav';
import Footer from './pages/Footer';
import Main from './pages/main/Main';
import Edit from './pages/admin/Edit';
import Admin from './pages/admin/Admin';
import Login from './pages/Login';
import ContentList from './pages/ContentList/ContentList';
import ContentViewer from './pages/ContentViewer/ContentViewer';

import './pages/app.css';
import './pages/fontFamily.css';

import { signout, isSignin } from './pages/axiosRequest';

import { useAppStore } from './state/appContext';
import { useObserver } from 'mobx-react';


const App = (props) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const appStore = useAppStore();
  let location = useLocation();

  window.addEventListener('resize', () => appStore.windowWidth = window.innerWidth);

  useEffect(() => {
    if (location.pathname.includes('/admin') === false) {
      (async() => {
        if (await isSignin()) {
          await signout();
          alert('보안을 위해 자동으로 로그아웃되었습니다.')
        }
      })();
    }
  },[location.pathname])

  return useObserver(() => (
    <>
      <div className='container'>
        { location.pathname !== "/admin" &&
          location.pathname !== "/admin/edit" &&
          <Nav />
        }
        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
        <Switch key={location.key}>
          <Route exact path='/' component={Main} />
          <Route exact path='/contentlist' component={ContentList} />
          <Route path='/content/:id' component={ContentViewer} />

          <Route exact path='/admin' component={Admin} />
          <Route path='/admin/edit' component={Edit} />
        </Switch>
        
        { 
          appStore.windowWidth > 640 &&
          (location.pathname.includes("admin") || location.pathname.includes("content")) &&
          <>
            <div id='leftSide'></div>
            <div id='rightSide'></div>
          </>
        }
      </div>
      { 
        location.pathname !== "/admin" &&
        location.pathname !== "/admin/edit" &&
          <Footer setIsOpen={setIsOpen} />
      }
    </>
  ))
}

export default App;