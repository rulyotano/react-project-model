import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'

import '../styles/css/font-solinftec.css';
import '../styles/css/font-awesome.css';

import Loadable from 'react-loadable';
import LoadingComponent from './_LoadingComponent';
import configureStore from './configureStore'

const AppAsync = Loadable({
    loader: () => import('./app/App'),
    loading: LoadingComponent,
});

const LoginAsync = Loadable({
    loader: () => import('./login/Login'),
    loading: LoadingComponent,
});

const store = configureStore()

const AppRouter = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Router>
                <div>
                    {/* Common all app things here        */}

                    <Switch>
                        <Route exact path="/login" component={LoginAsync}/>
                        <Route path="/" component={AppAsync}/>
                    </Switch>
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
)
export default AppRouter