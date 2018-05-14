import {combineReducers} from 'redux'
import appReducer from './reducers/appReducer';
import closeField from '../close-field/_store';


export default combineReducers({
    _: appReducer,
    closeField
});