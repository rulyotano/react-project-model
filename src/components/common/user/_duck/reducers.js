import {SET_USER_TYPE, CLEAR_USER_TYPE} from './types';

export const userInitialState = {
  id: null,
  username: "",
  name: ""
};

export default (state = userInitialState, action) => {
  switch (action.type) {
  case SET_USER_TYPE :
    if (!action.payload)
      return state;      
    return {...action.payload};   
  case CLEAR_USER_TYPE: {
    return userInitialState;
  }
  default:
    return state;
  }
};