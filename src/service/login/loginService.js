import httpService from '../httpService'
import loginAuthDataService from './loginAuthDataService'
import isEmpty from 'lodash/isEmpty'
import store from '../../components/store'
import {setUserLogged, clearUserLogged} from '../../components/common/auth/_duck/actions'
import dialogService from '../dialog/dialogService'
import configService from '../config/configService'
import {DialogButtonTypes} from '../../components/common/dialog/classes/DialogButton'

/**Login service */
export class LoginService {
    /**Inject dependencies in constructor, it is better for testing */
    constructor(store){
        this._store = store
    }

    _loginError(message) { 
        dialogService.error("", message);
    }

    login(user, password){
        let promise = httpService.post('/auth', { 'username': user, 'password': password })
        promise.then(response => {
                if (response.token) {
                    if (isEmpty(response.listaDeOpcoesDoUsuario)){
                        this._loginError("login.Your user profile is not created yet")
                    } else {
                        loginAuthDataService.setAuthData({ 'username': user, token: response.token  })
                        configService.setGeneralParameters(response.listaDeParametrosGerais);
                        configService.setUserUnits(response.listaDeUnidadesDoUsuario);
                        configService.setUserProfile(response.listaDeOpcoesDoUsuario);
    
                        //Change store state to logued for making the redirect                    
                        this._store.dispatch(setUserLogged(response.token, user)) //makes the redirect
                    }
                } else {
                    this._loginError("login.Your credentials are invalid")
                }
            }, response => {
                this._loginError("login.Your credentials are invalid")
            });
        return promise
    }

    logout(force = false) {
        const exit = ()=>{
            //TODO: clear data storage -> configService.clearConfigurations();
            //Change store state to not logued for making the redirect
            loginAuthDataService.clearAuthData();
            this._store.dispatch(clearUserLogged())            
        };
        if (force)
        {
            exit();
            return new Promise(resolve=>resolve(true));
        }

        return dialogService.confirmYesNo('login.confirm_logout_title', 'login.confirm_logout_body').then(btnResult=>{
            if (btnResult === DialogButtonTypes.YES){                
                return httpService.post('/auth/logout', {}).then(()=>{
                    exit();
                })
            }
        })
    }
}

export default new LoginService(store)