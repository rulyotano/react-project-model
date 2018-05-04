import {combineReducers} from 'redux'
import createDataReducer from './reducers/createDataReducer'

export const OPERATION = "operation";
export const FLEET = "fleet";
export const STATE = "state";

export default combineReducers({
    [OPERATION]: createDataReducer(OPERATION, "cdOperacao"),
    [FLEET]: createDataReducer(FLEET, "cdEquipamento"),
    [STATE]: createDataReducer(STATE, "cdEstado")
})