
import Pbf from "pbf"
import {decode} from "geobuf"
import helperService from "../../../service/httpService"
import config from "../../../config/config"
import {MAP_JSON_LOADED} from "./mapActions.types"

export const loadMapGeoJson = () => (dispatch)=>{
    helperService.useRawUrl().get(config.MAP_GEO_JSON_URL, undefined, { responseType: 'arraybuffer' }).then(response=>{
        //TODO: do some treatment to geo json here
        dispatch({ type: MAP_JSON_LOADED, geoJson: decode(new Pbf(response)) })
    })
}