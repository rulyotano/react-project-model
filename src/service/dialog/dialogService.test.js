import configureStore from '../../components/configureStore'
import {DialogService} from './dialogService'
import Dialog from '../../components/dialog/classes/Dialog'
import {DialogButtonTypes} from '../../components/dialog/classes/DialogButton'

let store = null
let dialogService = null
beforeEach(()=>{
    store = configureStore()
    dialogService = new DialogService(store)    
})

//#region 'confirmYesNo'
test("should have method 'confirmYesNo'", () => {
    expect(dialogService.confirmYesNo).toBeDefined()      
})

//with 'title', 'desc', and yes no buttons
test("method 'confirmYesNo'should add to store a new dialog", () => {
    dialogService.confirmYesNo("title 1", "desc 1")
    let state = store.getState()
    expect(state.dialog.dialogs.length).toBe(1)
    expect(state.dialog.dialogs[0] instanceof Dialog).toBe(true)
})

test("method 'confirmYesNo'should add dialog dialog with same title and body", () => {
    dialogService.confirmYesNo("title 2", "desc 2")
    let state = store.getState()
    expect(state.dialog.dialogs[0].Title).toBe("title 2")
    expect(state.dialog.dialogs[0].Body).toBe("desc 2")
})

test("method 'confirmYesNo'should add dialog modal dialog", () => {
    dialogService.confirmYesNo()
    let state = store.getState()
    expect(state.dialog.dialogs[0].Modal).toBe(true)
})

test("method 'confirmYesNo'should have yes and no buttons", () => {
    dialogService.confirmYesNo()
    let state = store.getState()
    let buttons = state.dialog.dialogs[0].Buttons
    expect(buttons.length).toBe(2)
    expect(buttons[0].Type).toBe(DialogButtonTypes.YES)
    expect(buttons[1].Type).toBe(DialogButtonTypes.NO)
})

test("method 'confirmYesNo'should return same promise that dialog", () => {
    let response = dialogService.confirmYesNo()
    let state = store.getState()
    expect(response).toBe(state.dialog.dialogs[0].Promise)
})
//#endregion