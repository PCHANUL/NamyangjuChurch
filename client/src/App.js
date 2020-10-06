import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './page/Main'
import Message from './page/Message'
import Community from './page/Community'

function App(props) {

  return (
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
    </Switch>
  )
}

export default App;