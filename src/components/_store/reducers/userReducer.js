export const userInitialState = {
    id: null,
    username: "",
    name: "",
    state: "",
    userGroup: null
}

export default (state = userInitialState, action) => {
    switch (action.type) {
        case 'SET_USER' :
            if (!action.payload)
                return state      
            return {...action.payload}   
        case 'CLEAR_USER': {
            return userInitialState
        }
        default:
            return state;
    }
};