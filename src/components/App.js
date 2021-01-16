import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import Login from './Login/login';

const App = () => (
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/confirmation' component={User} />
    </div>
);

export default App;

