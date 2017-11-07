import {SET_USER_CONFIG_TYPE,CLEAR_USER_CONFIG_TYPE} from './userConfigActions.types'

export const setUserConfig = (userOptionsList, userUnitsList, generalParameterList) => ({
  type: SET_USER_CONFIG_TYPE,
  payload: {userOptionsList, userUnitsList, generalParameterList}
})

export const clearUserConfig = () => ({
  type: CLEAR_USER_CONFIG_TYPE
})

