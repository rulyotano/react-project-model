import {blue, red, amber, green} from '@material-ui/core/colors'

export const NotificationTypes = {
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    SUCCESS: 'success',
    ERROR: 'error',
}

export const NotificationTypesDefaults = {
    [NotificationTypes.ALERT]: { color: amber[500], fontColor: 'black' },
    [NotificationTypes.NOTIFICATION]: { color: blue[500], fontColor: 'white' },
    [NotificationTypes.SUCCESS]: { color: green[300], fontColor: 'white' },
    [NotificationTypes.ERROR]: { color: red[300], fontColor: 'white' },
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