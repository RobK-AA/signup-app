import React from 'react';
import { Route } from 'react-router-dom';
import User from './User/user';
import Login from './Form/login';
import Signup from './Form/singup';
import { AuthRoute } from '../util/route_util'

const App = () => (
    <div>
      <Route exact path='/' component={Signup} />
      <Route exact path='/confirmation' component={User} />
    </div>
);

export default App;

