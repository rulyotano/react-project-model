import { CHANGE_NUMBER_OF_MAPS, ADD_MAP } from "./types";

const initialState = {
  numberOfMaps: 1,
  maps: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case CHANGE_NUMBER_OF_MAPS:
    const numberOfMaps = action.numberOfMaps;
    return { ...state, numberOfMaps , maps: state.maps.splice(0,numberOfMaps,0) }
  case ADD_MAP:
    const maps = [...state.maps];
    maps[action.index] = action.map;
    return { ...state, maps}
  default:
    return state
  }
}
