import moment from 'moment';
import { ADD_BOTTOM_NOTIFICATION } from './bottomNotificationActions.types';
import { addBottomNotification, removePassBottomNotifications } from './bottomNotificationActions';
import { NotificationTypes } from '../../classes/Notification';
import BottomNotification from '../../classes/BottomNotification';
import configureStore from '../../../../configureStore';
import config from '../../../../../config/config';


test('add bottom notification structure', () => {
  const result = addBottomNotification("title", "description", NotificationTypes.SUCCESS);
  expect(result.type).toBe(ADD_BOTTOM_NOTIFICATION);
  expect(result.payload.title).toBe("title");
  expect(result.payload.description).toBe("description");
  expect(result.payload.type).toBe(NotificationTypes.SUCCESS);
});

test('add bottom notification default values', () => {
  const result = addBottomNotification();
  expect(result.payload.title).toBe("");
  expect(result.payload.description).toBe("");
  expect(result.payload.type).toBe(NotificationTypes.NOTIFICATION);
});

test('remove past bottom notifications structure', () => {
  const moreTimeThanNotificationConfigMilliseconds =
        config.TIME_BOTTOM_NOTIFICATION + config.TIME_BOTTOM_NOTIFICATION / 2;
  const notification =
        new BottomNotification("title1", "desc1", "type", moment().add(-moreTimeThanNotificationConfigMilliseconds, 'milliseconds'));
  const store = configureStore({
    dialog: {
      bottomNotifications: [
        notification
      ]
    }
  });

  expect(store.getState().dialog.bottomNotifications).toEqual([notification]);
  store.dispatch(removePassBottomNotifications());
  expect(store.getState().dialog.bottomNotifications).toEqual([]);
});