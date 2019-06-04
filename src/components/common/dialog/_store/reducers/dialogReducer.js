import {filter, get, last, isEmpty, every } from 'lodash';
import moment from 'moment';
import {ADD_DIALOG, REMOVE_DIALOG} from '../actions/dialogActions.types';
import {ADD_BOTTOM_NOTIFICATION, REMOVE_PAST_BOTTOM_NOTIFICATION} from '../actions/bottomNotificationActions.types';
import BottomNotification from '../../classes/BottomNotification';
import config from '../../../../../config/config';

const initialState = {
  dialogs:[],
  bottomNotifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_DIALOG:
    const newDialog = action.payload;
    return { ...state, dialogs: [...state.dialogs, newDialog] };
  case REMOVE_DIALOG:
    const dialogId = action.payload; 
    return {...state, dialogs: filter(state.dialogs, d=>d.Id !== dialogId)};
  case ADD_BOTTOM_NOTIFICATION:
    const lastNotificationTime = moment(get(last(state.bottomNotifications), 'TimeToClose'));
    return {
      ...state,
      bottomNotifications: [
        ...state.bottomNotifications, 
        new BottomNotification(action.payload.title, action.payload.description, action.payload.type, lastNotificationTime.add(config.TIME_BOTTOM_NOTIFICATION, 'milliseconds'))
      ]
    };
  case REMOVE_PAST_BOTTOM_NOTIFICATION:
    if (isEmpty(state.bottomNotifications) || every(state.bottomNotifications, bn=>!bn.shouldClose()))
      return state;
    return {
      ...state,
      bottomNotifications: filter(state.bottomNotifications, bn=>!bn.shouldClose())
    };
  default:
    return state;
  }
};
