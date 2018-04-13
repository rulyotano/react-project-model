import Notification from './Notification'
import moment from 'moment'

export default class BottomNotification extends Notification{
    constructor(title, description, type, timeToClose = moment()){
        super(title, description, type)
        this._timeToClose = timeToClose        
    }

    get TimeToClose(){
        return this._timeToClose
    }

    shouldClose(){
        return this._timeToClose.isBefore(new Date())
    }
}