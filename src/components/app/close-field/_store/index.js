import load from '../load/_store'
import map from '../map/_store'
import process from '../process/_store'
import closeFieldReducer from './reducers/closeFieldReducer'
import {combineReducers} from 'redux'

export default combineReducers({
    _: closeFieldReducer,
    load,
    map,
    process
})
