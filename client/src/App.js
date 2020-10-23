import React, { useState } from 'react';
import { Route, Switch, Link, useLocation, Redirect} from 'react-router-dom';

import Nav from './pages/Nav'
import Footer from './pages/Footer'
import Main from './pages/Main'
import Edit from './pages/Edit'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Video from './pages/Video'
import Message from './pages/Message'
import Community from './pages/Community'

import './pages/app.css'

function App() {
  const [ isOpen, setIsOpen ] = useState(false);

  let location = useLocation();

  return (
    <div className='container'>
      <Nav />
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      <Switch key={location.key}>
        <Route exact path='/' component={Main} />
        <Route exact path='/message' component={Message} />
        <Route path='/message/:id' component={Video} />
        <Route path='/community' component={Community} />

        <Route exact path='/admin' component={Admin} />
        <Route path='/admin/signin' component={Signin} />
        <Route path='/admin/edit' component={Edit} />
        {/* <Redirect path='*' to="/" /> */}
      </Switch>
      <Footer setIsOpen={setIsOpen} />
    </div>
  )
}

export default App;