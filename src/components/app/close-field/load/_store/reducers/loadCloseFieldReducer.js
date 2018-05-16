import {START_LOADING, LOADED} from "../actions/closeFieldLoadActions.types";

const initialState = {
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case START_LOADING:
    return { ...state, loading: true }
  
  case LOADED:
    return { ...state, loading: false, data: action.data }

  default:
    return state
  }
}
