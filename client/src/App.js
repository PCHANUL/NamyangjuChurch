import React from 'react';
import { 
  BrowserRouter as Router,
  Route, 
  Switch,
  Link,
} from 'react-router-dom';

function App(props) {

  return (
    <Switch>
      <Route exact path='/'>
        <h1>Home</h1>
        <button>
          <Link to="/message">message</Link>
        </button>
        <button>
          <Link to="/community">community</Link>
        </button>
      </Route>
      <Route path='/message'>
        <h1>message</h1>
      </Route>
      <Route path='/community'>
        <h1>community</h1>
      </Route>
    </Switch>
  )
}

export default App;