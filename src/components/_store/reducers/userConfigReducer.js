export const defaultUserConfigState = {
    userOptionsList: [],
    userUnitsList: [],
    generalParameterList: []
} 

export default (state = defaultUserConfigState, action) => {
    switch (action.type) {
        case 'SET_USER_CONFIG':
            if (!action.payload)
                return state      
            return {...action.payload}
        case 'CLEAR_USER_CONFIG':
            return defaultUserConfigState
        default:
            return state;
    }
};