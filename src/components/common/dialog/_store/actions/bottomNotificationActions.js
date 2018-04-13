import {ADD_BOTTOM_NOTIFICATION, REMOVE_PAST_BOTTOM_NOTIFICATION} from './bottomNotificationActions.types'
import {NotificationTypes} from '../../classes/Notification'

export const addBottomNotification = (title = "", description = "", type = NotificationTypes.NOTIFICATION)=>({
    type: ADD_BOTTOM_NOTIFICATION,
    payload: {
        title, description, type
    }
})

export const removePassBottomNotifications = ()=>({
    type: REMOVE_PAST_BOTTOM_NOTIFICATION
})