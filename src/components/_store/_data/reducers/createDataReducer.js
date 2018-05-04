import {keyBy} from 'lodash'
import createDataActionsTypes from '../actions/createDataActions.types'

/**returns a function that creates a reducer */
export default (name, key = null)=>{
    const {START_LOADING, LOADED,  CLEAR} = createDataActionsTypes(name);
    const defaultState = {
        data: null,
        mappedData: null,
        loading: false
    }

    return (state = defaultState, action)=>{
        switch (action.type){
            case START_LOADING:
                return {
                    ...state,
                    loading: true,
                }
            case LOADED:
                return {
                    ...state,
                    data: action.data,
                    mappedData: key ? keyBy(action.data, key) : null
                }
            case CLEAR:
                return defaultState
            default:
                return state
        }
    }
}