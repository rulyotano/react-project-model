import {blue500, red500, amber500, green500} from 'material-ui/styles/colors.js'

export const NotificationTypes = {
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    SUCCESS: 'success',
    ERROR: 'error',
}

export const NotificationTypesDefaults = {
    [NotificationTypes.ALERT]: { color: amber500, fontColor: 'black' },
    [NotificationTypes.NOTIFICATION]: { color: blue500, fontColor: 'black' },
    [NotificationTypes.SUCCESS]: { color: green500, fontColor: 'black' },
    [NotificationTypes.ERROR]: { color: red500, fontColor: 'white' },
}

export default class Notification {
    constructor(title="", description="", type = NotificationTypes.NOTIFICATION){
        this._title = title
        this._description = description
        this._type = type
    }

    get Title(){
        return this._title
    }

    get Description(){
        return this._description
    }

    get Type(){
        return this._type
    }
}