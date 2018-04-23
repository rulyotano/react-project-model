import {round} from 'lodash';
import React from 'react';
import {render} from 'react-dom';
import Map from '../Map';
import translations from '../../../../i18n';
import store from '../../../../components/store';
import {getTranslateFunction} from 'redux-i18n';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const styles = {
    textOpen: {
        color: "rgb(25,25,25)",
        fontFamily: "Roboto,Arial,sans-serif",
        fontSize: "11px",
        lineHeight: "21px",
        paddingLeft: "3px",
        paddingRight: "3px",
    },
    mousePositionDiv: {
        height: "23px"
    }
}

class MousePositionComponent extends React.PureComponent {
    state = {
        open: false,
        lat: null, long: null        
    }
    switchOpen(){
        //if map was closed then OPEN it
        if (!this.state.open){
            this._moveHandler = (e)=>this.onMapMove(e);
            this.props.map.on('mousemove', this._moveHandler)
        } 
        //if map was open the CLOSE it
        else {
            this.props.map.off('mousemove', this._moveHandler)
            this._moveHandler = null;
        }
        this.setState({ open: !this.state.open })
    }
    onMapMove(e){
        this.setState({
            lat: round(e.lngLat.lat, 4),
            long: round(e.lngLat.lng, 4),
        });
    }
    render(){
        const {lang} = this.props;
        const {open, lat, long} = this.state;
        const t = getTranslateFunction(translations, lang);

        const textClose = <span className="coordinates-svg-21"></span>
        const textOpen = (lat, long)=><div style={styles.textOpen}>
            <b>Lat:</b> {lat ? lat : '-'} <b>Long:</b> {long ? long : '-'}
        </div>
        return <div title={t('Mouse Position')}
                    onClick={()=>this.switchOpen()}
                    style={styles.mousePositionDiv}>
            {open ? textOpen(lat,long) : textClose}                                            
        </div>
    }
}

MousePositionComponent = connect(state=>({
    lang: state.i18nState.lang     
}))(MousePositionComponent)

export default class MousePositionControl {
    constructor(map) {
        this._map = map;
    }

    _createControl() {
        // Set CSS for the control border.
        let mousePositionDiv = document.createElement('div');
        mousePositionDiv.classList.add('mapboxgl-ctrl', 'mapboxgl-ctrl-group',
                                        'mouse-position-ctrl', 'custom-left-top-controller-container');
        mousePositionDiv.style.minHeight = 'inherit';
        let map = this._map.map;

        render(<MousePositionComponent map={map} store={store}/>, mousePositionDiv)
        return mousePositionDiv;
    }


    onAdd(map) {
        this._container = this._createControl();
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
}