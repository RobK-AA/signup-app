import React from 'react';
import { Route } from 'react-router-dom';
import User from './User';
import Signup from './Signup/signup';
import Login from './Login/login';

const App = () => (
  <div>
    <Route exact path='/' component={Signup} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/confirmation' component={User} />
  </div>
);

export default App;
