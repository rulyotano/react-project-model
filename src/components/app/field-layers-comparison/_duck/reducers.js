import {combineReducers} from "redux";
import layersComparison from "../layers-comparison/_duck/reducers";

const initialState = {

}

const reducer = (state = initialState, action) => {
  switch (action.type) {

//   case SOME_ACTION_NAME:
//     return { ...state }

  default:
    return state
  }
}

export default combineReducers({
  _: reducer,
  layersComparison,
})