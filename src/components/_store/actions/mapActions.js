
import Pbf from "pbf"
import {decode} from "geobuf"
import helperService from "../../../service/httpService"
import {mappedGeoJson, calculateCentroid, calculateArea} from "../../../service/maps/geoCalculationService"
import config from "../../../config/config"
import {MAP_JSON_LOADED} from "./mapActions.types"
import {isNaN} from "lodash"

export const loadMapGeoJson = () => (dispatch)=>{
    helperService.useRawUrl().get(config.MAP_GEO_JSON_URL, undefined, { responseType: 'arraybuffer' }).then(response=>{
        const geoJson = decode(new Pbf(response))
        //TODO: do some treatment to geo json here
        const count = geoJson.features.length;
        for (let i = 0; i < count; i++) {
            const feature = geoJson.features[i];
            //calculate centroid
            const centroid = calculateCentroid(feature);

            //calculate area
            const featureArea = feature.properties.areaTotal*1
            const area = calculateArea(feature);
            feature.properties = {
                ...feature.properties, 
                latCentroid: centroid.x, 
                lngCentroid: centroid.y,
                area: area > 0 ? area : 
                        !isNaN(featureArea) ? featureArea : 0
            }
        }
        dispatch({ type: MAP_JSON_LOADED, geoJson })
    })
}