import React, { useState } from 'react';
import { Route, Switch, Link, useLocation, Redirect } from 'react-router-dom';

import Nav from './pages/Nav/Nav';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Edit from './pages/Edit';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signin from './pages/Signin';
import ContentList from './pages/ContentList/ContentList';
import ContentViewer from './pages/ContentViewer/ContentViewer';

import './pages/app.css';
import './pages/fontFamily.css';

const App = (props) => {
  const [ isOpen, setIsOpen ] = useState(false);
  let location = useLocation();

  return (
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
          <Route path='/contentlist/:id' component={ContentViewer} />

          <Route exact path='/admin' component={Admin} />
          <Route path='/admin/signin' component={Signin} />
          <Route path='/admin/edit' component={Edit} />
          {/* <Redirect path='*' to="/" /> */}
        </Switch>

      </div>
      { 
        location.pathname !== "/admin" &&
        location.pathname !== "/admin/edit" &&
          <Footer setIsOpen={setIsOpen} />
      }
    </>
  )
}

export default App;