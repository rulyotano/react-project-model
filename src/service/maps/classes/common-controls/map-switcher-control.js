import React from 'react';
import {render} from 'react-dom';
import {Button} from 'material-ui-next';
import Map from '../Map';
import translations from '../../../../i18n';
import store from '../../../../components/store';
import {getTranslateFunction} from 'redux-i18n';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ButtonsView extends React.PureComponent{
    state = {
        selectedMapType: this.props.selectedMapType
    }
    render(){
        const { allMapTypes, selectMapType, lang } = this.props;
        const {selectedMapType} = this.state;
        const t = getTranslateFunction(translations, lang);
        return <div>
            {allMapTypes.map((mapType, i)=>                
                (<Button key={i} 
                    variant={mapType.key !== selectedMapType ? "raised" : "flat"}
                    onClick={(e)=>{
                        if (mapType.key === selectedMapType)
                            return;
                        this.setState({selectedMapType: mapType.key})
                        selectMapType(mapType.key);
                        e.nativeEvent.stopPropagation();
                    }}>
                    {t(mapType.langKey)}
                </Button>))}
            </div>
    }
}

ButtonsView = connect(state=>({
    lang: state.i18nState.lang     
}))(ButtonsView)

export default class MapSwitcherControl {
    constructor(map) {
        this._map = map;        
    }

    _createControl() {
        let containerMapBoxDiv = document.createElement('div');
        containerMapBoxDiv.classList.add('mapboxgl-ctrl',
            'mapboxgl-ctrl-group',
            'map-control-container');
        
        render(<ButtonsView store={store} 
                    allMapTypes={Map.allMapTypes} 
                    selectedMapType={this._map.selectedMapType.key}
                    selectMapType={it=>this._map.setMapType(it)}/>
                    ,containerMapBoxDiv)

        return containerMapBoxDiv;
    }


    onAdd(map) {
        this._container = this._createControl();
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
    }
}