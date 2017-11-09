import configureStore from '../../../configureStore'
import Dialog from '../../classes/Dialog'
import BottomNotification from '../../classes/BottomNotification'
import {NotificationTypes} from '../../classes/Notification'
import {addDialog, removeDialog} from '../actions/dialogActions'
import {addBottomNotification, removePassBottomNotifications} from '../actions/bottomNotificationActions'
import deepFreeze from 'deep-freeze'
import {find} from 'lodash'
import moment from 'moment'
import configService from '../../../../config/configService'

let store = null

beforeEach(()=>{
    store = configureStore()
})

//#region Dialogs

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

it('remove dialog action should remove dialog with specified key', () => {      
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
//#endregion

//#region BottomNotifications

it("dialog state should have a bottomNotifications property with default []", ()=>{
    expect(store.getState().dialog.bottomNotifications).toEqual([])
})


it("add bottomNotifications action with empty list, should add a new", ()=>{    
    store.dispatch(addBottomNotification("title1", "desc1"))
    let bottomNotifications = store.getState().dialog.bottomNotifications
    expect(bottomNotifications.length).toBe(1)
    expect(bottomNotifications[0] instanceof BottomNotification).toBe(true)
})

it("add bottomNotifications action with empty list, should add a new with same title and desc and type", ()=>{    
    store.dispatch(addBottomNotification("title2", "desc2", NotificationTypes.SUCCESS))
    let bottomNotifications = store.getState().dialog.bottomNotifications
    expect(bottomNotifications[0].Title).toBe("title2")
    expect(bottomNotifications[0].Description).toBe("desc2")
    expect(bottomNotifications[0].Type).toBe(NotificationTypes.SUCCESS)
})

it("add bottomNotifications action with empty list, should add a new with close time equal to CURRENT TIME + configuration", ()=>{    
    store.dispatch(addBottomNotification("title2", "desc2"))
    let bottomNotifications = store.getState().dialog.bottomNotifications
    expect(Math.abs(moment().valueOf()+configService.TIME_BOTTOM_NOTIFICATION - bottomNotifications[0].TimeToClose.valueOf()) < 100).toBe(true)
})

it("add bottomNotifications action with empty list, should add a new with close time equal to LAST ITEM CLOSE TIME + configuration", () =>{    
    store.dispatch(addBottomNotification("title1", "desc1"))
    store.dispatch(addBottomNotification("title2", "desc2"))
    store.dispatch(addBottomNotification("title3", "desc3"))

    let bottomNotifications = store.getState().dialog.bottomNotifications
    let botNot1 = find(bottomNotifications, n=>n.Title === "title1") 
    let botNot2 = find(bottomNotifications, n=>n.Title === "title2") 
    let botNot3 = find(bottomNotifications, n=>n.Title === "title3") 

    expect(Math.abs(moment().valueOf()+configService.TIME_BOTTOM_NOTIFICATION - botNot1.TimeToClose.valueOf()) < 100).toBe(true)
    expect(Math.abs(botNot1.TimeToClose.valueOf()+configService.TIME_BOTTOM_NOTIFICATION - botNot2.TimeToClose.valueOf()) < 100).toBe(true)
    expect(Math.abs(botNot2.TimeToClose.valueOf()+configService.TIME_BOTTOM_NOTIFICATION - botNot3.TimeToClose.valueOf()) < 100).toBe(true)
    
})

it("remove bottomNotifications action with empty list should return same empty list", ()=>{
    store.dispatch(removePassBottomNotifications())
    expect(store.getState().dialog.bottomNotifications).toEqual([])
})

it("remove bottomNotifications action should return list without past TimeToClose items", ()=>{
    let pastTime = moment().add(-(configService.TIME_BOTTOM_NOTIFICATION + configService.TIME_BOTTOM_NOTIFICATION/2), 'milliseconds')
    let originalNow = Date.now

    Date.now = jest.fn(()=>pastTime)    
    store.dispatch(addBottomNotification("title3", "desc3"))
    store.dispatch(addBottomNotification("title1", "desc1"))
    store.dispatch(addBottomNotification("title2", "desc2"))
    Date.now = originalNow

    store.dispatch(removePassBottomNotifications())
    expect(store.getState().dialog.bottomNotifications.length).toEqual(2)
    expect(find(store.getState().dialog.bottomNotifications, bn=>bn.Title === "title3")).not.toBeDefined()
})
//#endregion