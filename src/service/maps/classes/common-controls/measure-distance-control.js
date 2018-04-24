import React from 'react'
import {render} from 'react-dom';
import {round} from 'lodash'
import {connect} from 'react-redux';
import {lineDistance} from '@turf/turf'
import {featureCollection, point as turfPoint, lineString as turfLineString} from '@turf/helpers'
import moment from 'moment'
import translations from '../../../../i18n';
import store from '../../../../components/store';
import {getTranslateFunction} from 'redux-i18n';

class MeasureDistance extends React.PureComponent{
    state = {
        distance: null,
        show: false
    }
    onMapClickHandler = null
    onMouseMoveHandler = null

    startMeasuring(){
        const {show} = this.state;
        const {map} = this.props.map;
        if (show)
            return;
        this.setState({ show: true, distance: null })

        //create the geojson source
        let sourceGeoJson = featureCollection([]);

        map.addSource('measure-geojson', {
            "type": "geojson",
            "data": sourceGeoJson
        });

        // Add styles to the map
        map.addLayer({
            id: 'measure-points',
            type: 'circle',
            source: 'measure-geojson',
            paint: {
                'circle-radius': 5,
                'circle-color': '#000'
            },
            filter: ['in', '$type', 'Point']
        });
        map.addLayer({
            id: 'measure-lines',
            type: 'line',
            source: 'measure-geojson',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#000',
                'line-width': 2.5
            },
            filter: ['in', '$type', 'LineString']
        })

        this.onMapClickHandler = (e)=>{
            if (this.props.map.popup)
                this.props.map.closePopup();
            let features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });

            // Remove the last item (linestring) from the group
            // So we can redraw it based on the points collection
            if (sourceGeoJson.features.length > 1) sourceGeoJson.features.pop();

            // If a feature was clicked, remove it from the map
            if (features.length) {
                const id = features[0].properties.id;
                sourceGeoJson.features = sourceGeoJson.features.filter(point => point.properties.id !== id);
            } else{
                //add new point to features
                let point = turfPoint([e.lngLat.lng, e.lngLat.lat], { id: moment().valueOf() });
                sourceGeoJson.features.push(point)
            }

            //add linestring
            if (sourceGeoJson.features.length > 1) {
                let lineString = turfLineString(
                        sourceGeoJson.features.map(point=>point.geometry.coordinates));
                //add the line string feature at the end, based in points coordinates
                sourceGeoJson.features.push(lineString);

                this.setState({ distance: round(lineDistance(lineString), 2) });
            } else {
                this.setState({ distance: null });
            }

            //update the source data
            map.getSource('measure-geojson').setData(sourceGeoJson);
            return false;
        };
        this.onMouseMoveHandler = (e)=>{
            // UI indicator for clicking/hovering a point on the map
            map.getCanvas().style.cursor = 'crosshair';
            return false;
        };
        this.props.map.on('click', this.onMapClickHandler);
        this.props.map.on('mousemove', this.onMouseMoveHandler);
    }
    endMeasuring(){
        const {map} = this.props.map;
        this.setState({
            show: false, distance: null
        })

        this.props.map.off('click', this.onMapClickHandler);
        this.props.map.off('mousemove', this.onMouseMoveHandler);
        map.getCanvas().style.cursor = 'pointer';

        map.removeLayer('measure-points');
        map.removeLayer('measure-lines');
        map.removeSource('measure-geojson');
    };

    onClick(){
        if (this.state.show){
            this.endMeasuring();
        }
        else{
            this.startMeasuring();
        }
    }

    render(){
        const { lang } = this.props;
        const { distance, show } = this.state;
        const t = getTranslateFunction(translations, lang);
        const measureUnit = "km";   //TODO: internationalize
        const measureDiv = ()=>(<div style={{display: 'inline-block', verticalAlign: "super", marginLeft: "5px"}}>
            <span>{t("maps.Distance")} { distance !== null ? `${distance} ${measureUnit}` : '-'  }</span>
        </div>)

        return (<div title={t('maps.Measure distances')} onClick={()=>this.onClick()} style={{height: "23px"}}>
            <span className="measure-svg-21"/>
            { show ? measureDiv() : null }
        </div>);
    }
}

MeasureDistance = connect(state=>({
    lang: state.i18nState.lang     
}))(MeasureDistance)

export default class MeasureDistanceControl {
    constructor(map) {
        this._map = map;
        this._isMeasuring = false;
    }

    _createControl() {
        // Set CSS for the control border.
        let measureDistanceDiv = document.createElement('div');
        measureDistanceDiv.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group',
            'measure-distance-ctrl',
            'custom-left-top-controller-container');
        measureDistanceDiv.style.minHeight = 'inherit';

        render(<MeasureDistance store={store} map={this._map}/>, measureDistanceDiv);

        return measureDistanceDiv;
    }


    onAdd(map) {
        this._container = this._createControl();
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
}