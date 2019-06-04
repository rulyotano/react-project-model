import { createSelector } from "reselect";

export const getData = (state)=>state.app.closeField.map.data;

export const getVariables = (state)=>state.app.closeField.map.variables;

export const getSelectedVariable = (state)=>state.app.closeField.map.selected.variable;

export const getSelectedVariableRange = (state)=>state.app.closeField.map.selected.variableRange;

export const getMapData = (state)=>state.app.closeField.map.mapData;

export const createGetMapIsLoaded = () =>
  createSelector([
    getData
  ], 
  (data) => data.length > 0
  );