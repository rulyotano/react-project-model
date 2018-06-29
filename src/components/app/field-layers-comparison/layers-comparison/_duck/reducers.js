import { CHANGE_NUMBER_OF_MAPS, ADD_MAP,
  START_LOADING_DATA, DATA_LOADED, ERROR_LOADING_DATA,
  SET_VARIABLE, SET_VARIABLE_RANGE, CLEAR } from "./types";
import getAllVariables from "../maps/getAllVariables";

const initialState = {
  numberOfMaps: 1,
  loading: false,
  data: null,
  maps: [],
  mapVariables: []
}

const createMapVariable = (items, index)=>({
  variables: getAllVariables(items, index),
  selected: null,
  selectedRange: null,
})

export default (state = initialState, action) => {
  let mapVariables = null;
  switch (action.type) {

  case CHANGE_NUMBER_OF_MAPS:
    const numberOfMaps = action.numberOfMaps;
    return { ...state, numberOfMaps , maps: state.maps.splice(0,numberOfMaps,0) }
  case ADD_MAP:
    const maps = [...state.maps];
    mapVariables = [...state.mapVariables];
    maps[action.index] = action.map;
    mapVariables[action.index] = createMapVariable(state.data ? state.data.features : [], action.index);
    return { ...state, maps, mapVariables}
  case START_LOADING_DATA:
    return { ...state, data: null, loading: true}
  case DATA_LOADED:
    //set variables in all maps -> create a new map variable for each map
    return { 
      ...state, 
      data: action.data, 
      loading: false, 
      mapVariables: state.maps.map((it, index)=>createMapVariable(action.data ? action.data.features : [], index))
    }
  case ERROR_LOADING_DATA:
    return { ...state, data: null, loading: false}
  case SET_VARIABLE: 
    mapVariables = [...state.mapVariables];
    mapVariables[action.index].selected = action.variable;
    mapVariables[action.index].selectedRange = action.variable ? action.variable.rangeGroups[0] : null;
    return { ...state, mapVariables }
  case SET_VARIABLE_RANGE:
    mapVariables = [...state.mapVariables];
    mapVariables[action.index].selectedRange = action.range;
    return {...state, mapVariables}
  case CLEAR:
    return initialState;
  default:
    return state
  }
}
