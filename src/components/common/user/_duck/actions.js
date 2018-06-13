import {SET_USER_TYPE, CLEAR_USER_TYPE} from './types'
import httpService from '../../../../service/httpService'
import {get} from 'lodash'

const USER_REQUEST_URL = (userLogin)=>`/user/byUsername/${userLogin}`;;

export const loadUser = () => (dispatch, getState) => {
    const userLogin = get(getState(), "auth.user.username")
    if (!userLogin)
        return
    return httpService.get(USER_REQUEST_URL(userLogin)).then(response=>{
        dispatch(setUser(response.id, response.cdUsuario, response.descNome, response.fgEstado, { id: response.cdGrupo, name: response.descGrupo}))
    })
};

export const setUser = (id, username, name, state, userGroup)=>({
    type: SET_USER_TYPE,
    payload: { id, username, name, state, userGroup }
})

export const clearUser = ()=>({
    type: CLEAR_USER_TYPE
})