export const DialogButtonTypes = {
    OK: "ok",
    CANCEL: "cancel",
    YES: "yes",
    NO: "no",
    CUSTOM: "custom"
}

export const DialogButtonTypesDefaults = {
    [DialogButtonTypes.OK]: { label: "dialog:ok", focused: false },
    [DialogButtonTypes.CANCEL]: { label: "dialog:cancel", focused: true },
    [DialogButtonTypes.YES]: { label: "dialog:yes", focused: false },
    [DialogButtonTypes.NO]: { label: "dialog:no", focused: true }
}

export default class DialogButton {
    constructor(btnType=DialogButtonTypes.CUSTOM, key="", label="", focused=false){
        this._type = btnType
        if (btnType && btnType !== DialogButtonTypes.CUSTOM){         
            this._key = btnType   
            this._label = DialogButtonTypesDefaults[btnType].label
            this._focused = DialogButtonTypesDefaults[btnType].focused
        } else {
            this._label = label
            this._focused = focused
            this._key = key
        }
    }

    /**Unique key for the dialog button. If it is a custom type, then will be the type, if it is custom button, then need to be passed*/
    get Key(){
        return this._key
    }

    /**Label of the button
     * @returns {string}
     */
    get Label(){
        return this._label
    }

    /**Type of the button
     * @returns {string}
     */
    get Type(){
        return this._type
    }

    /**Focused property
     * @returns {boolean}
     */
    get Focused(){
        return this._focused
    }
}