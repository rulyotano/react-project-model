import {SET_USER_OPTIONS, SET_USER_UNITS, SET_GENERAL_PARAMETERS, CLEAR_USER_CONFIG_TYPE} from '../actions/configActions.types'

export const defaultUserConfigState = {
    userOptionsList: [],
    userUnitsList: [],
    generalParameterList: []
} 

export default (state = defaultUserConfigState, action) => {
    switch (action.type) {
        case SET_USER_OPTIONS:
            if (!action.payload)
                return state      
            return {...state, userOptionsList: action.payload}
        case SET_USER_UNITS:
            if (!action.payload)
                return state      
            return {...state, userUnitsList: action.payload}
        case SET_GENERAL_PARAMETERS:
            if (!action.payload)
                return state      
            return {...state, generalParameterList: action.payload}
        case CLEAR_USER_CONFIG_TYPE:
            return defaultUserConfigState
        default:
            return state;
    }
};