// import { createSelector } from "reselect";

export const getNumberOfMaps = (state)=>state.app.layersComparison.layersComparison.numberOfMaps
export const getMaps = (state)=>state.app.layersComparison.layersComparison.maps

//export const createSomeReselectSelector = () =>
//     createSelector([
//         getA, getB
//     ], 
//     (a, b) => a^b
// )