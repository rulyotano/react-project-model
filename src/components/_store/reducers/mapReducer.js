import {MAP_JSON_LOADED, SET_MAPPED_MAP_JSON} from "../actions/mapActions.types"
import {mappedGeoJson} from "../../../service/maps/geoCalculationService"

const initialState = {
    mapGeoJson: null,
    mapMappedGeoJson: null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case MAP_JSON_LOADED:
    return { ...state, 
      mapGeoJson: action.geoJson, 
      mapMappedGeoJson: mappedGeoJson(action.geoJson) 
    }    
  default:
    return state
  }
}
