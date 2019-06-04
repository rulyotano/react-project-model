export const DialogButtonTypes = {
  OK: "ok",
  CANCEL: "cancel",
  YES: "yes",
  NO: "no",
  CUSTOM: "custom"
};

export const DialogButtonTypesDefaults = {
  [DialogButtonTypes.OK]: { label: "dialog.ok" },
  [DialogButtonTypes.CANCEL]: { label: "dialog.cancel" },
  [DialogButtonTypes.YES]: { label: "dialog.yes" },
  [DialogButtonTypes.NO]: { label: "dialog.no" }
};

export default class DialogButton {
  constructor(btnType=DialogButtonTypes.CUSTOM, key="", label="", focused=false){
    this._type = btnType;
    this._focused = focused;
    if (btnType && btnType !== DialogButtonTypes.CUSTOM){         
      this._key = btnType;   
      this._label = DialogButtonTypesDefaults[btnType].label;
    } else {
      this._label = label;
      this._key = key;
    }

    this._resolve = null;
    this._promise = new Promise((resolve, reject)=>{
      this._resolve = resolve;
    });
  }

  /** Unique key for the dialog button. If it is a custom type, then will be the type, if it is custom button, then need to be passed */
  get Key(){
    return this._key;
  }

  /** Label of the button
     * @returns {string}
     */
  get Label(){
    return this._label;
  }

  /** Type of the button
     * @returns {string}
     */
  get Type(){
    return this._type;
  }

  /** Focused property
     * @returns {boolean}
     */
  get Focused(){
    return this._focused;
  }

  get Promise(){
    return this._promise;
  }

  raiseAction(){
    this._resolve(this.Key);
  }
}