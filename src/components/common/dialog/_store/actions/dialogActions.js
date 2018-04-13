import {ADD_DIALOG, REMOVE_DIALOG} from './dialogActions.types'
export const addDialog = (dialog)=>({
    type: ADD_DIALOG,
    payload: dialog
})

export const removeDialog = (dialogId)=>({
    type: REMOVE_DIALOG,
    payload: dialogId
})