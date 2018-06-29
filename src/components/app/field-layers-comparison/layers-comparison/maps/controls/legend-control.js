import React from "react";
import {render} from 'react-dom';
import store from "../../../../../store";
import LegendInMaps from "../LegendInMaps";

export default class LegendControl {
    constructor(map, mapIndex) {
        this._map = map;
        this._mapIndex = mapIndex;
    }

    _createControl() {
        let containerMapBoxDiv = document.createElement('div');
        containerMapBoxDiv.classList.add('mapboxgl-ctrl',
            'mapboxgl-ctrl-group',
            'map-control-container');
        
        render(<LegendInMaps store={store}
                    mapIndex={this._mapIndex}/>, containerMapBoxDiv)

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