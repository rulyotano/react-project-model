// import { createSelector } from "reselect";

export const getSelected = (state)=> state.map.selected;

export const getSelectedProperties = (state)=> state.map.selected && state.map.selected.properties;

export const getMappedGeoJson = (state)=> state.map.mapMappedGeoJson;

export const getMapGeoJson = (state)=> state.map.mapGeoJson;

// export const createSomeReselectSelector = () =>
//     createSelector([
//         getA, getB
//     ], 
//     (a, b) => a^b
// )