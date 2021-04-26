import { combineReducers } from 'redux';

import auth from './auth';
import alert from './alert'
import transaction from './transaction'
import company from './company'
import dashboard from './dashboard'

export default combineReducers({
  auth,
  alert,
  transaction,
  company,
  dashboard
});