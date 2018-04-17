import store from '../../components/store';
import * as configActions from '../../components/_store/actions/configActions';
import localStorageService from '../localStorageService';
import {isEmpty} from 'lodash';

export const USER_PROFILE_STORAGE_KEY = "user_profile_storage_key";
export const USER_UNITS_STORAGE_KEY = "user_units_storage_key";
export const GENERAL_PARAMETERS_STORAGE_KEY = "general_parameters_storage_key";



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
    loadUserUnits: function(){        
        if (isEmpty(store.getState().config.userUnitsList))
            store.dispatch(configActions.setUserUnits(localStorageService.load(USER_UNITS_STORAGE_KEY)));
    },
    setUserUnits: function(value){
        if (value){
            localStorageService.save(USER_UNITS_STORAGE_KEY, value);
            store.dispatch(configActions.setUserUnits(localStorageService.load(USER_UNITS_STORAGE_KEY)));
        }
    },
    loadUserProfile: function () {
        if (isEmpty(store.getState().config.userOptionsList))
            store.dispatch(configActions.setUserOptions(localStorageService.load(USER_PROFILE_STORAGE_KEY)));
    },
    setUserProfile: function (value) {
        if (value) {
            localStorageService.save(USER_PROFILE_STORAGE_KEY, value);
            store.dispatch(configActions.setUserOptions(localStorageService.load(USER_PROFILE_STORAGE_KEY)));
        }
    },

}