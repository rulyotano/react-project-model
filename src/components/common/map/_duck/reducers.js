import {MAP_JSON_LOADED,
        SELECT_MAP_FIELD, START_MAP_LOADING } from "./types"
import {mappedGeoJson} from "../../../../service/maps/geoCalculationService"

const initialState = {
    mapGeoJson: null,
    mapMappedGeoJson: null,
    isLoading: false,
    selected: null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case START_MAP_LOADING:
    return { ...state, isLoading: true }    

  case MAP_JSON_LOADED:
    return { ...state, 
      mapGeoJson: action.geoJson, 
      mapMappedGeoJson: mappedGeoJson(action.geoJson),
      isLoading: false
    }    
    
  case SELECT_MAP_FIELD:
    return { ...state, 
      selected: action.feature
    }    
  default:
    return state
  }
}
