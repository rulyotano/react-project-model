export const setUser = ({ id, username, name, state, userGroup })=>({
    type: 'SET_USER',
    payload: { id, username, name, state, userGroup }
})

export const clearUser = ()=>({
    type: 'CLEAR_USER'
})