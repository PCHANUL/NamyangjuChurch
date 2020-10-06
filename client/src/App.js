import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Main from './pages/Main'
import Admin from './pages/Admin'
import Message from './pages/Message'
import Community from './pages/Community'

function App(props) {

  return (
    <>
      <nav>
        <Link to="/">
          남양주 사랑교회
        </Link>
        <Link to="/message">
          message
        </Link>
        <Link to="/community">
          community
        </Link>
      </nav>

      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/message'>
          <Message />
        </Route>
        <Route path='/community'>
          <Community />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
      </Switch>

      <footer style={{width: '80vw', height: '10vw', border: '2px solid #000'}}>
        <h1>남양주 교회</h1>
        <Link to="/admin">admin</Link>
      </footer>
    </>
  )
}

export default App;