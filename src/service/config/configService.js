import store from '../../components/store';
import * as configActions from '../../components/common/config/_duck/actions';
import localStorageService from '../localStorageService';
import {isEmpty, get} from 'lodash';
import {setLanguage} from "redux-i18n"
import httpService from '../../service/httpService'
import * as constants from './configService.constants'

export const USER_PROFILE_STORAGE_KEY = "user_profile_storage_key";
export const USER_UNITS_STORAGE_KEY = "user_units_storage_key";
export const GENERAL_PARAMETERS_STORAGE_KEY = "general_parameters_storage_key";

const updateLanguage = (store)=>{
    //after load the user profile, check if language is different and in case update it
    const state = store.getState();
    const configuredLanguage = getUserLocale(state);
    if (configuredLanguage !== state.i18nState.lang){
        store.dispatch(setLanguage(configuredLanguage));
    }
};

const getUserConfig = (state, keyOption, keyConfig)=>{
    return get(state, `config.userOptionsList[${keyOption}].configuracoes[${keyConfig}]`);
}
const getUserValue = (state, keyOption, keyConfig)=>{
    const config = getUserConfig(state, keyOption, keyConfig);
    if (config)
        return config.vlConfiguracao;
}
const getUserLocaleConfig = (state)=>getUserConfig(state, constants.SGPA3_LNK_IDIOMA, constants.SGPA3_IDIOMA_PADRAO)
const getUserLocale = (state)=>getUserValue(state, constants.SGPA3_LNK_IDIOMA, constants.SGPA3_IDIOMA_PADRAO)

let _updatingUserConfig = false;

export default {
    loadGeneralParameters: ()=>{
        if (isEmpty(store.getState().config.generalParameterList))
            store.dispatch(configActions.setGeneralParameters(localStorageService.load(GENERAL_PARAMETERS_STORAGE_KEY)));
    },
    setGeneralParameters: (value)=>{
        if (value){
            localStorageService.save(GENERAL_PARAMETERS_STORAGE_KEY, value);
            store.dispatch(configActions.setGeneralParameters(localStorageService.load(GENERAL_PARAMETERS_STORAGE_KEY)));
        }
    },
    loadUserUnits: ()=>{        
        if (isEmpty(store.getState().config.userUnitsList))
            store.dispatch(configActions.setUserUnits(localStorageService.load(USER_UNITS_STORAGE_KEY)));
    },
    setUserUnits: (value)=>{
        if (value){
            localStorageService.save(USER_UNITS_STORAGE_KEY, value);
            store.dispatch(configActions.setUserUnits(localStorageService.load(USER_UNITS_STORAGE_KEY)));
        }
    },
    loadUserProfile: ()=>{
        if (isEmpty(store.getState().config.userOptionsList)){
            store.dispatch(configActions.setUserOptions(localStorageService.load(USER_PROFILE_STORAGE_KEY)));
            updateLanguage(store);
        }
    },
    setUserProfile: (value)=>{
        if (value) {
            localStorageService.save(USER_PROFILE_STORAGE_KEY, value);
            store.dispatch(configActions.setUserOptions(localStorageService.load(USER_PROFILE_STORAGE_KEY)));
            updateLanguage(store);
        }
    },

    saveUserProfileInLocalStorage(){
        const userProfile = store.getState().config.userOptionsList;
        localStorageService.save(USER_PROFILE_STORAGE_KEY, userProfile);
    },

    /**Update all the configuration passed in params
     * @param {List<configuracao>} configurationList - All configuration to be updated, ex.:
     * [{
     *   "cdIdPerfilConfigUsuario": "226",
     *   "descConfiguracao": "UNIDADE_PADRAO",
     *   "vlConfiguracao": "1050"
     * }]*/
    updateUserConfig: (configurationList)=>{
        if (_updatingUserConfig)
            return;
        _updatingUserConfig = true;
        const onUpdateEnd = _updatingUserConfig = false;
        return httpService.put("/perfil/atualiza-configuracao", configurationList).then(onUpdateEnd, onUpdateEnd);
    },

    getUserValue,
    getUserConfig,
    getUserLocale,
    getUserLocaleConfig,
}