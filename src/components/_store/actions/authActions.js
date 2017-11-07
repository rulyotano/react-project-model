import {SET_USER_LOGGED_TYPE, CLEAR_USER_LOGGED_TYPE} from './authActions.types'

/**@param token {string}
 * @param username {string}
 */
export const setUserLogged = (token, username)=>({
    type: SET_USER_LOGGED_TYPE,
    payload: {
        token,
        username
    }
})

export const clearUserLogged = ()=>({
    type: CLEAR_USER_LOGGED_TYPE
})