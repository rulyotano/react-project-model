import MapCommonLayer from "../../../../../../service/maps/classes/layers/MapCommonLayer";
import * as turfHelpers from "@turf/helpers";
import turfBbox from "@turf/bbox";
import {every, find} from "lodash";

const mapFitBounds = (map, features)=>{                    
    const bbox = turfBbox(features);
    if (every(bbox, v => v !== Infinity && v !== -Infinity))
        map.fitBounds(bbox, { padding: 20 });  
};

const INTERPOLATION_SOURCE_ID = "INTERPOLATION_SOURCE_ID"

class AnalyticMapVariablesLayer extends MapCommonLayer {
    constructor(key) {
        super("Interpolation Layer", `interpolation-layer-${key}`, 2, true, true);
        this.initializeCollections();
    }

    initializeCollections(){
        this._items = [];
        this._data = turfHelpers.featureCollection([]);
    }

    /**Get the layer definition object, in this case, mabbox layer*/
    getLayer(){
        return {
            id: this.key,
            type: 'fill',
            source: INTERPOLATION_SOURCE_ID,
            paint: {
                'fill-color': ['get', 'color'],
                'fill-opacity': ['get', 'opacity'],
            }
        };
    }    

    /**On map Add
     * @param map {Map} map class instance
     * @return {Promise}*/
    mapAdd(map){
        let mapObj = map.map;
        this._map = map;

        mapObj.addSource(INTERPOLATION_SOURCE_ID, {
            type: 'geojson',
            data: this._data
        });
        return super.mapAdd(map).then(()=>{            
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
        map.updateSource(INTERPOLATION_SOURCE_ID, data);
        mapFitBounds(map.map, data);
    }                

    updateLayerData(data, selectedRangeGroup){
        this._data = turfHelpers.featureCollection([]);

        if (!selectedRangeGroup){
            this.clearLayerData();
            return;
        }
        let ranges = selectedRangeGroup.ranges;
        const findColor = (value) => {
            let range = find(ranges, r=>r.minRaw <= value && value <= r.maxRaw);
            return range ? range.color : 'black';
        };
        
        //calculate min dist
        let refPoint = null;
        let minDist = Number.MAX_VALUE;
        const count = data.features.length;
        for (let i = 0; i < count; i++) {
            const f = data.features[i];
            if (refPoint == null)
                refPoint = f.geometry.coordinates;
            else {
                const coords = f.geometry.coordinates;
                const f1 = coords[0] - refPoint[0];
                const f2 = coords[1] - refPoint[1];
                const dist = Math.sqrt(f1*f1 + f2*f2);
                if (dist < minDist)
                    minDist = dist;
            }           
        }

        //group by colors
        let radius = minDist/2;
        for (let i = 0; i < data.features.length; i++) {
            const feature = data.features[i];

            let coords = feature.geometry.coordinates;
            let color = findColor(feature.properties.VL_VALOR_VARIAVEL);

            const x1 =coords[0] - radius,
                  y1 =coords[1] - radius,
                  x2 =coords[0] + radius, 
                  y2 = coords[1] + radius;
            const rectangle = turfHelpers.polygon([[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]], {color});
            this._data.features.push(rectangle);
        }
        this._updateSources(this._map, this._data);
    }

    updateOpacity(opacity){
        this._map.map.setPaintProperty(this.key, 'fill-opacity', opacity);
    }

    /**Clear the layer's data */
    clearLayerData(){
        this.initializeCollections();        
        this._updateSources(this._map, this._data);
    }
}

export default AnalyticMapVariablesLayer;


// let interRectangles = [];
            
// /**Render matrix interpolation grid*/
// function renderInterpolation(){
//     // let featureCollection = self.displayInfo.featureCollection;
//     // if (!featureCollection)
//     //     return;

//     // let min = selectedRangeGrp.calculatedMin ? selectedRangeGrp.calculatedMin : undefined;
//     // let max = selectedRangeGrp.calculatedMax ? selectedRangeGrp.calculatedMax : undefined;

//     _.forEach(interRectangles, r=>r.setMap(null));
//     interRectangles = [];

//     let points = [];

//     // let max = Number.MIN_VALUE;

//     let ranges = self.displayInfo.variable.ranges;
//     const findColor = (value) => {
//         let range = _.find(ranges, r=>r.minRaw <= value && value <= r.maxRaw);
//         return range ? range.color : 'black';
//     };


//     //calculate min dist
//     let refPoint = null;
//     let minDist = Number.MAX_VALUE;
//     _.forEach(pointTest.features, f=> {
//         if (refPoint == null)
//             refPoint = f.geometry.coordinates;
//         else {
//             let coords = f.geometry.coordinates;
//             let f1 = coords[0] - refPoint[0];
//             let f2 = coords[1] - refPoint[1];
//             let dist = Math.sqrt(f1*f1 + f2*f2);
//             if (dist < minDist)
//                 minDist = dist;
//         }
//     });
//     let radius = minDist/2;

//     //calculate max value
//     _.forEach(pointTest.features, feature => {
//         // if (feature.properties.value > max)
//         //     max = Math.pow(feature.properties.value, 2);
//         let coords = feature.geometry.coordinates;
//         let color = findColor(feature.properties.VL_VALOR_VARIAVEL);

//         let rectangle = new google.maps.Rectangle({
//             strokeWeight: 0,
//             fillColor: color,
//             fillOpacity: 0.35,
//             map: self.map,
//             zIndex: 50,
//             bounds: {
//                 north: coords[1] - radius,
//                 south: coords[1] + radius,
//                 east:  coords[0] + radius,
//                 west:  coords[0] - radius,
//             }
//             });

//             google.maps.event.addListener(rectangle,'click', event=>{
//                 infowindow.setContent(`
//                     <div>
//                         ${_.reduce(_.map(feature.properties, (value, key) => `<b>${key}:</b> ${value}`), (result, val)=> `${result}</br>${val}` ,'')}
//                     </div>
//                 `);
//                 infowindow.setPosition({
//                     lat: coords[1],
//                     lng: coords[0]
//                 });
//                 infowindow.open(self.map,rectangle);
//             });
//             interRectangles.push(rectangle);
//         // points.push({ location: new google.maps.LatLng(coords[1], coords[0]), weight: feature.properties.VL_VALOR_VARIAVEL })
//     });
// }