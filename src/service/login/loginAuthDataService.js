import localStorageService from '../localStorageService'

var LOGIN_DATA_STORAGE_KEY = "login_data_storage_key";
var _authData = null;   //has the structure { 'username': , token:  }

export default {
    getAuthData: function(){
        if (!_authData)
            _authData = localStorageService.load(LOGIN_DATA_STORAGE_KEY);
        return _authData;
    },
    setAuthData: function(authData){
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
    clearAuthData: function(){
        _authData = null;
        localStorageService.remove(LOGIN_DATA_STORAGE_KEY);
    }
};