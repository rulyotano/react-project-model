import {SET_USER_OPTIONS, 
  SET_USER_UNITS, 
  SET_GENERAL_PARAMETERS,
  CLEAR_USER_CONFIG_TYPE} from './configActions.types'

export const setUserOptions = (userOptionsList) => ({
  type: SET_USER_OPTIONS,
  payload: userOptionsList
})
export const setUserUnits = (userUnitsList) => ({
  type: SET_USER_UNITS,
  payload: userUnitsList
})
export const setGeneralParameters = (generalParameterList) => ({
  type: SET_GENERAL_PARAMETERS,
  payload: generalParameterList
})

export const clearUserConfig = () => ({
  type: CLEAR_USER_CONFIG_TYPE
})

