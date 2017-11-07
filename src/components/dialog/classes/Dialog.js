import DialogButton from './DialogButton'
import {DialogButtonTypes} from './DialogButton'

let dialogId = 0;

export default class Dialog {
    constructor(title ="", body ="", modal=true, buttons=[new DialogButton(DialogButtonTypes.OK)]){
        this._title = title
        this._body = body
        this._modal = modal
        this._buttons = buttons
        this._id = dialogId++
    }

    get Id(){
        return this._id
    }

    get Title(){
        return this._title
    }

    get Body(){
        return this._body
    }

    get Modal(){
        return this._modal
    }

    get Buttons(){
        return this._buttons
    }
}