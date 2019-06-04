import deepFreeze from "deep-freeze";
import DialogButton, { DialogButtonTypes } from "./DialogButton";

let dialogId = 0;

export default class Dialog {
  constructor(
    title = "",
    body = "",
    modal = true,
    buttons = [new DialogButton(DialogButtonTypes.OK)]
  ) {
    this._title = title;
    this._body = body;
    this._modal = modal;
    this._buttons = buttons;
    this._id = dialogId++;

    const buttonsPromises = this._buttons.map(btn => btn.Promise);
    this._promise = Promise.race(buttonsPromises);
    deepFreeze(this._buttons);
  }

  get Id() {
    return this._id;
  }

  get Title() {
    return this._title;
  }

  get Body() {
    return this._body;
  }

  get Modal() {
    return this._modal;
  }

  get Buttons() {
    return this._buttons;
  }

  get Promise() {
    return this._promise;
  }
}
