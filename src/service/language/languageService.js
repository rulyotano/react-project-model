import { getTranslateFunction } from "redux-i18n";
import store from "../../components/store";
import i18n from "../../i18n";

export const getLanguageFunction = () =>
  getTranslateFunction(i18n, store.getState().i18nState.lang);

export default {
  availableLanguages() {
    return [
      {
        key: "pt-br",
        name: "languages.Portuguese",
        flagClass: "flag-br",
        customMeasureUnit: false
      },
      {
        key: "en-us",
        name: "languages.English",
        flagClass: "flag-us",
        customMeasureUnit: true
      },
      {
        key: "es",
        name: "languages.Spanish",
        flagClass: "flag-es",
        customMeasureUnit: false
      }
    ];
  }
};
