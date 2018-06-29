// import { createSelector } from "reselect";

export const getNumberOfMaps = (state)=>state.app.layersComparison.layersComparison.numberOfMaps
export const getMaps = (state)=>state.app.layersComparison.layersComparison.maps
export const getLoadingData = (state)=>state.app.layersComparison.layersComparison.loading
export const getData = (state)=>state.app.layersComparison.layersComparison.data
export const createSelectedVariableSelector =
    (index) => (state)=> {
        const mVars = state.app.layersComparison.layersComparison.mapVariables[index];
        return mVars && mVars.selected;
    };
export const createSelectedVariableRangeSelector =
    (index) => (state)=> {
        const mVars = state.app.layersComparison.layersComparison.mapVariables[index];
        return mVars && mVars.selectedRange;
    };
export const createVariablesSelector =
    (index) => (state)=> {
        const mVars = state.app.layersComparison.layersComparison.mapVariables[index];
        return mVars && mVars.variables;
    };

//export const createSomeReselectSelector = () =>
//     createSelector([
//         getA, getB
//     ], 
//     (a, b) => a^b
// )