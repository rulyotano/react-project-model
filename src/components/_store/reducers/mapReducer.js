import {MAP_JSON_LOADED} from "../actions/mapActions.types"

const initialState = {
    mapGeoJson: null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case MAP_JSON_LOADED:
    return { ...state, mapGeoJson: action.geoJson }

  default:
    return state
  }
}
