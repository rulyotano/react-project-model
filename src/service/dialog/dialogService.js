import { addDialog } from "../../components/common/dialog/_store/actions/dialogActions";
import { addBottomNotification } from "../../components/common/dialog/_store/actions/bottomNotificationActions";
import Dialog from "../../components/common/dialog/classes/Dialog";
import { NotificationTypes } from "../../components/common/dialog/classes/Notification";
import DialogButton, {
  DialogButtonTypes
} from "../../components/common/dialog/classes/DialogButton";
import { getDispatch } from "../redux";

export class DialogService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  _confirm(title, description, buttons) {
    const dialog = new Dialog(title, description, true, buttons);
    this.dispatch(addDialog(dialog));
    return dialog.Promise;
  }

  _bottomNotification(title, description, type) {
    this.dispatch(addBottomNotification(title, description, type));
  }

  confirmYesNo(title, description) {
    const buttons = [
      new DialogButton(DialogButtonTypes.YES),
      new DialogButton(DialogButtonTypes.NO, "", "", true)
    ];
    return this._confirm(title, description, buttons);
  }

  confirmYesNoCancel(title, description) {
    const buttons = [
      new DialogButton(DialogButtonTypes.YES),
      new DialogButton(DialogButtonTypes.NO),
      new DialogButton(DialogButtonTypes.CANCEL, "", "", true)
    ];
    return this._confirm(title, description, buttons);
  }

  confirmOk(title, description) {
    const buttons = [new DialogButton(DialogButtonTypes.OK, "", "", true)];
    return this._confirm(title, description, buttons);
  }

  error(title, description) {
    this._bottomNotification(title, description, NotificationTypes.ERROR);
  }

  notification(title, description) {
    this._bottomNotification(
      title,
      description,
      NotificationTypes.NOTIFICATION
    );
  }

  alert(title, description) {
    this._bottomNotification(title, description, NotificationTypes.ALERT);
  }

  success(title, description) {
    this._bottomNotification(title, description, NotificationTypes.SUCCESS);
  }
}

export default new DialogService(getDispatch());