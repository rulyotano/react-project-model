export const setUserLogged = (token, username)=>({
    type: 'SET_USER_LOGGED',
    token,
    username
})

export const clearUserLogged = ()=>({
    type: 'CLEAR_USER_LOGGED'
})