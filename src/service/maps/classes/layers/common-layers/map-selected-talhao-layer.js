import MapCommonLayer from '../MapCommonLayer';
import {delay} from 'lodash';
import * as mapService from '../../../mapService';

const getFilter = (cdFazenda = null, cdZona = null, cdTalhao = null) => [
    "all",
    ["in", "cdFazenda", cdFazenda || ""],
    ["in", "cdZona", cdZona || ""],
    ["in", "cdTalhao", cdTalhao || ""]
];

/**Selected Talhao layer, show in red the selected talhao, and when clicked, change the status.
 * THIS IS A TALHOES' CHILDREN LAYER
*/
export default class MapSelectedTalhaoesLayer extends MapCommonLayer {
    /**@param {MapTalhaoesLayerlayer} talhaoesLayer - Parent layer */
    constructor(talhaoesLayer) {
        super("Selected Talhones", "layer-selected-talhoes", 10, false, true);
        this._talhoesLayer = talhaoesLayer;
        this._talhoesLayer.addChildrenLayer(this);
    }

    /**Get the layer definition object, in this case, mabbox layer*/
    getLayer(){
        return {
            id: this.key,
            type: 'fill',
            source: this._talhoesLayer.SOURCE_ID,
            paint: {
                'fill-color': 'red',
                'fill-outline-color': 'rgba(0, 0, 0, 1)',
                "fill-opacity": 0.4
            },
            filter: getFilter()
        };
    }


    /**Things to do when the layer added to map
     * @param map {Map} map class instance
     * @return {Promise}*/
    mapAdd(map){
        this._map = map;
        let mapObj = map.map;

        
        map.on('click', this._talhoesLayer.key, e => {
            let feature = e.features[0];
            if (!feature)
                return;
            let selTalhao = mapService.getSelectedField()
            let isSame = selTalhao === feature;

            //if isSame do nothing because it means that was opened and must be closed, (it will be closed when popup close
            //... and will be not opened again)
            if (!isSame){                            
                //delay because of click event was raised before closing the popup
                delay(()=>{         
                    mapService.setSelectedField(feature);
                    const { cdFazenda: farm, cdZona: sector, cdTalhao: field } = feature.properties
                    mapObj.setFilter(this.key, getFilter(farm, sector, field));
                });
            }
        });

        map.onPopupClose(()=>{
            mapObj.setFilter(this.key, getFilter());
            mapService.setSelectedField(null);
        });

        return super.mapAdd(map);
    }

    //
    selectExternal(feature){
        if (!feature)
            return;
        const mapObj = this._map.map;
        const { cdFazenda: farm, cdZona: sector, cdTalhao: field } = feature.properties
        mapObj.setFilter(this.key, getFilter(farm, sector, field));        
    }
}