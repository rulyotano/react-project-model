import {SET_USER_CONFIG_TYPE, CLEAR_USER_CONFIG_TYPE} from '../actions/userConfigActions.types'

export const defaultUserConfigState = {
    userOptionsList: [],
    userUnitsList: [],
    generalParameterList: []
} 

export default (state = defaultUserConfigState, action) => {
    switch (action.type) {
        case SET_USER_CONFIG_TYPE:
            if (!action.payload)
                return state      
            return {...action.payload}
        case CLEAR_USER_CONFIG_TYPE:
            return defaultUserConfigState
        default:
            return state;
    }
};