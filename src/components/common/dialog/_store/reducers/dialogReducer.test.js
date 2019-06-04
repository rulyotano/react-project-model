import deepFreeze from 'deep-freeze';
import {find} from 'lodash';
import moment from 'moment';
import configureStore from '../../../../configureStore';
import Dialog from '../../classes/Dialog';
import BottomNotification from '../../classes/BottomNotification';
import {NotificationTypes} from '../../classes/Notification';
import {addDialog, removeDialog} from '../actions/dialogActions';
import {addBottomNotification, removePassBottomNotifications} from '../actions/bottomNotificationActions';
import config from '../../../../../config/config';

let store = null;

beforeEach(()=>{
  store = configureStore();
});

// #region Dialogs

it("store should have 'dialog' object", ()=>{
  expect(store.getState().dialog).toBeDefined();
});

it("dialog state should have a dialogs property with default []", ()=>{
  expect(store.getState().dialog.dialogs).toEqual([]);
});

it("add dialog should insert one item after the last one", ()=>{
  const dialog1 = new Dialog();
  let {dialogs} = store.getState().dialog;
  deepFreeze(dialogs);
  store.dispatch(addDialog(dialog1));  // add dialog 1
  expect(store.getState().dialog.dialogs).toEqual([dialog1]);

  dialogs = store.getState().dialog.dialogs;
  deepFreeze(dialogs);
  const dialog2 = new Dialog();
  store.dispatch(addDialog(dialog2));  // add dialog 2
  expect(store.getState().dialog.dialogs).toEqual([dialog1, dialog2]);    
});

it('remove dialog action should remove dialog with specified key', () => {      
  const dialog1 = new Dialog();
  const dialog2 = new Dialog();
  store.dispatch(addDialog(dialog1));  // add dialog 1
  store.dispatch(addDialog(dialog2));  // add dialog 2
    
  let {dialogs} = store.getState().dialog;

  store.dispatch(removeDialog(dialog1.Id));
  expect(store.getState().dialog.dialogs).toEqual([dialog2]); 
    
  dialogs = store.getState().dialog.dialogs;
    
  store.dispatch(removeDialog(dialog2.Id));
  expect(store.getState().dialog.dialogs).toEqual([]); 
});
// #endregion

// #region BottomNotifications

it("dialog state should have a bottomNotifications property with default []", ()=>{
  expect(store.getState().dialog.bottomNotifications).toEqual([]);
});


it("add bottomNotifications action with empty list, should add a new", ()=>{    
  store.dispatch(addBottomNotification("title1", "desc1"));
  const {bottomNotifications} = store.getState().dialog;
  expect(bottomNotifications.length).toBe(1);
  expect(bottomNotifications[0] instanceof BottomNotification).toBe(true);
});

it("add bottomNotifications action with empty list, should add a new with same title and desc and type", ()=>{    
  store.dispatch(addBottomNotification("title2", "desc2", NotificationTypes.SUCCESS));
  const {bottomNotifications} = store.getState().dialog;
  expect(bottomNotifications[0].Title).toBe("title2");
  expect(bottomNotifications[0].Description).toBe("desc2");
  expect(bottomNotifications[0].Type).toBe(NotificationTypes.SUCCESS);
});

it("add bottomNotifications action with empty list, should add a new with close time equal to CURRENT TIME + configuration", ()=>{    
  store.dispatch(addBottomNotification("title2", "desc2"));
  const {bottomNotifications} = store.getState().dialog;

  const timeShouldHave = moment().valueOf()+config.TIME_BOTTOM_NOTIFICATION;
  console.log(timeShouldHave);
  const timeHave = bottomNotifications[0].TimeToClose.valueOf();
  console.log(timeHave);
  const areTimesVeryClose = Math.abs(timeShouldHave - timeHave) < 100;

  expect(Math.abs(timeShouldHave - timeHave)).toBeLessThan(100);
});

it("add bottomNotifications action with empty list, should add a new with close time equal to LAST ITEM CLOSE TIME + configuration", () =>{    
  store.dispatch(addBottomNotification("title1", "desc1"));
  store.dispatch(addBottomNotification("title2", "desc2"));
  store.dispatch(addBottomNotification("title3", "desc3"));

  const {bottomNotifications} = store.getState().dialog;
  const botNot1 = find(bottomNotifications, n=>n.Title === "title1"); 
  const botNot2 = find(bottomNotifications, n=>n.Title === "title2"); 
  const botNot3 = find(bottomNotifications, n=>n.Title === "title3"); 

  expect(Math.abs(moment().valueOf()+config.TIME_BOTTOM_NOTIFICATION - botNot1.TimeToClose.valueOf()) < 100).toBe(true);
  expect(Math.abs(botNot1.TimeToClose.valueOf()+config.TIME_BOTTOM_NOTIFICATION - botNot2.TimeToClose.valueOf()) < 100).toBe(true);
  expect(Math.abs(botNot2.TimeToClose.valueOf()+config.TIME_BOTTOM_NOTIFICATION - botNot3.TimeToClose.valueOf()) < 100).toBe(true);
    
});

it("remove bottomNotifications action with empty list should return same empty list", ()=>{
  store.dispatch(removePassBottomNotifications());
  expect(store.getState().dialog.bottomNotifications).toEqual([]);
});

it("remove bottomNotifications action should return list without past TimeToClose items", ()=>{
  const pastTime = moment().add(-(config.TIME_BOTTOM_NOTIFICATION + config.TIME_BOTTOM_NOTIFICATION/2), 'milliseconds');
  const originalNow = Date.now;

  Date.now = jest.fn(()=>pastTime);    
  store.dispatch(addBottomNotification("title3", "desc3"));
  store.dispatch(addBottomNotification("title1", "desc1"));
  store.dispatch(addBottomNotification("title2", "desc2"));
  Date.now = originalNow;

  store.dispatch(removePassBottomNotifications());
  expect(store.getState().dialog.bottomNotifications.length).toEqual(2);
  expect(find(store.getState().dialog.bottomNotifications, bn=>bn.Title === "title3")).not.toBeDefined();
});
// #endregion