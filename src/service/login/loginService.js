import httpService from '../httpService'
import languageService from '../languageService'
import loginAuthDataService from './loginAuthDataService'
import _ from 'lodash'

const loginError = e => { 
    // dialogsService.error(languageService.getWord("Login Error"), languageService.getWord(e));
}

const login = (user, password) => {
    let promise = httpService.post('/auth', { 'username': user, 'password': password })
    promise.then(response => {
            if (response.token) {
                if (_.isEmpty(response.listaDeOpcoesDoUsuario)){
                    loginError(languageService.getWord("login:Your user profile is not created yet."))
                } else {
                    loginAuthDataService.setAuthData({ 'username': user, token: response.token  })
                    // configService.setGeneralParameters(response.listaDeParametrosGerais);
                    // configService.setUserUnits(response.listaDeUnidadesDoUsuario);
                    // userConfigService.setUserProfile(response.listaDeOpcoesDoUsuario);

                    //TODO: Change store state to logued for making the redirect
                    // location.href = '/';
                }
            } else {
                loginError(languageService.getWord("Your credentials are invalid."))
            }
        }, response => {
            if (response.data)
                loginError(response.data.message)
        });
    return promise
};

const logout = () => {
    let promise = httpService.post('/auth/logout', {})
    promise.finally(function() {
        loginAuthDataService.clearAuthData();
        //TODO: clear data storage -> configService.clearConfigurations();
        //TODO: Change store state to not logued for making the redirect
    });
    return promise
};

export default {
    login,
    logout
};