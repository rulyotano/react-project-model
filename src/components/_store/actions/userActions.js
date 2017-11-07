import {SET_USER_TYPE, CLEAR_USER_TYPE} from './userActions.types'

export const setUser = ({ id, username, name, state, userGroup })=>({
    type: SET_USER_TYPE,
    payload: { id, username, name, state, userGroup }
})

export const clearUser = ()=>({
    type: CLEAR_USER_TYPE
})