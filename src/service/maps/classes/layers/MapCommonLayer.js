import MapLayerBase from './MapLayerBase'
import q from "q";

export default class MapCommonLayer extends MapLayerBase {
    /**@param title {string} title or description of the layer
     * @param key {string} key of the map layer
     * @param index {number} index or z-index of the map, represents the priority
     * @param userCanChange {boolean} true, if user can change the visibility in the menu, if false, isn't
     * showed in the menu
     * @param initialShow {boolean} true if initially is showed*/
    constructor(title, key, index, userCanChange, initialShow) {
        super(title, key, index, userCanChange, initialShow);
    }

    /**Get the layer definition object, in this case, mabbox layer. This could be a promise, or the object itself*/
    getLayer(){
        //implement in children
    }


    //#region Map Add/Remove and Show/Hide

    /**Add layer to the map. Should be implemented in children.
     * All Layer types should know how to add himself.
     * @param map {Map} map class instance
     * @param {string} before - Layer id to insert the new one before
     * @return {Promise}*/
    mapAdd(map, before = null){
        //implement in children
        return q.when(this.getLayer(), layerObj=>{
            map.map.addLayer(layerObj , before);
        });
    }

    /**Remove layer from map. Should be implemented in children.
     * All Layer types should know how to remove himself.
     * @param map {Map} map class instance*/
    mapRemove(map){
        //implement in children
        map.map.removeLayer(this.key);
    }

    /**Show layer in map. Should be implemented in children.
     * All Layer types should know how to show himself.
     * @param map {Map} map class instance*/
    mapShow(map){
        //implement in children
        map.map.setLayoutProperty(this.key, 'visibility', 'visible');
    }

    /**Hide layer in map. Should be implemented in children.
     * All Layer types should know how to hide himself.
     * @param map {Map} map class instance*/
    mapHide(map){
        //implement in children
        map.map.setLayoutProperty(this.key, 'visibility', 'none');
    }

    //#endregion
}