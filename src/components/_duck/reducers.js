import { i18nState } from "redux-i18n";
import { reducer as formReducer } from "redux-form";
import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "../common/auth/_duck/reducers";
import config from "../common/config/_duck/reducers";
import user from "../common/user/_duck/reducers";
import map from "../common/map/_duck/reducers";
import data from "../common/data/_duck/reducers";
import dialog from "../common/dialog/_store";
import app from "../app/_duck/reducers";

const createMainReducer = history =>
  combineReducers({
    auth,
    config,
    user,
    map,
    d: data,
    dialog,
    i18nState,
    form: formReducer,
    router: connectRouter(history),
    app
  });

export default createMainReducer;
