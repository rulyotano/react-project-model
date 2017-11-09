export const NotificationTypes = {
    ALERT: 'alert',
    NOTIFICATION: 'notification',
    SUCCESS: 'success',
    ERROR: 'error',
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