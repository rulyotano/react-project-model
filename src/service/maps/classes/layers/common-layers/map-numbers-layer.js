import {point, featureCollection} from '@turf/helpers'
import MapCommonLayer from '../MapCommonLayer'
import store from '../../../../../components/store'
export default class MapNumbersLayer extends MapCommonLayer {

    /**@param {MapTalhaoesLayerlayer} talhaoesLayer - Parent layer */
    constructor(talhaoesLayer) {
        super("Map Numbers", "layer-talhaoes-ids", 5, true, true);                
        talhaoesLayer.addChildrenLayer(this);
    }

    getLayer(){         
        let points = store.getState().map.mapGeoJson.features.map(
            f=> point([f.properties.lngCentroid, f.properties.latCentroid], {
                title: f.properties.descTalhao ? f.properties.descTalhao: f.properties.cdTalhao
            }));
        return {
            id: this.key,
            type: 'symbol',
            source:{
                type: 'geojson',
                data: featureCollection(points)
            },
            minzoom: 11,
            layout: {
                // "icon-image": "{icon}-15",
                "text-field": "{title}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0],
                "text-anchor": "top",
                "text-size": 12
            }
        };
    }
}