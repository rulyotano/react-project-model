import {ADD_BOTTOM_NOTIFICATION, REMOVE_PAST_BOTTOM_NOTIFICATION} from './bottomNotificationActions.types'
import {addBottomNotification, removePassBottomNotifications} from './bottomNotificationActions'
import {NotificationTypes} from '../../classes/Notification'


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
    let result = removePassBottomNotifications()
    expect(result.type).toBe(REMOVE_PAST_BOTTOM_NOTIFICATION)
})