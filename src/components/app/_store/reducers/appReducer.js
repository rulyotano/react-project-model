import {REDIRECT_TO_HOME, SET_SIZE_TO_MAX, SET_SIZE_TO_MIN} from "../actions/appActions.types";

export const defaultSegmentState = { maximized: false, toHome:false };

export default (state = defaultSegmentState, action)=>{
    switch (action.type){
        case SET_SIZE_TO_MAX:
            return {
                maximized: true,
                toHome:false
            };
        case SET_SIZE_TO_MIN:
            return {
                maximized: false,
                toHome:false
            };
        case REDIRECT_TO_HOME:
            return {
                toHome:true,
                maximized:false
            };
        default:
            return state
    }
}