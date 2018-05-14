import load from '../load/_store'
import map from '../map/_store'
import process from '../process/_store'
import {combineReducers} from 'redux'

export default combineReducers({
    load,
    map,
    process
})
