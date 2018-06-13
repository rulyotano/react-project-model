import {combineReducers} from 'redux'
import createDataReducer from '../createDataReducer'
import {OPERATION, FLEET, STATE} from './types'

export default combineReducers({
    [OPERATION]: createDataReducer(OPERATION, "cdOperacao"),
    [FLEET]: createDataReducer(FLEET, "cdEquipamento"),
    [STATE]: createDataReducer(STATE, "cdEstado")
})