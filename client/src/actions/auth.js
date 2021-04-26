import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-auth-token':localStorage.token
    //   }
    // };
    const res = await axios.get('/api/v1/user/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({  username ,password, confirm_password, agree}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // console.log({username,password,confirm_password})
  if( password ===null || username ===null ){
     dispatch(setAlert('Every field is required', 'danger'))
  }else if (password !== confirm_password){
    dispatch(setAlert('Both password are different', 'danger'))
  }else if(agree===false)
  {
    dispatch(setAlert('Agree terms and conditions to continue', 'danger'))
  }else{
    const body = JSON.stringify({ password,username ,confirm_password});

  try {
    const res = await axios.post('/api/v1/user/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
  }
  
};

// Login User
export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post('/api/v1/user/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  setAuthToken();
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  
};