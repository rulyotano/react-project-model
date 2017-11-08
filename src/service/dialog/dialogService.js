import store from '../../components/store'
import {addDialog} from '../../components/dialog/_store/actions/dialogActions'
import Dialog from '../../components/dialog/classes/Dialog'
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
}

export default new DialogService(store)