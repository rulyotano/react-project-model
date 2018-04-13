import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import I18n from "redux-i18n"

import '../styles/css/font-solinftec.css';
import '../styles/css/font-awesome.css';

import Loadable from 'react-loadable';
import LoadingComponent from './_LoadingComponent';
import store from './store';
import PrivateRoute from './PrivateRoute'
import loginAuthDataService from '../service/login/loginAuthDataService'
import { setUserLogged } from './_store/actions/authActions'
import DialogComponent from './dialog/DialogComponent'
import BottomNotificationComponent from './dialog/BottomNotificationComponent'

const AppAsync = Loadable({
    loader: () => import('./app/App'),
    loading: LoadingComponent,
});

const LoginAsync = Loadable({
    loader: () => import('./login/Login'),
    loading: LoadingComponent,
});

class AppRouter extends Component {
    componentWillMount(){
        let authData = loginAuthDataService.getAuthData();
        if (authData){
            store.dispatch(setUserLogged(authData.token, authData.username))
        }
    }

    render(){
        return (<Provider store={store}>
            <MuiThemeProvider>
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
        </Provider>)
    }
}

export default AppRouter