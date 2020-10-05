import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

function App(props) {

  return (
    <div id="App">
      <Switch>
        <Route exact path='/'>
          <h1>Home</h1>
          <button onClick={() => props.history.push('/message')}>message</button>
          <button onClick={() => props.history.push('/community')}>community</button>
        </Route>
        <Route path='/message'>
          <h1>message</h1>
        </Route>
        <Route path='/community'>
          <h1>community</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default (withRouter(App));