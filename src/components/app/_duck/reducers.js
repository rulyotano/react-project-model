import {SET_SIZE_TO_MAX, SET_SIZE_TO_MIN} from "./types";
import {combineReducers} from 'redux'
import closeField from '../close-field/_duck/reducers';

export const defaultSegmentState = { maximized: false };

const appReducer = (state = defaultSegmentState, action)=>{
    switch (action.type){
        case SET_SIZE_TO_MAX:
            return {
                maximized: true
            };
        case SET_SIZE_TO_MIN:
            return {
                maximized: false
            };
        default:
            return state
    }
}

export default combineReducers({
    _: appReducer,
    closeField
});