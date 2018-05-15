import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Provider } from 'react-redux'
import I18n from "redux-i18n"

import '../styles/css/font-solinftec.css';
import '../styles/css/font-awesome.css';

import Loadable from 'react-loadable';
import LoadingComponent from './common/_LoadingComponent';
import store from './store';
import config from '../config/config';
import PrivateRoute from './PrivateRoute'
import loginAuthDataService from '../service/login/loginAuthDataService'
import { setUserLogged } from './_store/actions/authActions'
import DialogComponent from './common/dialog/DialogComponent'
import BottomNotificationComponent from './common/dialog/BottomNotificationComponent'
import translations from '../i18n'
import defaultTheme from './defaultTheme'

const AppAsync = Loadable({
    loader: () => import('./app/App'),
    loading: LoadingComponent,
});

const LoginAsync = Loadable({
    loader: () => import('./login/Login'),
    loading: LoadingComponent,
});

const themeV1 = createMuiTheme(defaultTheme);

class AppRouter extends Component {
    componentWillMount(){
        let authData = loginAuthDataService.getAuthData();
        if (authData){
            store.dispatch(setUserLogged(authData.token, authData.username))
        }
    }

    render(){
        return (<Provider store={store}>
            <I18n translations={translations} initialLang={config.DEFAULT_LANGUAGE} fallbackLang="en-US">                
                <MuiThemeProvider theme={themeV1}>
                    <Router>
                        <div>
                            {/* Common all app things here        */}

                            <Switch>
                                <Route exact path="/login" component={LoginAsync}/>
                                <PrivateRoute path="/" component={AppAsync}/>
                            </Switch>
                            <DialogComponent/>
                            <BottomNotificationComponent/>
                        </div>
                    </Router>
                </MuiThemeProvider>                
            </I18n>
        </Provider>)
    }
}

export default AppRouter