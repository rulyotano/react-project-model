import {LOAD, CLEAR} from '../actions/closeFieldMapActions.types'
import {CLEAR as CLEAR_CLOSE_FIELD} from '../../../_store/actions/closeFieldActions.types'
const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LOAD:
    return { ...state, data: action.data }

    case CLEAR:
    case CLEAR_CLOSE_FIELD:
      return initialState

  default:
    return state
  }
}