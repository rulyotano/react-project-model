import {combineReducers} from 'redux'
import auth from './reducers/authReducer'
import config from './reducers/configReducer'
import user from './reducers/userReducer'
import dialog from '../common/dialog/_store/index'
import {i18nState} from "redux-i18n"
import app from '../app/_store/reducers/appReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    auth,
    config,
    user,
    dialog,
    i18nState,
    app,
    form: formReducer
})