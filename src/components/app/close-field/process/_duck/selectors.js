import { createSelector } from "reselect";

export const getData = (state)=>state.app.closeField.process.data;

export const createGetIsLoaded = () =>
  createSelector([
    getData
  ], 
  (data) => data.length > 0
  );