import {ADD_BOTTOM_NOTIFICATION, REMOVE_PAST_BOTTOM_NOTIFICATION} from './bottomNotificationActions.types'
import {addBottomNotification, removePassBottomNotifications} from './bottomNotificationActions'
import {NotificationTypes} from '../../classes/Notification'
import BottomNotification from '../../classes/BottomNotification'
import configureStore from '../../../../configureStore'
import moment from 'moment'
import configService from '../../../../../config/configService'


test('add bottom notification structure', () => {
    let result = addBottomNotification("title", "description", NotificationTypes.SUCCESS)
    expect(result.type).toBe(ADD_BOTTOM_NOTIFICATION)
    expect(result.payload.title).toBe("title")
    expect(result.payload.description).toBe("description")
    expect(result.payload.type).toBe(NotificationTypes.SUCCESS)
})

test('add bottom notification default values', () => {
    let result = addBottomNotification()
    expect(result.payload.title).toBe("")
    expect(result.payload.description).toBe("")
    expect(result.payload.type).toBe(NotificationTypes.NOTIFICATION)
})

test('remove past bottom notifications structure', () => {
    const notification = 
        new BottomNotification("title1", "desc1", "type", moment().add(-(configService.TIME_BOTTOM_NOTIFICATION + configService.TIME_BOTTOM_NOTIFICATION/2), 'milliseconds'));
    const store = configureStore({ dialog: { bottomNotifications: [
        notification
    ]}})

    expect(store.getState().dialog.bottomNotifications).toEqual([notification])
    store.dispatch(removePassBottomNotifications())
    expect(store.getState().dialog.bottomNotifications).toEqual([])
})