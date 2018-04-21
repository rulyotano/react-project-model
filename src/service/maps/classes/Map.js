
import mapboxgl from 'mapbox-gl';
import {head, get, isEmpty, isFunction, some, find, findIndex, setWith} from 'lodash';
import config from '../../../config/config';

const SATELLITE_LAYER_ID = "mapbox-mapbox-satellite";

const availableTypes = [
    { key: "streets", langKey: "maps.Map" },
    { key: "satellite", langKey: "maps.Satellite" }
];

export default class Map {
    constructor(element, center = config.MAP_DEFAULT_CENTER) {
        mapboxgl.accessToken = config.MAPBOX_TOKEN;
        this._selectedMapType = head(availableTypes);
        this._map = new mapboxgl.Map({
            container: element,
            style: 'mapbox://styles/solinftec-dev/cjasfb7cpj6qo2rn0u09jl604?optimize=true',
            center: center,
            zoom: 4
        });
        this._popup = null;

        this._onLoad = new Promise((resolve, reject) => {

            /**custom click handler for implementing stop propagation on click event. Issue that
             * mapbox-js-lg doesnt' implement.
            */
            this._map.on('click', (e) => {
                //iterates layers, first latest added
                for (let i = this._layers.length - 1; i >= 0; i--) {
                    const layer = this._layers[i].key;                            
                    const layerEventListeners = get(this._eventsListeners, `["click"][${layer}]`);
                    //check if have event listeners
                    if (layerEventListeners && !isEmpty(layerEventListeners)) {                                
                        //check if clicked (have features in the point)
                        const features = this._map.getLayer(layer) ? this._map.queryRenderedFeatures(e.point, {layers: [layer]}) : [];
                        if (!isEmpty(features)){
                            const eExtended = { ...e, features };
                            //call all listeners with the new event arg
                            for (let j = layerEventListeners.length - 1; j >= 0; j--) {
                                const listener = layerEventListeners[j];
                                if (isFunction(listener)){
                                    const result = listener(eExtended);
                                    //if listener stop propagation returns
                                    if (result === false)
                                        return;
                                }
                            }
                        }
                    }
                }
            });

            this._map.on('load', () => {
                resolve(this);
            });

            this._map.on('error', () => {
                reject("error loading mapbox");
            });

            this._lastPoint = null;
            this._lastLngLat = null;
            this._map.on('mousemove', e => {
                this._lastPoint = e.point;
                this._lastLngLat = e.lngLat;
            });
        });

        this._layers = [];
        this._onPopupCloseCallbacks = [];
        this._eventsListeners = {} //object with the scrtucture { 'event-type': { 'layer-id': [...listeners...] },... }
    }

    //#region Mouse Position
    /**Get the last mouse point, it is a point of pixels, relative to the pc screen. */
    get mouseLastPoint(){
        return this._lastPoint;
    }

    /**Get the last mouse lng lat coordinates. */            
    get mouseLastLngLat(){
        return this._lastLngLat;
    }
    //#endregion

    //#region Map Types
    get selectedMapType(){
        return this._selectedMapType;
    }

    static get allMapTypes(){
        return availableTypes;
    }

    setMapType(key){
        if (key !== this.selectedMapType.key && some(availableTypes, t=>t.key === key)){
            this._selectedMapType = find(availableTypes, t=>t.key === key);
            this.map.setLayoutProperty(SATELLITE_LAYER_ID, 'visibility',
                this._selectedMapType.key === 'streets' ? 'none' : 'visible');
        }
    }
    //#endregion

    /**Return the map instance (in this case, mapbox map instance)*/
    get map() {
        return this._map;
    }


    //#region Popups
    get popup(){
        return this._popup;
    }

    /**Action for opening a popup */
    openPopup(lngLat, text = null, html = null, domContent = null){
        this.closePopup();
        this._popup = new mapboxgl.Popup();
        this._popup.setLngLat(lngLat);
        if (text)
            this._popup.setText(text);
        else if (html)
            this._popup.setHTML(html);
        else if (domContent)
            this._popup.setDOMContent(domContent);
        this._popup.addTo(this._map);
        this._popup.on('close', 
            () => this._onPopupCloseCallbacks.forEach(callback=>isFunction(callback) && callback()));
    }

    /**Action for close a popup */
    closePopup(){
        if (this._popup){
            this._popup.remove();
            this._popup = null;
        }
    }

    /**Register a callback to the Pupup.on('close') event.
     * @returns {function} - returns an unregister function
     */
    onPopupClose(callback){
        this._onPopupCloseCallbacks.push(callback);
        return () => {
            let itemIdex = this._onPopupCloseCallbacks.indexOf(callback);
            if (itemIdex >= 0)
                this._onPopupCloseCallbacks.splice(itemIdex, 1);
        }
    }

    //#endregion

    /**Promise that is resolved when map is loaded*/
    get onLoad() {
        return this._onLoad;
    }

    //#region Layers
    /**MapLayerBase collection, in format: {key: MapLayerBase}, all layers of this map*/
    get layers() {
        return this._layers;
    }

    /**Add layer,
     * @param {string} before - Layer id to insert the new one before
     * @return {Promise}*/
    addLayer(layer, before = null) {
        if (!layer)
            return new Promise((resolve, reject)=>reject("no layer"));
        if (before){                    
            const insertIndex = findIndex(this._layers, it=>it.key === before);
            this._layers.splice(insertIndex, 0, layer);
        } else
            this._layers.push(layer);
        return layer.mapAdd(this, before);
    }

    removeLayer(layer){
        if (!layer)
            return;
        this._layers = this._layers.filter(l=>l.key === layer.key);
        layer.mapRemove(this);
    }

    showLayer(layer){
        if (!layer)
            return;
        layer.mapShow(this);
        layer.show = true;

        //recursively show children layers
        if (!isEmpty(layer.childrenLayers))
            layer.childrenLayers.forEach(l=>this.showLayer(l))
    }

    hideLayer(layer){
        if (!layer)
            return;
        layer.mapHide(this);
        layer.show = false;

        //recursively hide children layers
        if (!isEmpty(layer.childrenLayers))
            layer.childrenLayers.forEach(l=>this.hideLayer(l))
    }
    //#endregion

    //#region Events

    /**Add a new listener to map events with stop propagation
     * @argument {string} type - event type eg. 'click'
     * @argument {string?} layer - layer id or key (this argument is optional)
     * @argument {Function} listener - event listener
      */
    on(type, layer, listener){
        //only for listeners that have layers
        if (arguments.length === 2){
            listener = layer;
            return this._map.on(type, listener);
        }
        if (type !== 'click')
            return this._map.on(type, layer, listener);
        let layerEventListeners = get(this._eventsListeners, `[${type}][${layer}]`);
        if (!layerEventListeners)
        {
            layerEventListeners = [];
            setWith(this._eventsListeners, `[${type}][${layer}]`, layerEventListeners, Object);                  
        }
        layerEventListeners.push(listener);
    }

    /**Remove listener from map events with stop propagation
     * @argument {string} type - event type eg. 'click'
     * @argument {string?} layer - layer id or key (this argument is optional)
     * @argument {Function} listener - event listener
      */
    off(type, layer, listener){              
        //only for listeners that have layers  
        if (arguments.length === 2){
            listener = layer;
            return this._map.off(type, listener);
        }
        if (type !== 'click')
            return this._map.off(type, layer, listener);

        let layerEventListeners = get(this._eventsListeners, `[${type}][${layer}]`);
        if (layerEventListeners){
            layerEventListeners = layerEventListeners.filter(it => it!==listener);
            setWith(this._eventsListeners, `[${type}][${layer}]`, layerEventListeners, Object);
        }
    }

    //#endregion

    remove(){
        if (this._map){
            this._map.remove();
            this._map = null;
        }
    }

    updateSource(sourceId, data){
        const source = this._map.getSource(sourceId);
        if (source)
            source.setData(data);
        else{
            this._map.addSource(sourceId, data)
        }
    }
}