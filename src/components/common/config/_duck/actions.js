import { setLanguage } from "redux-i18n";

export const changeLanguage = lang => (dispatch, getState) => {
  dispatch(setLanguage(lang));
};
