import React from "react";
import {render} from 'react-dom';
import {getTranslateFunction} from 'redux-i18n';
import store from "../../../../../store";
import LegendInMaps from "../LegendInMaps";
import translations from '../../../../../../i18n';
import {getLang} from '../../../../../common/lang/_duck/selectors';

export default class LegendControl {
  constructor(map, mapIndex) {
    this._map = map;
    this._mapIndex = mapIndex;
  }

  _createControl() {
    const containerMapBoxDiv = document.createElement('div');
    containerMapBoxDiv.classList.add('mapboxgl-ctrl',
      'mapboxgl-ctrl-group',
      'map-control-container');
            
    const lang = getLang(store.getState());
    const t = getTranslateFunction(translations, lang);
        
    render(<LegendInMaps store={store} t={t}
      mapIndex={this._mapIndex}/>, containerMapBoxDiv);

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