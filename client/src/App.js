import React from 'react';
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

  let location = useLocation();

  return (
    <div class='container'>
      <Nav />
      <Login />
      <Switch key={location.key}>
        <Route exact path='/' component={Main} />
        <Route path='/message' component={Message} />
        <Route path='/video' component={Video} />
        <Route path='/community' component={Community} />

        <Route exact path='/admin' component={Admin} />
        <Route path='/admin/signin' component={Signin} />
        {/* <Route path='/admin/login' component={Login} /> */}
        <Route path='/admin/edit' component={Edit} />
        <Redirect path='*' to="/" />
      </Switch>
      <Footer />
    </div>
  )
}

export default App;