import {LOAD, CLEAR} from './types'
import {CLEAR as CLEAR_CLOSE_FIELD} from '../../_duck/types'
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
