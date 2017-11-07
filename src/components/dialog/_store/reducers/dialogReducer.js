import {ADD_DIALOG, REMOVE_DIALOG} from '../actions/dialogActions.types'
import {filter} from 'lodash'

const initialState = {
    dialogs:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIALOG:
        let newDialog = action.payload
        return { ...state, dialogs: [...state.dialogs, newDialog] }
    case REMOVE_DIALOG:
        let dialogId = action.payload 
        return {...state, dialogs: filter(state.dialogs, d=>d.Id !== dialogId)}
    default:
        return state
  }
}
