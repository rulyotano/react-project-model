import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import I18n from "redux-i18n";
import LoadingComponent from "./common/_LoadingComponent";
import store, { history } from "./store";
import config from "../config/config";
import PrivateRoute from "./PrivateRoute";
import loginAuthDataService from "../service/login/loginAuthDataService";
import { setUserLogged } from "./common/auth/_duck/actions";
import DialogComponent from "./common/dialog/DialogComponent";
import BottomNotificationComponent from "./common/dialog/BottomNotificationComponent";
import translations from "../i18n";
import defaultTheme from "./themes/defaultTheme";
import loginUrl from "./login/routeNames";
import { urlJoin } from "../service/helperService";
import "../styles/css/font-awesome.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import '../styles/css/app.css';

const AppAsync = Loadable({
  loader: () => import("./app"),
  loading: LoadingComponent
});

const LoginAsync = Loadable({
  loader: () => import("./login/LoginDark"),
  loading: LoadingComponent
});

const themeV1 = createMuiTheme(defaultTheme);

class AppRouter extends Component {
  componentWillMount() {
    const authData = loginAuthDataService.getAuthData();
    if (authData) {
      store.dispatch(setUserLogged(authData.token, authData.username));
    }
  }

  render() {
    const base = "/";
    const login = urlJoin(base, loginUrl);
    return (
      <Provider store={store}>
        <I18n
          translations={translations}
          initialLang={config.DEFAULT_LANGUAGE}
          fallbackLang="en-us"
        >
          <MuiThemeProvider theme={themeV1}>
            <ConnectedRouter history={history}>
              <div>
                {/* Common all app things here        */}

                <Switch>
                  <Route exact path={login} component={LoginAsync} />
                  <PrivateRoute path={base} component={AppAsync} />
                </Switch>
                <DialogComponent />
                <BottomNotificationComponent />
              </div>
            </ConnectedRouter>
          </MuiThemeProvider>
        </I18n>
      </Provider>
    );
  }
}

export default AppRouter;
