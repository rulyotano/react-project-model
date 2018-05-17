import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import EmptySegment from "../../../common/segment/EmptySegment";
import MapCloseFieldMenu from "./MapCloseFieldMenu";

//maps
import mapboxgl from 'mapbox-gl';
import LoadingComponent from "../../../common/_LoadingComponent";
import MapComponent from "../../../common/map/MapComponent";
import {loadMapGeoJson} from "../../../_store/actions/mapActions";
import MapSwitcherControl from '../../../../service/maps/classes/common-controls/map-switcher-control';
import MousePositionControl from '../../../../service/maps/classes/common-controls/mouse-position-control';
import MeasureDistanceControl from '../../../../service/maps/classes/common-controls/measure-distance-control';
import MapTalhaoesLayer from '../../../../service/maps/classes/layers/common-layers/map-talhaoes-layer';
import MapNumbersLayer from '../../../../service/maps/classes/layers/common-layers/map-numbers-layer';
import MapSelectedTalhaoLayer from '../../../../service/maps/classes/layers/common-layers/map-selected-talhao-layer';

const styles = theme => ({
  fullHeight: {
    height: "100%"
  }
})

/**Close a field but from maps */
export class MapCloseField extends PureComponent {
  static propTypes = {
    // prop: PropTypes
  }
  componentDidMount(){
      this.props.loadMap();
  }
  
  onCreateMap(map){
    this.map = map;
    
    this.map.map.addControl(new MapSwitcherControl(this.map), "top-left")
    this.map.map.addControl(new MousePositionControl(this.map), "top-left")
    this.map.map.addControl(new MeasureDistanceControl(this.map), "top-left")
    this.map.map.addControl(new mapboxgl.ScaleControl(), 'bottom-right')
    this.map.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    const talhoes = new MapTalhaoesLayer();
    this.map.addLayer(talhoes).then(()=>{
        this.map.addLayer(new MapNumbersLayer(talhoes))
        this.map.addLayer(new MapSelectedTalhaoLayer(talhoes))
        //Added talhoes
    });
}

  render() {
    const {mapGeoJson, classes} = this.props;
    //TODO: redirect to load from map if data not loaded
    const map = <div className={classes.fullHeight}>
      <MapComponent onCreateMap={map=>this.onCreateMap(map)} />
      <MapCloseFieldMenu/>
    </div>

    return (
      <EmptySegment useScroll={false}>
        <LoadingComponent className={classes.fullHeight} isLoading={!mapGeoJson}/>
                { !!mapGeoJson ? map : null}
      </EmptySegment>
    )
  }
}

const mapStateToProps = (state) => ({
  mapGeoJson: state.map.mapGeoJson  
})

const mapDispatchToProps = (dispatch) => ({
  loadMap: ()=>dispatch(loadMapGeoJson())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseField))
