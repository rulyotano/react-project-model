import {combineReducers} from 'redux'
import auth from './reducers/authReducer'
import userConfig from './reducers/userConfigReducer'
import user from './reducers/userReducer'

export default combineReducers({
    auth,
    userConfig,
    user
})