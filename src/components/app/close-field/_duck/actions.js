import {CLEAR, SET_LOADED_FILTERS} from './types';

export const clear = ()=>({type: CLEAR});
export const setLoadedFilters = (filters)=>({type: SET_LOADED_FILTERS, filters});