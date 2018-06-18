import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Redirect } from "react-router-dom";
import {urlJoin} from "../../../../service/helperService";
import EmptySegment from "../../../common/segment/EmptySegment";
import MapCloseFieldMenu from "./MapCloseFieldMenu";
import routesNames from "../routesNames";
import { PreloadKey as MAP_KEY} from "./routesNames";

//maps
import mapboxgl from 'mapbox-gl';
import LoadingComponent from "../../../common/_LoadingComponent";
import MapComponent from "../../../common/map/MapComponent";
import {loadMapGeoJson} from "../../../common/map/_duck/actions";
import {getMapGeoJson, getSelected} from "../../../common/map/_duck/selectors";
import MapSwitcherControl from '../../../../service/maps/classes/common-controls/map-switcher-control';
import MousePositionControl from '../../../../service/maps/classes/common-controls/mouse-position-control';
import MeasureDistanceControl from '../../../../service/maps/classes/common-controls/measure-distance-control';
import MapTalhaoesLayer from '../../../../service/maps/classes/layers/common-layers/map-talhaoes-layer';
import MapNumbersLayer from '../../../../service/maps/classes/layers/common-layers/map-numbers-layer';
import MapSelectedTalhaoLayer from '../../../../service/maps/classes/layers/common-layers/map-selected-talhao-layer';
import CloseTalhaoMapVariable from './layers/close-talhao-map-variables-layer';
import {clear} from './_duck/actions';
import {getMapData, createGetMapIsLoaded} from './_duck/selectors';
import CloseFieldModal from "../close-modal/CloseFieldModal";

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
  state = {
    showCloseFieldModal: false,
    wArea: null
  }
  componentDidMount(){
      this.props.loadMap();
  }
  componentWillUnmount(){
    this.props.clear();
  }

  componentWillReceiveProps(newProps){
    if (newProps.mapData !== this.props.mapData)
    {
      //repaint the map variables
      this.onMapDataUpdated(newProps.mapData);
    }
    if (newProps.fieldSelected !== undefined && this.selectedField){
      this.selectedField.selectExternal(newProps.fieldSelected);
    }
  }

  onMapDataUpdated(mapData){
    this.linesLayer.updateLayerData(mapData);
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
        this.selectedField = new MapSelectedTalhaoLayer(talhoes);
        this.map.addLayer(this.selectedField);
        this.linesLayer = new CloseTalhaoMapVariable(talhoes);
        this.map.addLayer(this.linesLayer);
    });
  }

  onCloseFieldClick(wArea){
    this.setState({wArea, showCloseFieldModal: true})
  }

  onCloseFieldModalClose(){
    this.setState({showCloseFieldModal: false})
  }

  render() {
    const {mapGeoJson, classes, loaded} = this.props;
    const {showCloseFieldModal, wArea} = this.state;
    
    if (!loaded)
      return <Redirect to={urlJoin("/", routesNames, MAP_KEY)}/>

    //TODO: redirect to load from map if data not loaded
    const map = <div className={classes.fullHeight}>
      <MapComponent onCreateMap={map=>this.onCreateMap(map)} />
      <MapCloseFieldMenu onCloseFieldClick={(wArea)=>this.onCloseFieldClick(wArea)}/>      
      {!!wArea ? <CloseFieldModal 
                    open={showCloseFieldModal} 
                    farm={wArea.farm}
                    sector={wArea.sector}
                    field={wArea.field}
                    closeModal={()=>this.onCloseFieldModalClose()}/> : null}
    </div>

    return (
      <EmptySegment useScroll={false}>
        <LoadingComponent className={classes.fullHeight} isLoading={!mapGeoJson}/>
                { !!mapGeoJson ? map : null}                
      </EmptySegment>
    )
  }
}

const getMapIsLoaded = createGetMapIsLoaded();

const mapStateToProps = (state) => ({
  mapGeoJson: getMapGeoJson(state),  
  loaded: getMapIsLoaded(state),
  mapData: getMapData(state),
  fieldSelected: getSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  loadMap: ()=>dispatch(loadMapGeoJson()),
  clear: ()=>dispatch(clear())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MapCloseField))
