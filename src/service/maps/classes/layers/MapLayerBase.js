export default class MapLayerBase {
    /**@param title {string} title or description of the layer
     * @param key {string} key of the map layer
     * @param index {number} index or z-index of the map, represents the priority
     * @param userCanChange {boolean} true, if user can change the visibility in the menu, if false, isn't
     * showed in the menu
     * @param initialShow {boolean} true if initially the is showed*/
    constructor(title, key, index, userCanChange, initialShow) {
        this._title = title;
        this._key = key;
        this._index = index;
        this._userCanChange = userCanChange;
        this._show = initialShow;
        this._childrenLayers = [];
    }

    get title(){ return this._title; }
    get key() { return this._key; }
    get index() { return this._index; }

    /**True if user can change the visibility of this layer*/
    get userCanChange() { return this._userCanChange; }
    set userCanChange(value) { this._userCanChange = value; }
    get show() { return this._show; }
    set show(value) { this._show = value}

    //#region Map Add/Remove and Show/Hide

    /**Add layer to the map. Should be implemented in children.
     * All Layer types should know how to add himself.
     * @param {string} before - Layer id to insert the new one before
     * @return {Promise}*/
    mapAdd(map, before = null){
        //implement in children
    }

    /**Remove layer from map. Should be implemented in children.
     * All Layer types should know how to remove himself.
     * @param map {Map} map class instance*/
    mapRemove(map){
        //implement in children
    }

    /**Show layer in map. Should be implemented in children.
     * All Layer types should know how to show himself.
     * @param map {Map} map class instance*/
    mapShow(map){
        //implement in children
    }

    /**Hide layer in map. Should be implemented in children.
     * All Layer types should know how to hide himself.
     * @param map {Map} map class instance*/
    mapHide(map){
        //implement in children
    }

    //#endregion

    //#region Children Layers

    /**Children Layers are other MapLayerBase objects that depends, are children, of this layer.*/
    get childrenLayers(){
        return this._childrenLayers;
    }

    addChildrenLayer(layer){
        this._childrenLayers.push(layer);
    }

    removeChildrenLayer(layer){
        if (!layer)
            return;
        this._childrenLayers = this._childrenLayers.filter(l=>l.key !== layer.key)
    }

    //#endregion
}