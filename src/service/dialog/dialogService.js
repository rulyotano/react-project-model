import store from '../../components/store'
import {addDialog} from '../../components/dialog/_store/actions/dialogActions'
import Dialog from '../../components/dialog/classes/Dialog'
import DialogButton, {DialogButtonTypes} from '../../components/dialog/classes/DialogButton'


export class DialogService {
    constructor(storeParam){
        this._store = storeParam
    }

    confirmYesNo(title, description){
        let buttons = [
            new DialogButton(DialogButtonTypes.YES), 
            new DialogButton(DialogButtonTypes.NO)
        ]
        let dialog = new Dialog(title, description, true, buttons)
        this._store.dispatch(addDialog(dialog))
        return dialog.Promise
    }
}

export default new DialogService(store)