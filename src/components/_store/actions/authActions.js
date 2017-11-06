/**@param token {string}
 * @param username {string}
 */
export const setUserLogged = (token, username)=>({
    type: 'SET_USER_LOGGED',
    payload: {
        token,
        username
    }
})

export const clearUserLogged = ()=>({
    type: 'CLEAR_USER_LOGGED'
})