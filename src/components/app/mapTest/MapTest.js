import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Segment from "../../common/segment/Segment";
import LoadingComponent from "../../common/_LoadingComponent";
import {loadMapGeoJson} from "../../_store/actions/mapActions";
import {connect} from 'react-redux';
import {Typography} from 'material-ui-next';
import Map from '../../../service/maps/classes/Map';
import MapSwitcherControl from '../../../service/maps/classes/common-controls/map-switcher-control';

// import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
// import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
// import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";


class TestMapComponent extends Component{
    componentDidMount(){
        this.map = new Map(findDOMNode(this.mapNode));
        this.map.on('load', ()=>{
            this.map.map.addControl(new MapSwitcherControl(this.map), "top-left")
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