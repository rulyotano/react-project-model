// import { createSelector } from "reselect";

export const getProcess = (state)=>state.app.closeField._.process

export const getCultures = (state)=>state.app.closeField._.cultures

export const getLoadedFilters = (state)=>state.app.closeField._.loadedFilters

export const getLoadedProcess = (state)=>state.app.closeField._.loadedFilters.process

//export const createSomeReselectSelector = () =>
//     createSelector([
//         getA, getB
//     ], 
//     (a, b) => a^b
// )