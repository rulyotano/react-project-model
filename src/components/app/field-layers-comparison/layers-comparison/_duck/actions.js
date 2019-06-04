import { map as lMap }  from 'lodash';
import { CHANGE_NUMBER_OF_MAPS, ADD_MAP,
  START_LOADING_DATA, DATA_LOADED, ERROR_LOADING_DATA, 
  SET_VARIABLE, SET_VARIABLE_RANGE, CLEAR, SET_OPACITY, 
  CHANGE_MAP_TYPE } from './types';
import { getMaps } from './selectors';
import syncMove  from '../../../../../_external/mapbox-gl-sync-move';
import httpService  from '../../../../../service/httpService';

export const changeNumberOfMaps = (numberOfMaps)=>({
  type: CHANGE_NUMBER_OF_MAPS,
  numberOfMaps
});

let syncOff = null;
export const addMap = (map, index) => (dispatch, getState) => {
  dispatch({type: ADD_MAP, map, index});
  const stateMaps = getMaps(getState()).filter(it=>!!it);
  const maps = lMap(stateMaps, (it, i) => i === index ? map.map : it.map);
  if (syncOff)
    syncOff();
  syncOff = syncMove(maps);
};

export const loadData = () => (dispatch) =>{
  dispatch({type: START_LOADING_DATA});
  httpService.useRawUrl().get("/faz1zona1talhao69_op4017_dt15a17-02.geojson")
    .then(response=>{
      dispatch({type: DATA_LOADED, data: response});
    }, error => {
      dispatch({type: ERROR_LOADING_DATA});
    });
};

export const setVariable = (variable, index)=>({type: SET_VARIABLE, variable, index});

export const setVariableRange = (range, index)=>({type: SET_VARIABLE_RANGE, range, index});

export const setOpacity = (opacity, index)=>({type: SET_OPACITY, opacity, index});

export const setMapType = (mapType)=>({type: CHANGE_MAP_TYPE, mapType});

export const clear = ()=>({type: CLEAR});