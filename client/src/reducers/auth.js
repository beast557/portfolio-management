
import {
    REGISTER_SUCCESS,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT
  } from '../actions/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
const auth = (state = initialState, action) =>{
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false,
          user: payload
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
      
      // case AUTH_ERROR:
      case LOGOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }

export default auth;