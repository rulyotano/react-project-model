import {combineReducers} from 'redux'
import auth from '../common/auth/_duck/reducers'
import config from '../common/config/_duck/reducers'
import user from '../common/user/_duck/reducers'
import map from '../common/map/_duck/reducers'
import data from '../common/data/_duck/reducers'
import dialog from '../common/dialog/_store'
import {i18nState} from "redux-i18n"
import { reducer as formReducer } from 'redux-form'
import reducerRegistry from "../../service/redux/reducerRegistry"

reducerRegistry.register("auth", auth);
reducerRegistry.register("config", config);
reducerRegistry.register("user", user);
reducerRegistry.register("map", map);
reducerRegistry.register("d", data);
reducerRegistry.register("dialog", dialog);
reducerRegistry.register("i18nState", i18nState);
reducerRegistry.register("form", formReducer);