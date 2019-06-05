import httpService from "../httpService";
import loginAuthDataService from "./loginAuthDataService";
import store from "../../components/store";
import {
  setUserLogged,
  clearUserLogged
} from "../../components/common/auth/_duck/actions";
import dialogService from "../dialog/dialogService";
import { DialogButtonTypes } from "../../components/common/dialog/classes/DialogButton";

/** Login service */
export class LoginService {
  /** Inject dependencies in constructor, it is better for testing */
  constructor(store) {
    this.store = store;
  }

  loginError(message = "login.Your credentials are invalid") {
    dialogService.error("", message);
  }

  login(user, password) {
    const promise = httpService.post("/auth", {
      username: user,
      password
    });
    promise.then(
      response => {
        if (response.token) {
          loginAuthDataService.setAuthData({
            username: user,
            token: response.token
          });

          this.store.dispatch(setUserLogged(response.token, user));
        } else {
          this.loginError();
        }
      },
      response => {
        this.loginError();
      }
    );
    return promise;
  }

  exit() {
    loginAuthDataService.clearAuthData();
    this.store.dispatch(clearUserLogged());
  }

  logout(force = false) {
    if (force) {
      this.exit();
      return new Promise(resolve => resolve(true));
    }

    return dialogService
      .confirmYesNo("login.confirm_logout_title", "login.confirm_logout_body")
      .then(btnResult => {
        if (isButtonYes(btnResult)) {
          return httpService.post("/auth/logout", {}).then(() => {
            this.exit();
          });
        }
        return Promise.reject();
      });
  }
}

const isButtonYes = btnResult => btnResult === DialogButtonTypes.YES;

export default new LoginService(store);
