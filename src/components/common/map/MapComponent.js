import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Map from '../../../service/maps/classes/Map';

class MapComponent extends Component{
    componentDidMount(){
        this.map = new Map(findDOMNode(this.mapNode));
        this.map.on('load', ()=>{
            if (this.props.onCreateMap)
                this.props.onCreateMap(this.map);
        })
    }

    shouldComponentUpdate(nextProps){
        //needed for update the chart when the side bar collapse or open
        if (nextProps.isMaximized !== this.props.isMaximized){
            setTimeout(()=>this.map.map.resize(),200);            
        }
        return false;
    }
    render(){
        return <div ref={domNode => this.mapNode = domNode} style={{height: "100%", width: "100%"}}></div>
    }
}

MapComponent.propsTypes = {
    onCreateMap: PropTypes.func
}

export default connect(state=>({
    isMaximized: state.app.maximized,
}))(MapComponent);