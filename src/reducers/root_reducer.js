import { combineReducers } from 'redux';

import UsersReducer from './users_reducer';
import ErrorsReducer from './errors_reducer';

const RootReducer = combineReducers({
  users: UsersReducer,
  errors: ErrorsReducer
});

export default RootReducer;