import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import Login from './Login';
import Signin from './Signin';

function Admin(props) {
  return (
    <div>
      <h1>admin page</h1>
      

      <Switch>
        <Route path="/admin">
          <Login />
        </Route>
        <Route path="/adminSignin">
          <Signin />
        </Route>
      </Switch>
    </div>
  )
}

export default Admin;