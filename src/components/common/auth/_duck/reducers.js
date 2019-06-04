import {SET_USER_LOGGED_TYPE, CLEAR_USER_LOGGED_TYPE, SET_REDIRECT, CLEAR_REDIRECT} from './types';

export const defaultAuthState = { logged: false, user: null, redirect: null };

export default (state = defaultAuthState, action)=>{
  switch (action.type){
  case SET_USER_LOGGED_TYPE:
    if (!action.payload)
      return state;            
    return {
      ...state,
      logged: true,
      user: {
        token: action.payload.token,
        username: action.payload.username,
      }
    };
  case CLEAR_USER_LOGGED_TYPE:
    return {...defaultAuthState, redirect: state.redirect};
  case SET_REDIRECT:
    return {...state, redirect: action.redirect };
  case CLEAR_REDIRECT:
    return {...state, redirect: null};
  default:
    return state;
  }
};