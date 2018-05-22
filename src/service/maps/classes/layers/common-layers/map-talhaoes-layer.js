import {bbox} from '@turf/turf'
import MapCommonLayer from '../MapCommonLayer'
import store from '../../../../../components/store'
import {getTranslateFunction} from 'redux-i18n'
import translations from '../../../../../i18n'
import {round} from 'lodash'
import {getUnits} from '../../../../measureUnitsService'


export const TALHAOES_SOURCE_ID = "talhaoes-source";

export default class MapTalhaoesLayer extends MapCommonLayer {
    constructor() {
        super("Talhones", "layer-talhoes", 0, true, true);
        this.SOURCE_ID = TALHAOES_SOURCE_ID;
    }

    /**Get the layer definition object, in this case, mabbox layer*/
    getLayer(){
        return {
            id: this.key,
            type: 'fill',
            source: TALHAOES_SOURCE_ID,
            paint: {
                'fill-color': 'rgba(237, 236, 214, 0.4)',
                'fill-outline-color': 'rgba(0, 0, 0, 1)'
            }
        };
    }


    /**Things to do when the layer added to map
     * @param map {Map} map class instance
     * @return {Promise}*/
    mapAdd(map){
        let mapObj = map.map;
        const geo = store.getState().map.mapGeoJson;
        mapObj.addSource(TALHAOES_SOURCE_ID, {
            type: 'geojson',
            data: geo
        });

        return super.mapAdd(map).then(()=>{
            mapObj.fitBounds(bbox(geo), {duration: 0, padding: 50});

            // Change the cursor to a pointer when the mouse is over the states layer.
            map.on('mouseenter', this.key, () => {
                mapObj.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', this.key, () => {
                mapObj.getCanvas().style.cursor = '';
            });

            map.on('click', this.key, e => {
                map.openPopup(e.lngLat, null, MapTalhaoesLayer.talhaoDefaultString(e.features[0]));
            });
        });
    }

    /** Default click on talhao string */
    static talhaoDefaultString(feature, customTxt = ""){
        const t = getTranslateFunction(translations, store.getState().i18nState.lang);
        let props = feature.properties;
        let fazenda = props.cdFazenda;
        let setor = props.cdZona;
        let cdTalhao = props.cdTalhao;
        let nameFazenda = props.nomeFazenda || '-';
        let areaTotal = round(props.area, 2);
        let descTalhao = props.descTalhao;

        let descTalhaoStr = descTalhao && descTalhao !== 'null' ? `<p><h5>Desc. ${t('maps.Field')}:<small> ${descTalhao}</small></h5></p>` : '';
        
        const mUnit = getUnits().AREA;
        const areaUnit = mUnit.unit;
        const areaFormula = mUnit.f;

        return `<div>
                    <h4>${t('maps.Map of Field')}</h4>
                    <p><h5>${t("maps.Farm's Name")}:<small> ${(nameFazenda && nameFazenda != "null") ? nameFazenda : t('maps.NOT REGISTERED')}</small></h5></p>
                    <p><h5>${t("maps.Farm")}:<small> ${fazenda}</small></h5></p>
                    <p><h5>${t('maps.Sector')}:<small> ${setor}</small></h5></p>
                    <p><h5>${t('maps.Field')}:<small> ${cdTalhao}</small></h5></p>
                    ${descTalhaoStr}
                    <p><h5>${t('maps.Total Area')}:<small> ${round(areaFormula(areaTotal), 2)} ${areaUnit}</small></h5></p>
                    ${customTxt}
                </div>`;
    }
}