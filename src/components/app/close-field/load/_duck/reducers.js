import {START_LOADING, LOAD_ERROR, SHOW, CLEAR} from "./types";
import {CLEAR as CLEAR_CLOSE_FIELD} from "../../_duck/types";
import {LOAD as MAP_LOAD} from "../../map/_duck/types";
import {LOAD as PROCESS_LOAD} from "../../process/_duck/types";

const initialState = {
  loading: false,
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {

  case START_LOADING:
    return { ...state, loading: true };
  
  case MAP_LOAD:
  case PROCESS_LOAD:
    return { ...state, show: false, loading: false };

  case SHOW:
    return { ...state, show: action.show };

  case LOAD_ERROR: 
    return { ...state, loading: false};

  case CLEAR:
  case CLEAR_CLOSE_FIELD:
    return initialState;

  default:
    return state;
  }
};
