// import { createSelector } from "reselect";

export const getLoading = (state)=>state.app.closeField.load.loading

export const getShow = (state)=>state.app.closeField.load.show

//export const createSomeReselectSelector = () =>
//     createSelector([
//         getA, getB
//     ], 
//     (a, b) => a^b
// )