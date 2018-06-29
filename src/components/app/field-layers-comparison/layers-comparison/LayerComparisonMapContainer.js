import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {addMap} from './_duck/actions'
import {getData} from './_duck/selectors'
import LoadingComponent from "../../../common/_LoadingComponent";
import {createSelectedVariableRangeSelector} from "./_duck/selectors";

//maps
import mapboxgl from 'mapbox-gl';
import {loadMapGeoJson} from "../../../common/map/_duck/actions";
import {getMapGeoJson, getSelected} from "../../../common/map/_duck/selectors";
import MapComponent from '../../../common/map/MapComponent'
import MapSwitcherControl from '../../../../service/maps/classes/common-controls/map-switcher-control';
import MousePositionControl from '../../../../service/maps/classes/common-controls/mouse-position-control';
import MeasureDistanceControl from '../../../../service/maps/classes/common-controls/measure-distance-control';
import MapTalhaoesLayer from '../../../../service/maps/classes/layers/common-layers/map-talhaoes-layer';
import MapNumbersLayer from '../../../../service/maps/classes/layers/common-layers/map-numbers-layer';
import MapSelectedTalhaoLayer from '../../../../service/maps/classes/layers/common-layers/map-selected-talhao-layer';
import InterpolationLayer from './maps/layers/InterpolationLayer';
import LegendControl from './maps/controls/legend-control';

export class LayerComparisonMapContainer extends PureComponent {
  static propTypes = {
    mapIndex: PropTypes.number,
    numberOfMaps: PropTypes.number
  }
  componentDidMount(){
      this.props.loadMap();
  }

  componentWillReceiveProps(newProps){
    if (newProps.fieldSelected !== undefined && this.selectedField){
      this.selectedField.selectExternal(newProps.fieldSelected);
    }
    if (this._interpolationLayer && newProps.selectedRangeGroup !== this.props.selectedRangeGroup){
      this._interpolationLayer.updateLayerData(this.props.data, newProps.selectedRangeGroup);
    }
  }

  buildMap(map){
    this.map = map;
    const {mapIndex} = this.props; 
    
    this.map.map.addControl(new MapSwitcherControl(this.map), "top-left")
    this.map.map.addControl(new MousePositionControl(this.map), "top-left")
    this.map.map.addControl(new MeasureDistanceControl(this.map), "top-left")
    this.map.map.addControl(new mapboxgl.ScaleControl(), 'bottom-left')
    this.map.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left')
    this.map.map.addControl(new LegendControl(this.map, mapIndex), 'bottom-right')

    const talhoes = new MapTalhaoesLayer();
    this.map.addLayer(talhoes).then(()=>{
        this.map.addLayer(new MapNumbersLayer(talhoes))
        this.selectedField = new MapSelectedTalhaoLayer(talhoes);
        this.map.addLayer(this.selectedField);
        this._interpolationLayer = new InterpolationLayer();
        this.map.addLayer(this._interpolationLayer);
        this._interpolationLayer.updateLayerData(this.props.data, this.props.selectedRangeGroup)
    });
  }

  onMapAdd(map){
    this.buildMap(map);

    const {mapIndex, onMapAdd} = this.props; 
    onMapAdd(map, mapIndex);
  }
  render() {
    const {numberOfMaps, mapGeoJson} = this.props;
    if (!mapGeoJson)
      return <LoadingComponent isLoading={true}/>
    return (
        <MapComponent refreshMapCounter={numberOfMaps} onCreateMap={(map)=>this.onMapAdd(map)}/>
    )
  }
}

const mapStateToProps = (state, props) => ({
  mapGeoJson: getMapGeoJson(state),
  fieldSelected: getSelected(state),
  data: getData(state),
  selectedRangeGroup: createSelectedVariableRangeSelector(props.mapIndex)(state)
})

const mapDispatchToProps = (dispatch) => ({  
    loadMap: ()=>dispatch(loadMapGeoJson()),
    onMapAdd: (map, index) => dispatch(addMap(map, index))
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerComparisonMapContainer)
