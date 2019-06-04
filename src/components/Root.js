import React, {Component} from 'react';
import {
  // BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import { ConnectedRouter } from "react-router-redux";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Provider } from 'react-redux';

import '../styles/css/font-solinftec.css';
import '../styles/css/font-awesome.css'; 
import 'react-perfect-scrollbar/dist/css/styles.css';

import Loadable from 'react-loadable';
import I18n from "redux-i18n";
import LoadingComponent from './common/_LoadingComponent';
import store, {history} from './store';
import config from '../config/config';
import PrivateRoute from './PrivateRoute';
import loginAuthDataService from '../service/login/loginAuthDataService';
import { setUserLogged } from './common/auth/_duck/actions';
import DialogComponent from './common/dialog/DialogComponent';
import BottomNotificationComponent from './common/dialog/BottomNotificationComponent';
import translations from '../i18n';
import defaultTheme from './defaultTheme';
import loginUrl from "./login/routeNames";
import {urlJoin} from "../service/helperService";

const AppAsync = Loadable({   
  loader: () => import('./app'),
  loading: LoadingComponent,
});

const LoginAsync = Loadable({
  loader: () => import('./login/Login'),
  loading: LoadingComponent,
});

const themeV1 = createMuiTheme(defaultTheme);

class AppRouter extends Component {
  componentWillMount(){
    const authData = loginAuthDataService.getAuthData();
    if (authData){
      store.dispatch(setUserLogged(authData.token, authData.username));
    }
  }

  render(){
    const base = "/";
    const login = urlJoin(base, loginUrl);
    return (<Provider store={store}>
      <I18n translations={translations} initialLang={config.DEFAULT_LANGUAGE} fallbackLang="en-us">                
        <MuiThemeProvider theme={themeV1}>
          <ConnectedRouter history={history}>
            <div>
              {/* Common all app things here        */}

              <Switch>
                <Route exact path={login} component={LoginAsync}/>
                <PrivateRoute path={base} component={AppAsync}/>
              </Switch>
              <DialogComponent/>
              <BottomNotificationComponent/>
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>                
      </I18n>
    </Provider>);
  }
}

export default AppRouter;