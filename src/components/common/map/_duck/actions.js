
import Pbf from "pbf";
import {decode} from "geobuf";
import {isNaN, get, toLower} from "lodash";
import helperService from "../../../../service/httpService";
import {calculateCentroid, calculateArea, convertArea} from "../../../../service/maps/geoCalculationService";
import config from "../../../../config/config";
import {MAP_JSON_LOADED, SELECT_MAP_FIELD, START_MAP_LOADING} from "./types";

/** Load geo json from store, if is already loaded doesn't */
export const loadMapGeoJson = () => (dispatch, getState)=>{
  // check for not loading twice
  const {isLoading, mapGeoJson} = getState().map;
  if (isLoading || mapGeoJson !== null)
    return;
  dispatch({ type: START_MAP_LOADING });
  helperService.useRawUrl().get(config.MAP_GEO_JSON_URL, undefined, { responseType: 'arraybuffer' }).then(response=>{
    const geoJson = decode(new Pbf(response));
    // TODO: do some treatment to geo json here
    const count = geoJson.features.length;
    for (let i = 0; i < count; i++) {
      const feature = geoJson.features[i];

      // fix multi-polygons in some maps
      if (toLower(get(feature, "geometry.type")) === "multipolygon")
        feature.geometry.type = "MultiPolygon";

      // calculate centroid
      const centroid = calculateCentroid(feature);

      // calculate area
      const featureArea = feature.properties.areaTotal*1;
      const area = calculateArea(feature);
      feature.properties = {
        ...feature.properties, 
        latCentroid: centroid.x, 
        lngCentroid: centroid.y,
        area: area > 0 ? convertArea(area, 'meters', 'hectares') : 
          !isNaN(featureArea) ? featureArea : 0
      };
    }
    dispatch({ type: MAP_JSON_LOADED, geoJson });
  });
};

/** Select map field */
export const selectMapField = (feature = null)=>({ type: SELECT_MAP_FIELD, feature});