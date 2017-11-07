import {SET_USER_LOGGED_TYPE, CLEAR_USER_LOGGED_TYPE} from '../actions/authActions.types'

export const defaultAuthState = { logged: false, user: null }

export default (state = defaultAuthState, action)=>{
    switch (action.type){
        case SET_USER_LOGGED_TYPE:
            if (!action.payload)
                return state            
            return {
                logged: true,
                user: {
                    token: action.payload.token,
                    username: action.payload.username,
                }
            }
        case CLEAR_USER_LOGGED_TYPE:
            return defaultAuthState
        default:
            return state
    }
}