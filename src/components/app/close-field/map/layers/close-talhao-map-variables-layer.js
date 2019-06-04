import * as helpers from '@turf/helpers';
// import bbox from '@turf/bbox'
import midpoint from '@turf/midpoint';
import {isFunction, some} from 'lodash';
import MapCommonLayer from '../../../../../service/maps/classes/layers/MapCommonLayer';

const LINES_SOURCE_ID = 'close-field-map-lines-source-key';
const LINES_HOVER_SOURCE_ID = 'close-field-map-hover-line-source-key';

const MOUSE_HOVER_LINE_LAYER_ID = 'close-field-map-mouse-over-line-layer-key';
const STOP_CIRCLES_LAYER_ID = 'close-field-map-stop-circles-layer-key';
const ARROW_LAYER_ID = 'analytic-layer-arrow-key';

const stoppedStateFilter = (isEqual = false) => 
  [ isEqual ? "==" : "!=", "isStopped", true];

// const mapFitBounds = (map, features)=>{                    
//     let bBox = bbox(features);
//     if (every(bBox, v => v !== Infinity && v !== -Infinity))
//         map.fitBounds(bBox, { padding: 20 });  
// };

// const stoppedStateFilter = (isEqual = false) => 
//                             [ isEqual ? "==" : "!=", "isStopped", true];

/** Line hover layer */
class CloseFieldMapVariablesLayer_Hover extends MapCommonLayer{
  constructor(parent) {
    super("CF-Var-Hover", MOUSE_HOVER_LINE_LAYER_ID, 2, false, false);
    this._dataHover = helpers.featureCollection([]);
    this._parent = parent;
    parent.addChildrenLayer(this);
  }
    
  getLayer(){
    return {
      id: this.key,
      type: 'line',
      source: LINES_HOVER_SOURCE_ID,
      paint: {
        'line-color':  ['get', 'color'],
        'line-width': 5
      }
    };
  }

  mapAdd(map){
    const mapObj = map.map;

    mapObj.addSource(LINES_HOVER_SOURCE_ID, {
      type: 'geojson',
      data: this._dataHover
    });
    return super.mapAdd(map).then(()=>{
      const onMouseEnter = e => 
      {
        this._dataHover.features = [e.features[0]];
                
        map.updateSource(LINES_HOVER_SOURCE_ID, this._dataHover);
      };

      const onMouseLeave = e => 
      {
        this._dataHover.features = [];
        map.updateSource(LINES_HOVER_SOURCE_ID, this._dataHover);
      };

      map.on("mouseenter", this._parent.key, onMouseEnter);
      map.on("mouseleave", this._parent.key, onMouseLeave);
    });
  }
}

/** Stopped circle layer */
class CloseFieldMapVariablesLayer_Stopped extends MapCommonLayer{
  constructor(parent) {
    super("AM-Var-Stopped", STOP_CIRCLES_LAYER_ID, 2, false, false);
    parent.addChildrenLayer(this);
  }
    
  getLayer(){
    return {
      id: this.key,
      type: 'circle',
      source: LINES_SOURCE_ID, 
      paint: {
        "circle-radius": 3,
        "circle-color": ['get', 'color'],
        "circle-stroke-width": 1,
        "circle-stroke-color": "black",
      },
      filter: [
        "all",
        stoppedStateFilter(true),
        ["==", "$type", "Point"]
      ]
    };
  }
}

/** Direction arrows layer */
class CloseFieldMapVariablesLayer_Arrows extends MapCommonLayer{
  constructor(parent) {
    super("AM-Var-Arrows", ARROW_LAYER_ID, 2, false, false);
    parent.addChildrenLayer(this);
  }
    
  getLayer(){
    return {
      id: this.key,
      type: 'symbol',
      source: LINES_SOURCE_ID,
      minzoom: 12,
      layout:{
        "symbol-placement": "point",
        "text-rotate": ["get", "rotate"],
        "text-rotation-alignment": "map",
        "text-font":["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-field": ">",
        // "text-font":["FontAwesome Regular"],
        // "text-field": "\f0ad",
        "text-size": 14,
      },
      paint: {
        "text-color":['get', 'color']
        // "text-color": "black"
      },
      filter: [
        "all",
        stoppedStateFilter(),
        ["==", "$type", "Point"]
      ]
    };
  }
}

export default class CloseFieldMapVariablesLayer extends MapCommonLayer {
  constructor() {
    super("Variable Layer", "analytic-map-variables-layer", 2, true, true);
    this.initializeCollections();
  }

  initializeCollections(){
    this._items = [];
    this._data = helpers.featureCollection([]);
  }

  /** Get the layer definition object, in this case, mabbox layer */
  getLayer(){
    return {
      id: this.key,
      type: 'line',
      source: LINES_SOURCE_ID,
      paint: {
        'line-color':  ['get', 'color'],
        'line-width': 3
      },
      filter: [
        "all",
        stoppedStateFilter(),
        ["==", "$type", "LineString"]
      ]
    };
  }    

  /** On map Add
     * @param map {Map} map class instance
     * @return {Promise} */
  mapAdd(map){
    const mapObj = map.map;
    this._map = map;

    mapObj.addSource(LINES_SOURCE_ID, {
      type: 'geojson',
      data: this._data
    });
    return super.mapAdd(map).then(()=>{
      map.addLayer(new CloseFieldMapVariablesLayer_Hover(this));
      map.addLayer(new CloseFieldMapVariablesLayer_Stopped(this));
      map.addLayer(new CloseFieldMapVariablesLayer_Arrows(this));
            
      let prevCursor = '';
      mapObj.on("mouseenter", this.key, e =>  {  
        prevCursor = mapObj.getCanvas().style.cursor;
        mapObj.getCanvas().style.cursor = 'pointer';
      });                
      mapObj.on("mouseleave", this.key, e =>                
        mapObj.getCanvas().style.cursor = prevCursor
      );    
    });
  }    

  _updateSources(map, data){
    map.updateSource(LINES_SOURCE_ID, data);
    // mapFitBounds(map, data);
  }                

  updateLayerData(items, showArrows){
    const stoppedState = "F";
    this._data = helpers.featureCollection([]);
    this._items = items;

    // for is faster than foreach
    const count = items.length;                    
    for (let i=0; i<count; i++){
      const item = items[i];
            
      if (item.cdEstado !== stoppedState)
      {
        // normal line
        const iniLngLat = [ item.vlLongitudeInicial, item.vlLatitudeInicial ];
        const finalLngLat = [ item.vlLongitudeFinal, item.vlLatitudeFinal ];
        const newLine = helpers.lineString([
          iniLngLat,
          finalLngLat
        ], {
          color: item.color || "black",
          isStopped: false,
          index: i
        });
        this._data.features.push(newLine);
                
        // line arrow
        if (showArrows) {
          const middpoint = midpoint(iniLngLat, finalLngLat);
          const tx = item.vlLongitudeInicial - item.vlLongitudeFinal;
          const ty = item.vlLatitudeInicial - item.vlLatitudeFinal;
          const rotate = 180-helpers.radiansToDegrees(Math.atan2(ty, tx));
          middpoint.properties = {
            color: item.color|| "black",
            rotate,
            isStopped: false,
            index: i
          };
          this._data.features.push(middpoint);
        }
      }
      else {
        // draw stopped points
        const refLngLat = [ item.vlLongitudeInicial, item.vlLatitudeInicial ];
        const newPoint = helpers.point(
          refLngLat, {
            color: "red",
            isStopped: true,
            index: i
          });
        this._data.features.push(newPoint);
      }                        
    }
    this._updateSources(this._map, this._data);
  }

  // #region Clicks
  setOnItemClick(handler){
    this.clearItemClick();
    const onClick = (e)=>{
      if (isFunction(handler) &&
                    some(e.features) && 
                    this._items){  
        handler(this._items[e.features[0].properties.index]);
        return false;   // stop propagation
      }   
    };
    this._map.on('click', this.key, onClick);                   
    this._map.on('click', ARROW_LAYER_ID, onClick);                   
    this._map.on('click', STOP_CIRCLES_LAYER_ID, onClick);                   
    this._map.on('click', MOUSE_HOVER_LINE_LAYER_ID, onClick);                   

    this.unClickHander = ()=>{                        
      this._map.off('click', this.key, onClick);                   
      this._map.off('click', ARROW_LAYER_ID, onClick);                   
      this._map.off('click', STOP_CIRCLES_LAYER_ID, onClick);       
      this._map.off('click', MOUSE_HOVER_LINE_LAYER_ID, onClick);       
    };
  }

  clearItemClick(){
    if (isFunction(this.unClickHander))
      this.unClickHander();
  }
  // #endregion

  /** Clear the layer's data */
  clearLayerData(){
    this.initializeCollections();        
    this._updateSources(this._map, this._data);
  }
}