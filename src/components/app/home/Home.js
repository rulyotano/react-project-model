import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import mapboxgl from 'mapbox-gl';
import EmptySegment from "../../common/segment/EmptySegment";
import LoadingComponent from "../../common/_LoadingComponent";
import MapComponent from "../../common/map/MapComponent";
import {loadMapGeoJson} from "../../common/map/_duck/actions";

// maps
import MapSwitcherControl from '../../../service/maps/classes/common-controls/map-switcher-control';
import MousePositionControl from '../../../service/maps/classes/common-controls/mouse-position-control';
import MeasureDistanceControl from '../../../service/maps/classes/common-controls/measure-distance-control';
import MapTalhaoesLayer from '../../../service/maps/classes/layers/common-layers/map-talhaoes-layer';
import MapNumbersLayer from '../../../service/maps/classes/layers/common-layers/map-numbers-layer';
import MapSelectedTalhaoLayer from '../../../service/maps/classes/layers/common-layers/map-selected-talhao-layer';

class DashBoard extends PureComponent{
  componentDidMount(){
    this.props.loadMap();
  }

  onCreateMap(map){
    this.map = map;
        
    this.map.map.addControl(new MapSwitcherControl(this.map), "top-left");
    this.map.map.addControl(new MousePositionControl(this.map), "top-left");
    this.map.map.addControl(new MeasureDistanceControl(this.map), "top-left");
    this.map.map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');
    this.map.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    const talhoes = new MapTalhaoesLayer();
    this.map.addLayer(talhoes).then(()=>{
      this.map.addLayer(new MapNumbersLayer(talhoes));
      this.map.addLayer(new MapSelectedTalhaoLayer(talhoes));
      // Added talhoes
    });
  }

  render(){
    const {mapGeoJson} = this.props;
    return(
      <EmptySegment title="Dashboard" useScroll={false}>
        <LoadingComponent isLoading={!mapGeoJson} style={{height: "100%"}}/>
        { mapGeoJson ? <MapComponent onCreateMap={map=>this.onCreateMap(map)} /> : null}
      </EmptySegment>
    );
  }
}
        
const mapStateToProps = (state) => ({
  mapGeoJson: state.map.mapGeoJson
});

const mapDispatchToProps = (dispatch) => ({
  loadMap: ()=>dispatch(loadMapGeoJson())
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);