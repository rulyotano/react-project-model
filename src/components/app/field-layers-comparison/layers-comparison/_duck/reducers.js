import { CHANGE_NUMBER_OF_MAPS } from "./types";

const initialState = {
  numberOfMaps: 1  
}

export default (state = initialState, action) => {
  switch (action.type) {

  case CHANGE_NUMBER_OF_MAPS:
    return { ...state, numberOfMaps: action.numberOfMaps }

  default:
    return state
  }
}
