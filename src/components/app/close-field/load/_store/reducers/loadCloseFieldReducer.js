import {START_LOADING, LOADED, SHOW} from "../actions/closeFieldLoadActions.types";

const initialState = {
  loading: false,
  show: false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case START_LOADING:
    return { ...state, loading: true }
  
  case LOADED:
    return { ...state, show: false, loading: false, data: action.data }

  case SHOW:
      return { ...state, show: action.show }

  default:
    return state
  }
}
