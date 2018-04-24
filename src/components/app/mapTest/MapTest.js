import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {findDOMNode} from 'react-dom';
import Segment from "../../common/segment/Segment";
import LoadingComponent from "../../common/_LoadingComponent";
import {loadMapGeoJson} from "../../_store/actions/mapActions";
import {connect} from 'react-redux';
import {Typography} from 'material-ui-next';
import Map from '../../../service/maps/classes/Map';
import MapSwitcherControl from '../../../service/maps/classes/common-controls/map-switcher-control';
import MousePositionControl from '../../../service/maps/classes/common-controls/mouse-position-control';
import MapTalhaoesLayer from '../../../service/maps/classes/layers/common-layers/map-talhaoes-layer';
import MapNumbersLayer from '../../../service/maps/classes/layers/common-layers/map-numbers-layer';
import MapSelectedTalhaoLayer from '../../../service/maps/classes/layers/common-layers/map-selected-talhao-layer';

// import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
// import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
// import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";


class TestMapComponent extends Component{
    componentDidMount(){
        this.map = new Map(findDOMNode(this.mapNode));
        this.map.on('load', ()=>{
            this.map.map.addControl(new MapSwitcherControl(this.map), "top-left")
            this.map.map.addControl(new MousePositionControl(this.map), "top-left")
            this.map.map.addControl(new mapboxgl.ScaleControl(), 'bottom-right')
            this.map.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

            const talhoes = new MapTalhaoesLayer();
            this.map.addLayer(talhoes).then(()=>{
                this.map.addLayer(new MapNumbersLayer(talhoes))
                this.map.addLayer(new MapSelectedTalhaoLayer(talhoes))
                //Added talhoes
            });
        })
    }

    shouldComponentUpdate(nextProps){
        return false;
    }
    render(){
        return <div ref={domNode => this.mapNode = domNode} style={{height: "100%", width: "100%"}}></div>
    }
}

class MapTest extends Component{
    componentDidMount(){
        this.props.loadMap();
    }
    shouldComponentUpdate(nextProps){
        return nextProps.mapGeoJson !== this.props.mapGeoJson;
    }
    render(){
        const {mapGeoJson} = this.props;
        return(
            <Segment title="Map Test" useScroll={false}>
                <LoadingComponent isLoading={!mapGeoJson} style={{height: "100%"}}/>
                { !!mapGeoJson ? <TestMapComponent/> : null}
            </Segment>
        )
    }
}


export default connect(state=>({
    mapGeoJson: state.map.mapGeoJson
}), (dispatch)=>({
    loadMap: ()=>dispatch(loadMapGeoJson())    
}))(MapTest);