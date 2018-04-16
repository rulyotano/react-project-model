import {combineReducers} from 'redux'
import auth from './reducers/authReducer'
import userConfig from './reducers/userConfigReducer'
import user from './reducers/userReducer'
import dialog from '../common/dialog/_store/index'
import {i18nState} from "redux-i18n"
import app from '../app/_store/reducers/appReducer'

export default combineReducers({
    auth,
    userConfig,
    user,
    dialog,
    i18nState,
    app
})