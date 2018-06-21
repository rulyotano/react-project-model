import { CHANGE_NUMBER_OF_MAPS, ADD_MAP } from './types'
import { getMaps } from './selectors'
import syncMove  from '../../../../../_external/mapbox-gl-sync-move'
import { map as lMap }  from 'lodash'

export const changeNumberOfMaps = (numberOfMaps)=>({
    type: CHANGE_NUMBER_OF_MAPS,
    numberOfMaps
})

let syncOff = null;
export const addMap = (map, index) => (dispatch, getState) => {
    dispatch({type: ADD_MAP, map, index});
    const maps = lMap(getMaps(getState()), (it, i) => i === index ? map.map : it.map);
    if (syncOff)
        syncOff();
    syncOff = syncMove(maps)
}