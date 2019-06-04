import {isEmpty, every } from 'lodash';
import {ADD_BOTTOM_NOTIFICATION, REMOVE_PAST_BOTTOM_NOTIFICATION} from './bottomNotificationActions.types';
import {NotificationTypes} from '../../classes/Notification';

export const addBottomNotification = (title = "", description = "", type = NotificationTypes.NOTIFICATION)=>({
  type: ADD_BOTTOM_NOTIFICATION,
  payload: {
    title, description, type
  }
});

export const removePassBottomNotifications = () => (dispatch, getState) => {
  const state = getState();    
  const {bottomNotifications} = state.dialog;
  if (isEmpty(bottomNotifications) || every(bottomNotifications, bn=>!bn.shouldClose()))
    return;
  const action = {
    type: REMOVE_PAST_BOTTOM_NOTIFICATION
  };
  dispatch(action);
};