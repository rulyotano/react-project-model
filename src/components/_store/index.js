import {combineReducers} from 'redux'
import auth from './reducers/authReducer'
import userConfig from './reducers/userConfigReducer'

export default combineReducers({
    auth,
    userConfig
})