import {LOAD, CLEAR, SET_VARIABLES,
  SET_VARIABLE, SET_VARIABLE_RANGE} from '../actions/closeFieldMapActions.types'
import {CLEAR as CLEAR_CLOSE_FIELD} from '../../../_store/actions/closeFieldActions.types'
const initialState = {
  data: [],
  variables: [],
  selected: {
    variable: null,
    variableRange: null,
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LOAD:
    return { ...state, data: action.data }

  case SET_VARIABLE:
    return { ...state, 
      selected: {
        ...state.selected,    
        variable: action.variable, 
        variableRange: action.variable ? action.variable.rangeGroups[0] : null 
      }
    }

  case SET_VARIABLE_RANGE:
      return { ...state, 
        selected: {
          ...state.selected,    
          variableRange: action.range 
        }
      }
  case SET_VARIABLES:
      return {...state,
        variables: action.variables
      }
  case CLEAR:
  case CLEAR_CLOSE_FIELD:
    return initialState

  default:
    return state
  }
}