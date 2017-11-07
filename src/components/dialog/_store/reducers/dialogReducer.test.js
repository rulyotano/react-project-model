import configureStore from '../../../configureStore'
import Dialog from '../../classes/Dialog'
import {addDialog, removeDialog} from '../actions/dialogActions'
import deepFreeze from 'deep-freeze'

let store = null

beforeEach(()=>{
    store = configureStore()
})

it("store should have 'dialog' object", ()=>{
    expect(store.getState().dialog).toBeDefined()
})

it("dialog state should have a dialogs property with default []", ()=>{
    expect(store.getState().dialog.dialogs).toEqual([])
})

it("add dialog should insert one item after the last one", ()=>{
    let dialog1 = new Dialog()
    let dialogs = store.getState().dialog.dialogs
    deepFreeze(dialogs)
    store.dispatch(addDialog(dialog1))  //add dialog 1
    expect(store.getState().dialog.dialogs).toEqual([dialog1])

    dialogs = store.getState().dialog.dialogs
    deepFreeze(dialogs)
    let dialog2 = new Dialog()
    store.dispatch(addDialog(dialog2))  //add dialog 2
    expect(store.getState().dialog.dialogs).toEqual([dialog1, dialog2])    
})

it('remove dialog action should remove dialog with specified index', () => {      
    let dialog1 = new Dialog()
    let dialog2 = new Dialog()
    store.dispatch(addDialog(dialog1))  //add dialog 1
    store.dispatch(addDialog(dialog2))  //add dialog 2
    
    let dialogs = store.getState().dialog.dialogs

    store.dispatch(removeDialog(dialog1.Id))
    expect(store.getState().dialog.dialogs).toEqual([dialog2]) 
    
    dialogs = store.getState().dialog.dialogs
    
    store.dispatch(removeDialog(dialog2.Id))
    expect(store.getState().dialog.dialogs).toEqual([]) 
})
