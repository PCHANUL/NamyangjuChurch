import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <h1>Home</h1>
      <button>
        <Link to="/message">message</Link>
      </button>
      <button>
        <Link to="/community">community</Link>
      </button>
    </div>
  )
}

export default Main;