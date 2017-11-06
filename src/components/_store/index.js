import {combineReducers} from 'redux'
import auth from './reducers/authReducer'
import userConfig from './reducers/userConfigReducer'
import user from './reducers/userReducer'
import dialog from '../dialog/_store/index'

export default combineReducers({
    auth,
    userConfig,
    user,
    dialog
})