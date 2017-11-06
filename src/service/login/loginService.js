import httpService from '../httpService'
import languageService from '../languageService'
import loginAuthDataService from './loginAuthDataService'
import isEmpty from 'lodash/isEmpty'
import store from '../../components/store'
import {setUserLogged, clearUserLogged} from '../../components/_store/actions/authActions'

const loginError = e => { 
    // dialogsService.error(languageService.getWord("Login Error"), languageService.getWord(e));
}

const login = (user, password) => {
    let promise = httpService.post('/auth', { 'username': user, 'password': password })
    promise.then(response => {
            if (response.token) {
                if (isEmpty(response.listaDeOpcoesDoUsuario)){
                    loginError(languageService.getWord("login:Your user profile is not created yet."))
                } else {
                    loginAuthDataService.setAuthData({ 'username': user, token: response.token  })
                    // configService.setGeneralParameters(response.listaDeParametrosGerais);
                    // configService.setUserUnits(response.listaDeUnidadesDoUsuario);
                    // userConfigService.setUserProfile(response.listaDeOpcoesDoUsuario);

                    //Change store state to logued for making the redirect                    
                    store.dispatch(setUserLogged(response.token, user)) //makes the redirect
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
    return httpService.post('/auth/logout', {}).then(()=>{
        loginAuthDataService.clearAuthData();
        //TODO: clear data storage -> configService.clearConfigurations();
        //Change store state to not logued for making the redirect
        store.dispatch(clearUserLogged())
    })
};

export default {
    login,
    logout
};