import configureStore from '../../components/configureStore'
import {DialogService} from './dialogService'
import Dialog from '../../components/dialog/classes/Dialog'
import {NotificationTypes} from '../../components/dialog/classes/Notification'
import BottomNotification from '../../components/dialog/classes/BottomNotification'
import {DialogButtonTypes} from '../../components/dialog/classes/DialogButton'
import {forEach, filter} from 'lodash'

let store = null
let dialogService = null
beforeEach(()=>{
    store = configureStore()
    dialogService = new DialogService(store)    
})

//#region common
const testMethodDefined = (methodName)=>{    
    test(`should have method '${methodName}'`, () => {
        expect(dialogService[methodName]).toBeDefined()      
    })
}

const testAddNewDialogToStore = (methodName)=>{
    test(`method '${methodName}'should add to store a new dialog`, () => {
        dialogService[methodName]("title 1", "desc 1")
        let state = store.getState()
        expect(state.dialog.dialogs.length).toBe(1)
        expect(state.dialog.dialogs[0] instanceof Dialog).toBe(true)
    })
}

const testSameTitleAndBody = (methodName)=>{
    test(`method '${methodName}'should add dialog with same title and body`, () => {
        dialogService[methodName]("title 2", "desc 2")
        let state = store.getState()
        expect(state.dialog.dialogs[0].Title).toBe("title 2")
        expect(state.dialog.dialogs[0].Body).toBe("desc 2")
    })
}

const testAddDialogModal = (methodName)=>{
    test(`method '${methodName}'should add dialog modal`, () => {
        dialogService[methodName]()
        let state = store.getState()
        expect(state.dialog.dialogs[0].Modal).toBe(true)
    })
}

const testHaveButtons = (methodName, buttonTypes)=>{
    test(`method '${methodName}' should have buttons`, () => {
        dialogService[methodName]()
        let state = store.getState()
        let buttons = state.dialog.dialogs[0].Buttons
        expect(buttons.length).toBe(buttonTypes.length)
        forEach(buttons, (btn, index) => expect(btn.Type).toBe(buttonTypes[index]));
    })
}

const testSamePromiseResult = (methodName, buttonTypes)=>{
    test(`method '${methodName}' should return same promise that dialog`, () => {
        let response = dialogService[methodName]()
        let state = store.getState()
        expect(response).toBe(state.dialog.dialogs[0].Promise)
    })
}

const testButtonShouldBeFocused = (methodName, buttonTypeToFocus)=>{
    test(`method '${methodName}' should have right button focused`, () => {        
        dialogService[methodName]()
        let state = store.getState()
        let buttons = state.dialog.dialogs[0].Buttons
        let focusedButtons = filter(buttons, btn=>btn.Focused)
        expect(focusedButtons.length).toBe(1)
        expect(focusedButtons[0].Key).toBe(buttonTypeToFocus)
    })
}

const testShouldAddBottomNotificationToStore = (methodName)=>{
    test(`method '${methodName}'should add bottom notification to store`, () => {
        dialogService[methodName]("title 1", "desc 1")
        let state = store.getState()
        expect(state.dialog.bottomNotifications.length).toBe(1)
        expect(state.dialog.bottomNotifications[0] instanceof BottomNotification).toBe(true)
    })
}

const testBottomNotificationSameTitleDescAndType = (methodName, type)=>{
    test(`method '${methodName}'should add bottom notification with same title and desc`, () => {
        dialogService[methodName]("title 2", "desc 2")
        let state = store.getState()
        expect(state.dialog.bottomNotifications[0].Title).toBe("title 2")
        expect(state.dialog.bottomNotifications[0].Description).toBe("desc 2")
        expect(state.dialog.bottomNotifications[0].Type).toBe(type)
    })
}

//#endregion

//#region 'confirmYesNo'
testMethodDefined('confirmYesNo')

//with 'title', 'desc', and yes no buttons
testAddNewDialogToStore('confirmYesNo')

testSameTitleAndBody('confirmYesNo')

testAddDialogModal('confirmYesNo')

testHaveButtons('confirmYesNo', [DialogButtonTypes.YES, DialogButtonTypes.NO])

testButtonShouldBeFocused('confirmYesNo', DialogButtonTypes.NO)

testSamePromiseResult('confirmYesNo')
//#endregion

//#region confirmYesNoCancel
testMethodDefined('confirmYesNoCancel')

testAddNewDialogToStore('confirmYesNoCancel')

testSameTitleAndBody('confirmYesNoCancel')

testAddDialogModal('confirmYesNoCancel')

testHaveButtons('confirmYesNoCancel', [DialogButtonTypes.YES, DialogButtonTypes.NO, DialogButtonTypes.CANCEL])

testButtonShouldBeFocused('confirmYesNoCancel', DialogButtonTypes.CANCEL)

testSamePromiseResult('confirmYesNoCancel')
//#endregion

//#region confirmOk
testMethodDefined('confirmOk')

testAddNewDialogToStore('confirmOk')

testSameTitleAndBody('confirmOk')

testAddDialogModal('confirmOk')

testHaveButtons('confirmOk', [DialogButtonTypes.OK])

testButtonShouldBeFocused('confirmOk', DialogButtonTypes.OK)

testSamePromiseResult('confirmOk')
//#endregion

//#region error
testMethodDefined('error')

testShouldAddBottomNotificationToStore('error')

testBottomNotificationSameTitleDescAndType('error', NotificationTypes.ERROR)
//#endregion

//#region notification

testMethodDefined('notification')

testShouldAddBottomNotificationToStore('notification')

testBottomNotificationSameTitleDescAndType('notification', NotificationTypes.NOTIFICATION)

//#endregion

//#region alert

testMethodDefined('alert')

testShouldAddBottomNotificationToStore('alert')

testBottomNotificationSameTitleDescAndType('alert', NotificationTypes.ALERT)

//#endregion

//#region success

testMethodDefined('success')

testShouldAddBottomNotificationToStore('success')

testBottomNotificationSameTitleDescAndType('success', NotificationTypes.SUCCESS)

//#endregion