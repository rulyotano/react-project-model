import store from '../../components/store'
import {addDialog} from '../../components/dialog/_store/actions/dialogActions'
import {addBottomNotification} from '../../components/dialog/_store/actions/bottomNotificationActions'
import Dialog from '../../components/dialog/classes/Dialog'
import {NotificationTypes} from '../../components/dialog/classes/Notification'
import DialogButton, {DialogButtonTypes} from '../../components/dialog/classes/DialogButton'


export class DialogService {
    constructor(storeParam){
        this._store = storeParam
    }

    _confirm(title, description, buttons){
        let dialog = new Dialog(title, description, true, buttons)
        this._store.dispatch(addDialog(dialog))
        return dialog.Promise
    }

    _bottomNotification(title, description, type){
        this._store.dispatch(addBottomNotification(title, description, type))
    }

    confirmYesNo(title, description){
        let buttons = [
            new DialogButton(DialogButtonTypes.YES), 
            new DialogButton(DialogButtonTypes.NO, "", "", true)
        ]
        return this._confirm(title, description, buttons)
    }

    confirmYesNoCancel(title, description){    
        let buttons = [
            new DialogButton(DialogButtonTypes.YES), 
            new DialogButton(DialogButtonTypes.NO),
            new DialogButton(DialogButtonTypes.CANCEL, "", "", true)
        ]  
        return this._confirm(title, description, buttons)
    }

    confirmOk(title, description){    
        let buttons = [
            new DialogButton(DialogButtonTypes.OK, "", "", true)
        ]  
        return this._confirm(title, description, buttons)
    }

    error(title, description){
        this._bottomNotification(title, description, NotificationTypes.ERROR)
    }
    
    notification(title, description){
        this._bottomNotification(title, description, NotificationTypes.NOTIFICATION)
    }
    
    alert(title, description){
        this._bottomNotification(title, description, NotificationTypes.ALERT)
    }
    
    success(title, description){
        this._bottomNotification(title, description, NotificationTypes.SUCCESS)
    }
}

export default new DialogService(store)