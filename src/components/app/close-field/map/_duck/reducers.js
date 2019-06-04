import {LOAD, CLEAR, SET_VARIABLES,
  SET_VARIABLE, SET_VARIABLE_RANGE,
  PAINT_MAP} from './types';
import {CLEAR as CLEAR_CLOSE_FIELD} from '../../_duck/types';

const initialState = {
  data: [],
  variables: [],
  selected: {
    variable: null,
    variableRange: null,
  },
  mapData: []
};

export default (state = initialState, action) => {
  switch (action.type) {

  case LOAD:
    return { ...state, data: action.data };

  case SET_VARIABLE:
    return { ...state, 
      selected: {
        ...state.selected,    
        variable: action.variable, 
        variableRange: action.variable ? action.variable.rangeGroups[0] : null 
      }
    };

  case SET_VARIABLE_RANGE:
    return { ...state, 
      selected: {
        ...state.selected,    
        variableRange: action.range 
      }
    };
  case SET_VARIABLES:
    return {...state,
      variables: action.variables
    };
      
  case PAINT_MAP:
    return {...state, mapData: action.mapData};
  case CLEAR:
  case CLEAR_CLOSE_FIELD:
    return initialState;


  default:
    return state;
  }
};