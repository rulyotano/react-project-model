import React, {Component} from 'react';
import Segment from "../../common/segment/Segment";
import LoadingComponent from "../../common/_LoadingComponent";
import {loadMapGeoJson} from "../../_store/actions/mapActions";
import {connect} from 'react-redux';
import {Typography} from 'material-ui-next';

// import CollapsePanel from "../../common/collapse-panel/CollapsePanel"
// import FilterDropDownTest from "../../common/components-to-test/FilterDropDownTest";
// import FilterDropDownAsMultiSelectTest from "../../common/components-to-test/FilterDropDownAsMultiSelectTest";

class Monitoring extends Component{
    componentDidMount(){
        this.props.loadMap();
    }
    render(){
        const {mapGeoJson} = this.props;
        return(
            <Segment title="Map Test">
                <LoadingComponent isLoading={!mapGeoJson} style={{height: "100%"}}/>
                { !!mapGeoJson ? <Typography> Map GeoJson loaded...</Typography> : null}
            </Segment>
        )
    }
}


export default connect(state=>({
    mapGeoJson: state.map.mapGeoJson
}), (dispatch)=>({
    loadMap: ()=>dispatch(loadMapGeoJson())    
}))(Monitoring);