import localStorageService from '../localStorageService';

export const LOGIN_DATA_STORAGE_KEY = "login_data_storage_key";
let _authData = null;   // has the structure { 'username': , token:  }

export default {
  getAuthData(){
    if (!_authData)
      _authData = localStorageService.load(LOGIN_DATA_STORAGE_KEY);
    return _authData;
  },
  setAuthData(authData){
    if (authData){
      _authData = authData;
      localStorageService.save(LOGIN_DATA_STORAGE_KEY, authData);
    }
  },
  setAuthToken(token){
    if (!_authData)
      _authData = localStorageService.load(LOGIN_DATA_STORAGE_KEY);
    if (!_authData)
      return;
    _authData.token = token;
    localStorageService.save(LOGIN_DATA_STORAGE_KEY, _authData);
  },
  clearAuthData(){
    _authData = null;
    localStorageService.remove(LOGIN_DATA_STORAGE_KEY);
  }
};