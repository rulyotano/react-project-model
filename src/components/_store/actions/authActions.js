import {SET_USER_LOGGED_TYPE, CLEAR_USER_LOGGED_TYPE, 
    SET_REDIRECT, CLEAR_REDIRECT} from './authActions.types'

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

export const setRedirect = (redirect)=>({
    type: SET_REDIRECT,
    redirect
})

export const clearRedirect = ()=>({
    type: CLEAR_REDIRECT
})