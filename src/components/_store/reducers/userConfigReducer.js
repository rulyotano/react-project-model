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
            return {
                userOptionsList: action.payload.userOptionsList,
                userUnitsList: action.payload.userUnitsList,
                generalParameterList: action.payload.generalParameterList
            }
        case 'CLEAR_USER_CONFIG':
            return defaultUserConfigState
        default:
            return state;
    }
};