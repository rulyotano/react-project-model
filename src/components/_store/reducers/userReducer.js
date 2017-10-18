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
            return {
                id: action.id,
                username: action.username,
                name: action.name,
                state: action.state,
                userGroup: action.userGroup
            }   
        case 'CLEAR_USER': {
            return userInitialState
        }
        default:
            return state;
    }
};