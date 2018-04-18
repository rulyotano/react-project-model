import {SET_USER_OPTIONS, 
  SET_USER_UNITS, 
  SET_GENERAL_PARAMETERS,
  CLEAR_USER_CONFIG_TYPE, CONFIG_USER_CHANGED_LANGUAGE} from './configActions.types'
import { setLanguage } from 'redux-i18n'
import configService from '../../../service/config/configService'

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

export const changeLanguage = (lang) => (dispatch, getState)=>{
  dispatch(setLanguage(lang));  //save in store language
  const state = getState();
  if (!state.auth.logged)
    return;

  let langConfig = configService.getUserLocaleConfig(state);
  if (langConfig.vlConfiguracao === lang)
    return;

  langConfig = {...langConfig, vlConfiguracao: lang};  
  dispatch({ type: CONFIG_USER_CHANGED_LANGUAGE, payload: langConfig });  //save in store user config
  configService.saveUserProfileInLocalStorage();  //save in local storage
  configService.updateUserConfig([langConfig]);   //save to server
}

