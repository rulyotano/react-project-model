import {SET_USER_OPTIONS, SET_USER_UNITS, SET_GENERAL_PARAMETERS, CLEAR_USER_CONFIG_TYPE,
  CONFIG_USER_CHANGED_LANGUAGE} from './types'
import * as configConstants from '../../../../service/config/configService.constants'

export const defaultUserConfigState = {
  userOptionsList: {},
  userUnitsList: [],
  generalParameterList: []
} 

export default (state = defaultUserConfigState, action) => {
  switch (action.type) {
      case SET_USER_OPTIONS:
          if (!action.payload)
              return state      
          return {...state, userOptionsList: action.payload}
      case SET_USER_UNITS:
          if (!action.payload)
              return state      
          return {...state, userUnitsList: action.payload}
      case SET_GENERAL_PARAMETERS:
          if (!action.payload)
              return state      
          return {...state, generalParameterList: action.payload}
      case CLEAR_USER_CONFIG_TYPE:
          return defaultUserConfigState

      case CONFIG_USER_CHANGED_LANGUAGE:
          if (!action.payload)
              return state
          return {
              ...state,
              userOptionsList: {
                  ...state.userOptionsList,
                  [configConstants.SGPA3_LNK_IDIOMA]:{
                      ...state.userOptionsList[configConstants.SGPA3_LNK_IDIOMA],
                      configuracoes: {
                          ...state.userOptionsList[configConstants.SGPA3_LNK_IDIOMA].configuracoes,
                          [configConstants.SGPA3_IDIOMA_PADRAO]: action.payload
                      }
                  }                 
              }
          }
      default:
          return state;
  }
};